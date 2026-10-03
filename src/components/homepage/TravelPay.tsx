"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Store } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { isDemo } from "@/lib/axios";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

/** Travel pitch beside a live-payment proof: the destination on one card,
 *  a completed merchant payment on the other. */
export function TravelPay() {
  const { t } = useLang();
  return (
    <section
      id="travel"
      data-stop="travel"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal
          from="start"
          className="relative isolate flex min-h-[24rem] flex-col justify-center overflow-hidden rounded-[2rem] p-10 sm:min-h-[28rem] sm:p-14"
        >
          <Image
            src="/assets/travel/vutan.jpg"
            alt={t("travelSectionImageAlt")}
            fill
            sizes="(max-width:1024px) 100vw, 60vw"
            className="anim-zoom -z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-r from-card via-card/75 to-transparent rtl:bg-linear-to-l dark:from-card dark:via-card/80"
          />
          <div className="relative max-w-md">
            <h2 className="whitespace-pre-line text-4xl font-bold leading-[1.1] tracking-[-.04em] sm:text-5xl">
              {t("travelSectionTitle")}
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
              {t("travelSectionDescription")}
            </p>
            <Button asChild className="mt-8 h-13 px-6">
              <Link href={isDemo ? routes.dashboard : routes.register}>
                {t("travelSectionCta")}
                <ArrowUpRight size={19} className="rtl:-scale-x-100" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal
          from="end"
          delay={REVEAL_STEP}
          className="relative min-h-[24rem] overflow-hidden rounded-[2rem] sm:min-h-[28rem]"
        >
          <Image
            src="/assets/travel/card.jpg"
            alt={t("travelSectionCardAlt")}
            fill
            sizes="(max-width:1024px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="icon-box bg-accent text-primary">
                <Store size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {t("travelSectionMerchant")}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {t("travelSectionMerchantLocation")}
                </p>
              </div>
              <div className="text-end">
                <p className="text-sm font-semibold">
                  {t("travelSectionAmount")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("travelSectionAmountNote")}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs font-semibold text-success">
              <span className="relative flex size-[15px] items-center justify-center">
                <span
                  aria-hidden
                  className="anim-pulse-ring absolute size-full rounded-full bg-success"
                />
                <CheckCircle2 size={15} className="relative" />
              </span>
              {t("travelSectionSuccess")}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
