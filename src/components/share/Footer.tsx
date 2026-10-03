"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { routes } from "@/constants/routes";

/** Dark chrome regardless of the page theme, so the footer reads as a fixed
 *  closing band rather than flipping with light/dark mode. Colours are the
 *  dark-theme primary/foreground pair, taken literally for that reason. */
const INK = {
  bg: "#0b0d0f",
  accent: "#3fa690",
  accentInk: "#0b0d0f",
};

export function Footer() {
  const { t } = useLang();
  return (
    <footer
      className="relative isolate overflow-hidden text-white"
      style={{ background: INK.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 start-1/2 -z-10 size-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: INK.accent, opacity: 0.18 }}
      />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href={routes.home}
              aria-label="NomiPay"
              className="inline-flex items-center gap-2.5"
            >
              <span
                className="flex size-10 items-center justify-center rounded-2xl"
                style={{ background: INK.accent, color: INK.accentInk }}
              >
                <ArrowUpRight size={24} strokeWidth={2.8} />
              </span>
              <span className="text-[1.65rem] font-bold tracking-[-0.9px] text-white">
                nomi<span style={{ color: INK.accent }}>pay</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/60">
              {t("footer")}
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium"
            aria-label={t("menu")}
          >
            <Link
              href={routes.howItWorks}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href={routes.safety}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t("security")}
            </Link>
            <Link
              href={routes.support}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t("support")}
            </Link>
            <Link
              href={routes.contact}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t("contact")}
            </Link>
            <Link
              href={routes.login}
              className="text-white/70 transition-colors hover:text-white"
            >
              {t("login")}
            </Link>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("rights", { year: 2026 })}</p>
          <p>{t("phaseNote")}</p>
        </div>
      </div>
    </footer>
  );
}
