"use client";
import { useEffect } from "react";
import { useSecurityStore } from "@/store/securityStore";

/** Local security toggles (PIN, 2FA, revoked sessions). `hydrated` is false
 *  for the first paint, so a screen can hold its layout instead of flashing
 *  the unset state at someone who has already made a change. */
export function useSecurity() {
  const pinSet = useSecurityStore((s) => s.pinSet);
  const twoFactorEnabled = useSecurityStore((s) => s.twoFactorEnabled);
  const revokedSessionIds = useSecurityStore((s) => s.revokedSessionIds);
  const hydrated = useSecurityStore((s) => s.hydrated);
  const hydrate = useSecurityStore((s) => s.hydrate);
  const setPinSet = useSecurityStore((s) => s.setPinSet);
  const setTwoFactorEnabled = useSecurityStore((s) => s.setTwoFactorEnabled);
  const revokeSession = useSecurityStore((s) => s.revokeSession);
  const revokeOtherSessions = useSecurityStore((s) => s.revokeOtherSessions);

  useEffect(() => {
    if (!hydrated) hydrate();
  }, [hydrated, hydrate]);

  return {
    pinSet,
    twoFactorEnabled,
    revokedSessionIds,
    hydrated,
    setPinSet,
    setTwoFactorEnabled,
    revokeSession,
    revokeOtherSessions,
  };
}
