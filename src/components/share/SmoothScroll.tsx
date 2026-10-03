"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** How far one wheel notch carries, against the browser's own distance.
 *  Below 1 the page moves less per notch — the "slower scroll" dial. */
const WHEEL_MULTIPLIER = 0.65;

/** How hard each frame chases the target position, between 0 and 1. Lower
 *  glides for longer; Lenis ships 0.1. */
const LERP = 0.07;

/** Takes the wheel over from the browser so the page eases to a stop instead
 *  of jumping a notch at a time.
 *
 *  Touch keeps its native momentum (`syncTouch` off) — phone scrolling is
 *  already smooth and hijacking it only adds lag. Lenis honours
 *  `prefers-reduced-motion` on its own, tracking the input device 1:1 when it
 *  is set, and `allowNestedScroll` leaves scrollable panels such as dialogs
 *  and dropdowns to the browser. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      wheelMultiplier: WHEEL_MULTIPLIER,
      lerp: LERP,
      // Lenis drives its own frame loop, and picks up in-page anchors so the
      // skip link still lands on #main.
      autoRaf: true,
      anchors: true,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
