"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { getVariant, type Product } from "@/data/products";
import { PillowcaseAccordions } from "./PillowcaseAccordions";
import { formatMoney } from "@/lib/money";
import { Info, X, Moon, HeartPulse, Sun, ShieldCheck, RefreshCw, Leaf, Truck } from "lucide-react";
import { market } from "@/lib/market";
import { DeliveryTimerBox } from "../DeliveryTimerBox";

/**
 * Grounding-pillowcase buy-box with a bundle offer modelled on thegrounding.co:
 *   - Buy 1              -> one pillowcase (colour + size)
 *   - Buy 2, Get 1 Free  -> three pillowcases, each an independent colour + size,
 *                           the third priced free ("Most Popular", preselected)
 * A free Grounding Mat is added with either tier. Every pillowcase the customer
 * picks becomes its own cart line, so mixed colours/sizes show separately.
 * Built in Juujo's own theme + tokens. Scoped to grounding pillowcases only.
 */

type PillowcaseChoice = { colorId: string; sizeId: string };

type Tier = {
  id: "single" | "bundle-2" | "bundle-4";
  label: string;
  pillowcases: number;
  discountTotalCents: number;
  badge?: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  { id: "single", label: "Buy 1", pillowcases: 1, discountTotalCents: 0 },
  {
    id: "bundle-2",
    label: "Buy 2",
    pillowcases: 2,
    discountTotalCents: 1000,
    badge: "Recommended",
    recommended: true,
  },
  {
    id: "bundle-4",
    label: "Buy 4",
    pillowcases: 4,
    discountTotalCents: 4000,
    badge: "Most Popular",
  },
];

function useDeliveryDate(daysFromToday: number) {
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromToday);

      const weekday = date.toLocaleString(market.locale, { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString(market.locale, { month: "long" });

      setDateLabel(`${weekday} ${day} ${month}`);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [daysFromToday]);

  return dateLabel;
}

function DeliveryDateDisplay({ days }: { days: number }) {
  const date = useDeliveryDate(days);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe mounted flag for hydration-safe date render
  useEffect(() => setMounted(true), []);
  return <>{mounted ? date || "soon" : "Loading..."}</>;
}

