/** Placeholder mark for a missing cover image: a solid facet fading left
 *  into a row of bars, echoing the reference thumbnail's hex glyph. */
export function BlogMark({ className }: { className?: string }) {
  const bars = Array.from({ length: 17 }, (_, i) => {
    const x = 2 + i * 2.75;
    const halfHeight = x <= 25 ? 35 * (x / 25) : 35;
    return { x, halfHeight, opacity: Math.min(1, 0.1 + x / 24) };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={50 - bar.halfHeight}
          width={1.6}
          height={bar.halfHeight * 2}
          fill="currentColor"
          opacity={bar.opacity}
        />
      ))}
      <path d="M50 15 L50 85 L100 50 Z" fill="currentColor" />
    </svg>
  );
}
