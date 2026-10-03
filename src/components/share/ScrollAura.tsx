"use client";
import { useEffect, useState } from "react";

type Stop = {
  /** Aura colour for this stretch of the page. */
  tint: string;
  /** Blob outline — border-radius interpolates, so the shape morphs on the
   *  way from one stop to the next. */
  shape: string;
  /** Where the aura sits, as inset-inline-start / top. */
  x: string;
  y: string;
};

/** Keyed by each section's `data-stop`. A section without an entry here keeps
 *  the previous stretch's look. */
const STOPS: Record<string, Stop> = {
  intro: {
    tint: "var(--primary)",
    shape: "62% 38% 46% 54% / 58% 42% 58% 42%",
    x: "-8%",
    y: "-10%",
  },
  process: {
    tint: "var(--success)",
    shape: "38% 62% 63% 37% / 41% 44% 56% 59%",
    x: "62%",
    y: "8%",
  },
  features: {
    tint: "var(--primary)",
    shape: "50% 50% 33% 67% / 55% 27% 73% 45%",
    x: "18%",
    y: "34%",
  },
  travel: {
    tint: "var(--warning)",
    shape: "67% 33% 47% 53% / 37% 62% 38% 63%",
    x: "58%",
    y: "-6%",
  },
  app: {
    tint: "var(--panel-accent)",
    shape: "40% 60% 55% 45% / 62% 38% 62% 38%",
    x: "-12%",
    y: "22%",
  },
  blog: {
    tint: "var(--success)",
    shape: "55% 45% 38% 62% / 45% 58% 42% 55%",
    x: "64%",
    y: "40%",
  },
  contact: {
    tint: "var(--panel-accent)",
    shape: "58% 42% 40% 60% / 43% 57% 43% 57%",
    x: "56%",
    y: "12%",
  },
  faq: {
    tint: "var(--primary)",
    shape: "45% 55% 62% 38% / 50% 50% 50% 50%",
    x: "10%",
    y: "-4%",
  },
};

const FALLBACK: Stop = STOPS.intro;

/** A blurred shape behind the page that changes colour, position and outline
 *  as each section takes over — border-radius interpolates, so it morphs on
 *  the way rather than cutting.
 *
 *  Sections opt in with `id` + `data-stop`, so a page without them renders
 *  nothing. Purely decorative: `globals.css` stops its drift under
 *  `prefers-reduced-motion`. */
export function ScrollAura() {
  // Null until the first measurement lands, which is also how a page with no
  // tagged sections stays blank.
  const [theme, setTheme] = useState<Stop | null>(null);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stop]"),
    );
    if (nodes.length < 2) return;
    const stops = nodes.map(
      (node) => STOPS[node.dataset.stop ?? ""] ?? FALLBACK,
    );
    let frame = 0;

    const measure = () => {
      frame = 0;
      // The section that has most recently crossed the upper third of the
      // viewport is the one being read.
      const line = window.innerHeight * 0.38;
      let current = 0;
      nodes.forEach((node, index) => {
        if (node.getBoundingClientRect().top <= line) current = index;
      });
      setTheme(stops[current] ?? FALLBACK);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    // Scheduled rather than called outright, so the first reading happens on
    // the next frame instead of cascading a render out of this effect.
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  if (!theme) return null;

  return (
    // Sits behind everything but the page background, which is why the layout
    // wrapper is isolated.
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="anim-drift absolute size-136 opacity-15 blur-[90px] transition-all duration-1400 ease-out dark:opacity-25"
        style={{
          background: theme.tint,
          borderRadius: theme.shape,
          insetInlineStart: theme.x,
          top: theme.y,
        }}
      />
    </div>
  );
}
