"use client";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/hooks/useLang";

/** Flyout label for the icon rail — forced below `lg`, chosen above it.
 *  Portals to `body` so it always escapes the nav's own scroll clipping, no
 *  matter how narrow the rail is. */
export function SidebarTooltip({
  label,
  active,
  children,
}: {
  label: string;
  /** Only tracked while the labels are actually hidden. */
  active: boolean;
  children: React.ReactNode;
}) {
  const { dir } = useLang();
  const [coords, setCoords] = useState<{ top: number; x: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function show() {
    if (!active) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.top + rect.height / 2,
      x: dir === "rtl" ? rect.left - 10 : rect.right + 10,
    });
  }
  function hide() {
    setCoords(null);
  }

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {active &&
        coords &&
        typeof document !== "undefined" &&
        createPortal(
          <span
            role="tooltip"
            className="fixed z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background shadow-lg sm:block"
            style={{
              top: coords.top,
              [dir === "rtl" ? "right" : "left"]: coords.x,
              transform: dir === "rtl" ? "translate(100%, -50%)" : undefined,
            }}
          >
            {label}
          </span>,
          document.body,
        )}
    </div>
  );
}
