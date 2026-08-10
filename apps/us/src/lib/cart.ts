import {
  getVariant,
  getDefaultVariant,
  getProductById,
  getProductBySlug,
  type Product,
} from "@/data/products";

// "gift" is retained in the union only for backward compatibility with older
// persisted carts; Juujo carts never create gift lines.
export type CartLineType = "product" | "gift";

export type CartLine = {
  id: string;
  productId: string;
  slug?: string;
  variantId?: string;
  /** Real ShopBase/PlusBase product id for this variant (used at checkout). */
  checkoutProductId?: string;
  colorId?: string;
  sizeId?: string;
  type: CartLineType;
  title: string;
  subtitle?: string;
  image: string;
  unitPriceCents: number;
  compareAtCents?: number;
  quantity: number;
  locked?: boolean;
  /** Part of a multi-sheet bundle (Buy 1 / Buy 2 Get 1 Free) — one line each. */
  bundle?: boolean;
  /** A free sheet inside a bundle (the "get 1 free" unit). */
  free?: boolean;
};

export type CartState = {
  lines: CartLine[];
  promoCode: string;
  appliedPromoCodes: string[];
  giftMessage: string;
  pillowcaseColor?: string;
  eyeMaskColor?: string;
};

export type GiftSelectionState = Pick<
  CartState,
  "pillowcaseColor" | "eyeMaskColor"
>;

export const promoCode = "AUTO";

export const emptyCart: CartState = {
  lines: [],
  promoCode,
  appliedPromoCodes: [],
  giftMessage: "",
};

/**
 * Build the cart line(s) for a product. Juujo products are a single line (no
 * free gifts). Price and variant id come from the selected variant, falling
 * back to the product's default variant.
 */
export function buildProductCartLines(
  product: Product,
  quantity = 1,
  variantId?: string,
): CartLine[] {
  const normalizedQuantity = Math.max(quantity, 0);

  if (normalizedQuantity <= 0) {
    return [];
  }

  const variant =
    product.variants.find((entry) => entry.variantId === variantId) ??
    getDefaultVariant(product);

  const color = product.colors.find((entry) => entry.id === variant.colorId);
  const size = product.sizes.find((entry) => entry.id === variant.sizeId);
  let sizeDisplay = size?.name;
  if (sizeDisplay) {
    if (product.id === "grounding-sheets") sizeDisplay = `Fitted - ${sizeDisplay}`;
    else if (product.id === "grounding-flat-sheet") sizeDisplay = `Flat - ${sizeDisplay}`;
    if (size?.dimensions) sizeDisplay += ` (${size.dimensions})`;
  }
  const variantLabel = [color?.name, sizeDisplay].filter(Boolean).join(" / ");

  const productLine: CartLine = {
    id: product.id,
    productId: product.id,
    slug: product.slug,
    variantId: variant.variantId,
    checkoutProductId: variant.productId,
    colorId: variant.colorId,
    sizeId: variant.sizeId,
    type: "product",
    title: product.name,
      subtitle: variantLabel || product.shortDescription,
      image: color?.image ?? product.cartImage,
    unitPriceCents: variant.priceCents,
    compareAtCents: variant.compareAtCents,
    quantity: normalizedQuantity,
  };

  return [productLine];
}

/**
 * Build the individual cart lines for a grounding-sheet bundle. The customer
 * picks one variant per sheet (they can all differ), so each sheet becomes its
 * own line shown separately in the cart. `freeCount` sheets (the "get 1 free"
 * units) are priced at 0 but keep their compare-at for the strike-through.
 */
export type BundleSelection = {
  product: Product;
  variantId?: string;
};

