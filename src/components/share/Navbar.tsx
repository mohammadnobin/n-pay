"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ToggleLeft, ToggleRight, X } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

const links = [
  [routes.howItWorks, "howItWorks"],
  [routes.safety, "security"],
  [routes.support, "support"],
  [routes.contact, "contact"],
] as const;

/** Hides on scroll down, reappears on scroll up, and reports whether the page
 *  is still at rest at the top. Always shown near the top of the page so it
 *  doesn't flicker on tiny scroll jitter. */
function useHeaderState() {
  const [hidden, setHidden] = useState(false);
  // Starts true so the first paint matches an unscrolled page and the header
  // never flashes its chrome before the listener runs.
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setAtTop(y <= 12);
      if (y < 80) setHidden(false);
      else if (y > lastY.current) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, atTop };
}

/** Small-screen menu. Closes on Escape, on navigation, and as soon as the
 *  viewport is wide enough for the inline nav, so the two never disagree. */
function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  // Closing on navigation is a render-time adjustment, not an effect: the
  // panel must never paint over the page it just left.
  const [shownFor, setShownFor] = useState(path);
  if (shownFor !== path) {
    setShownFor(path);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    const wide = window.matchMedia("(min-width: 1024px)");
    function onWide() {
      if (wide.matches) setOpen(false);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return { open, setOpen, path };
}

// TEMPORARY. Flips the header's call to action between "Sign in" and
// "Dashboard" so the signed-in header can be previewed without an account.
// Remove this, its button below, and the `previewAuthToggle` label once real
// session state reaches the header.
const PREVIEW_AUTH_KEY = "nomipay_preview_signed_in";

function usePreviewSignedIn() {
  // Starts signed out so server and client first render agree; the stored
  // choice is applied after mount, the way the language switcher does it.
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let saved = false;
    try {
      saved = window.localStorage.getItem(PREVIEW_AUTH_KEY) === "true";
    } catch {
      // Ignore storage errors.
    }
    startTransition(() => setSignedIn(saved));
  }, []);

  function toggle() {
    setSignedIn((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(PREVIEW_AUTH_KEY, String(next));
      } catch {
        // Ignore storage errors.
      }
      return next;
    });
  }

  return { signedIn, toggle };
}

export function Navbar() {
  const { t } = useLang();
  const { hidden, atTop } = useHeaderState();
  const { open, setOpen, path } = useMobileMenu();
  const { signedIn, toggle } = usePreviewSignedIn();

  function isActive(href: string) {
    return path === href || path.startsWith(`${href}/`);
  }

  const ctaHref = signedIn ? routes.dashboard : routes.login;
  const ctaLabel = t(signedIn ? "dashboard" : "login");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition duration-300",
        // At rest the header is just the page — no seam cutting across the
        // banner. Its chrome fades in once content passes underneath it. With
        // the menu open the bar goes fully opaque, so the bar and the panel
        // below it read as one surface instead of two shades of white.
        open
          ? "border-border/60 bg-card"
          : atTop
            ? "border-transparent bg-transparent"
            : "border-border/60 bg-card/95 shadow-header backdrop-blur",
        // An open menu must not scroll itself away.
        hidden && !open && "-translate-y-full",
      )}
    >
      {/* Tapping the page behind the open panel closes it. It starts at the
       *  bar's bottom edge — `inset-0` would tint the bar itself, since the
       *  header paints its own background underneath its children. */}
      {open && (
        <button
          type="button"
          aria-label={t("close")}
          onClick={() => setOpen(false)}
          className="absolute inset-x-0 top-full h-dvh bg-foreground/20 lg:hidden"
        />
      )}

      <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:h-20 lg:gap-8">
        <Brand className="shrink-0" />

        <nav
          className="hidden items-center gap-1 text-sm font-semibold lg:flex"
          aria-label={t("primaryNav")}
        >
          {links.map(([href, key]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 transition-colors hover:text-primary",
                isActive(href) ? "text-primary" : "text-foreground",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* The language pill needs room, so below `lg` it moves into the
           *  panel and only the theme switch stays on the bar. */}
          <div className="hidden lg:block">
            <LanguageSwitcher className="w-auto" />
          </div>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden rounded-full lg:inline-flex"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
          {/* TEMPORARY — see `usePreviewSignedIn` above. */}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={signedIn}
            title={t("previewAuthToggle")}
            aria-label={t("previewAuthToggle")}
            className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary lg:inline-flex"
          >
            {signedIn ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full lg:hidden"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Collapsible panel. Absolute, so opening it drops the menu over the
       *  page instead of growing the header and pushing the hero down. The
       *  grid-rows trick animates to whatever height the content needs, and
       *  `invisible` keeps closed links out of the tab order. */}
      <div
        id="site-menu"
        className={cn(
          "absolute inset-x-0 top-full z-10 grid overflow-hidden border-border/60 bg-card transition-all duration-300 lg:hidden",
          open
            ? "visible grid-rows-[1fr] border-b shadow-header opacity-100"
            : "invisible grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <nav
            className="flex flex-col gap-1 px-4 pb-4 pt-3 sm:px-6"
            aria-label={t("primaryNav")}
          >
            {links.map(([href, key]) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                  isActive(href)
                    ? "bg-accent text-primary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-t border-border/60 px-4 py-4 sm:px-6">
            <LanguageSwitcher className="w-full min-w-0 flex-1" />
            {/* TEMPORARY — see `usePreviewSignedIn` above. */}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={signedIn}
              title={t("previewAuthToggle")}
              aria-label={t("previewAuthToggle")}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {signedIn ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            </button>
          </div>
          <div className="px-4 pb-5 sm:px-6">
            <Button asChild className="w-full rounded-full">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
