"use client";

import { useState } from "react";
import { CheckCircle2, Tag, X } from "lucide-react";
import { useCart } from "./CartProvider";

export function PromoCodeBox() {
  const { activePromoCodes, applyPromoCode, removePromoCode } = useCart();
  const [inputValue, setInputValue] = useState("");

  const handleApply = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      applyPromoCode(inputValue.trim());
      setInputValue("");
    }
  };

  const hasCodes = activePromoCodes.length > 0;

  return (
    <div className="flex flex-col gap-3">
        {hasCodes ? (
          <div className="flex flex-col gap-2">
            {activePromoCodes.map((code) => (
              <div key={code} className="flex items-center justify-between rounded-lg bg-[var(--cream)] px-3 py-2 border border-[var(--border)]">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                  <CheckCircle2 size={16} className="text-[var(--clay)]" />
                  {code}
                </span>
                <button
                  onClick={() => removePromoCode(code)}
                  className="text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                  aria-label="Remove promo code"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : null}

        <form onSubmit={handleApply} className="flex gap-2 mt-1">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--muted)]">
              <Tag size={16} />
            </div>
            <input
              type="text"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--cream)] py-2.5 pl-10 pr-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--ink)]"
              placeholder="ENTER PROMO CODE"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[var(--ink)] px-4 py-2.5 text-sm font-bold text-[var(--cream)] transition-transform hover:scale-[1.02] active:scale-[0.98] juujo-display"
          >
            APPLY
          </button>
        </form>
    </div>
  );
}
