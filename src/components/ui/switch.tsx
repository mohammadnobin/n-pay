import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
} & Omit<React.ComponentProps<"button">, "onClick" | "children">) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block size-4 translate-x-1 rounded-full bg-white shadow transition-transform rtl:-translate-x-1",
          checked && "translate-x-6 rtl:-translate-x-6",
        )}
      />
    </button>
  );
}
