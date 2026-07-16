import {
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
  giftMessage: string;
};

export const promoCode = "AUTO";

export const emptyCart: CartState = {
  lines: [],
  promoCode,
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
  const variantLabel = [color?.name, size?.name].filter(Boolean).join(" / ");

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
    image: product.cartImage,
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
  discountPerSheetCents?: number;
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
    const variantLabel = [color?.name, size?.name].filter(Boolean).join(" / ");
    const isFree = index >= paidCutoff;
    const discount = selection.discountPerSheetCents || 0;

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
      unitPriceCents: isFree ? 0 : Math.max(0, variant.priceCents - discount),
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
      const variantLabel = [color?.name, size?.name].filter(Boolean).join(" / ");

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
          unitPriceCents: line.free ? 0 : line.unitPriceCents,
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

function deriveGiftLines(lines: CartLine[]): CartLine[] {
  const productLines = lines.filter((line) => line.type === "product");
  const hasSheet = productLines.some((line) => {
    const product = findProductForLine(line);
    return product?.category === "grounding-sheets";
  });

  if (!hasSheet) return [];

  const matProduct = getProductBySlug("grounding-mat");
  if (!matProduct) return [];

  const matVariant = getDefaultVariant(matProduct);

  const matLine: CartLine = {
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
  };

  return [matLine];
}

export function calculateCartTotals(lines: CartLine[]) {
  const productLines = lines.filter((line) => line.type === "product");
  const giftLines = deriveGiftLines(lines);
  const displayLines = [...productLines, ...giftLines];

  const subtotalCents = displayLines.reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  const compareAtCents = displayLines.reduce(
    (total, line) =>
      total + (line.compareAtCents ?? line.unitPriceCents) * line.quantity,
    0,
  );
  const savingsCents = Math.max(compareAtCents - subtotalCents, 0);

  const giftValueCents = giftLines.reduce((total, line) => total + (line.compareAtCents ?? 0) * line.quantity, 0);

  return {
    itemCount: displayLines.reduce((total, line) => total + line.quantity, 0),
    subtotalCents,
    compareAtCents,
    giftValueCents,
    savingsCents,
    shippingCents: 0,
    totalCents: subtotalCents,
  };
}

export function getDisplayLines(lines: CartLine[]): CartLine[] {
  const productLines = lines.filter((line) => line.type === "product");
  return [...productLines, ...deriveGiftLines(lines)];
}
