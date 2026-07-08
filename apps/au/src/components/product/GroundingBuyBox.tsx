"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getVariant, type Product } from "@/data/products";
import { DeliveryTimerBox } from "./DeliveryTimerBox";
import { GroundingAccordions } from "./GroundingAccordions";
import { formatMoney } from "@/lib/money";
import { Info, X } from "lucide-react";

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
            {product.customerCount || "16,000+"} CUSTOMERS
          </span>
        </a>
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[clamp(1.2rem,4.3vw,2.4rem)] whitespace-nowrap leading-[1.02] tracking-tight">
          Premium Grounding Bed Sheets
        </h1>

        <ul className="mt-4 lg:mt-5 space-y-2 lg:space-y-3 font-serif text-sm lg:text-base text-[var(--plum)]">
          <li className="flex items-start gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--gold)] shrink-0 mt-0.5"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span className="leading-snug">
              <strong>Pure Silver Threads</strong> for maximum conductivity
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--gold)] shrink-0 mt-0.5"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span className="leading-snug">
              <strong>Deep Sleep Support</strong> for a calmer, settled night
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--gold)] shrink-0 mt-0.5"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
            <span className="leading-snug">
              <strong>Machine Washable</strong> and easy to care for
            </span>
          </li>
        </ul>
      </div>
      <DeliveryTimerBox />
      {/* Bundle heading */}
      <div className="flex items-center gap-3">
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border)" }}
        />
        <span className="juujo-mono text-center text-xs font-semibold uppercase tracking-wider text-[var(--plum)]">
          Bundle &amp; Save + Free Shipping &amp; Gifts
        </span>
        <span
          className="h-px flex-1"
          style={{ backgroundColor: "var(--border)" }}
        />
      </div>
      {/* Tier cards */}
      <div className="flex flex-col gap-4">
        {TIERS.map((t) => {
          const selected = t.id === tierId;
          const total = priceForTier(t);
          const compare = compareForTier(t);
          const savings = Math.max(compare - total, 0);
          const perUnit = Math.round(total / t.sheets);

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

              {/* Card header (radio + label + price) */}
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
                      ? `Only ${formatMoney(perUnit, product.currency)} per sheet!`
                      : `${formatMoney(perSheet, product.currency)} per sheet`}
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

              {/* Per-sheet selectors, only for the selected tier */}
              {expandedTier === t.id && (
                <div
                  className="flex flex-col gap-3 border-t px-4 py-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex justify-between items-center -mb-1">
                    <div className="font-serif text-xs text-[var(--muted)]">
                      Color, Size
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs text-[var(--plum)] font-medium hover:opacity-80 transition-opacity underline"
                    >
                      Size Guide
                    </button>
                  </div>
                  {Array.from({ length: t.sheets }).map((_, index) => (
                    <SheetRow
                      key={index}
                      product={product}
                      index={index}
                      showIndex={t.sheets > 1}
                      choice={choices[t.id][index]}
                      onChange={(patch) => updateChoice(t.id, index, patch)}
                      onSizeGuideClick={() => setShowSizeGuide(true)}
                    />
                  ))}
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
      {/* Free gifts bundle */}
      {giftProduct && (
        <section className="mt-8 mb-6" id="free-gifts">
          <div className="text-center mb-8 flex flex-col items-center">
            <h2 className="juujo-display text-3xl font-medium text-[var(--ink)]">
              Summer Sleep Sale
            </h2>
            <p className="juujo-mono mt-2 inline-flex items-center justify-center gap-1.5 flex-wrap rounded px-3 py-1 text-xs sm:text-sm font-bold tracking-widest text-[var(--ink)]" style={{ backgroundColor: "color-mix(in oklch, var(--gold) 15%, transparent)" }}>
              <span className="juujo-display text-sm sm:text-base font-extrabold normal-case text-[var(--ink)]">
                {formatMoney(giftProduct.priceCents + 2900 + 3900, giftProduct.currency)}
              </span>
              <span>VALUE OF FREE GIFTS FOR TODAY ONLY</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
          {[
            {
              id: "premium-packaging",
              name: "Premium Packaging",
              valueCents: 2900,
              image: "/images/juujo_premium_packaging.png",
            },
            {
              id: "grounding-mat",
              name: giftProduct.name,
              valueCents: giftProduct.priceCents,
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
              className={`group relative flex min-h-[140px] flex-col rounded-xl border p-2 pt-5 text-center transition ${gift.id === 'grounding-mat' ? 'scale-[1.03] z-10 shadow-md' : 'hover:-translate-y-1'}`}
              style={{
                borderColor: "var(--gold)",
                backgroundColor: "color-mix(in oklch, var(--gold) 8%, var(--paper))",
              }}
            >
              <span
                className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: "var(--gold)" }}
              >
                Free
                <span className="font-medium normal-case line-through opacity-80">
                  {formatMoney(gift.valueCents, giftProduct.currency)}
                </span>
              </span>
              <span className="relative mt-2 aspect-square w-full overflow-hidden mix-blend-multiply">
                <Image
                  alt={gift.name}
                  className="rounded-2xl object-cover transition-transform group-hover:scale-105"
                  fill
                  sizes="120px"
                  src={gift.image}
                />
              </span>
              <span className="mt-3 text-xs font-semibold leading-tight text-[var(--ink)] sm:text-sm">
                {gift.name}
              </span>
            </div>
          ))}
          </div>
        </section>
      )}{" "}
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
  onSizeGuideClick,
}: {
  product: Product;
  index: number;
  showIndex: boolean;
  choice: SheetChoice;
  onChange: (patch: Partial<SheetChoice>) => void;
  onSizeGuideClick: () => void;
}) {
  const variant = getVariant(product, choice.colorId, choice.sizeId);
  const soldOut = !variant.inStock || !variant.variantId;

  return (
    <div className="flex items-center gap-3">
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
        onChange={(val) => onChange({ colorId: val })}
        colors={product.colors}
      />
      <label className="sr-only" htmlFor={`size-${index}`}>
        Size for sheet {index + 1}
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
      <button
        type="button"
        onClick={onSizeGuideClick}
        className="text-[12px] text-[var(--plum)] font-medium hover:opacity-80 transition-opacity underline whitespace-nowrap"
      >
        Size Guide
      </button>
    </div>
  );
}

function ColorSelect({
  value,
  onChange,
  colors,
}: {
  value: string;
  onChange: (val: string) => void;
  colors: Product["colors"];
}) {
  const [open, setOpen] = useState(false);
  const selected = colors.find((c) => c.id === value);

  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="font-serif w-full appearance-none rounded-xl border bg-[var(--card)] py-2.5 pl-9 pr-8 text-left text-sm text-[var(--ink)] outline-none transition focus:border-[var(--gold)]"
        style={{ borderColor: "var(--border)" }}
      >
        {selected && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-[3px] border"
            style={{
              backgroundColor: selected.hex,
              borderColor: "rgba(0,0,0,0.1)",
            }}
          />
        )}
        {selected?.name}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
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
          className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white py-1 shadow-lg"
          style={{ borderColor: "var(--border)" }}
        >
          {colors.map((color) => (
            <li key={color.id}>
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(color.id);
                  setOpen(false);
                }}
                className="font-serif flex w-full items-center px-3 py-2 text-sm text-left hover:bg-gray-50 focus:bg-gray-50 text-[var(--ink)]"
              >
                <span
                  className="mr-2 h-4 w-4 flex-none rounded-[3px] border"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                />
                {color.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
