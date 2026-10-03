"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Fingerprint,
  KeyRound,
  Plus,
  ReceiptText,
  ScanLine,
} from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

/** Line marks on a flat fill read thin, so each one sits on its own soft
 *  halo — enough to give the tile a centre of gravity, not enough to notice. */
function Mark({
  children,
  beat = 0,
}: {
  children: React.ReactNode;
  /** Offsets this halo's breathing so the tiles never pulse in unison. */
  beat?: number;
}) {
  return (
    <span className="relative flex items-center justify-center text-primary">
      <span
        aria-hidden
        style={{ animationDelay: `${beat}ms` }}
        className="anim-halo absolute size-full scale-[1.8] rounded-full bg-primary/10 blur-2xl"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

/** One mosaic tile: a thin line mark over a single lowercase word. */
function Tile({
  mark,
  label,
  className,
  hero,
  beat,
}: {
  mark: React.ReactNode;
  label: string;
  className?: string;
  /** The focal tile: tinted, lifted, and labelled as a heading. */
  hero?: boolean;
  /** Passed to the mark so no two tiles pulse together. */
  beat?: number;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-2xl px-4 py-9 text-center ring-1 ring-border/60 sm:p-4",
        hero
          ? "bg-linear-to-b from-accent to-accent/45 shadow-card"
          : "bg-linear-to-b from-muted to-muted/50",
        className,
      )}
    >
      <Mark beat={beat}>{mark}</Mark>
      <p
        className={cn(
          "font-medium",
          hero ? "text-2xl text-foreground" : "text-sm text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}

const STROKE = 1.25;

/** Feature mosaic: the four steps of a NomiPay payment staggered around
 *  `scan`, the way a bento grid reads — one thing first, the rest
 *  supporting it. Columns stack on small screens, so the stagger and the
 *  fixed tile ratios only apply from `sm` up. */
export function Features() {
  const { t } = useLang();
  // The accent phrase is a separate string so translators can move it inside
  // the sentence; a dictionary without the placeholder still renders cleanly.
  const [lead, tail] = t("featuresTitle").split("{accent}");
  return (
    <section
      id="features"
      data-stop="features"
      className="relative isolate mx-auto max-w-7xl overflow-x-hidden px-6 py-20"
    >
      <div
        aria-hidden
        className="anim-drift pointer-events-none absolute left-1/2 top-40 -z-10 h-120 w-208 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl"
      />

      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-4xl font-bold tracking-[-.045em] sm:text-5xl">
          {lead}
          {tail !== undefined && (
            <>
              <span className="text-primary">{t("featuresTitleAccent")}</span>
              {tail}
            </>
          )}
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-lg leading-8 text-muted-foreground">
          {t("featuresNote")}
        </p>
      </Reveal>

      <Reveal
        delay={REVEAL_STEP}
        className="mx-auto mt-14 grid max-w-3xl gap-3 sm:grid-cols-[1fr_1.6fr_1fr] sm:items-start"
      >
        <div className="flex flex-col gap-3 sm:mt-12">
          <Tile
            mark={<Fingerprint size={58} strokeWidth={STROKE} />}
            label={t("featureSecurity")}
            beat={0}
            className="sm:aspect-[5/4.8]"
          />
          <Tile
            mark={<ReceiptText size={46} strokeWidth={STROKE} />}
            label={t("featureQuotes")}
            beat={900}
            className="sm:ms-auto sm:aspect-[5/3.9] sm:w-5/6"
          />
        </div>

        <div className="flex flex-col gap-3">
          <Tile
            mark={<ScanLine size={92} strokeWidth={STROKE} />}
            label={t("featureScan")}
            beat={1800}
            hero
            className="sm:aspect-[5/4.2]"
          />
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/60"
            >
              <Plus size={14} />
            </span>
            <p className="flex-1 rounded-2xl bg-linear-to-b from-muted to-muted/50 p-4 text-xs leading-5 text-muted-foreground ring-1 ring-border/60">
              {t("featuresBlurb")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:-mt-8">
          <div className="relative sm:w-5/6">
            <Tile
              mark={<BadgeCheck size={46} strokeWidth={STROKE} />}
              label={t("featureVerified")}
              beat={2700}
              className="sm:aspect-[5/4.8]"
            />
            <Link
              href={routes.howItWorks}
              aria-label={t("howItWorks")}
              className="absolute -end-3 -top-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_-10px_var(--primary)] ring-4 ring-card transition-transform hover:scale-110 focus-visible:scale-110"
            >
              <ArrowUpRight size={18} className="rtl:-scale-x-100" />
            </Link>
          </div>
          <Tile
            mark={<KeyRound size={58} strokeWidth={STROKE} />}
            label={t("featureCustody")}
            beat={3600}
            className="sm:aspect-[5/4.8]"
          />
        </div>
      </Reveal>
    </section>
  );
}
