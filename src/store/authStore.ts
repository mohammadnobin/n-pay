import { create } from "zustand";
export const useAuthStore = create<{
  challengeId: string | null;
  phone: string;
  expiresAt: number;
  setChallenge: (id: string, phone: string, seconds: number) => void;
  clear: () => void;
}>((set) => ({
  challengeId: null,
  phone: "",
  expiresAt: 0,
  setChallenge: (challengeId, phone, seconds) =>
    set({ challengeId, phone, expiresAt: Date.now() + seconds * 1000 }),
  clear: () => set({ challengeId: null, phone: "", expiresAt: 0 }),
}));
