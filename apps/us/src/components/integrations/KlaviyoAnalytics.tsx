"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { products, productsById, type Product } from "@/data/products";
import type { CartLine } from "@/lib/cart";
import { market } from "@/lib/market";

type KlaviyoCommand = [string, ...unknown[]];

declare global {
  interface Window {
    klaviyo?: KlaviyoCommand[];
  }
}

type CheckoutEventDetail = {
  lines?: CartLine[];
  totals?: {
    totalCents?: number;
  };
};

const KLAVIYO_COMPANY_ID = "YiCgFP";
const KLAVIYO_PRODUCTION_HOST = "grounding.juujo.com";
const productBySlug = new Map(products.map((product) => [product.slug, product]));

function isEnabledHost() {
  if (typeof window === "undefined") {
    return false;
  }

  const host = window.location.hostname;
  return (
    host === KLAVIYO_PRODUCTION_HOST ||
    host === "localhost" ||
    host === "127.0.0.1"
  );
}

function toAbsoluteUrl(url: string) {
  if (typeof window === "undefined") {
    return url;
  }

  return new URL(url, window.location.origin).href;
}

function productPayload(product: Product) {
  return {
    ProductName: product.name,
    ProductID: product.id,
    SKU: product.sku,
    Categories: ["Bedding", product.categoryLabel],
    ImageURL: toAbsoluteUrl(product.cartImage),
    URL: toAbsoluteUrl(`/products/${product.slug}`),
    Brand: market.brandName,
    Price: product.priceCents / 100,
    CompareAtPrice: product.compareAtCents / 100,
    Market: market.marketLabel,
    SourceSite: KLAVIYO_PRODUCTION_HOST,
  };
}

function cartLinePayload(line: CartLine) {
  const product = productsById[line.productId];

  return {
    ProductID: line.productId,
    SKU: product?.sku ?? line.id,
    ProductName: line.title,
    Quantity: line.quantity,
    ItemPrice: line.unitPriceCents / 100,
    RowTotal: (line.unitPriceCents * line.quantity) / 100,
    ProductURL: product ? toAbsoluteUrl(`/products/${product.slug}`) : undefined,
    ImageURL: toAbsoluteUrl(line.image),
    ProductCategories: ["Bedding", product?.categoryLabel ?? "Bedding"],
  };
}

function pushKlaviyo(command: KlaviyoCommand) {
  window.klaviyo = window.klaviyo || [];
  window.klaviyo.push(command);
}

export function KlaviyoAnalytics() {
  const pathname = usePathname();
  const trackedProductSlugs = useRef(new Set<string>());

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    window.klaviyo = window.klaviyo || [];
    if (document.querySelector("script[data-juujo-klaviyo='true']")) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.juujoKlaviyo = "true";
    script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${encodeURIComponent(
      KLAVIYO_COMPANY_ID,
    )}`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    pushKlaviyo([
      "track",
      "Viewed Page",
      {
        PageName: document.title,
        URL: window.location.href,
        Path: pathname,
        Market: market.marketLabel,
        SourceSite: KLAVIYO_PRODUCTION_HOST,
      },
    ]);

    const slug = pathname?.match(/^\/products\/([^/]+)/)?.[1];
    if (!slug || trackedProductSlugs.current.has(slug)) {
      return;
    }

    const product = productBySlug.get(slug);
    if (!product) {
      return;
    }

    const payload = productPayload(product);
    trackedProductSlugs.current.add(slug);

    pushKlaviyo(["track", "Viewed Product", payload]);
    pushKlaviyo([
      "trackViewedItem",
      {
        Title: payload.ProductName,
        ItemId: payload.ProductID,
        Categories: payload.Categories,
        ImageUrl: payload.ImageURL,
        Url: payload.URL,
        Metadata: {
          Brand: payload.Brand,
          Price: payload.Price,
          CompareAtPrice: payload.CompareAtPrice,
          Market: payload.Market,
        },
      },
    ]);
  }, [pathname]);

  useEffect(() => {
    if (!KLAVIYO_COMPANY_ID || !isEnabledHost()) {
      return;
    }

    function handleAddToCart(event: Event) {
      const detail = (event as CustomEvent<{ product?: Product }>).detail;
      const product = detail?.product;

      if (!product) {
        return;
      }

      const payload = productPayload(product);

      pushKlaviyo([
        "track",
        "Added to Cart",
        {
          $value: payload.Price,
          AddedItemProductName: payload.ProductName,
          AddedItemProductID: payload.ProductID,
          AddedItemSKU: payload.SKU,
          AddedItemCategories: payload.Categories,
          AddedItemImageURL: payload.ImageURL,
          AddedItemURL: payload.URL,
          AddedItemPrice: payload.Price,
          AddedItemQuantity: 1,
          ItemNames: [payload.ProductName],
          CheckoutURL: toAbsoluteUrl("/cart"),
          Items: [
            {
              ProductID: payload.ProductID,
              SKU: payload.SKU,
              ProductName: payload.ProductName,
              Quantity: 1,
              ItemPrice: payload.Price,
              RowTotal: payload.Price,
              ProductURL: payload.URL,
              ImageURL: payload.ImageURL,
              ProductCategories: payload.Categories,
            },
          ],
          Market: market.marketLabel,
          SourceSite: KLAVIYO_PRODUCTION_HOST,
        },
      ]);
    }

    function handleStartedCheckout(event: Event) {
      const detail = (event as CustomEvent<CheckoutEventDetail>).detail;
      const lines = detail?.lines ?? [];
      const productLines = lines.filter((line) => line.type === "product");
      const items = productLines.map(cartLinePayload);

      if (!items.length) {
        return;
      }

      pushKlaviyo([
        "track",
        "Started Checkout",
        {
          $event_id: `grounding-juujo-${Date.now()}`,
          $value:
            typeof detail?.totals?.totalCents === "number"
              ? detail.totals.totalCents / 100
              : items.reduce((total, item) => total + item.RowTotal, 0),
          ItemNames: items.map((item) => item.ProductName),
          CheckoutURL: toAbsoluteUrl("/cart"),
          Categories: Array.from(
            new Set(items.flatMap((item) => item.ProductCategories)),
          ),
          Items: items,
          Market: market.marketLabel,
          SourceSite: KLAVIYO_PRODUCTION_HOST,
        },
      ]);
    }

    window.addEventListener("juujo:add-to-cart", handleAddToCart);
    window.addEventListener("juujo:started-checkout", handleStartedCheckout);

    return () => {
      window.removeEventListener("juujo:add-to-cart", handleAddToCart);
      window.removeEventListener("juujo:started-checkout", handleStartedCheckout);
    };
  }, []);

  return null;
}
