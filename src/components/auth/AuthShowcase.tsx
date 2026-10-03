"use client";
import Image from "next/image";
import { useLang } from "@/hooks/useLang";

/** Product artwork beside the auth forms: a cut-out of the screens a traveller
 *  actually uses — today's rate, the wallet balance, a merchant QR and the quote
 *  they approve. The artwork is decoration, so it is hidden from screen readers
 *  and only the caption below it is announced. The panel drops away below `lg`,
 *  where `AuthShell` gives the form the full width. */
export function AuthShowcase() {
  const { t } = useLang();
  return (
    <aside className="relative isolate hidden overflow-hidden rounded-[2rem] bg-linear-to-b from-accent to-background ring-1 ring-border/60 lg:sticky lg:top-6 lg:flex lg:h-[calc(100vh-3rem)] lg:flex-col lg:items-center lg:justify-center lg:gap-10 lg:px-10 lg:py-12">
      {/* Faint grid for texture, faded out before it reaches the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
      />
      {/* Glows framing the artwork above and below. Centred physically, so the
       *  panel looks the same in RTL. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-warning/10 blur-3xl"
      />

      {/* The cut-out has a transparent background, so `drop-shadow` follows the
       *  cards themselves and the collage lifts off the panel. */}
      <Image
        src="/assets/auth/authImage.png"
        alt=""
        aria-hidden
        width={592}
        height={421}
        priority
        className="relative w-full max-w-3xl shrink-0 drop-shadow-[0_26px_50px_rgba(22,22,28,0.14)] 2xl:max-w-4xl dark:drop-shadow-[0_26px_50px_rgba(0,0,0,0.55)]"
      />

      <div className="relative max-w-sm text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("authShowcaseTitle")}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {t("authShowcaseNote")}
        </p>
      </div>
    </aside>
  );
}
