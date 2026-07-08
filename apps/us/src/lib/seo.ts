import type { Product } from "@/data/products";
import type { FAQItem } from "@/data/productSections";
import { absoluteUrl } from "@/lib/site";
import { market } from "@/lib/market";

const schemaCountry =
  (market.marketLabel as string) === "UK" ? "GB" : market.marketLabel;

export function productJsonLd(product: Product) {
  const productUrl = absoluteUrl(`/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    image: product.gallery.map((image) => absoluteUrl(image.src)),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: market.brandName,
    },
    category: product.categoryLabel,
    sku: product.sku,
    mpn: product.sku,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency,
      price: (product.priceCents / 100).toFixed(2),
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: market.brandName,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: product.currency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: schemaCountry,
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: schemaCountry,
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 90,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function faqJsonLd(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: market.brandName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/juujo-logo.png"),
    sameAs: [
      "https://www.instagram.com/juujo",
      "https://www.youtube.com/@juujo",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: market.supportEmail,
      availableLanguage: [market.locale, "English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: `${market.brandName} ${market.marketLabel}`,
    url: absoluteUrl("/"),
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/products/grounding-fitted-sheets")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function guidePageJsonLd({
  title,
  description,
  url,
  faqs,
}: {
  title: string;
  description: string;
  url: string;
  faqs: FAQItem[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${absoluteUrl(url)}#webpage`,
      name: title,
      description,
      url: absoluteUrl(url),
      inLanguage: market.locale,
      isPartOf: {
        "@id": `${absoluteUrl("/")}#website`,
      },
      about: [
        { "@type": "Thing", name: "premium bedding" },
        { "@type": "Thing", name: "grounding sheets" },
        { "@type": "Thing", name: "weighted blankets" },
        { "@type": "Thing", name: "cooling bed sheets" },
      ],
      mainEntity: {
        "@id": `${absoluteUrl("/products/grounding-fitted-sheets")}#product`,
      },
    },
    faqJsonLd(faqs),
  ];
}
