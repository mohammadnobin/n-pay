import { create } from "zustand";
export const useUIStore = create<{
  /** Mobile drawer. */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  /** Desktop rail, toggled by the header menu button. */
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
}>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  sidebarCollapsed: false,
  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
