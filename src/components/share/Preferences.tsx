"use client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

/** Language picker + light/dark switch, reused in every shell. */
export function Preferences() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex min-w-0 flex-1 items-center">
        <LanguageSwitcher />
      </div>
      <ThemeToggle />
    </div>
  );
}
