"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { routes } from "@/constants/routes";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

export function Faq() {
  const { t } = useLang();
  return (
    <section
      id="faq"
      data-stop="faq"
      className="relative isolate mx-auto max-w-3xl px-6 py-20"
    >
      <div
        aria-hidden
        className="anim-drift pointer-events-none absolute left-1/2 top-10 -z-10 size-96 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl"
      />

      <Reveal className="text-center">
        <h2 className="text-4xl font-bold tracking-[-.03em] sm:text-5xl">
          {t("faqTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          {t("faqNote")}{" "}
          <Link
            href={routes.support}
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            {t("faqNoteLink")}
          </Link>
        </p>
      </Reveal>

      <Reveal delay={REVEAL_STEP} className="mt-14">
        {[1, 2, 3, 4].map((n) => (
          <details key={n} className="group border-b border-border py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
              {t(`faq${n}`)}
              <ChevronDown
                size={18}
                className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              {t(`faq${n}a`)}
            </p>
          </details>
        ))}
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-5">
        <div className="flex items-center gap-3">
          <span className="icon-box bg-foreground text-background">
            <MessageCircle size={19} />
          </span>
          <div>
            <p className="font-semibold">{t("faqCtaTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("faqCtaNote")}</p>
          </div>
        </div>
        <Link
          href={routes.support}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85"
        >
          {t("faqCtaButton")}
          <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      </Reveal>
    </section>
  );
}
