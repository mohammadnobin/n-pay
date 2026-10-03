"use client";
import Link from "next/link";
import { ArrowRight, CircleDollarSign, ScanLine, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

const STEPS: [LucideIcon, string][] = [
  [ScanLine, "processStep1"],
  [CircleDollarSign, "processStep2"],
  [Wallet, "processStep3"],
];

/** The payment in three lifted cards, with the pitch held in a column beside
 *  them. The dashed rule behind the row shows only in the gaps, so the order
 *  reads as a flow without arrows crowding the cards. */
export function Process() {
  const { t } = useLang();
  // Accent phrase kept separate so translators can place it in the sentence.
  const [lead, tail] = t("processTitle").split("{accent}");
  return (
    <section
      id="process"
      data-stop="process"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)] lg:gap-14">
        <Reveal from="start">
          <h2 className="text-4xl font-bold tracking-[-.045em] sm:text-5xl">
            {lead}
            {tail !== undefined && (
              <>
                <span className="text-primary">{t("processTitleAccent")}</span>
                {tail}
              </>
            )}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
            {t("processNote")}
          </p>
          <Button variant="outline" asChild className="mt-8 h-13 rounded-full">
            <Link href={routes.howItWorks}>
              {t("learnMore")}
              <ArrowRight size={16} className="rtl:rotate-180" />
            </Link>
          </Button>
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="anim-dash pointer-events-none absolute inset-x-0 top-12.5 hidden h-px md:block"
          />

          <div className="relative grid gap-4 md:grid-cols-3">
            {STEPS.map(([Icon, key], index) => (
              <Reveal key={key} delay={index * REVEAL_STEP} className="h-full">
                <article className="h-full rounded-2xl bg-card p-6 shadow-card ring-1 ring-border/60">
                  <div className="flex items-center justify-between gap-3">
                    <span className="icon-box bg-accent text-primary">
                      <Icon size={21} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="eyebrow text-[0.7rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-bold">{t(`${key}Title`)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {t(`${key}Note`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
