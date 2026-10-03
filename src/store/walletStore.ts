import { create } from "zustand";

/** Which provider the traveler linked, kept on the device. An account holds one
 *  wallet at a time, so a new choice replaces the old one. */
const STORAGE_KEY = "nomipay_wallet";

function read(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export const useWalletStore = create<{
  provider: string | null;
  /** False until the saved choice has been read, so the first paint can stay
   *  identical on the server and the client. */
  hydrated: boolean;
  hydrate: () => void;
  connect: (provider: string) => void;
  disconnect: () => void;
}>((set) => ({
  provider: null,
  hydrated: false,
  hydrate: () => set({ provider: read(), hydrated: true }),
  connect: (provider) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, provider);
    } catch {
      // A device that refuses storage still gets the connection for this visit.
    }
    set({ provider });
  },
  disconnect: () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
    set({ provider: null });
  },
}));
