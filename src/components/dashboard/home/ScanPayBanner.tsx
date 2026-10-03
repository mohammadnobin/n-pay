"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { useLang } from "@/hooks/useLang";
import { routes } from "@/constants/routes";

/** Quick-pay banner. The copy and the artwork each own a lane, so the phone
 *  mockup can bleed to the edge without ever drifting under the text — at any
 *  width the two only ever meet at the seam between them. */
export function ScanPayBanner() {
  const { t } = useLang();

  return (
    <section className="relative isolate min-h-55 w-full overflow-hidden rounded-2xl border border-border bg-card dark:bg-[#1c1c24]">
      <div className="relative z-20 flex min-h-55 items-center gap-4 px-6 py-5 sm:w-[62%] sm:gap-5 sm:px-8 lg:w-[56%]">
        {/* QR mark — the illustration is the icon, no tile behind it. */}
        <Image
          src="/assets/dashboard/scenner.jpg"
          alt=""
          aria-hidden
          width={652}
          height={703}
          priority
          className="h-28 w-auto shrink-0 object-contain mix-blend-multiply sm:h-36 lg:h-40 dark:mix-blend-screen dark:invert"
        />

        <div className="flex min-w-0 flex-col">
          <h2 className="text-lg font-bold leading-tight tracking-tight text-primary">
            {t("scanPayTitle")}
          </h2>

          <p className="mt-1 max-w-[460px] text-xs font-medium leading-4 text-muted-foreground">
            {t("scanPayNote")}
          </p>

          <Link
            href={routes.payScan}
            className="mt-3 inline-flex h-9 w-fit items-center gap-2 rounded-full border border-border bg-[#f6f6fa] px-5 text-xs font-semibold text-foreground transition-colors duration-200 hover:bg-muted dark:bg-[#1c1c24]"
          >
            {t("scanNow")}
            <ArrowRight
              size={14}
              strokeWidth={2.3}
              className="rtl:rotate-180"
            />
          </Link>
        </div>
      </div>

      {/* Artwork lane: the remaining width, never more. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 z-10 hidden w-[38%] items-center justify-end pe-6 sm:flex lg:w-[42%] lg:pe-10"
      >
        <Image
          src="/assets/dashboard/mokup.png"
          alt=""
          aria-hidden
          width={803}
          height={311}
          className="h-auto max-h-[78%] w-full object-contain object-right"
        />
      </div>
    </section>
  );
}
