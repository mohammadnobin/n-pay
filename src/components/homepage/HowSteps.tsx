"use client";
import { Fragment } from "react";
import { ArrowRight, Landmark, ScanLine, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

const STEPS: [LucideIcon, string, string][] = [
  [Wallet, "connectTitle", "connectCopy"],
  [ScanLine, "scanTitle", "scanCopy"],
  [Landmark, "settleTitle", "settleCopy"],
];

export function HowSteps() {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-3">
      {STEPS.map(([Icon, title, copy], index) => (
        <Fragment key={title}>
          <Reveal delay={index * REVEAL_STEP} className="flex-1">
            <article className="relative h-full rounded-2xl border border-border bg-card p-6">
              <span className="absolute end-6 top-6 text-sm font-semibold text-muted-foreground">
                0{index + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon size={22} strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{t(title)}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {t(copy)}
              </p>
            </article>
          </Reveal>
          {index < STEPS.length - 1 && (
            <ArrowRight
              size={20}
              aria-hidden
              className="hidden shrink-0 self-center text-muted-foreground md:block rtl:rotate-180"
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