export function buildSheetBundleLines(
  selections: BundleSelection[],
  freeCount = 0,
): CartLine[] {
  const paidCutoff = selections.length - Math.max(0, freeCount);

  return selections.map((selection, index) => {
    const { product } = selection;
    const variant =
      product.variants.find((entry) => entry.variantId === selection.variantId) ??
      getDefaultVariant(product);

    const color = product.colors.find((entry) => entry.id === variant.colorId);
    const size = product.sizes.find((entry) => entry.id === variant.sizeId);
    let sizeDisplay = size?.name;
    if (sizeDisplay) {
      if (product.id === "grounding-sheets") sizeDisplay = `Fitted - ${sizeDisplay}`;
      else if (product.id === "grounding-flat-sheet") sizeDisplay = `Flat - ${sizeDisplay}`;
      if (size?.dimensions) sizeDisplay += ` (${size.dimensions})`;
    }
    const variantLabel = [color?.name, sizeDisplay].filter(Boolean).join(" / ");
    const isFree = index >= paidCutoff;

    return {
      id: `bundle-${index + 1}-${variant.variantId || "default"}`,
      productId: product.id,
      slug: product.slug,
      variantId: variant.variantId,
      checkoutProductId: variant.productId,
      colorId: variant.colorId,
      sizeId: variant.sizeId,
      type: "product",
      title: product.name,
      subtitle: variantLabel || product.shortDescription,
      image: color?.image ?? product.cartImage,
      unitPriceCents: isFree ? 0 : variant.priceCents,
      compareAtCents: variant.compareAtCents,
      quantity: 1,
      bundle: true,
      free: isFree,
    } satisfies CartLine;
  });
}

function findProductForLine(line: CartLine) {
  return (
    getProductById(line.productId) ??
    getProductById(line.id) ??
    (line.slug ? getProductBySlug(line.slug) : undefined)
  );
}

export function normalizeCartLines(lines: CartLine[]) {
  const productLines = lines.filter((line) => line.type === "product");

  return productLines.flatMap((line) => {
    const product = findProductForLine(line);

    if (!product) {
      return [];
    }

    // Bundle lines are per-sheet (one variant each, possibly free) and must be
    // preserved as-is instead of collapsed into a single product line.
    if (line.bundle) {
      const variant =
        product.variants.find((entry) => entry.variantId === line.variantId) ??
        getDefaultVariant(product);
      const color = product.colors.find((entry) => entry.id === variant.colorId);
      const size = product.sizes.find((entry) => entry.id === variant.sizeId);
      let sizeDisplay = size?.name;
      if (sizeDisplay) {
        if (product.id === "grounding-sheets") sizeDisplay = `Fitted - ${sizeDisplay}`;
        else if (product.id === "grounding-flat-sheet") sizeDisplay = `Flat - ${sizeDisplay}`;
        if (size?.dimensions) sizeDisplay += ` (${size.dimensions})`;
      }
      const variantLabel = [color?.name, sizeDisplay].filter(Boolean).join(" / ");

      return [
        {
          ...line,
          slug: product.slug,
          checkoutProductId: variant.productId,
          colorId: variant.colorId,
          sizeId: variant.sizeId,
          title: product.name,
          subtitle: variantLabel || product.shortDescription,
          image: color?.image ?? product.cartImage,
          unitPriceCents: line.free ? 0 : variant.priceCents,
          compareAtCents: variant.compareAtCents,
          quantity: 1,
        } satisfies CartLine,
      ];
    }

    return buildProductCartLines(product, line.quantity, line.variantId);
  });
}

export function upsertProductCartLines(
  lines: CartLine[],
  product: Product,
  quantity: number,
  variantId?: string,
) {
  const withoutProduct = lines.filter((line) => line.productId !== product.id);
  return [...withoutProduct, ...buildProductCartLines(product, quantity, variantId)];
}

