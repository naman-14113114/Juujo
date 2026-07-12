"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getVariant, type Product } from "@/data/products";
import { GroundingAccordions } from "./GroundingAccordions";
import { formatMoney } from "@/lib/money";
import { Info, X, Moon, HeartPulse, Sun, ShieldCheck, RefreshCw, Leaf, Truck } from "lucide-react";
import { market } from "@/lib/market";
import { DeliveryTimerBox } from "./DeliveryTimerBox";

/**
 * Grounding-sheet buy-box with a bundle offer modelled on thegrounding.co:
 *   - Buy 1              -> one sheet (colour + size)
 *   - Buy 2, Get 1 Free  -> three sheets, each an independent colour + size,
 *                           the third priced free ("Most Popular", preselected)
 * A free Grounding Mat is added with either tier. Every sheet the customer
 * picks becomes its own cart line, so mixed colours/sizes show separately.
 * Built in Juujo's own theme + tokens. Scoped to grounding sheets only.
 */

type SheetChoice = { colorId: string; sizeId: string };

type Tier = {
  id: "single" | "bundle";
  label: string;
  sheets: number;
  freeCount: number;
  badge?: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  { id: "single", label: "Buy 1", sheets: 1, freeCount: 0 },
  {
    id: "bundle",
    label: "Buy 2, Get 1 Free!",
    sheets: 3,
    freeCount: 1,
    badge: "Most Popular",
    recommended: true,
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

export function GroundingBuyBox({ product }: { product: Product }) {
  const { setSheetBundle } = useCart();
  const router = useRouter();

  const defaultChoice = useMemo<SheetChoice>(
    () => ({
      colorId: product.colors[0]?.id ?? "",
      sizeId:
        product.sizes.find((s) => s.id === "queen")?.id ??
        product.sizes[0]?.id ??
        "",
    }),
    [product.colors, product.sizes],
  );

  const [tierId, setTierId] = useState<Tier["id"]>("bundle");
  const [expandedTier, setExpandedTier] = useState<Tier["id"] | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [choices, setChoices] = useState<Record<string, SheetChoice[]>>(() => {
    const init: Record<string, SheetChoice[]> = {};
    for (const t of TIERS) {
      init[t.id] = Array(t.sheets).fill(defaultChoice);
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

  // For bundle: only the paid sheets count toward total (freeCount sheets are free)
  // Paid items = first (sheets - freeCount) choices
  const paidCount = tier.sheets - tier.freeCount;
  const bundleTotal = activeVariantPrices
    .slice(0, paidCount)
    .reduce((sum, v) => sum + v.priceCents, 0);
  const bundleCompare = activeVariantPrices.reduce(
    (sum, v) => sum + v.compareAtCents,
    0,
  );

  // Fallback per-sheet prices from product base (used for tier cards when tier not selected)
  const perSheet = product.priceCents;
  const perSheetCompare = product.compareAtCents;

  const giftProduct = getProductBySlug("grounding-mat");

  function priceForTier(t: Tier) {
    const tierChoices = choices[t.id];
    const paidN = t.sheets - t.freeCount;
    return tierChoices
      .slice(0, paidN)
      .reduce(
        (sum, choice) =>
          sum + getVariant(product, choice.colorId, choice.sizeId).priceCents,
        0,
      );
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
    patch: Partial<SheetChoice>,
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
    }));
    setSheetBundle(selections, tier.freeCount);
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
          <span className="block">Premium</span>
          <span className="block">Grounding Sheets</span>
        </h1>

        {product.id === "grounding-flat-sheet" ? (
          <ul className="mt-5 lg:mt-6 space-y-3 lg:space-y-4 font-serif text-[15px] lg:text-[16px] text-[var(--plum)]">
            <li className="flex items-start gap-3">
              <Moon className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">DEEP, RESTORATIVE SLEEP:</strong> Settle nervous tension to fall asleep faster.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">JOINT & MUSCLE SOOTHING:</strong> Ease inflammation and wake up with less stiffness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">ALL-DAY ENERGY BOOST:</strong> Experience restorative sleep cycles for renewed vitality.
              </span>
            </li>
          </ul>
        ) : (
          <ul className="mt-5 lg:mt-6 space-y-3 lg:space-y-4 font-serif text-[15px] lg:text-[16px] text-[var(--plum)]">
            <li className="flex items-start gap-3">
              <Moon className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">DEEP, RESTORATIVE SLEEP:</strong> Fall asleep faster by calming nervous tension.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <HeartPulse className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">JOINT & MUSCLE SOOTHING:</strong> Soothe aches to wake up with less joint stiffness.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
              <span className="leading-snug">
                <strong className="font-semibold text-[var(--ink)]">ALL-DAY ENERGY BOOST:</strong> Experience deeper sleep for all-day energy.
              </span>
            </li>
          </ul>
        )}
      </div>

      <DeliveryTimerBox />

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
          
          const isBundle = t.id === "bundle";
          
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
              {/* MOST POPULAR diagonal ribbon for bundle */}
              {t.badge && (
                <div className="absolute top-0 right-0 w-[80px] h-[80px] overflow-hidden pointer-events-none z-20 rounded-tr-2xl">
                  <div className="absolute top-[20px] -right-[17px] w-[100px] origin-center rotate-45 bg-[var(--clay-deep)] py-1 text-center text-[8px] font-black uppercase tracking-widest text-white shadow-sm">
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
                      <h3 className="font-sans text-[14px] sm:text-[15px] font-extrabold text-[var(--ink)] leading-tight uppercase tracking-tight">
                        {t.label}
                      </h3>
                      <p className="mt-1 text-[13.5px] sm:text-[15px] text-[var(--muted)] leading-snug">
                        {t.id === "bundle" ? (
                          <>
                            Includes 2 Sheet Sets, 2 Cables
                            <br className="hidden sm:block" />
                            <span className="sm:hidden">, </span>
                            &amp; <strong>FREE Grounding Mat</strong> ($140 Value)
                          </>
                        ) : (
                          <>Includes 1 Fitted Sheet, 1 Cable</>
                        )}
                      </p>
                    </div>

                    <div className={`flex flex-col items-end text-right shrink-0 pt-0.5 ${t.badge ? 'pr-20 sm:pr-24' : ''}`}>
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
                      {savings > 0 && (
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
                  <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                    <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                      Customize Your Selection
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSizeGuide(true);
                      }}
                      className="text-[11px] font-bold uppercase tracking-wider text-[var(--night)] hover:opacity-70 transition-opacity underline underline-offset-2"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                    {Array.from({ length: t.sheets }).map((_, index) => (
                      <SheetRow
                        key={`${t.id}-${index}`}
                        product={product}
                        index={index}
                        showIndex={t.sheets > 1}
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
              Add To Cart + 3 Free gifts
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
              : "Add To Cart + 3 Free gifts"}
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

      {/* Free gifts bundle */}
      {giftProduct && (
        <section className="mt-8 mb-6 bg-[color-mix(in_oklch,var(--gold)_4%,var(--paper))] p-5 rounded-2xl border border-[color-mix(in_oklch,var(--gold)_20%,transparent)]" id="free-gifts">
          <div className="text-center mb-6 flex flex-col items-center">
            <h2 className="juujo-display text-2xl sm:text-3xl font-medium text-[var(--ink)]">
              Summer Sleep Sale
            </h2>
            <p className="juujo-mono mt-2 inline-flex items-center justify-center gap-1.5 flex-wrap rounded px-3 py-1 text-[11px] sm:text-[13px] font-bold tracking-widest text-[var(--ink)] bg-[color-mix(in_oklch,var(--gold)_15%,transparent)]">
              <span className="juujo-display text-[13px] sm:text-base font-extrabold normal-case text-[var(--ink)]">
                {formatMoney((giftProduct.compareAtCents || giftProduct.priceCents) + 2900 + 3900, giftProduct.currency)}
              </span>
              <span>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            {
              id: "premium-packaging",
              name: "Premium Packaging",
              valueCents: 2900,
              image: "/images/juujo_premium_packaging_v2.png",
            },
            {
              id: "grounding-mat",
              name: giftProduct.name,
              valueCents: giftProduct.compareAtCents || giftProduct.priceCents,
              image: "/images/grounding_mat_gift.png",
            },
            {
              id: "sleep-app",
              name: "Sleep Monitoring App",
              valueCents: 3900,
              image: "/images/sleep_monitoring_app.png",
            }
          ].map((gift) => (
            <div
              key={gift.id}
              className={`group relative flex flex-col rounded-xl border bg-white p-2 pt-4 text-center transition ${gift.id === 'grounding-mat' ? 'scale-[1.03] z-10 shadow-md border-[var(--clay)]' : 'hover:-translate-y-1 border-[var(--border)]'}`}
            >
              <span
                className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white bg-[var(--night)]"
              >
                Free
                <span className="font-medium normal-case line-through opacity-80">
                  {formatMoney(gift.valueCents, giftProduct.currency)}
                </span>
              </span>
              <span className="relative mt-2 aspect-square w-full overflow-hidden mix-blend-multiply">
                <Image
                  alt={gift.name}
                  className="rounded-xl object-cover transition-transform group-hover:scale-105"
                  fill
                  sizes="120px"
                  src={gift.image}
                />
              </span>
              <span className="mt-2 text-[11px] font-semibold leading-tight text-[var(--ink)] sm:text-xs">
                {gift.name}
              </span>
            </div>
          ))}
          </div>
        </section>
      )}
      
      {/* Accordions */}
      <GroundingAccordions />
      
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative inline-flex max-w-[95vw] max-h-[95vh] md:max-w-5xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-0 right-0 z-10 p-2 bg-white text-black hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src="/media/products/grounding-sheets/images/juujo-size-guide.png"
              alt="Size Guide"
              className="max-w-[95vw] md:max-w-5xl max-h-[95vh] object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/** One sheet's colour + size selectors (a row inside a bundle tier). */
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
  choice: SheetChoice;
  onChange: (patch: Partial<SheetChoice>) => void;
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
        Colour for sheet {index + 1}
      </label>
      <ColorSelect
        value={choice.colorId}
        onChange={handleColorChange}
        colors={product.colors}
        isColorInStock={isColorInStock}
      />
      <label className="sr-only" htmlFor={`size-${index}`}>
        Size for sheet {index + 1}
      </label>
      <div className="relative flex-1">
        <SizeSelect
          value={choice.sizeId}
          onChange={(sizeId) => onChange({ sizeId })}
          sizes={product.sizes}
          isSizeInStock={(sizeId) => isSizeInStock(choice.colorId, sizeId)}
        />
        {soldOut && (
          <span className="font-serif mt-1 block text-[11px] font-medium text-[var(--night)]">
            Out of stock, pick another size
          </span>
        )}
      </div>
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
        <span className="truncate block">{selected?.name}</span>
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
                  {color.name}
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

function SizeSelect({
  value,
  onChange,
  sizes,
  isSizeInStock,
}: {
  value: string;
  onChange: (val: string) => void;
  sizes: Product["sizes"];
  isSizeInStock: (sizeId: string) => boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = sizes.find((s) => s.id === value);

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="font-serif w-full appearance-none rounded-xl border bg-white py-2.5 pl-3 pr-8 sm:pr-9 text-left text-xs sm:text-sm text-[var(--ink)] outline-none transition focus:border-[var(--night)]"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="truncate block">
          {selected?.name} {selected?.dimensions ? `(${selected.dimensions})` : ""}
        </span>
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
          {sizes.map((size) => {
            const inStock = isSizeInStock(size.id);
            return (
              <li key={size.id}>
                <button
                  type="button"
                  disabled={!inStock}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (!inStock) return;
                    onChange(size.id);
                    setOpen(false);
                  }}
                  className={`font-serif flex w-full flex-col px-3 py-2 text-xs sm:text-sm text-left text-[var(--ink)] ${
                    inStock
                      ? "hover:bg-gray-50 focus:bg-gray-50 cursor-pointer"
                      : "opacity-40 cursor-not-allowed"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>
                      {size.name} {size.dimensions ? `(${size.dimensions})` : ""}
                    </span>
                    {!inStock && (
                      <span className="ml-2 text-[10px] sm:text-[11px] font-medium text-[var(--night)] whitespace-nowrap">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
