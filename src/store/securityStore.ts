import { create } from "zustand";

/** Security toggles a traveler has made on this device. There is no backend
 *  for these yet, so a local record stands in for a real save, the same way
 *  `walletStore` and `profileStore` do. */
const STORAGE_KEY = "nomipay_security";

type Persisted = {
  pinSet: boolean;
  twoFactorEnabled: boolean;
  revokedSessionIds: string[];
};

const DEFAULTS: Persisted = {
  pinSet: false,
  twoFactorEnabled: false,
  revokedSessionIds: [],
};

function read(): Persisted {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function persist(next: Persisted) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // A device that refuses storage still gets the change for this visit.
  }
}

export const useSecurityStore = create<
  Persisted & {
    hydrated: boolean;
    hydrate: () => void;
    setPinSet: (value: boolean) => void;
    setTwoFactorEnabled: (value: boolean) => void;
    revokeSession: (id: string) => void;
    revokeOtherSessions: (currentId: string, allIds: string[]) => void;
  }
>((set, get) => ({
  ...DEFAULTS,
  hydrated: false,
  hydrate: () => set({ ...read(), hydrated: true }),
  setPinSet: (value) => {
    const { twoFactorEnabled, revokedSessionIds } = get();
    persist({ pinSet: value, twoFactorEnabled, revokedSessionIds });
    set({ pinSet: value });
  },
  setTwoFactorEnabled: (value) => {
    const { pinSet, revokedSessionIds } = get();
    persist({ pinSet, twoFactorEnabled: value, revokedSessionIds });
    set({ twoFactorEnabled: value });
  },
  revokeSession: (id) => {
    const { pinSet, twoFactorEnabled, revokedSessionIds } = get();
    const next = Array.from(new Set([...revokedSessionIds, id]));
    persist({ pinSet, twoFactorEnabled, revokedSessionIds: next });
    set({ revokedSessionIds: next });
  },
  revokeOtherSessions: (currentId, allIds) => {
    const { pinSet, twoFactorEnabled, revokedSessionIds } = get();
    const next = Array.from(
      new Set([
        ...revokedSessionIds,
        ...allIds.filter((id) => id !== currentId),
      ]),
    );
    persist({ pinSet, twoFactorEnabled, revokedSessionIds: next });
    set({ revokedSessionIds: next });
  },
}));