function deriveGiftLines(
  lines: CartLine[],
  state?: GiftSelectionState,
): CartLine[] {
  const productLines = lines.filter((line) => line.type === "product");
  const hasSheet = productLines.some((line) => {
    const product = findProductForLine(line);
    return product?.category === "grounding-sheets";
  });

  if (!hasSheet) return [];

  const gifts: CartLine[] = [];

  const matProduct = getProductBySlug("grounding-mat");
  if (matProduct) {
    const matVariant = getDefaultVariant(matProduct);
    gifts.push({
      id: "gift-mat",
      productId: matProduct.id,
      slug: matProduct.slug,
      variantId: matVariant.variantId,
      checkoutProductId: matVariant.productId,
      type: "gift",
      title: matProduct.name,
      subtitle: "Free gift",
      image: matProduct.cartImage,
      unitPriceCents: 0,
      compareAtCents: matVariant.priceCents,
      quantity: 1,
      locked: true,
      free: true,
    });
  }

  const sheetCount = productLines.reduce((acc, line) => {
    const product = findProductForLine(line);
    if (product?.category === "grounding-sheets") return acc + line.quantity;
    return acc;
  }, 0);

  if (sheetCount >= 2) {
    const eyeMaskProduct = getProductBySlug("premium-eye-mask");
    if (eyeMaskProduct) {
      const eyeColor = (state?.eyeMaskColor || "green").toLowerCase();
      const eVariant =
        getVariant(eyeMaskProduct, eyeColor) ||
        getDefaultVariant(eyeMaskProduct);
      const eColorObj = eyeMaskProduct.colors.find(
        (color) => color.id === eVariant.colorId,
      );
      gifts.push({
        id: "gift-eyemask",
        productId: eyeMaskProduct.id,
        slug: eyeMaskProduct.slug,
        variantId: eVariant.variantId,
        checkoutProductId: eVariant.productId,
        type: "gift",
        title: eyeMaskProduct.name,
        subtitle: eyeColor + " / Free gift",
        image: eColorObj?.image ?? eyeMaskProduct.cartImage,
        unitPriceCents: 0,
        compareAtCents: eVariant.priceCents,
        quantity: 1,
        locked: true,
        free: true,
      });
    }
  }

  if (sheetCount >= 3) {
    const pillowcaseProduct = getProductBySlug("grounding-pillowcase");
    if (pillowcaseProduct) {
      const pillowColor = (state?.pillowcaseColor || "white").toLowerCase();
      const pVariant =
        getVariant(pillowcaseProduct, pillowColor) ||
        getDefaultVariant(pillowcaseProduct);
      const pColorObj = pillowcaseProduct.colors.find(
        (color) => color.id === pVariant.colorId,
      );
      gifts.push({
        id: "gift-pillowcase",
        productId: pillowcaseProduct.id,
        slug: pillowcaseProduct.slug,
        variantId: pVariant.variantId,
        checkoutProductId: pVariant.productId,
        type: "gift",
        title: pillowcaseProduct.name,
        subtitle: pillowColor + " / Free gift",
        image: pColorObj?.image ?? pillowcaseProduct.cartImage,
        unitPriceCents: 0,
        compareAtCents: pVariant.priceCents,
        quantity: 1,
        locked: true,
        free: true,
      });
    }
  }

  return gifts;
}

export function calculateCartTotals(
  lines: CartLine[],
  state?: GiftSelectionState,
) {
  const productLines = lines.filter((line) => line.type === "product");
  const giftLines = deriveGiftLines(lines, state);
  const displayLines = [...productLines, ...giftLines];

  const subtotalCents = productLines.reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  const compareAtCents = displayLines.reduce(
    (total, line) =>
      total + (line.compareAtCents ?? line.unitPriceCents) * line.quantity,
    0,
  );
  const productSavingsCents = productLines.reduce(
    (total, line) =>
      total +
      Math.max((line.compareAtCents ?? line.unitPriceCents) - line.unitPriceCents, 0) *
        line.quantity,
    0,
  );
  const giftValueCents = giftLines.reduce(
    (total, line) => total + (line.compareAtCents ?? 0) * line.quantity,
    0,
  );
  const groundingSheetCount = productLines.reduce((total, line) => {
    const product = findProductForLine(line);
    return product?.category === "grounding-sheets" && !line.free
      ? total + line.quantity
      : total;
  }, 0);
  const bundleDiscountCents =
    groundingSheetCount >= 3 ? 4000 : groundingSheetCount >= 2 ? 2000 : 0;
  const totalCents = Math.max(subtotalCents - bundleDiscountCents, 0);
  const savingsCents =
    productSavingsCents + giftValueCents + bundleDiscountCents;

  return {
    itemCount: displayLines.reduce((total, line) => total + line.quantity, 0),
    subtotalCents,
    compareAtCents,
    productSavingsCents,
    bundleDiscountCents,
    giftValueCents,
    savingsCents,
    shippingCents: 0,
    totalCents,
    giftLines,
  };
}

export function getDisplayLines(
  lines: CartLine[],
  state?: GiftSelectionState,
): CartLine[] {
  const productLines = lines.filter((line) => line.type === "product");
  return [...productLines, ...deriveGiftLines(lines, state)];
}
