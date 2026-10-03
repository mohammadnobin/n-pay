"use client";
import { useLang } from "@/hooks/useLang";
export function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip-link" href="#main">
      {t("skip")}
    </a>
  );
}
