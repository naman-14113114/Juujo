import { market, type StoreCurrency } from "@/lib/market";

export function formatMoney(cents: number, currency: StoreCurrency = market.currency) {
  // Always show whole number prices (floor) — no decimals
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.floor(cents / 100));
}

export function percentOff(priceCents: number, compareAtCents: number) {
  if (!compareAtCents) {
    return 0;
  }

  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}
