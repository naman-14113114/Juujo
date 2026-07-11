"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Hexagon, Home, ShieldCheck, RefreshCw, Leaf } from "lucide-react";
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
          <span className="block">Grounding Mat</span>
        </h1>

        <ul className="mt-5 lg:mt-6 space-y-3 lg:space-y-4 font-serif text-[15px] lg:text-[16px] text-[var(--plum)]">
          <li className="flex items-start gap-3">
            <Hexagon className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              <strong className="font-semibold text-[var(--ink)]">CONDUCTIVE CARBON SURFACE:</strong> Engineered for maximum grounding conductivity.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Home className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              <strong className="font-semibold text-[var(--ink)]">VERSATILE DESIGN:</strong> Perfect for use on your desk, couch, or floor.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck className="text-[var(--night)] shrink-0 mt-0.5" strokeWidth={1.5} size={22} />
            <span className="leading-snug">
              <strong className="font-semibold text-[var(--ink)]">DURABLE & LOW MAINTENANCE:</strong> Easy to clean and built to last.
            </span>
          </li>
        </ul>
      </div>

      <DeliveryTimerBox />

      {/* Bundle heading */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[var(--night)]">
          Bundle &amp; Save
        </span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      {/* Tiers */}
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
              className={`relative rounded-2xl border transition-colors ${selected ? 'border-[var(--night)] bg-[rgba(247,241,232,0.85)] border-[2px]' : 'border-[var(--border)] bg-transparent'}`}
            >
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
                        {t.freeCount > 0
                          ? `Only ${formatMoney(perUnit, product.currency)} per mat!`
                          : `${formatMoney(perSheet, product.currency)}`}
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

              {expandedTier === t.id && (
                <div className="bg-[rgba(247,241,232,0.85)] border-t border-[var(--border)] rounded-b-[15px]">
                  <div className="flex justify-between items-center px-4 sm:px-5 py-3 border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                    <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                       Customize Your Selection
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col gap-2">
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
                </div>
              )}
            </div>
          );
        })}
      </div>

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
        <SizeSelect
          value={choice.sizeId}
          onChange={(sizeId) => onChange({ sizeId })}
          sizes={product.sizes}
          isSizeInStock={(sizeId) => {
            const v = getVariant(product, colorId, sizeId);
            return v.inStock && !!v.variantId;
          }}
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
