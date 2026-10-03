"use client";
import { Fingerprint, Lock, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

const POINTS = [
  [Wallet, "nonCustodial", "faq1a"],
  [Lock, "privacyTitle", "privacyCopy"],
  [Smartphone, "sessionSecurity", "sessionNote"],
  [Fingerprint, "biometricTitle", "biometricNote"],
] as const;

export function SecurityOverview() {
  const { t } = useLang();
  return (
    <section className="relative isolate mx-auto max-w-5xl overflow-x-hidden px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-96 w-208 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl"
      />

      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-1.5 text-xs font-semibold text-primary">
          <ShieldCheck size={14} />
          {t("security")}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-[-.03em] sm:text-5xl">
          {t("securityTitle")}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          {t("securityIntro")}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {POINTS.map(([Icon, title, copy], index) => (
          <Reveal key={title} delay={index * REVEAL_STEP}>
            <article className="h-full rounded-2xl border border-border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{t(title)}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t(copy)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
