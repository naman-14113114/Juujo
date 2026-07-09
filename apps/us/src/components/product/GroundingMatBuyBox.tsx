"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Hexagon, Home, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { getVariant, type Product } from "@/data/products";
import { DeliveryTimerBox } from "./DeliveryTimerBox";
import { GroundingMatAccordions } from "./GroundingMatAccordions";
import { formatMoney } from "@/lib/money";

type MatChoice = { sizeId: string };

type Tier = {
  id: "single" | "bundle";
  label: string;
  mats: number;
  freeCount: number;
  badge?: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  { id: "single", label: "Buy 1", mats: 1, freeCount: 0 },
  {
    id: "bundle",
    label: "Buy 2, Get 1 Free!",
    mats: 3,
    freeCount: 1,
    badge: "Most Popular",
    recommended: true,
  },
];

export function GroundingMatBuyBox({ product }: { product: Product }) {
  const { setSheetBundle } = useCart();
  const router = useRouter();

  const defaultChoice = useMemo<MatChoice>(
    () => ({
      sizeId: product.sizes[0]?.id ?? "",
    }),
    [product.sizes],
  );

  const [tierId, setTierId] = useState<Tier["id"]>("bundle");
  const [expandedTier, setExpandedTier] = useState<Tier["id"] | null>(null);
  const [choices, setChoices] = useState<Record<string, MatChoice[]>>(() => {
    const init: Record<string, MatChoice[]> = {};
    for (const t of TIERS) {
      init[t.id] = Array(t.mats).fill(defaultChoice);
    }
    return init;
  });
  const [isNavigating, setIsNavigating] = useState(false);

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0];
  const activeChoices = choices[tierId];

  const colorId = product.colors[0]?.id ?? "black";

  const activeVariantPrices = activeChoices.map((choice) => {
    const v = getVariant(product, colorId, choice.sizeId);
    return { priceCents: v.priceCents, compareAtCents: v.compareAtCents };
  });

  const paidCount = tier.mats - tier.freeCount;
  const bundleTotal = activeVariantPrices
    .slice(0, paidCount)
    .reduce((sum, v) => sum + v.priceCents, 0);

  const perSheet = product.priceCents;

  function priceForTier(t: Tier) {
    const tierChoices = choices[t.id];
    const paidN = t.mats - t.freeCount;
    return tierChoices
      .slice(0, paidN)
      .reduce(
        (sum, choice) =>
          sum + getVariant(product, colorId, choice.sizeId).priceCents,
        0,
      );
  }

  function compareForTier(t: Tier) {
    const tierChoices = choices[t.id];
    return tierChoices.reduce(
      (sum, choice) =>
        sum + getVariant(product, colorId, choice.sizeId).compareAtCents,
      0,
    );
  }

  function updateChoice(
    tierIdToUpdate: string,
    index: number,
    patch: Partial<MatChoice>,
  ) {
    setChoices((current) => {
      const next = { ...current };
      const nextChoices = [...next[tierIdToUpdate]];
      nextChoices[index] = { ...nextChoices[index], ...patch };
      next[tierIdToUpdate] = nextChoices;
      return next;
    });
  }

  const outOfStock = activeChoices.some((choice) => {
    const variant = getVariant(product, colorId, choice.sizeId);
    return !variant.inStock || !variant.variantId;
  });

  function handleAddToCart() {
    if (outOfStock) return;
    setIsNavigating(true);
    const selections = activeChoices.map((choice) => ({
      product,
      variantId: getVariant(product, colorId, choice.sizeId).variantId,
    }));
    setSheetBundle(selections, tier.freeCount);
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <a
          href="#reviews"
          className="mb-3 flex w-fit items-center gap-2 no-underline hover:no-underline cursor-pointer"
        >
          <div
            className="text-xl sm:text-2xl leading-none text-[var(--gold)]"
            aria-hidden="true"
          >
            ★★★★★
          </div>
          <span className="font-sans text-xs sm:text-sm font-medium text-[var(--plum)] bg-[color-mix(in_srgb,var(--gold)_18%,transparent)] px-2.5 py-0.5 rounded-md">
            {product.rating.toFixed(1)} · TRUSTED BY{" "}
            {product.customerCount || "40,000+"} CUSTOMERS
          </span>
        </a>
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[clamp(1.2rem,4.3vw,2.4rem)] whitespace-nowrap leading-[1.02] tracking-tight">
          Grounding Mat
        </h1>

        <ul className="mt-4 lg:mt-5 space-y-2 lg:space-y-3 font-serif text-sm lg:text-base text-[var(--plum)] tracking-wide">
          <li className="flex items-start gap-2.5">
            <Hexagon className="text-[var(--gold)] shrink-0 mt-0.5" strokeWidth={1.5} size={20} />
            <span className="leading-snug">
              Conductive Carbon Surface for maximum conductivity
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <Home className="text-[var(--gold)] shrink-0 mt-0.5" strokeWidth={1.5} size={20} />
            <span className="leading-snug">
              Versatile Design perfect for desk, couch, or floor
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <ShieldCheck className="text-[var(--gold)] shrink-0 mt-0.5" strokeWidth={1.5} size={20} />
            <span className="leading-snug">
              Easy to clean and built to last
            </span>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border)" }}
        />
        <span className="juujo-mono text-center text-xs font-semibold uppercase tracking-wider text-[var(--plum)]">
          Bundle &amp; Save
        </span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>

      <div className="flex flex-col gap-4">
        {TIERS.map((t) => {
          const selected = t.id === tierId;
          const total = priceForTier(t);
          const compare = compareForTier(t);
          const savings = Math.max(compare - total, 0);
          const perUnit = Math.round(total / t.mats);

          return (
            <div
              key={t.id}
              className="relative rounded-2xl border transition-colors"
              style={{
                borderColor: selected ? "var(--gold)" : "var(--border)",
                backgroundColor: selected
                  ? "color-mix(in oklch, var(--gold) 6%, var(--paper))"
                  : "var(--card)",
                boxShadow: selected ? "0 0 0 1px var(--gold)" : "none",
              }}
            >
              {t.badge && (
                <span
                  className="absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ backgroundColor: "var(--gold)" }}
                >
                  {t.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => {
                  setTierId(t.id);
                  setExpandedTier(t.id);
                }}
                aria-pressed={selected}
                className="flex w-full items-center gap-3 p-4 text-left transition-transform duration-150 ease-out active:scale-[0.995]"
              >
                <span
                  className="grid h-5 w-5 flex-none place-items-center rounded-full border-2"
                  style={{
                    borderColor: selected ? "var(--gold)" : "var(--border)",
                  }}
                >
                  {selected && (
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: "var(--gold)" }}
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-[var(--ink)]">
                      {t.label}
                    </span>
                    {savings > 0 && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
                        style={{ backgroundColor: "var(--success)" }}
                      >
                        You save {formatMoney(savings, product.currency)}
                      </span>
                    )}
                  </span>
                  <span className="font-serif mt-0.5 block text-sm text-[var(--muted)]">
                    {t.freeCount > 0
                      ? `Only ${formatMoney(perUnit, product.currency)} per mat!`
                      : `${formatMoney(perSheet, product.currency)}`}
                  </span>
                </span>
                <span className="flex-none text-right">
                  <span className="font-serif block text-lg font-semibold text-[var(--ink)]">
                    {formatMoney(total, product.currency)}
                  </span>
                  {compare > total && (
                    <span className="font-serif block text-sm text-[var(--muted)] line-through">
                      {formatMoney(compare, product.currency)}
                    </span>
                  )}
                </span>
              </button>

              {expandedTier === t.id && (
                <div
                  className="flex flex-col gap-3 border-t px-4 py-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="font-serif text-xs text-[var(--muted)] -mb-1">
                    Size
                  </div>
                  {Array.from({ length: t.mats }).map((_, index) => (
                    <MatRow
                      key={index}
                      product={product}
                      index={index}
                      showIndex={t.mats > 1}
                      choice={choices[t.id][index]}
                      onChange={(patch) => updateChoice(t.id, index, patch)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DeliveryTimerBox />

      <Button
        id="hero-cta"
        disabled={isNavigating || outOfStock}
        onClick={handleAddToCart}
        className={`proxy-bundle-btn w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--ink)] active:scale-[0.98] sm:text-[22px] ${!isNavigating ? "" : "disabled:!opacity-100"}`}
      >
        {isNavigating ? (
          <>
            <span
              style={{ visibility: "hidden" }}
              className="relative z-20 whitespace-nowrap"
            >
              ADD TO CART {"·"} {formatMoney(bundleTotal, product.currency)}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Lottie
                animationData={loadingLottie}
                loop
                className="h-16 w-24 scale-[1.35]"
              />
            </span>
          </>
        ) : (
          <span className="relative z-20 whitespace-nowrap">
            {outOfStock
              ? "SELECTED SIZE OUT OF STOCK"
              : `ADD TO CART · ${formatMoney(bundleTotal, product.currency)}`}
          </span>
        )}
      </Button>

      <GroundingMatAccordions />
    </div>
  );
}

function MatRow({
  product,
  index,
  showIndex,
  choice,
  onChange,
}: {
  product: Product;
  index: number;
  showIndex: boolean;
  choice: MatChoice;
  onChange: (patch: Partial<MatChoice>) => void;
}) {
  const colorId = product.colors[0]?.id ?? "black";
  const variant = getVariant(product, colorId, choice.sizeId);
  const soldOut = !variant.inStock || !variant.variantId;

  return (
    <div className="flex items-center gap-3">
      {showIndex && (
        <span className="font-serif w-6 flex-none text-sm text-[var(--muted)]">
          #{index + 1}
        </span>
      )}
      <label className="sr-only" htmlFor={`size-${index}`}>
        Size for mat {index + 1}
      </label>
      <div className="relative flex-1">
        <select
          id={`size-${index}`}
          value={choice.sizeId}
          onChange={(event) => onChange({ sizeId: event.target.value })}
          className="font-serif w-full appearance-none rounded-xl border bg-[var(--card)] py-2.5 pl-3 pr-8 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--gold)]"
          style={{
            borderColor: soldOut ? "var(--clay-deep)" : "var(--border)",
          }}
        >
          {product.sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.name} {size.dimensions ? `(${size.dimensions})` : ""}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        {soldOut && (
          <span className="font-serif mt-1 block text-[11px] font-medium text-[var(--clay-deep)]">
            Out of stock, pick another size
          </span>
        )}
      </div>
    </div>
  );
}
