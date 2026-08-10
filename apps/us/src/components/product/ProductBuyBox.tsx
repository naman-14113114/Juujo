"use client";

/* eslint-disable @next/next/no-img-element -- Sleep-mask swatches reuse the exact preloaded product source URLs. */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import Lottie from "lottie-react";
import loadingLottie from "../cart/loading-lottie.json";
import { Button } from "@/components/ui/Button";
import {
  getVariant,
  totalPriceForTier,
  unitPriceForTier,
  type Product,
  type QuantityTier,
} from "@/data/products";
import { market } from "@/lib/market";
import { DeliveryTimerBox } from "./DeliveryTimerBox";
import { GroundingMatAccordions } from "./GroundingMatAccordions";
import { SleepMaskAccordions } from "./SleepMaskAccordions";
import {
  isSleepMaskColor,
  sleepMaskMedia,
} from "@/data/sleepMaskMedia";
import {
  Feather,
  Leaf,
  Moon,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/**
 * The Juujo purchase panel. Category-agnostic and variant-aware:
 * colour swatches + size selector drive a live price, and the Buy 1 / 2 / 3
 * quantity offer (recommended tier pre-selected) replaces the old free-gift
 * bundle. Add to cart and Buy now both resolve the selected variant.
 */
export function ProductBuyBox({
  product,
  colorId: controlledColorId,
  onColorChange,
}: {
  product: Product;
  colorId?: string;
  onColorChange?: (colorId: string) => void;
}) {
  const { addToCartVariant } = useCart();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const [internalColorId, setInternalColorId] = useState(
    product.colors[0]?.id,
  );
  const colorId = controlledColorId ?? internalColorId;
  const colorOptions = useMemo(() => {
    if (product.category !== "premium-sleep-mask") {
      return product.colors;
    }

    const order = ["green", "pink", "black"];
    return order
      .map((id) => product.colors.find((color) => color.id === id))
      .filter((color): color is Product["colors"][number] => Boolean(color));
  }, [product]);
  const firstInStockSize =
    product.sizes.find((size) =>
      product.variants.some(
        (variant) => variant.sizeId === size.id && variant.inStock,
      ),
    ) ?? product.sizes[0];
  const [sizeId, setSizeId] = useState(firstInStockSize?.id);

  const recommendedIndex = Math.max(
    0,
    product.quantityTiers.findIndex((tier) => tier.recommended),
  );
  const [tierIndex, setTierIndex] = useState(recommendedIndex);

  const variant = useMemo(
    () => getVariant(product, colorId, sizeId),
    [product, colorId, sizeId],
  );
  const tier = product.quantityTiers[tierIndex] ?? product.quantityTiers[0];

  const totalPrice = totalPriceForTier(variant, tier);
  const compareTotal = variant.compareAtCents * tier.quantity;
  const savings = Math.max(compareTotal - totalPrice, 0);
  const salePercent =
    compareTotal > 0 ? Math.round((savings / compareTotal) * 100) : 0;

  function sizeInStock(id: string) {
    return product.variants.some(
      (entry) =>
        entry.sizeId === id &&
        entry.colorId === (colorId ?? variant.colorId) &&
        entry.inStock,
    );
  }

  function handleAddToCart() {
    setIsNavigating(true);
    addToCartVariant(product, tier.quantity, variant.variantId);
    router.push("/cart");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        {product.category === "premium-sleep-mask" ? (
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
              {product.rating.toFixed(1)} · TRUSTED BY 40,000+ CUSTOMERS
            </span>
          </a>
        ) : (
          <p className="juujo-eyebrow">{product.categoryLabel}</p>
        )}
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[clamp(1.3rem,4.5vw,2.6rem)] whitespace-nowrap tracking-tight leading-[1.02]">
          {product.name}
        </h1>
        {product.category === "premium-sleep-mask" ? (
          <ul className="mt-5 space-y-3 text-[16px] text-[var(--plum)] lg:mt-6 lg:space-y-4 lg:text-[18px]">
            <li className="flex items-start gap-3">
              <Moon
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#219937]"
                size={22}
                strokeWidth={1.5}
              />
              <span className="leading-snug">
                Block every distracting ray with 100% blackout coverage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#219937]"
                size={22}
                strokeWidth={1.5}
              />
              <span className="leading-snug">
                Rest against smooth, breathable 22 Momme mulberry silk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Feather
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-[#219937]"
                size={22}
                strokeWidth={1.5}
              />
              <span className="leading-snug">
                Stay comfortably secure with cloud-soft wraparound padding.
              </span>
            </li>
          </ul>
        ) : (
          <>
            <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
              <span aria-hidden className="text-[var(--gold)]">
                {"★★★★★"}
              </span>
              <span>
                {product.rating.toFixed(1)} from{" "}
                {product.reviewCount.toLocaleString()} reviews
              </span>
            </p>
            <p className="juujo-body-copy mt-4 max-w-prose text-[var(--muted)]">
              {product.shortDescription}
            </p>
          </>
        )}
        {product.category === "premium-sleep-mask" && (
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="juujo-display text-3xl font-semibold text-[var(--plum)]">
              {formatMoney(totalPrice, product.currency)}
            </span>
            <span className="text-lg text-[var(--muted)] line-through">
              {formatMoney(compareTotal, product.currency)}
            </span>
            {salePercent > 0 && (
              <span className="rounded-full bg-[var(--ink)] px-3 py-1 text-xs font-semibold uppercase text-[var(--cream)]">
                Save {salePercent}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* Colour */}
      {product.colors.length > 0 && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Colour: {product.colors.find((c) => c.id === colorId)?.name}
          </legend>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color) => {
              const selected = color.id === colorId;
              const sleepMaskSwatch = isSleepMaskColor(color.id)
                ? sleepMaskMedia[color.id].swatch
                : undefined;

              if (product.category === "premium-sleep-mask" && sleepMaskSwatch) {
                return (
                  <button
                    aria-label={color.name}
                    aria-pressed={selected}
                    className="relative h-[72px] w-[72px] overflow-hidden rounded-full border bg-white p-2 transition-transform duration-150 ease-out active:scale-[0.97]"
                    key={color.id}
                    onClick={() => {
                      setInternalColorId(color.id);
                      onColorChange?.(color.id);
                    }}
                    style={{
                      borderColor: selected ? "var(--ink)" : "var(--border)",
                      boxShadow: selected
                        ? "0 0 0 1px var(--ink)"
                        : "none",
                    }}
                    title={color.name}
                    type="button"
                  >
                    <img
                      alt=""
                      className="h-full w-full object-contain"
                      decoding="async"
                      height={72}
                      loading="eager"
                      src={sleepMaskSwatch.src}
                      width={84}
                    />
                  </button>
                );
              }

              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => {
                    setInternalColorId(color.id);
                    onColorChange?.(color.id);
                  }}
                  aria-pressed={selected}
                  aria-label={color.name}
                  title={color.name}
                  className="relative h-10 w-10 rounded-full border transition-transform duration-150 ease-out active:scale-[0.94]"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: selected ? "var(--gold)" : "var(--border)",
                    boxShadow: selected
                      ? "0 0 0 2px var(--paper), 0 0 0 4px var(--gold)"
                      : "none",
                  }}
                >
                  {selected && (
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center text-sm font-bold"
                      style={{ color: "#fff", mixBlendMode: "difference" }}
                    >
                      {"✓"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Size */}
      {product.sizes.length > 0 &&
        product.category !== "premium-sleep-mask" && (
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Size
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => {
              const selected = size.id === sizeId;
              const inStock = sizeInStock(size.id);
              return (
                <button
                  key={size.id}
                  type="button"
                  disabled={!inStock}
                  onClick={() => setSizeId(size.id)}
                  aria-pressed={selected}
                  className="rounded-full border px-4 py-2 text-sm transition-transform duration-150 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    borderColor: selected ? "var(--gold)" : "var(--border)",
                    backgroundColor: selected
                      ? "color-mix(in oklch, var(--gold) 12%, var(--paper))"
                      : "transparent",
                    color: "var(--ink)",
                  }}
                >
                  <span className="font-medium">{size.name}</span>
                  {size.dimensions && (
                    <span className="ml-2 text-[var(--muted)]">
                      {size.dimensions}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Quantity offer: Buy 1 / Buy 2 / Buy 3 */}
      {product.quantityTiers.length > 1 && (
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Choose your bundle
          </legend>
        <div className="flex flex-col gap-2">
          {product.quantityTiers.map((offer: QuantityTier, index) => {
            const selected = index === tierIndex;
            const offerUnit = unitPriceForTier(variant, offer);
            const offerTotal = totalPriceForTier(variant, offer);
            const offerCompare = variant.compareAtCents * offer.quantity;
            return (
              <button
                key={offer.label}
                type="button"
                onClick={() => setTierIndex(index)}
                aria-pressed={selected}
                className="flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition-transform duration-150 ease-out active:scale-[0.99]"
                style={{
                  borderColor: selected ? "var(--gold)" : "var(--border)",
                  backgroundColor: selected
                    ? "color-mix(in oklch, var(--gold) 10%, var(--paper))"
                    : "var(--card)",
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full border"
                    style={{
                      borderColor: selected ? "var(--gold)" : "var(--border)",
                      backgroundColor: selected ? "var(--gold)" : "transparent",
                    }}
                  >
                    {selected && (
                      <span className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </span>
                  <span>
                    <span className="block font-medium text-[var(--ink)]">
                      {offer.label}
                      {offer.badge && (
                        <span
                          className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold"
                          style={{
                            backgroundColor: offer.recommended
                              ? "var(--gold)"
                              : "color-mix(in oklch, var(--gold) 16%, var(--paper))",
                            color: offer.recommended ? "#fff" : "var(--ink)",
                          }}
                        >
                          {offer.badge}
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-[var(--muted)]">
                      {formatMoney(offerUnit, product.currency)} each
                    </span>
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-semibold text-[var(--ink)]">
                    {formatMoney(offerTotal, product.currency)}
                  </span>
                  {offerCompare > offerTotal && (
                    <span className="block text-sm text-[var(--muted)] line-through">
                      {formatMoney(offerCompare, product.currency)}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
        </fieldset>
      )}

      {/* Live price + actions */}
      <div className="flex flex-col gap-3">
        <DeliveryTimerBox compact={product.category === "premium-sleep-mask"} />

        <Button
          id="hero-cta"
          disabled={isNavigating}
          onClick={handleAddToCart}
          className={`proxy-bundle-btn w-full rounded-[30px] border border-[var(--ink)] bg-[var(--ink)] py-4 text-xl font-bold uppercase tracking-wide text-[var(--cream)] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--gold)] hover:bg-[var(--ink)] active:scale-[0.98] sm:text-[22px] ${!isNavigating ? "" : "disabled:!opacity-100"}`}
        >
          {isNavigating ? (
            <>
              <span
                style={{ visibility: "hidden" }}
                className="relative z-20 whitespace-nowrap"
              >
                {product.category === "premium-sleep-mask" ? "Add To Cart + Free Shipping" : "Add To Cart + 3 Free gifts"}
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
              {product.category === "premium-sleep-mask" ? "Add To Cart + Free Shipping" : "Add To Cart + 3 Free gifts"}
            </span>
          )}
        </Button>
      </div>

      {product.category === "premium-sleep-mask" && (
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
      )}

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

      {product.category === "grounding-mat" && <GroundingMatAccordions />}
      {product.category === "premium-sleep-mask" && <SleepMaskAccordions />}
    </div>
  );
}
