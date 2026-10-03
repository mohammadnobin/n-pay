"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, MapPin } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { isDemo } from "@/lib/axios";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";
export function Banner() {
  const { t } = useLang();
  const title = t("publicTitle");
  const [beforeAccent1, restAfterAccent1] = title.split("{accent1}");
  const [betweenAccents, afterAccent2] = restAfterAccent1.split("{accent2}");
  return (
    <section
      id="intro"
      data-stop="intro"
      className="relative isolate mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-16"
    >
      <div
        aria-hidden
        className="anim-drift pointer-events-none absolute -start-24 -top-24 -z-10 size-120 rounded-full bg-primary/8 blur-3xl"
      />
      <Reveal from="start" className="lg:-translate-y-12.5">
        <h1 className="whitespace-pre-line text-5xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-6xl xl:text-7xl">
          {beforeAccent1}
          <span className="text-primary">{t("publicTitleAccent1")}</span>
          {betweenAccents}
          <span className="text-primary">{t("publicTitleAccent2")}</span>
          {afterAccent2}
        </h1>
        <p className="mt-7 max-w-lg text-lg leading-8 text-muted-foreground">
          {t("publicDescription")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-13 rounded-full px-6">
            <Link href={isDemo ? routes.dashboard : routes.register}>
              {t(isDemo ? "explorePreview" : "register")}
              <ArrowUpRight size={19} />
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-13 rounded-full">
            <Link href={routes.howItWorks}>{t("howItWorks")}</Link>
          </Button>
        </div>
        <p className="mt-7 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={16} className="text-success" />
          {t("nonCustodialNote")}
        </p>
        {isDemo && (
          <p className="mt-4 text-xs text-muted-foreground">
            {t("previewNote")}
          </p>
        )}
      </Reveal>
      <Reveal from="end" delay={REVEAL_STEP} className="relative">
        <div
          aria-hidden
          className="anim-halo absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl"
        />
        <div className="relative aspect-[5/5.4] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-border/60">
          <Image
            src="/bhutan.jpg"
            alt={t("bhutanAlt")}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover object-[48%_50%]"
          />
          <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-xl bg-card p-4 shadow-card">
            <span className="icon-box bg-accent text-primary">
              <MapPin size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold">{t("phaseOne")}</p>
              <p className="text-xs text-muted-foreground">
                {t("nonCustodial")}
              </p>
            </div>
            <ArrowUpRight size={19} className="ms-auto text-primary" />
          </div>
        </div>
        <a
          href="https://unsplash.com/photos/Xf0h0cTbNwU"
          target="_blank"
          rel="noreferrer"
          className="mt-2 block text-end text-xs text-muted-foreground"
        >
          {t("photoCredit")}
        </a>
      </Reveal>
    </section>
  );
}
