import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { market } from "@/lib/market";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Juujo Grounding Sheets UK | Organic Cotton, Silver-Thread Sleep",
  description:
    "Shop Juujo UK for grounding fitted sheets and flat sheets made with 95% organic cotton and conductive silver threads, plus a free grounding mat. Cooler, calmer, more restful sleep.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "grounding sheets UK",
    "earthing fitted sheet",
    "organic cotton grounding sheet",
    "silver thread sleep",
    "better sleep naturally",
  ],
  openGraph: {
    title: "Juujo Grounding Sheets | Better Sleep, Naturally",
    description:
      "Discover Juujo Grounding Sheets, made with 95% organic cotton and conductive silver threads for cooler, calmer, more restful sleep.",
    url: market.siteUrl,
    images: [
      {
        url: "/images/products/grounding-sheets/09-juujo-grounding-sheets-home-spa.webp",
        width: 1200,
        height: 900,
        alt: "Juujo Grounding Sheets on a made bed",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      {[organizationJsonLd(), websiteJsonLd()].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      <HomePage />
    </>
  );
}
