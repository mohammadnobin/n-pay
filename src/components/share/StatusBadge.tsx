"use client";
import { useLang } from "@/hooks/useLang";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
export function StatusBadge({ status }: { status: string }) {
  const { t } = useLang();
  return (
    <Badge
      className={cn(
        ["completed", "verified", "active", "delivered"].includes(status)
          ? "bg-success/10 text-success"
          : ["failed", "rejected", "restricted"].includes(status)
            ? "bg-danger/10 text-danger"
            : "bg-warning/10 text-warning",
      )}
    >
      {t(status)}
    </Badge>
  );
}
