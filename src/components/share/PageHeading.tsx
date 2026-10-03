import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Eyebrow + title + supporting copy, used at the top of every dashboard page. */
export function PageHeading({
  eyebrow,
  eyebrowClassName,
  title,
  note,
}: {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  note?: string;
}) {
  return (
    <header>
      {eyebrow && (
        <p className={cn("eyebrow", eyebrowClassName ?? "text-primary")}>
          {eyebrow}
        </p>
      )}
      <h1 className={cn("page-title", eyebrow && "mt-2")}>{title}</h1>
      {note && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {note}
        </p>
      )}
    </header>
  );
}

/** Section title with an optional "See all" link, sitting above a card. */
export function SectionHeading({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      {href && linkLabel && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          {linkLabel}
          <ArrowRight size={15} className="rtl:rotate-180" />
        </Link>
      )}
    </div>
  );
}
