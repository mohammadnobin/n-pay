import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** A text input with a leading icon, for fields that are not secrets. */
export function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input className={cn("ps-11", className)} {...props} />
    </div>
  );
}
