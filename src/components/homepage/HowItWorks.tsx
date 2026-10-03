"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { isDemo } from "@/lib/axios";
import { Reveal } from "@/components/share/Reveal";
import { HowSteps } from "./HowSteps";

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section className="relative isolate mx-auto max-w-6xl overflow-x-hidden px-6 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 -z-10 h-96 w-208 -translate-x-1/2 rounded-full bg-primary/6 blur-3xl"
      />

      <Reveal>
        <h1 className="mb-7 max-w-2xl text-5xl font-semibold tracking-[-.03em]">
          {t("scanTitle")}
        </h1>
        <p className="mb-9 max-w-2xl text-lg text-muted-foreground">
          {t("payDescription")}
        </p>
        <Button asChild className="mb-16 h-12 px-6">
          <Link href={isDemo ? routes.dashboard : routes.register}>
            {t(isDemo ? "explorePreview" : "register")}
            <ArrowUpRight size={18} />
          </Link>
        </Button>
      </Reveal>

      <HowSteps />
    </section>
  );
}
