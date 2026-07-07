"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import {
  getProductBySlug,
  getVariant,
  type Product,
} from "@/data/products";
import { DeliveryTimerBox } from "./DeliveryTimerBox";
import { GroundingAccordions } from "./GroundingAccordions";
import { formatMoney } from "@/lib/money";

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
  const [choices, setChoices] = useState<SheetChoice[]>([
    defaultChoice,
    defaultChoice,
    defaultChoice,
  ]);
  const [isNavigating, setIsNavigating] = useState(false);

  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0];
  const activeChoices = choices.slice(0, tier.sheets);

  const perSheet = product.priceCents;
  const perSheetCompare = product.compareAtCents;
  const paidCount = tier.sheets - tier.freeCount;
  const bundleTotal = perSheet * paidCount;
  const bundleCompare = perSheetCompare * tier.sheets;
  const bundleSavings = Math.max(bundleCompare - bundleTotal, 0);

  const giftProduct = getProductBySlug("grounding-mat");

  function priceForTier(t: Tier) {
    return perSheet * (t.sheets - t.freeCount);
  }
  function compareForTier(t: Tier) {
    return perSheetCompare * t.sheets;
  }

  function updateChoice(index: number, patch: Partial<SheetChoice>) {
    setChoices((current) => {
      const next = [...current];
      next[index] = { ...next[index], ...patch };
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
        <p className="juujo-eyebrow">{product.categoryLabel}</p>
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[clamp(1.1rem,4.5vw,2.5rem)] leading-[1.02] tracking-tight">
          {product.name}
        </h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span aria-hidden className="text-[var(--gold)]">
            {"★★★★★"}
          </span>
          <span>{product.rating.toFixed(1)} from 4274 reviews</span>
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Available in White, Grey and Green
        </p>
      </div>

      {/* Bundle heading */}
      <div className="flex items-center gap-3">
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        <span className="juujo-mono text-center text-xs font-semibold uppercase tracking-wider text-[var(--plum)]">
          Bundle &amp; Save + Free Shipping &amp; Gifts
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
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
                onClick={() => setTierId(t.id)}
                aria-pressed={selected}
                className="flex w-full items-center gap-3 p-4 text-left transition-transform duration-150 ease-out active:scale-[0.995]"
              >
                <span
                  className="grid h-5 w-5 flex-none place-items-center rounded-full border-2"
                  style={{ borderColor: selected ? "var(--gold)" : "var(--border)" }}
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
                    <span className="text-lg font-semibold text-[var(--ink)]">
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
                  <span className="mt-0.5 block text-sm text-[var(--muted)]">
                    {t.freeCount > 0
                      ? `Only ${formatMoney(perUnit, product.currency)} per sheet!`
                      : `${formatMoney(perSheet, product.currency)} per sheet`}
                  </span>
                </span>
                <span className="flex-none text-right">
                  <span className="block text-lg font-semibold text-[var(--ink)]">
                    {formatMoney(total, product.currency)}
                  </span>
                  {compare > total && (
                    <span className="block text-sm text-[var(--muted)] line-through">
                      {formatMoney(compare, product.currency)}
                    </span>
                  )}
                </span>
              </button>

              {/* Per-sheet selectors, only for the selected tier */}
              {selected && (
                <div className="flex flex-col gap-3 border-t px-4 py-4" style={{ borderColor: "var(--border)" }}>
                  <div className="text-xs text-[var(--muted)] -mb-1">Color, Size</div>
                  {Array.from({ length: t.sheets }).map((_, index) => (
                    <SheetRow
                      key={index}
                      product={product}
                      index={index}
                      showIndex={t.sheets > 1}
                      choice={choices[index]}
                      onChange={(patch) => updateChoice(index, patch)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Free grounding mat */}
      {giftProduct && (
        <div
          className="relative flex items-center gap-4 rounded-2xl border p-3 text-left"
          style={{
            borderColor: "var(--gold)",
            backgroundColor: "color-mix(in oklch, var(--gold) 8%, var(--paper))",
          }}
        >
          <span
            className="absolute -top-2 left-4 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
            style={{ backgroundColor: "var(--gold)" }}
          >
            Free gift
          </span>
          <span
            className="relative h-16 w-16 flex-none overflow-hidden rounded-lg border"
            style={{ borderColor: "var(--border)" }}
          >
            <Image
              src={giftProduct.cartImage}
              alt={giftProduct.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-[var(--ink)]">{giftProduct.name}</span>
            <span className="block text-sm text-[var(--muted)]">
              Free with every order. Worth{" "}
              {formatMoney(giftProduct.priceCents, giftProduct.currency)}.
            </span>
          </span>
          <span className="text-right">
            <span className="block text-sm font-semibold uppercase tracking-wider text-[var(--gold)]">
              Free
            </span>
          </span>
        </div>
      )}

      <DeliveryTimerBox />

      {/* Add to cart */}
      <Button
        id="hero-cta"
        disabled={isNavigating || outOfStock}
        onClick={handleAddToCart}
        className={`proxy-bundle-btn w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--ink)] active:scale-[0.98] sm:text-[22px] ${!isNavigating ? "" : "disabled:!opacity-100"}`}
      >
        {isNavigating ? (
          <>
            <span style={{ visibility: "hidden" }} className="relative z-20 whitespace-nowrap">
              ADD TO CART {"·"} {formatMoney(bundleTotal, product.currency)}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Lottie animationData={loadingLottie} loop className="h-16 w-24 scale-[1.35]" />
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

      {/* Trust row */}
      {product.badges.length > 0 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          {product.badges.map((badge) => (
            <li key={badge} className="flex items-center gap-2">
              <span aria-hidden className="text-[var(--gold)]">
                {"✓"}
              </span>
              {badge}
            </li>
          ))}
        </ul>
      )}

      {/* Accordions */}
      <GroundingAccordions />
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
  const selectedColor = product.colors.find((c) => c.id === choice.colorId);

  return (
    <div className="flex items-center gap-3">
      {showIndex && (
        <span className="juujo-mono w-6 flex-none text-sm text-[var(--muted)]">
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
          className="w-full appearance-none rounded-xl border bg-[var(--card)] py-2.5 pl-3 pr-8 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--gold)]"
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        {soldOut && (
          <span className="mt-1 block text-[11px] font-medium text-[var(--clay-deep)]">
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
        className="w-full appearance-none rounded-xl border bg-[var(--card)] py-2.5 pl-9 pr-8 text-left text-sm text-[var(--ink)] outline-none transition focus:border-[var(--gold)]"
        style={{ borderColor: "var(--border)" }}
      >
        {selected && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-[3px] border"
            style={{ backgroundColor: selected.hex, borderColor: "rgba(0,0,0,0.1)" }}
          />
        )}
        {selected?.name}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white py-1 shadow-lg" style={{ borderColor: "var(--border)" }}>
          {colors.map((color) => (
            <li key={color.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(color.id);
                  setOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 text-sm text-left hover:bg-gray-50 focus:bg-gray-50 text-[var(--ink)]"
              >
                <span
                  className="mr-2 h-4 w-4 flex-none rounded-[3px] border"
                  style={{ backgroundColor: color.hex, borderColor: "rgba(0,0,0,0.1)" }}
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
