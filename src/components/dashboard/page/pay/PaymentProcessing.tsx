"use client";
import Link from "next/link";
import { Loader2, Check, Circle } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

/** Third entry is the one in flight; the rest frame what happens around it. */
const STAGES = [
  { key: "stageSubmitted", state: "done" },
  { key: "stageSigned", state: "done" },
  { key: "stageBroadcast", state: "active" },
  { key: "stageSettled", state: "waiting" },
] as const;

export function PaymentProcessing() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-lg py-10">
      <Card className="text-center">
        <span
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent text-primary"
          role="status"
          aria-label={t("processingTitle")}
        >
          <Loader2 size={30} className="animate-spin" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">{t("processingTitle")}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {t("processingNote")}
        </p>
        <ol className="mt-8 space-y-4 text-start">
          {STAGES.map(({ key, state }) => (
            <li key={key} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  state === "done"
                    ? "bg-success/15 text-success"
                    : state === "active"
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {state === "done" ? (
                  <Check size={14} strokeWidth={3} />
                ) : state === "active" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Circle size={9} />
                )}
              </span>
              <span
                className={cn(
                  "text-sm",
                  state === "waiting"
                    ? "text-muted-foreground"
                    : "font-medium text-foreground",
                )}
              >
                {t(key)}
              </span>
            </li>
          ))}
        </ol>
        <Button asChild className="mt-8 w-full rounded-full">
          <Link href={routes.paySuccess}>{t("viewResult")}</Link>
        </Button>
      </Card>
    </div>
  );
}
