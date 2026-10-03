"use client";
import { useLang } from "@/hooks/useLang";
import type { MarketRate } from "@/types";
import { CoinIcon } from "@/components/share/CoinIcon";

/** Quotes keep their own precision (₦1,355 and ₦1,361.088 both read true),
 *  so this does not round to two places the way `money` does. */
function quote(value: number, locale: string, currency: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(value);
}

/** Horizontal auto-looping marquee of the day's quotes. The track holds two
 *  identical copies and slides by exactly half its width, so the loop is
 *  seamless. It pauses on hover and on keyboard focus. */
export function RateTicker({ rates }: { rates: MarketRate[] }) {
  const { t, lang: locale } = useLang();
  if (rates.length === 0) return null;
  return (
    <div className="flex items-center gap-4 rounded-xl bg-card px-5 py-3 shadow-card">
      <span className="shrink-0 text-xs font-medium text-muted-foreground">
        {t("todaysRate")}
      </span>
      <div className="ticker min-w-0 flex-1">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-7 pe-7"
            >
              {rates.map((rate) => (
                <span
                  key={rate.symbol}
                  className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
                >
                  <CoinIcon symbol={rate.symbol} size={16} />
                  {rate.symbol}:
                  <span className="text-success" dir="ltr">
                    {quote(rate.price, locale, rate.quote)}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
