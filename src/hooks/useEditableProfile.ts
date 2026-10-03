"use client";
import { useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";
import { dashboardProfile } from "@/constants/dashboard";
import type { DashboardProfile } from "@/types";

/** The signed-in traveler's profile, with any locally-saved name/email edits
 *  layered on top of the sample record. `hydrated` is false for the first
 *  paint, so a screen can hold its layout instead of flashing the unedited
 *  sample data at someone who has already made a change. */
export function useEditableProfile() {
  const overrides = useProfileStore((s) => s.overrides);
  const hydrated = useProfileStore((s) => s.hydrated);
  const hydrate = useProfileStore((s) => s.hydrate);
  const update = useProfileStore((s) => s.update);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  const profile: DashboardProfile = { ...dashboardProfile, ...overrides };
  return { profile, hydrated, update };
}
