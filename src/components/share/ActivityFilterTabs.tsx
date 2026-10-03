"use client";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import type { TransactionStatus } from "@/types";

export type ActivityFilter = "all" | TransactionStatus;

const FILTERS: { value: ActivityFilter; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "completed", labelKey: "completed" },
  { value: "pending", labelKey: "pending" },
  { value: "failed", labelKey: "failed" },
];

/** Scopes a payment list by status. Controlled by the parent so the same
 *  filter can drive the transaction table underneath it. `className` lets a
 *  caller drop the default bottom margin when the row sits inline. */
export function ActivityFilterTabs({
  value,
  onChange,
  className,
}: {
  value: ActivityFilter;
  onChange: (value: ActivityFilter) => void;
  className?: string;
}) {
  const { t } = useLang();
  return (
    <div className={cn("mb-4 flex flex-wrap gap-2", className)} role="tablist">
      {FILTERS.map((filter) => {
        const selected = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter.value)}
            className={cn(
              "rounded-full! border! px-4! py-2! text-[13px]! font-bold! transition!",
              selected
                ? "border-transparent!border bg-accent! text-primary!"
                : "border-[#e5e5ea]! bg-white! text-[#687076]! hover:bg-muted! dark:border-[#33333f]! dark:bg-[#1c1c24]! dark:text-white/70!",
            )}
          >
            {t(filter.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
