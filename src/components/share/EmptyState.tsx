import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyState({
  icon: Icon,
  title,
  note,
}: {
  icon: LucideIcon;
  title: string;
  note: string;
}) {
  return (
    <Card className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
      <span className="icon-box text-muted-foreground">
        <Icon size={22} />
      </span>
      <p className="section-title">{title}</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {note}
      </p>
    </Card>
  );
}
