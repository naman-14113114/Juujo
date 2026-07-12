"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartLine } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { useCart } from "./CartProvider";

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQuantity, removeProduct, removeLine } = useCart();

  // Bundle sheets and the free mat are fixed single units: no quantity stepper.
  // Bundle sheets can still be removed (by their unique line id); the free gift
  // and free bundle sheet are locked.
  const isGift = line.type === "gift";
  const isBundle = Boolean(line.bundle);
  const isFree = Boolean(line.free) || line.unitPriceCents === 0;
  const showStepper = !isGift && !isBundle && !line.locked;
  const canRemove = isBundle ? !line.free : !isGift && !line.locked;

  return (
    <div className="flex gap-4 border-b border-[var(--border)] py-5">
      {((line.type === "product" && line.slug) || line.title === "Juujo Grounding Mat") ? (
        <Link
          aria-label={`View ${line.title}`}
          className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-[var(--blush)] transition hover:opacity-90"
          href={line.title === "Juujo Grounding Mat" ? "/products/grounding-mat" : `/products/${line.slug}`}
        >
          <Image
            alt={line.title}
            className="object-cover"
            fill
            loading="eager"
            sizes="80px"
            src={line.image}
          />
        </Link>
      ) : (
        <div className="relative h-24 w-20 flex-none overflow-hidden rounded-lg bg-[var(--blush)]">
          <Image
            alt={line.title}
            className="object-cover"
            fill
            loading="lazy"
            sizes="80px"
            src={line.image}
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="juujo-display text-lg leading-tight text-[var(--plum)]">
              {line.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{line.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="juujo-display text-lg text-[var(--plum)]">
              {line.unitPriceCents === 0
                ? "Free"
                : formatMoney(line.unitPriceCents)}
            </p>
            {line.compareAtCents ? (
              <p className="text-xs text-[var(--muted)] line-through">
                {formatMoney(line.compareAtCents)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          {isGift || isFree ? (
            <span className="juujo-mono rounded-full bg-[rgba(184,149,86,.12)] px-3 py-1 text-[var(--gold)]">
              {isGift ? "Free gift" : "Free sheet"}
            </span>
          ) : showStepper ? (
            <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]">
              <button
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-decrease-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity - 1)}
                type="button"
              >
                <Minus size={14} />
              </button>
              <span className="juujo-mono min-w-8 text-center text-[var(--plum)]">
                {line.quantity}
              </span>
              <button
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center"
                data-testid={`quantity-increase-${line.productId}`}
                onClick={() => setQuantity(line.productId, line.quantity + 1)}
                type="button"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <span className="juujo-mono text-xs text-[var(--muted)]">
              Qty {line.quantity}
            </span>
          )}
          {canRemove ? (
            <button
              aria-label={`Remove ${line.title}`}
              className="inline-flex items-center gap-2 text-xs text-[var(--muted)] transition hover:text-[var(--plum)]"
              data-testid={`remove-${line.id}`}
              onClick={() => (isBundle ? removeLine(line.id) : removeProduct(line.productId))}
              type="button"
            >
              <Trash2 size={14} />
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
