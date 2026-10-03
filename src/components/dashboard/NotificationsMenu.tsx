"use client";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  Bell,
  BadgeCheck,
  ShieldCheck,
  ArrowLeftRight,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppNotification } from "@/types";

const ICONS: Record<AppNotification["category"], LucideIcon> = {
  kyc: BadgeCheck,
  security: ShieldCheck,
  payment: ArrowLeftRight,
  wallet: Wallet,
};

const TONES: Record<AppNotification["category"], string> = {
  kyc: "bg-success/10 text-success",
  security: "bg-accent text-primary",
  payment: "bg-blue-500/10 text-blue-500",
  wallet: "bg-orange-500/10 text-orange-500",
};

export function NotificationsMenu() {
  const { t, lang: locale } = useLang();
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications();

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative size-11 rounded-full"
          aria-label={t("notificationsTitle")}
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span className="absolute end-2 top-2 size-2.5 rounded-full bg-danger ring-2 ring-card" />
          )}
        </Button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={10}
          collisionPadding={12}
          className="z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-card text-foreground shadow-xl shadow-black/10 dark:shadow-black/40"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5">
            <p className="font-bold">{t("notificationsTitle")}</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {t("markAllRead")}
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              {t("noNotifications")}
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {notifications.map((n) => {
                const Icon = ICONS[n.category];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => markRead(n.id)}
                      className={cn(
                        "flex w-full items-start gap-3 border-b border-border px-4 py-3.5 text-start transition-colors last:border-b-0 hover:bg-muted/40",
                        !n.read && "bg-accent/25",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full",
                          TONES[n.category],
                        )}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold">
                            {t(n.titleKey)}
                          </span>
                          {!n.read && (
                            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {t(n.noteKey)}
                        </span>
                        <span
                          className="mt-1 block text-[11px] text-muted-foreground"
                          dir="ltr"
                        >
                          {new Intl.DateTimeFormat(locale, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(n.createdAt))}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
