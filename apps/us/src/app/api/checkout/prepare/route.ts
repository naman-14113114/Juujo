import { NextResponse, type NextRequest } from "next/server";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const plusbaseOrigin = "https://juujo.com";

type CheckoutItem = {
  productId: string | number;
  variantId: string | number;
  quantity?: number;
  giftId?: string;
};

type CheckoutPrepareBody = {
  customerEmail?: string;
  quantity?: number;
  items?: CheckoutItem[];
  attribution?: Record<string, string | null | undefined>;
};

const passthroughAttributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "fbclid",
];

const freeGiftDiscounts = {
  "gift-mat": {
    productId: "1000000669152669",
    code: "FREE_MAT",
  },
  "gift-sleep-mask": {
    productId: "1000000673049614",
    code: "FREE_SLEEPING_MASK",
  },
  "gift-pillowcase": {
    productId: "1000000673049613",
    code: "FREE_PILLOWCASE",
  },
} as const;

function getFreeGiftDiscountCodes(items: CheckoutItem[]) {
  const codes = items.flatMap((item) => {
    const giftId = item.giftId as keyof typeof freeGiftDiscounts | undefined;
    const rule = giftId ? freeGiftDiscounts[giftId] : undefined;

    return rule && String(item.productId) === rule.productId ? [rule.code] : [];
  });

  return [...new Set(codes)];
}

function bridgeParams(attribution: CheckoutPrepareBody["attribution"]) {
  const params: Record<string, string> = {};

  passthroughAttributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) {
      params[key] = String(value).slice(0, 500);
    }
  });

  return params;
}

function appendCookies(current: string, response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : headers.get("set-cookie")
        ? [headers.get("set-cookie") as string]
        : [];

  if (!setCookies.length) {
    return current;
  }

  const cookieMap = new Map<string, string>();

  current
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [name] = part.split("=");
      cookieMap.set(name, part);
    });

  setCookies.forEach((cookie) => {
    const pair = cookie.split(";")[0];
    const [name] = pair.split("=");
    if (name && pair) {
      cookieMap.set(name, pair);
    }
  });

  return Array.from(cookieMap.values()).join("; ");
}

async function createPlusbaseCheckout(items: CheckoutItem[]) {
  let cookie = "";

  const createResponse = await fetch(
    `${plusbaseOrigin}/api/checkout/next/cart.json`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    },
  );
  cookie = appendCookies(cookie, createResponse);

  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;
  const checkoutToken = createJson?.result?.checkout_token;

  if (!createResponse.ok || !cartToken || !checkoutToken) {
    throw new Error("Could not create PlusBase cart.");
  }

  async function addItem(productId: number, variantId: number, itemQuantity: number) {
    const response = await fetch(
      `${plusbaseOrigin}/api/checkout/next/cart.json?cart_token=${encodeURIComponent(
        cartToken,
      )}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          ...(cookie ? { cookie } : {}),
        },
        body: JSON.stringify({
          cartItem: {
            product_id: productId,
            variant_id: variantId,
            qty: itemQuantity,
            properties: [],
            metadata: {
              image_preview_id: "",
            },
          },
          from: "add-to-cart",
        }),
      },
    );
    cookie = appendCookies(cookie, response);

    const json = await response.json();
    if (!response.ok || json?.code !== 0) {
      throw new Error("Could not add item to PlusBase cart.");
    }
  }

  for (const item of items) {
    const productId = Number(item.productId);
    const variantId = Number(item.variantId);
    const itemQuantity = Math.max(1, Math.round(Number(item.quantity) || 1));

    if (!productId || !variantId) {
      continue;
    }

    await addItem(productId, variantId, itemQuantity);
  }

  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}`,
  };
}

async function applyDiscountCodes(checkoutToken: string, codes: string[]) {
  for (const code of codes) {
    const response = await fetch(
      `https://www.juujo.com/api/checkout/${encodeURIComponent(
        checkoutToken,
      )}/next/apply-coupon.json`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-lang": "en-us",
          "x-shopbase-checkout-token": checkoutToken,
          "x-source-page": "checkout",
        },
        body: JSON.stringify({
          code,
          is_coupon_from_share_able_link: true,
        }),
      },
    );
    const json = await response.json().catch(() => null);

    if (!response.ok || json?.code !== 200 || json?.result !== true) {
      throw new Error(`Could not apply PlusBase discount code ${code}.`);
    }
  }
}

export async function POST(request: NextRequest) {
  const token = crypto.randomUUID();
  const body = (await request.json().catch(() => ({}))) as CheckoutPrepareBody;
  const quantity = Math.max(1, Math.round(Number(body.quantity) || 1));

  const items = (Array.isArray(body.items) ? body.items : []).filter(
    (item) => Number(item.productId) && Number(item.variantId),
  );
  const freeGiftDiscountCodes = getFreeGiftDiscountCodes(items);

  if (items.length > 0) {
    try {
      const checkout = await createPlusbaseCheckout(items);
      await applyDiscountCodes(
        checkout.checkoutToken,
        freeGiftDiscountCodes,
      );

      return NextResponse.json({
        checkoutToken: checkout.checkoutToken,
        checkoutUrl: checkout.checkoutUrl,
      });
    } catch (error) {
      console.error("Direct PlusBase checkout creation failed", error);
    }
  }

  const firstItem = items[0];

  return NextResponse.json({
    checkoutToken: token,
    checkoutUrl: buildPlusbaseCheckoutUrl({
      checkoutRef: token,
      quantity,
      productId: firstItem ? String(firstItem.productId) : undefined,
      variantId: firstItem ? String(firstItem.variantId) : undefined,
      extraParams: bridgeParams(body.attribution),
    }),
  });
}
