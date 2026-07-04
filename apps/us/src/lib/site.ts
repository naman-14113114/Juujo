import { market } from "@/lib/market";

export const defaultSiteUrl = market.siteUrl;
export const plusbaseStoreUrl = "https://juujo.com";

const plusbaseBridgePath = "/pages/add-to-cart";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getPlusbaseCheckoutBridgeUrl() {
  const configured =
    process.env.NEXT_PUBLIC_PLUSBASE_ADD_TO_CART_URL ??
    `${plusbaseStoreUrl}${plusbaseBridgePath}`;

  return configured;
}

export type CheckoutBridgeOptions = {
  /** ShopBase/PlusBase product id for the selected variant (product page path). */
  productId?: string;
  /** ShopBase/PlusBase variant id for the selected colour + size. */
  variantId?: string;
  /** Product handle/slug for attribution. */
  productHandle?: string;
  checkoutRef?: string;
  quantity?: number;
  /** Accepted for backward compatibility with the cart bridge; ignored. */
  giftQuantity?: number;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  extraParams?: Record<string, string | number | boolean | null | undefined>;
};

export function buildPlusbaseCheckoutUrl(options: CheckoutBridgeOptions = {}) {
  const url = new URL(getPlusbaseCheckoutBridgeUrl());
  const quantity = Math.max(1, Math.round(options.quantity ?? 1));

  const params: Record<string, string> = {
    quantity: String(quantity),
    qty: String(quantity),
    product_quantity: String(quantity),
    redirect: "checkout",
    source: options.source ?? market.checkoutSource,
    utm_source: options.utmSource ?? market.checkoutUtmSource,
    utm_medium: options.utmMedium ?? "store_cart_checkout",
    utm_campaign: options.utmCampaign ?? market.checkoutUtmCampaign,
  };

  if (options.variantId) {
    params.variant_id = options.variantId;
  }

  if (options.productId) {
    params.product_id = options.productId;
  }

  if (options.productHandle) {
    params.product_handle = options.productHandle;
  }

  if (options.checkoutRef) {
    params.checkout_ref = options.checkoutRef;
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  Object.entries(options.extraParams ?? {}).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}
