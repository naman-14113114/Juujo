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

export function calculateCartTotals(lines: CartLine[]) {
  const productLines = lines.filter((line) => line.type === "product");
  const subtotalCents = productLines.reduce(
    (total, line) => total + line.unitPriceCents * line.quantity,
    0,
  );
  const compareAtCents = productLines.reduce(
    (total, line) =>
      total + (line.compareAtCents ?? line.unitPriceCents) * line.quantity,
    0,
  );
  const savingsCents = Math.max(compareAtCents - subtotalCents, 0);

  return {
    itemCount: productLines.reduce((total, line) => total + line.quantity, 0),
    subtotalCents,
    compareAtCents,
    giftValueCents: 0,
    savingsCents,
    shippingCents: 0,
    totalCents: subtotalCents,
  };
}

export function getDisplayLines(lines: CartLine[]): CartLine[] {
  return lines.filter((line) => line.type === "product");
}
