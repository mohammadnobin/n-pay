"use client";
import { useEffect } from "react";
import { useNotificationsStore } from "@/store/notificationsStore";
import { dashboardNotifications } from "@/constants/dashboard";

/** Account notices with any locally-read state layered on top of the sample
 *  list. Before hydration this reflects only each notice's own baked-in
 *  `read` flag, so the server and the first client paint stay identical. */
export function useNotifications() {
  const readIds = useNotificationsStore((s) => s.readIds);
  const hydrated = useNotificationsStore((s) => s.hydrated);
  const hydrate = useNotificationsStore((s) => s.hydrate);
  const markRead = useNotificationsStore((s) => s.markRead);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const notifications = dashboardNotifications.map((n) => ({
    ...n,
    read: n.read || (hydrated && readIds.includes(n.id)),
  }));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markRead,
    markAllRead: () => markAllRead(notifications.map((n) => n.id)),
  };
}
