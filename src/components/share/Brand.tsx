import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NomiPay"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground sm:size-10">
        <ArrowUpRight size={22} strokeWidth={2.8} className="sm:size-6" />
      </span>
      <span className="text-[1.4rem] font-bold tracking-[-0.9px] sm:text-[1.65rem]">
        nomi<span className="text-primary">pay</span>
      </span>
    </Link>
  );
}
