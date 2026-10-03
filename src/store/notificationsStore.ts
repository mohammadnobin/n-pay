import { create } from "zustand";

/** Which notifications the traveler has already read on this device. There is
 *  no backend for this yet, so a local record stands in for a real save, the
 *  same way `walletStore` and `securityStore` do. */
const STORAGE_KEY = "nomipay_notifications_read";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function persist(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // A device that refuses storage still gets the change for this visit.
  }
}

export const useNotificationsStore = create<{
  readIds: string[];
  hydrated: boolean;
  hydrate: () => void;
  markRead: (id: string) => void;
  markAllRead: (ids: string[]) => void;
}>((set, get) => ({
  readIds: [],
  hydrated: false,
  hydrate: () => set({ readIds: read(), hydrated: true }),
  markRead: (id) => {
    const next = Array.from(new Set([...get().readIds, id]));
    persist(next);
    set({ readIds: next });
  },
  markAllRead: (ids) => {
    const next = Array.from(new Set([...get().readIds, ...ids]));
    persist(next);
    set({ readIds: next });
  },
}));
