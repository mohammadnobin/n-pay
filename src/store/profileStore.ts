import { create } from "zustand";
import type { DashboardProfile } from "@/types";

/** Edits to the signed-in traveler's profile, kept on the device. There is no
 *  backend endpoint for these fields yet, so a local override layered over
 *  `dashboardProfile` stands in for a real save. `kycStatus`/`kycVerifiedOn`
 *  double as a demo switch for previewing the identity-status card. */
const STORAGE_KEY = "nomipay_profile_overrides";

export type ProfileOverrides = Partial<
  Pick<
    DashboardProfile,
    | "username"
    | "email"
    | "kycStatus"
    | "kycVerifiedOn"
    | "phone"
    | "secondaryPhones"
    | "avatarUrl"
  >
>;

function read(): ProfileOverrides {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProfileOverrides) : {};
  } catch {
    return {};
  }
}

export const useProfileStore = create<{
  overrides: ProfileOverrides;
  /** False until the saved overrides have been read, so the first paint can
   *  stay identical on the server and the client. */
  hydrated: boolean;
  hydrate: () => void;
  update: (values: ProfileOverrides) => void;
}>((set, get) => ({
  overrides: {},
  hydrated: false,
  hydrate: () => set({ overrides: read(), hydrated: true }),
  update: (values) => {
    const next = { ...get().overrides, ...values };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // A device that refuses storage still gets the edit for this visit.
    }
    set({ overrides: next });
  },
}));
