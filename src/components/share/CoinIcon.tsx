/** Brand marks for the assets we quote. Unknown symbols fall back to a
 *  neutral initials badge so a new listing never renders a blank gap. */
const BTC = (
  <>
    <circle cx="16" cy="16" r="16" fill="#F7931A" />
    <path
      fill="#fff"
      d="M13.1 8.6h4.1c2.1 0 3.5 1.1 3.5 2.9 0 1.2-.6 2.1-1.7 2.5 1.4.3 2.2 1.4 2.2 2.8 0 2.1-1.6 3.4-4 3.4h-4.1V8.6Zm2.5 4.9h1.5c.9 0 1.5-.4 1.5-1.2 0-.7-.5-1.2-1.5-1.2h-1.5v2.4Zm0 4.8h1.8c1.1 0 1.7-.5 1.7-1.3 0-.8-.6-1.3-1.7-1.3h-1.8v2.6Z"
    />
    <path
      fill="#fff"
      d="M14.8 6h1.7v3.2h-1.7zM17.7 6h1.7v3.2h-1.7zM14.8 19.8h1.7V23h-1.7zM17.7 19.8h1.7V23h-1.7z"
    />
  </>
);
const ETH = (
  <>
    <path fill="#627EEA" fillOpacity=".6" d="M16 3v9.6l8.1 3.6z" />
    <path fill="#627EEA" d="M16 3 7.9 16.2l8.1-3.6z" />
    <path fill="#627EEA" fillOpacity=".6" d="M16 22.3V29l8.1-11.3z" />
    <path fill="#627EEA" d="M16 29v-6.7l-8.1-4.6z" />
    <path fill="#627EEA" fillOpacity=".4" d="m16 20.8 8.1-4.6-8.1-3.6z" />
    <path fill="#627EEA" fillOpacity=".8" d="m7.9 16.2 8.1 4.6v-8.2z" />
  </>
);
const USDT = (
  <>
    <circle cx="16" cy="16" r="16" fill="#26A17B" />
    <path
      fill="#fff"
      d="M17.9 14.8v-2h4.6V9.7H9.5v3.1h4.6v2c-3.8.2-6.6.9-6.6 1.8s2.8 1.7 6.6 1.8v6.3h3.8v-6.3c3.7-.2 6.5-.9 6.5-1.8s-2.8-1.6-6.5-1.8Zm0 3c-.1 0-.7.1-1.9.1-1 0-1.7 0-1.9-.1-3.2-.1-5.6-.7-5.6-1.3s2.4-1.2 5.6-1.3v2.1c.2 0 .9.1 1.9.1 1.2 0 1.8-.1 1.9-.1v-2.1c3.2.1 5.6.7 5.6 1.3s-2.4 1.2-5.6 1.3Z"
    />
  </>
);
const USDC = (
  <>
    <circle cx="16" cy="16" r="16" fill="#2775CA" />
    <path
      fill="#fff"
      d="M20.4 18.5c0-2.3-1.4-3.1-4.2-3.4-2-.3-2.4-.8-2.4-1.7s.7-1.5 2-1.5c1.2 0 1.9.4 2.2 1.4.1.2.3.3.5.3h1.1c.3 0 .5-.2.5-.5v-.1c-.3-1.5-1.5-2.6-3-2.8V8.6c0-.3-.2-.5-.6-.6h-1c-.3 0-.5.2-.6.6v1.5c-2 .3-3.2 1.6-3.2 3.3 0 2.2 1.3 3 4.1 3.4 1.9.3 2.5.7 2.5 1.8s-1 1.8-2.2 1.8c-1.7 0-2.3-.7-2.5-1.7-.1-.3-.3-.4-.5-.4h-1.2c-.3 0-.5.2-.5.5v.1c.3 1.6 1.3 2.8 3.5 3.1v1.6c0 .3.2.5.6.6h1c.3 0 .5-.2.6-.6v-1.6c2-.3 3.3-1.7 3.3-3.5Z"
    />
    <path
      fill="#fff"
      d="M13.2 24.8c-3.6-1.3-5.4-5.3-4-8.9.7-2 2.3-3.5 4-4.1.3-.2.5-.4.5-.8v-.9c0-.3-.2-.5-.5-.6-.1 0-.3 0-.4.1-4.4 1.4-6.8 6.1-5.4 10.5.8 2.6 2.8 4.6 5.4 5.4.3.2.6 0 .7-.3.1-.1.1-.2.1-.3v-.9c0-.2-.2-.5-.4-.6Zm6-15.2c-.3-.2-.6 0-.7.3-.1.1-.1.2-.1.3v.9c0 .3.2.6.4.8 3.6 1.3 5.4 5.3 4 8.9-.7 2-2.3 3.5-4 4.1-.3.2-.5.4-.5.8v.9c0 .3.2.5.5.6.1 0 .3 0 .4-.1 4.4-1.4 6.8-6.1 5.4-10.5-.8-2.7-2.9-4.7-5.4-5.5Z"
    />
  </>
);
const BNB = (
  <>
    <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
    <path
      fill="#fff"
      d="m12.1 14.3 3.9-3.9 3.9 3.9 2.3-2.3L16 5.9l-6.2 6.1 2.3 2.3ZM6.9 16l2.3-2.3L11.5 16l-2.3 2.3L6.9 16Zm5.2 1.7 3.9 3.9 3.9-3.9 2.3 2.3-6.2 6.1-6.2-6.1 2.3-2.3ZM20.5 16l2.3-2.3 2.3 2.3-2.3 2.3-2.3-2.3Zm-2.2 0L16 13.7 14.1 15.6l-.2.2-.2.2 2.3 2.3 2.3-2.3Z"
    />
  </>
);
const SOL = (
  <>
    <defs>
      <linearGradient id="nomipay-sol" x1="4" y1="26" x2="28" y2="6">
        <stop offset="0" stopColor="#9945FF" />
        <stop offset="1" stopColor="#14F195" />
      </linearGradient>
    </defs>
    <path
      fill="url(#nomipay-sol)"
      d="M9.4 6.5a.9.9 0 0 1 .6-.2h18.7c.4 0 .6.5.3.8l-3.7 3.7a.9.9 0 0 1-.6.2H6a.4.4 0 0 1-.3-.8l3.7-3.7ZM9.4 20.9a.9.9 0 0 1 .6-.2h18.7c.4 0 .6.5.3.8l-3.7 3.7a.9.9 0 0 1-.6.2H6a.4.4 0 0 1-.3-.8l3.7-3.7ZM25 13.8a.9.9 0 0 0-.6-.3H5.7a.4.4 0 0 0-.3.8l3.7 3.7a.9.9 0 0 0 .6.2H28a.4.4 0 0 0 .3-.7L25 13.8Z"
    />
  </>
);

const MARKS: Record<string, React.ReactNode> = {
  BTC,
  ETH,
  USDT,
  USDC,
  BNB,
  SOL,
};

export function CoinIcon({
  symbol,
  size = 16,
  className,
}: {
  symbol: string;
  size?: number;
  className?: string;
}) {
  const mark = MARKS[symbol.toUpperCase()];
  if (!mark)
    return (
      <span
        aria-hidden
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        className="flex shrink-0 items-center justify-center rounded-full bg-foreground font-bold text-background"
      >
        {symbol.slice(0, 2).toUpperCase()}
      </span>
    );
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={className ? `shrink-0 ${className}` : "shrink-0"}
    >
      {mark}
    </svg>
  );
}
