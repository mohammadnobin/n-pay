/** Decorative QR artwork — three finder patterns, a timing row and a fixed
 *  module fill. It is not a scannable code and encodes nothing. */
const MODULES = [
  "111111100100001111111",
  "100000100000001000001",
  "101110101101101011101",
  "101110101000001011101",
  "101110101111001011101",
  "100000100010101000001",
  "111111101010101111111",
  "000000000110100000000",
  "010000100110111001000",
  "101011010000110110101",
  "000011101111110001000",
  "110001011001001100011",
  "110010111110110001011",
  "000000000100100100101",
  "111111100100011010000",
  "100000101011011001110",
  "101110100000100001000",
  "101110100101100010101",
  "101110101010101111001",
  "100000101111010011110",
  "111111101000110000000",
];

export function QrGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 21 21"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
      className={className}
    >
      {MODULES.flatMap((row, y) =>
        [...row].map((bit, x) =>
          bit === "1" ? (
            <rect key={`${y}-${x}`} x={x} y={y} width="1" height="1" />
          ) : null,
        ),
      )}
    </svg>
  );
}
