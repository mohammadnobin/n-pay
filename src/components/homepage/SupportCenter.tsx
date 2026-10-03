"use client";
import { useLang } from "@/hooks/useLang";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";
export function SupportCenter() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20">
      <Reveal>
        <h1 className="text-5xl font-semibold">{t("supportTitle")}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{t("supportCopy")}</p>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {[
          ["helpPending", "helpPendingCopy"],
          ["helpDevice", "helpDeviceCopy"],
        ].map(([a, b], index) => (
          <Reveal key={a} delay={index * REVEAL_STEP} className="h-full">
            <article className="h-full rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold">{t(a)}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {t(b)}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
