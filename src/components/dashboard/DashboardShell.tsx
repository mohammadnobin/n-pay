"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useLang } from "@/hooks/useLang";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  Home,
  ScanLine,
  ArrowLeftRight,
  Wallet,
  BadgeCheck,
  User,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  PanelLeft,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Brand } from "@/components/share/Brand";
import { Preferences } from "@/components/share/Preferences";
import { ThemeToggle } from "@/components/share/ThemeToggle";
import { LanguageSwitcher } from "@/components/share/LanguageSwitcher";
import { SidebarTooltip } from "@/components/dashboard/SidebarTooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NotificationsMenu } from "@/components/dashboard/NotificationsMenu";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { personalService } from "@/services/personal.service";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { routes } from "@/constants/routes";
import { toast } from "sonner";

// The sidebar has three modes: off screen below `lg`, the icon rail up to
// `xl`, and the full sidebar above it — in the first two, opening it slides
// the full sidebar over the page rather than resizing the layout. The classes
// below do all of that on their own; these queries only tell the flyout labels
// and the drawer's keyboard trap which mode they are in.
const BELOW_DESKTOP = "(max-width: 79.999rem)";
const BELOW_RAIL = "(max-width: 63.999rem)";

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const personalNav = [
  ["navHome", routes.dashboard, Home],
  ["navPay", routes.payScan, ScanLine],
  ["navWallet", routes.wallet, Wallet],
  ["navTransactions", routes.transactions, ArrowLeftRight],
  ["navKyc", routes.kyc, BadgeCheck],
  ["navProfile", routes.profile, User],
  ["navSecurity", routes.security, ShieldCheck],
  ["navSettings", routes.settings, Settings],
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const path = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    toggleSidebarCollapsed,
  } = useUIStore();
  const belowDesktop = useMediaQuery(BELOW_DESKTOP);
  const belowRail = useMediaQuery(BELOW_RAIL);
  // Labels are hidden only in a rail, which is exactly when the flyout labels
  // earn their keep: never below `lg`, where the sidebar is either off screen
  // or a full drawer.
  const railed = belowRail
    ? false
    : belowDesktop
      ? !sidebarOpen
      : sidebarCollapsed;
  const sidebar = useRef<HTMLElement>(null);
  useEffect(() => {
    // Only the overlay drawer traps focus and locks scrolling; on desktop the
    // sidebar is just part of the page.
    if (!sidebarOpen || !belowDesktop) return;
    const previous = document.activeElement as HTMLElement | null;
    const nodes = () =>
      Array.from(
        sidebar.current?.querySelectorAll<HTMLElement>(
          "a[href],button,select",
        ) ?? [],
      ).filter((el) => el.getClientRects().length > 0);
    nodes()[0]?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
      if (e.key === "Tab") {
        const items = nodes();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [sidebarOpen, belowDesktop, setSidebarOpen]);
  const profile = useQuery({
    queryKey: queryKeys.personal.profile,
    queryFn: personalService.profile,
  });
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  async function logout() {
    setLoggingOut(true);
    try {
      await authService.logout();
      queryClient.clear();
      useAuthStore.getState().clear();
      router.replace(routes.login);
    } catch {
      toast.error(t("requestFailed"));
      setLoggingOut(false);
    }
  }
  return (
    <div className="min-h-screen">
      <a href="#main" className="skip-link">
        {t("skip")}
      </a>
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 xl:hidden"
          aria-label={t("close")}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        ref={sidebar}
        className={cn(
          "group fixed inset-y-0 start-0 z-40 flex flex-col bg-card shadow-card transition-[width,transform]",
          // Between `lg` and `xl` the rail is what rests on screen and
          // `sidebarOpen` widens it over the page; from `xl` the full sidebar
          // is the resting state and the stored choice may collapse it back to
          // the rail.
          sidebarOpen ? "w-68 shadow-xl xl:shadow-card" : "w-20",
          "xl:w-68",
          sidebarCollapsed && "xl:w-20",
          // Below `lg` there is no room to park it, so it waits off screen and
          // only the header's menu button brings it in.
          sidebarOpen
            ? "visible translate-x-0"
            : "invisible -translate-x-full rtl:translate-x-full",
          "lg:visible lg:translate-x-0 lg:rtl:translate-x-0",
        )}
      >
        <div
          className={cn(
            "flex h-18 shrink-0 items-center",
            sidebarOpen ? "px-6" : "px-3",
            "xl:px-6",
            sidebarCollapsed && "xl:px-3",
          )}
        >
          {/* Full lockup: the open drawer, and desktop while expanded. */}
          <div
            className={cn(
              "w-full items-center justify-between",
              sidebarOpen ? "flex" : "hidden",
              "xl:flex",
              sidebarCollapsed && "xl:hidden",
            )}
          >
            <Brand />
            <Button
              className="rounded-full xl:hidden"
              size="icon"
              variant="ghost"
              aria-label={t("close")}
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hidden rounded-full xl:inline-flex"
              aria-label={t("menu")}
              aria-expanded={!sidebarCollapsed}
              onClick={toggleSidebarCollapsed}
            >
              <PanelLeft size={20} />
            </Button>
          </div>

          {/* Icon-rail lockup: the resting rail below `xl`, and the desktop
           *  rail while collapsed. On desktop, hovering anywhere on the
           *  sidebar swaps the logo for the expand button, via the `group` on
           *  the <aside> itself; below `xl` the header's menu button opens it
           *  instead, so the logo simply stays put. */}
          <div
            className={cn(
              "w-full items-center justify-center",
              sidebarOpen ? "hidden" : "flex",
              "xl:hidden",
              sidebarCollapsed && "xl:flex",
            )}
          >
            <div className="relative flex size-10 items-center justify-center">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-opacity xl:group-hover:opacity-0">
                <ArrowUpRight size={24} strokeWidth={2.8} />
              </span>
              <button
                type="button"
                onClick={toggleSidebarCollapsed}
                aria-label={t("menu")}
                aria-expanded={!sidebarCollapsed}
                className="absolute inset-0 hidden items-center justify-center rounded-2xl text-foreground opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100 xl:flex"
              >
                <PanelLeft size={20} />
              </button>
            </div>
          </div>
        </div>
        <nav
          aria-label={t("workspace")}
          className="flex-1 space-y-1 overflow-y-auto px-4 pt-2 pb-6"
        >
          {personalNav.map(([key, url, Icon]) => {
            const current = path === url;
            return (
              <SidebarTooltip key={key} label={t(key)} active={railed}>
                <Link
                  href={url}
                  aria-label={t(key)}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3.5 rounded-full py-3 text-[0.95rem] font-semibold transition-colors",
                    sidebarOpen ? "px-4" : "justify-center px-0",
                    "xl:justify-start xl:px-4",
                    current
                      ? "bg-accent text-primary"
                      : "text-foreground hover:bg-muted",
                    sidebarCollapsed && "xl:justify-center xl:px-0",
                  )}
                >
                  <Icon size={20} className="shrink-0" />
                  <span
                    className={cn(
                      sidebarOpen ? "inline" : "hidden",
                      "xl:inline",
                      sidebarCollapsed && "xl:hidden",
                    )}
                  >
                    {t(key)}
                  </span>
                </Link>
              </SidebarTooltip>
            );
          })}
        </nav>
        <div
          className={cn(
            "shrink-0 border-t border-border px-4 py-4",
            sidebarOpen ? "block" : "hidden",
            "xl:block",
            sidebarCollapsed && "xl:hidden",
          )}
        >
          <Preferences />
        </div>
        <div
          className={cn(
            "shrink-0 flex-col items-center gap-1 border-t border-border py-4",
            sidebarOpen ? "hidden" : "flex",
            "xl:hidden",
            sidebarCollapsed && "xl:flex",
          )}
        >
          <SidebarTooltip label={t("themeToggleLabel")} active={railed}>
            <ThemeToggle />
          </SidebarTooltip>
          <SidebarTooltip label={t("language")} active={railed}>
            <LanguageSwitcher iconOnly />
          </SidebarTooltip>
        </div>
      </aside>
      {/* The drawer overlays the page, so the content keeps whatever offset
       *  the resting sidebar takes — none at all below `lg`. */}
      <div className={cn("lg:ms-20 xl:ms-68", sidebarCollapsed && "xl:ms-20")}>
        <header className="sticky top-0 z-20 flex h-18 items-center lg:bg-white/88 dark:lg:bg-card gap-3 bg-card px-4  backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-card/72 sm:px-6">
          <Button
            size="icon"
            variant="outline"
            className="size-11 shrink-0 rounded-full xl:hidden"
            aria-label={t("menu")}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </Button>
          <div className="min-w-0 leading-tight">
            <p className="text-xs text-muted-foreground">{t("welcomeBack")}</p>
            <p className="truncate text-lg font-bold">
              {profile.data?.name ?? t("personal")}
            </p>
          </div>
          <div className="ms-auto flex shrink-0 items-center gap-2">
            <NotificationsMenu />
            <Button
              size="icon"
              variant="ghost"
              className="size-11 rounded-full"
              aria-label={t("logout")}
              onClick={() => setLogoutOpen(true)}
            >
              <LogOut size={19} />
            </Button>
          </div>
        </header>
        <main
          id="main"
          className="mx-auto max-w-330 p-5 sm:p-8 lg:px-12 xl:px-16"
        >
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="text-center">
          <div className="flex flex-col items-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-danger/10 text-danger">
              <LogOut size={28} />
            </span>
            <DialogTitle className="mt-5 text-xl font-bold">
              {t("logoutConfirmTitle")}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              {t("logoutConfirmNote")}
            </DialogDescription>
          </div>
          <div className="mt-7 flex gap-3">
            <Button
              variant="ghost"
              className="flex-1 rounded-full bg-muted hover:bg-muted/70"
              onClick={() => setLogoutOpen(false)}
              disabled={loggingOut}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="danger"
              className="flex-1 rounded-full"
              onClick={logout}
              disabled={loggingOut}
            >
              {t(loggingOut ? "loggingOut" : "logout")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
