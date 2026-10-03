"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Milliseconds between siblings in a staggered row. */
export const REVEAL_STEP = 180;

/** Where the element travels in from. `none` fades on the spot. */
type From = "up" | "start" | "end" | "none";

const OFFSET: Record<From, string> = {
  up: "translate-y-8",
  start: "-translate-x-8 rtl:translate-x-8",
  end: "translate-x-8 rtl:-translate-x-8",
  none: "",
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Milliseconds held back before this element starts, for staggering a row. */
  delay?: number;
  from?: From;
};

/** Fades a block in the first time it is scrolled into view, then stops
 *  observing — content settles and stays put rather than replaying on the way
 *  back up.
 *
 *  The hidden state ships in the markup so nothing flashes before the effect
 *  runs; `[data-reveal]` is forced visible without scripting in `globals.css`,
 *  which also drops the transition under `prefers-reduced-motion` so the class
 *  swap lands instantly instead of animating. */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Anything the observer can't handle simply arrives already revealed.
    // Deferred so the reveal is not a cascading render out of the effect body.
    if (typeof IntersectionObserver === "undefined") {
      startTransition(() => setShown(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShown(true);
        observer.disconnect();
      },
      // Edge crossing rather than a visible ratio: a block taller than the
      // viewport would never reach a ratio threshold. Trimming the bottom of
      // the root holds the reveal until the block is properly on screen.
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition duration-1000 ease-out",
        shown
          ? "translate-x-0 translate-y-0 opacity-100"
          : cn("opacity-0", OFFSET[from]),
        className,
      )}
    >
      {children}
    </div>
  );
}
