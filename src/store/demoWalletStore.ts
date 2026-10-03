import { create } from "zustand";

/** Local preview state only. A reload restores the sample connection. */
export const useDemoWalletStore = create<{
  disconnectedIds: string[];
  disconnect: (id: string) => void;
}>((set) => ({
  disconnectedIds: [],
  disconnect: (id) =>
    set((state) => ({
      disconnectedIds: [...new Set([...state.disconnectedIds, id])],
    })),
}));
