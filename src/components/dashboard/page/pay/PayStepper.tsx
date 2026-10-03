"use client";
import { Check } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

export const PAY_STEPS = [
  "stepScan",
  "stepMerchant",
  "stepQuote",
  "stepConfirm",
] as const;

/** Progress rail shared by the four steps a payment moves through. */
export function PayStepper({ current }: { current: number }) {
  const { t } = useLang();
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {PAY_STEPS.map((key, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={key} className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                done
                  ? "bg-success/15 text-success"
                  : active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check size={14} strokeWidth={3} /> : i + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t(key)}
            </span>
            {i < PAY_STEPS.length - 1 && (
              <span className="hidden h-px w-8 bg-border sm:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
