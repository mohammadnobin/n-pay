"use client";
import { useLang } from "@/hooks/useLang";
import { HowSteps } from "./HowSteps";
export function Services() {
  const { t } = useLang();
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">{t("scanTitle")}</h2>
          </div>
          <span className="text-sm text-muted-foreground">{t("phaseOne")}</span>
        </div>
        <HowSteps />
      </div>
    </section>
  );
}
