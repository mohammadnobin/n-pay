"use client";
import Image from "next/image";
import { Apple, Play, QrCode } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import { Reveal, REVEAL_STEP } from "@/components/share/Reveal";

const STORE_LINKS = {
  appStore: "https://www.apple.com/app-store/",
  googlePlay: "https://play.google.com/store",
};

function StoreButton({
  href,
  icon,
  lead,
  name,
  solid,
}: {
  href: string;
  icon: React.ReactNode;
  lead: string;
  name: string;
  /** The lead store button: filled white so it carries the click. */
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center gap-3 rounded-full px-5 py-3 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        solid
          ? "bg-white text-[var(--balance-panel)]"
          : "bg-white/10 text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm hover:bg-white/15",
      )}
    >
      <span aria-hidden>{icon}</span>
      <span className="text-start leading-tight">
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.12em] opacity-70">
          {lead}
        </span>
        <span className="block text-base font-bold">{name}</span>
      </span>
    </a>
  );
}

/** Store-first call to action on a dark panel — the one place the homepage
 *  goes full contrast, so the two store buttons are the only thing competing
 *  for attention. The mockup runs off the panel's bottom edge on purpose. */
export function DownloadApp() {
  const { t } = useLang();
  // Accent phrase kept separate so translators can place it in the sentence.
  const [lead, tail] = t("downloadTitle").split("{accent}");
  return (
    <section id="app" data-stop="app" className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-[var(--balance-panel)] text-white shadow-card">
        <div
          aria-hidden
          className="anim-drift pointer-events-none absolute -end-24 -top-32 -z-10 size-120 rounded-full bg-[var(--panel-accent)] opacity-20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -start-24 -z-10 size-96 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(circle,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_55%_at_50%_0%,#000,transparent_70%)]"
        />

        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-end lg:gap-8">
          <Reveal
            from="start"
            className="px-7 pb-12 pt-12 sm:px-12 sm:pt-16 lg:pb-16 lg:pe-0"
          >
            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-5xl lg:text-[3.25rem]">
              {lead}
              {tail !== undefined && (
                <>
                  <span className="text-[var(--panel-accent)]">
                    {t("downloadTitleAccent")}
                  </span>
                  {tail}
                </>
              )}
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
              {t("downloadNote")}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <StoreButton
                href={STORE_LINKS.appStore}
                icon={<Apple size={26} className="fill-current" />}
                lead={t("downloadAppStoreLead")}
                name={t("downloadAppStore")}
                solid
              />
              <StoreButton
                href={STORE_LINKS.googlePlay}
                icon={<Play size={24} className="fill-current" />}
                lead={t("downloadPlayLead")}
                name={t("downloadPlay")}
              />
            </div>

            <p className="mt-6 text-xs text-white/70">
              {t("downloadAvailability")}
            </p>
          </Reveal>

          <Reveal
            delay={REVEAL_STEP}
            className="flex justify-center lg:justify-end lg:pe-12"
          >
            <div className="relative w-full max-w-68 sm:max-w-76 lg:max-w-84">
              {/* Concentric rings put the device at the centre of a target
               *  without adding another block of colour. Rings that run off
               *  the panel edge are intentional. */}
              <div
                aria-hidden
                className="anim-orbit pointer-events-none absolute bottom-0 left-1/2 -z-10 size-112 -translate-x-1/2 translate-y-1/3 rounded-full ring-1 ring-white/10"
              >
                <span className="absolute start-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--panel-accent)]" />
                <div className="absolute inset-[14%] rounded-full ring-1 ring-white/10" />
                <div className="absolute inset-[28%] rounded-full ring-1 ring-white/10" />
              </div>

              {/* Device and its chip move together so both bleed past the
               *  panel's bottom edge by the same amount. */}
              <div className="anim-bob relative translate-y-8 lg:translate-y-12">
                <Image
                  src="/assets/app/app-mokup.png"
                  alt={t("downloadAppScreenAlt")}
                  width={382}
                  height={652}
                  sizes="(max-width:640px) 17rem, (max-width:1024px) 19rem, 21rem"
                  className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                />

                <div className="absolute bottom-16 start-2 flex items-center gap-3 rounded-2xl bg-white/10 p-3 pe-4 ring-1 ring-inset ring-white/15 backdrop-blur-md sm:-start-4 sm:bottom-20 lg:-start-10">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <QrCode size={18} aria-hidden />
                  </span>
                  <span className="text-start leading-tight">
                    <span className="block text-sm font-semibold">
                      {t("scanPayTitle")}
                    </span>
                    <span className="block text-[0.7rem] text-white/70">
                      {t("downloadChipNote")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
