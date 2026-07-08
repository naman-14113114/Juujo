"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Product } from "@/data/products";
import {
  calculateCartTotals,
  emptyCart,
  normalizeCartLines,
  upsertProductCartLines,
  type CartState,
} from "@/lib/cart";

type CartContextValue = CartState & {
  isHydrated: boolean;
  isOpen: boolean;
  totals: ReturnType<typeof calculateCartTotals>;
  activePromoCodes: string[];
  addProduct: (product: Product) => void;
  addToCartVariant: (
    product: Product,
    quantity: number,
    variantId?: string,
  ) => void;
  setQuantity: (productId: string, quantity: number) => void;

  removeProduct: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setGiftMessage: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "juujo-cart-v2";
const legacyStorageKey = "juujo-cart-v1";
export const checkoutSnapshotStorageKey = "juujo-cart-checkout-snapshot-v1";

function hasProductLines(state: CartState) {
  return state.lines.some((line) => line.type === "product" && line.quantity > 0);
}

function readStoredCartCandidates() {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return [];
  }

  try {
    return [
      window.localStorage.getItem(storageKey),
      window.localStorage.getItem(checkoutSnapshotStorageKey),
      window.localStorage.getItem(legacyStorageKey),
    ].filter((stored): stored is string => Boolean(stored));
  } catch {
    return [];
  }
}

function readStoredCart() {
  let messageOnlyState: CartState | null = null;

  for (const stored of readStoredCartCandidates()) {
    try {
      const parsed = JSON.parse(stored) as CartState;
      const storedState = {
        ...emptyCart,
        ...parsed,
        lines: normalizeCartLines(Array.isArray(parsed.lines) ? parsed.lines : []),
      };

      if (hasProductLines(storedState)) {
        return storedState;
      }

      if (!messageOnlyState && storedState.giftMessage.length > 0) {
        messageOnlyState = storedState;
      }
    } catch {
      // A stale cart payload should not block a valid checkout backup.
    }
  }

  return messageOnlyState;
}

function writeStoredCart(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Private browsing and embedded browsers can disable storage.
  }
}

function dispatchAddToCartEvent(product: Product) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("juujo:add-to-cart", {
      detail: {
        product,
      },
    }),
  );
}

export function writeCheckoutSnapshot(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    window.localStorage.setItem(checkoutSnapshotStorageKey, JSON.stringify(state));
  } catch {
    // Checkout should continue even when storage is unavailable.
  }
}

function clearCheckoutRecovery(state: CartState) {
  if (typeof window === "undefined" || !("localStorage" in window)) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    window.localStorage.removeItem(checkoutSnapshotStorageKey);
    window.localStorage.removeItem(legacyStorageKey);
  } catch {
    // Private browsing and embedded browsers can disable storage.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(emptyCart);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    function recoverStoredCart() {
      setState((current) => {
        if (hasProductLines(current)) {
          return current;
        }

        return readStoredCart() ?? current;
      });
      setHydrated(true);
    }

    recoverStoredCart();
    window.addEventListener("pageshow", recoverStoredCart);

    return () => window.removeEventListener("pageshow", recoverStoredCart);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    writeStoredCart(state);
    if (hasProductLines(state)) {
      writeCheckoutSnapshot(state);
    }
  }, [hydrated, state]);

  const totals = useMemo(() => calculateCartTotals(state.lines), [state.lines]);
  // Juujo prices are driven by the variant and the quantity offer, so there
  // are no product-level promo codes to surface anymore.
  const activePromoCodes = useMemo<string[]>(() => [], []);


  function addProduct(product: Product) {
    dispatchAddToCartEvent(product);

    setState((current) => {
      const currentProduct = current.lines.find(
        (line) => line.type === "product" && line.productId === product.id,
      );
      const quantity = (currentProduct?.quantity ?? 0) + 1;

      return {
        ...current,
        lines: upsertProductCartLines(current.lines, product, quantity),
      };
    });
  }

  // Variant-aware add: sets the selected colour + size line to an exact
  // quantity (used by the Buy 1 / 2 / 3 offer on the product page).
  function addToCartVariant(
    product: Product,
    quantity: number,
    variantId?: string,
  ) {
    dispatchAddToCartEvent(product);

    setState((current) => ({
      ...current,
      lines: upsertProductCartLines(
        current.lines,
        product,
        Math.max(1, Math.round(quantity)),
        variantId,
      ),
    }));
  }

  function setQuantity(productId: string, quantity: number) {
    setState((current) => {
      const product = getProductById(productId);

      if (!product) {
        return current;
      }

      let nextLines = upsertProductCartLines(current.lines, product, quantity);

      const hasPaidProduct = nextLines.some((l) => l.type === "product" && !l.free);
      if (!hasPaidProduct) {
        nextLines = [];
      }

      const nextState = {
        ...current,
        lines: nextLines,
      };

      if (!hasProductLines(nextState)) {
        clearCheckoutRecovery(nextState);
      }

      return nextState;
    });
  }

  function removeProduct(productId: string) {
    setState((current) => {
      let nextLines = current.lines.filter((line) => line.productId !== productId);

      const hasPaidProduct = nextLines.some((l) => l.type === "product" && !l.free);
      if (!hasPaidProduct) {
        nextLines = [];
      }

      const nextState = {
        ...current,
        lines: nextLines,
      };

      if (!hasProductLines(nextState)) {
        clearCheckoutRecovery(nextState);
      }

      return nextState;
    });
  }

  function clearCart() {
    clearCheckoutRecovery(emptyCart);
    setState(emptyCart);
  }

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      isHydrated: hydrated,
      isOpen,
      totals,
      activePromoCodes,
      addProduct,
      addToCartVariant,
      setQuantity,
      removeProduct,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setGiftMessage: (message: string) =>
        setState((current) => ({ ...current, giftMessage: message })),
    }),
    [activePromoCodes, hydrated, isOpen, state, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