export function PillowcaseBuyBox({ product }: { product: Product }) {
  const { setSheetBundle } = useCart();
  const router = useRouter();

  const defaultChoice = useMemo<PillowcaseChoice>(
    () => ({
      colorId: product.colors[0]?.id ?? "",
      sizeId:
        product.sizes.find((s) => s.id === "queen")?.id ??
        product.sizes[0]?.id ??
        "",
    }),
    [product.colors, product.sizes],
  );

  const [tierId, setTierId] = useState<Tier["id"]>("bundle-4");
  const [expandedTier, setExpandedTier] = useState<Tier["id"] | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [choices, setChoices] = useState<Record<string, PillowcaseChoice[]>>(() => {
    const init: Record<string, PillowcaseChoice[]> = {};
    for (const t of TIERS) {
      init[t.id] = Array(t.pillowcases).fill(defaultChoice);
    }
    return init;
  });
  const [isNavigating, setIsNavigating] = useState(false);

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0];
  const activeChoices = choices[tierId];

  // Compute prices from actual selected variants, not flat base price
  const activeVariantPrices = activeChoices.map((choice) => {
    const v = getVariant(product, choice.colorId, choice.sizeId);
    return { priceCents: v.priceCents, compareAtCents: v.compareAtCents };
  });

  // For bundle: apply the flat discountTotalCents to the sum
  const bundleTotal = activeVariantPrices
    .reduce((sum, v) => sum + v.priceCents, 0) - tier.discountTotalCents;
  const bundleCompare = activeVariantPrices.reduce(
    (sum, v) => sum + v.compareAtCents,
    0,
  );

  // Fallback per-pillowcase prices from product base (used for tier cards when tier not selected)
  const perpillowcase = product.priceCents;
  const perpillowcaseCompare = product.compareAtCents;



  function priceForTier(t: Tier) {
    const tierChoices = choices[t.id];
    return tierChoices.reduce(
      (sum, choice) =>
        sum + getVariant(product, choice.colorId, choice.sizeId).priceCents,
      0,
    ) - t.discountTotalCents;
  }

  function compareForTier(t: Tier) {
    const tierChoices = choices[t.id];
    return tierChoices.reduce(
      (sum, choice) =>
        sum + getVariant(product, choice.colorId, choice.sizeId).compareAtCents,
      0,
    );
  }

  function updateChoice(
    tierIdToUpdate: string,
    index: number,
    patch: Partial<PillowcaseChoice>,
  ) {
    setChoices((current) => {
      const next = { ...current };
      const nextChoices = [...next[tierIdToUpdate]];
      nextChoices[index] = { ...nextChoices[index], ...patch };
      next[tierIdToUpdate] = nextChoices;
      return next;
    });
  }

  // Any selected colour+size that is out of stock (no real variant id) blocks
  // checkout so we never send an unpurchasable line to PlusBase.
  const outOfStock = activeChoices.some((choice) => {
    const variant = getVariant(product, choice.colorId, choice.sizeId);
    return !variant.inStock || !variant.variantId;
  });

  function handleAddToCart() {
    if (outOfStock) return;
    setIsNavigating(true);
    const selections = activeChoices.map((choice) => ({
      product,
      variantId: getVariant(product, choice.colorId, choice.sizeId).variantId,
      discountPerpillowcaseCents: tier.pillowcases > 1 ? Math.round(tier.discountTotalCents / tier.pillowcases) : 0,
    }));
    setSheetBundle(selections, 0); // No free pillowcases in this bundle model
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <div>
        <a
          href="#reviews"
          className="flex w-fit items-center gap-2 no-underline hover:no-underline cursor-pointer"
        >
          <div
            className="text-xl sm:text-2xl leading-none text-[var(--gold)]"
            aria-hidden="true"
          >
            ★★★★★
          </div>
          <span className="font-sans pt-[2px] sm:pt-[3px] text-xs sm:text-[13px] font-bold tracking-wide text-[var(--plum)]">
            {product.rating.toFixed(1)} · TRUSTED BY{" "}
            {product.customerCount || "40,000+"} CUSTOMERS
          </span>
        </a>
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[2.6rem] md:!text-[3.2rem] leading-[1.05] tracking-tight">
          {product.name}
        </h1>

        <ul className="mt-5 lg:mt-6 space-y-3 lg:space-y-4 font-serif text-[16px] lg:text-[18px] text-[var(--plum)]">
          <li className="flex items-start gap-3">
            <Moon className="text-[#219937] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              Fall asleep faster by easing tension and relaxing your body.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <HeartPulse className="text-[#219937] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              Wake up with less joint and muscle stiffness.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Sun className="text-[#219937] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              Sleep more deeply and feel energized throughout the day.
            </span>
          </li>
        </ul>
      </div>

      {/* Bundle heading */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        <span className="juujo-mono text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--plum)]">
          Bundle & Save + Free Shipping & Gifts
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
      </div>

      {/* Tier cards - vertical layout */}
      <div className="flex flex-col gap-3 lg:gap-4">
        {TIERS.map((t) => {
          const selected = t.id === tierId;
          const total = priceForTier(t);
          const compare = compareForTier(t);
          const savings = Math.max(compare - total, 0);

          return (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-2xl transition-all duration-200 cursor-pointer ${
                selected 
                  ? "border-[2px] border-[var(--night)] bg-[color-mix(in_oklch,var(--clay)_6%,var(--paper))] shadow-sm z-10" 
                  : "border border-[var(--border)] bg-[var(--card)] hover:border-[color-mix(in_oklch,var(--clay)_40%,var(--border))] opacity-95"
              }`}
              onClick={() => {
                setTierId(t.id);
                setExpandedTier(t.id);
              }}
            >
              {/* Diagonal ribbon clipped only by the card's top and right walls. */}
              {t.badge && (
                <div className="pointer-events-none absolute right-0 top-0 z-20 h-[92px] w-[92px] overflow-hidden">
                  <div className="absolute right-[-35px] top-[21px] w-[132px] origin-center rotate-45 bg-[var(--clay-deep)] py-1 text-center text-[8px] font-black uppercase tracking-widest text-white shadow-sm">
                    {t.badge}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setTierId(t.id);
                  setExpandedTier(t.id);
                }}
                aria-pressed={selected}
                className="p-3 sm:p-4 flex flex-col w-full text-left relative z-10"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className={`mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${selected ? "border-[var(--night)] bg-[var(--night)]" : "border-[var(--muted)]"}`}>
                    {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  
                  <div className="flex-1 flex flex-row justify-between items-start gap-2">
                    <div className="flex flex-col flex-1 pr-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-sans text-[14px] sm:text-[15px] font-extrabold text-[var(--ink)] leading-tight uppercase tracking-tight">
                          {t.label}
                        </h3>
                        {t.discountTotalCents > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded text-[12px] sm:text-[13px] font-bold tracking-wide text-white bg-[var(--night)] shadow-sm">
                            {formatMoney(t.discountTotalCents, product.currency)} OFF
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[13.5px] sm:text-[15px] text-[var(--muted)] leading-snug">
                        {t.id === "bundle-4" ? (
                          <>
                            Includes 4 Pillowcases, 4 Cables
                          </>
                        ) : t.id === "bundle-2" ? (
                          <>
                            Includes 2 Pillowcases, 2 Cables
                          </>
                        ) : (
                          <>Includes 1 Pillowcase, 1 Cable</>
                        )}
                      </p>
                    </div>

                    <div className={`flex flex-col items-end text-right shrink-0 pt-0.5 ${t.badge ? 'pr-20 sm:pr-24' : ''}`}>
                      {t.pillowcases > 1 ? (
                        <>
                          <div className="flex items-baseline gap-1 mb-0.5">
                            <span className="font-serif text-[1.25rem] sm:text-[1.4rem] font-semibold text-[var(--ink)] leading-none">
                              {formatMoney(Math.round(total / t.pillowcases), product.currency)}
                            </span>
                            <span className="text-[12px] font-medium text-[var(--ink)]">
                              each
                            </span>
                          </div>
                          <div className="flex items-baseline gap-1.5 mb-1">
                            <span className="font-serif text-[13px] sm:text-[14px] text-[var(--ink)] font-semibold">
                              {formatMoney(total, product.currency)}
                            </span>
                            {compare > total && (
                              <span className="font-serif text-[12px] sm:text-[13px] text-[var(--muted)] line-through">
                                {formatMoney(compare, product.currency)}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className="font-serif text-[1.25rem] sm:text-[1.4rem] font-semibold text-[var(--ink)] leading-none">
                            {formatMoney(total, product.currency)}
                          </span>
                          {compare > total && (
                            <span className="font-serif text-[13px] sm:text-[15px] text-[var(--muted)] line-through">
                              {formatMoney(compare, product.currency)}
                            </span>
                          )}
                        </div>
                      )}
                      {t.discountTotalCents === 0 && savings > 0 && (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold tracking-wide text-white bg-[var(--night)]">
                          SAVE {formatMoney(savings, product.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* The expanded selection area for the CHOSEN tier */}
              {expandedTier === t.id && (
                <div className="bg-[rgba(247,241,232,0.85)] border-t border-[var(--border)] rounded-b-[15px]">
                  <div className="p-3 sm:p-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    {Array.from({ length: t.pillowcases }).map((_, index) => (
                      <SheetRow
                        key={`${t.id}-${index}`}
                        product={product}
                        index={index}
                        showIndex={t.pillowcases > 1}
                        choice={choices[t.id][index]}
                        onChange={(patch) => updateChoice(t.id, index, patch)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DeliveryTimerBox />

      {/* Add to cart */}
      <Button
        id="hero-cta"
        disabled={isNavigating || outOfStock}
        onClick={handleAddToCart}
        className={`proxy-bundle-btn w-full rounded-[30px] border border-[var(--night)] bg-[var(--night)] py-4 text-[1.15rem] font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-[var(--night)] hover:border-[var(--night)] active:scale-[0.99] sm:text-[22px] ${!isNavigating ? "" : "disabled:!opacity-100"}`}
      >
        {isNavigating ? (
          <>
            <span
              style={{ visibility: "hidden" }}
              className="relative z-20 whitespace-nowrap"
            >
              Add To Cart
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
              : "Add To Cart"}
          </span>
        )}
      </Button>

      {/* Trust Badges directly below CTA */}
      <div className="grid grid-cols-3 gap-2 mt-3 px-1">
        <div className="flex flex-col items-center text-center gap-1.5 opacity-85">
          <ShieldCheck className="text-[var(--ink)]" size={32} strokeWidth={1.5} />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[var(--ink)] leading-tight">FDA<br/>Cleared</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5 opacity-85">
          <RefreshCw className="text-[var(--ink)]" size={32} strokeWidth={1.5} />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[var(--ink)] leading-tight">120-Night<br/>Guarantee</span>
        </div>
        <div className="flex flex-col items-center text-center gap-1.5 opacity-85">
          <Leaf className="text-[var(--ink)]" size={32} strokeWidth={1.5} />
          <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-widest text-[var(--ink)] leading-tight">Eco-Friendly<br/>Materials</span>
        </div>
      </div>


      {/* Accordions */}
      <PillowcaseAccordions />
    </div>
  );
}

/** One pillowcase's colour + size selectors (a row inside a bundle tier). */
function SheetRow({
  product,
  index,
  showIndex,
  choice,
  onChange,
}: {
  product: Product;
  index: number;
  showIndex: boolean;
  choice: PillowcaseChoice;
  onChange: (patch: Partial<PillowcaseChoice>) => void;
}) {
  const variant = getVariant(product, choice.colorId, choice.sizeId);
  const soldOut = !variant.inStock || !variant.variantId;

  /** Check if a specific color has ANY in-stock size */
  const isColorInStock = (colorId: string) =>
    product.sizes.some((size) => {
      const v = getVariant(product, colorId, size.id);
      return v.inStock && !!v.variantId;
    });

  /** Check if a specific color+size combo is in stock */
  const isSizeInStock = (colorId: string, sizeId: string) => {
    const v = getVariant(product, colorId, sizeId);
    return v.inStock && !!v.variantId;
  };

  /** When color changes, auto-select first in-stock size for that color */
  const handleColorChange = (colorId: string) => {
    const firstInStockSize = product.sizes.find((s) =>
      isSizeInStock(colorId, s.id),
    );
    onChange({
      colorId,
      sizeId: firstInStockSize?.id ?? choice.sizeId,
    });
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {showIndex && (
        <span className="font-serif w-6 flex-none text-sm text-[var(--muted)]">
          #{index + 1}
        </span>
      )}
      <label className="sr-only" htmlFor={`color-${index}`}>
        Colour for pillowcase {index + 1}
      </label>
      <ColorSelect
        value={choice.colorId}
        onChange={handleColorChange}
        colors={product.colors}
        isColorInStock={isColorInStock}
      />
    </div>
  );
}

function ColorSelect({
  value,
  onChange,
  colors,
  isColorInStock,
}: {
  value: string;
  onChange: (val: string) => void;
  colors: Product["colors"];
  isColorInStock: (colorId: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = colors.find((c) => c.id === value);

  return (
    <div className="relative flex-[0.8] sm:flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="font-serif w-full appearance-none rounded-xl border bg-white py-2.5 pl-8 sm:pl-9 pr-6 sm:pr-8 text-left text-xs sm:text-sm text-[var(--ink)] outline-none transition focus:border-[var(--night)]"
        style={{ borderColor: "var(--border)" }}
      >
        {selected && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 rounded-[3px] border"
            style={{
              backgroundColor: selected.hex,
              borderColor: "rgba(0,0,0,0.1)",
            }}
          />
        )}
        <span className="truncate block">{selected?.name} (20 x 29 in)</span>
        <span className="pointer-events-none absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
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
        </span>
      </button>
      {open && (
        <ul
          className="absolute left-0 top-full z-50 mt-1 max-h-60 w-[150%] sm:w-full overflow-auto rounded-xl border bg-white py-1 shadow-lg"
          style={{ borderColor: "var(--border)" }}
        >
          {colors.map((color) => {
            const inStock = isColorInStock(color.id);
            return (
              <li key={color.id}>
                <button
                  type="button"
                  disabled={!inStock}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!inStock) return;
                    onChange(color.id);
                    setOpen(false);
                  }}
                  className={`font-serif flex w-full items-center px-3 py-2 text-xs sm:text-sm text-left text-[var(--ink)] ${
                    inStock
                      ? "hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-none rounded-[3px] border ${!inStock ? "grayscale" : ""}`}
                    style={{
                      backgroundColor: color.hex,
                      borderColor: "rgba(0,0,0,0.1)",
                    }}
                  />
                  {color.name} (20 x 29 in)
                  {!inStock && (
                    <span className="ml-auto text-[10px] sm:text-[11px] font-medium text-[var(--night)]">
                      Out of Stock
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

