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
import { formatMoney } from "@/lib/money";

/**
 * Grounding-sheet buy-box. Layout modelled on the grounding.co product page
 * (image colour swatches -> size rows with dimensions + size guide -> quantity
 * stepper -> price with SAVE -> a "Most Popular" bundle add-on -> add to cart),
 * built in Juujo's own theme, copy, and colour tokens. Scoped to the grounding
 * sheet only; other products keep the standard buy-box.
 */
export function GroundingBuyBox({ product }: { product: Product }) {
  const { addToCartVariant } = useCart();
  const router = useRouter();

  const [colorId, setColorId] = useState(product.colors[0]?.id);
  const [sizeId, setSizeId] = useState(product.sizes[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);

  const variant = useMemo(
    () => getVariant(product, colorId, sizeId),
    [product, colorId, sizeId],
  );

  const lineTotal = variant.priceCents * quantity;
  const compareTotal = variant.compareAtCents * quantity;
  const savings = Math.max(compareTotal - lineTotal, 0);

  const giftProduct = getProductBySlug("grounding-mat");

  function handleAddToCart() {
    setIsNavigating(true);
    addToCartVariant(product, quantity, variant.variantId);
    router.push("/cart");
  }

  const selectedColor = product.colors.find((c) => c.id === colorId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="juujo-eyebrow">{product.categoryLabel}</p>
        <h1 className="font-serif text-[var(--plum)] mt-2 !text-[clamp(1.1rem,4.5vw,2.5rem)] whitespace-nowrap leading-[1.02] tracking-tight">{product.name}</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span aria-hidden className="text-[var(--gold)]">
            {"★★★★★"}
          </span>
          <span>
            {product.rating.toFixed(1)} from 4274 reviews
          </span>
        </p>
        <p className="mt-4 max-w-prose text-[var(--muted)]">{product.shortDescription}</p>
      </div>

      {/* Price with SAVE */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-[var(--ink)]">
          {formatMoney(lineTotal, product.currency)}
        </span>
        {compareTotal > lineTotal && (
          <span className="text-lg text-[var(--muted)] line-through">
            {formatMoney(compareTotal, product.currency)}
          </span>
        )}
        {savings > 0 && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white"
            style={{ backgroundColor: "var(--gold)" }}
          >
            Save {formatMoney(savings, product.currency)}
          </span>
        )}
      </div>

      {/* Colour swatches */}
      {product.colors.length > 0 && (
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium text-[var(--ink)]">
            Colour: <span className="text-[var(--muted)]">{selectedColor?.name}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => {
              const selected = color.id === colorId;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setColorId(color.id)}
                  aria-pressed={selected}
                  aria-label={color.name}
                  title={color.name}
                  className="relative h-12 w-12 overflow-hidden rounded-xl border transition-transform duration-150 ease-out active:scale-[0.94]"
                  style={{
                    borderColor: selected ? "var(--gold)" : "var(--border)",
                    boxShadow: selected ? "0 0 0 2px var(--paper), 0 0 0 4px var(--gold)" : "none",
                  }}
                >
                  {color.image ? (
                    <Image src={color.image} alt={color.name} fill sizes="48px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0" style={{ backgroundColor: color.hex }} />
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Size rows */}
      {product.sizes.length > 0 && (
        <fieldset className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-medium text-[var(--ink)]">Size</legend>
            <a href="/pages/faqs" className="text-sm text-[var(--gold)] underline underline-offset-2">
              Size guide
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size) => {
              const selected = size.id === sizeId;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSizeId(size.id)}
                  aria-pressed={selected}
                  className="flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-transform duration-150 ease-out active:scale-[0.99]"
                  style={{
                    borderColor: selected ? "var(--gold)" : "var(--border)",
                    backgroundColor: selected
                      ? "color-mix(in oklch, var(--gold) 10%, var(--paper))"
                      : "var(--card)",
                  }}
                >
                  <span className="font-medium text-[var(--ink)]">{size.name}</span>
                  {size.dimensions && (
                    <span className="text-sm text-[var(--muted)]">{size.dimensions}</span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Quantity stepper */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--ink)]">Quantity</span>
        <div
          className="flex items-center gap-4 rounded-full border px-2 py-1"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-8 w-8 rounded-full text-lg text-[var(--ink)] transition-transform duration-150 ease-out active:scale-[0.9]"
          >
            −
          </button>
          <span className="min-w-6 text-center font-medium text-[var(--ink)]">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="h-8 w-8 rounded-full text-lg text-[var(--ink)] transition-transform duration-150 ease-out active:scale-[0.9]"
          >
            +
          </button>
        </div>
      </div>

      {/* Free Gift */}
      {giftProduct && (
        <div
          className="relative flex items-center gap-4 rounded-2xl border p-3 text-left transition-transform duration-150 ease-out"
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
          <span className="relative h-14 w-14 flex-none overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <Image src={giftProduct.cartImage} alt={giftProduct.name} fill sizes="56px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-[var(--ink)]">{giftProduct.name}</span>
            <span className="block text-sm text-[var(--muted)]">Worth {formatMoney(giftProduct.priceCents, giftProduct.currency)}</span>
          </span>
          <span className="text-right">
            <span className="block font-semibold text-[var(--gold)] uppercase tracking-wider text-sm">
              Free
            </span>
          </span>
        </div>
      )}

      {/* Add to cart */}
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
              ADD TO CART {"·"} {formatMoney(lineTotal, product.currency)}
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
            ADD TO CART {"·"} {formatMoney(lineTotal, product.currency)}
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
    </div>
  );
}
