"use client";
import { useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useLang } from "@/hooks/useLang";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** A password/PIN input with a leading icon and a show/hide toggle. */
export function SecureInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: LucideIcon }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={cn("ps-11 pe-11", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={t(visible ? "hidePassword" : "showPassword")}
        className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
