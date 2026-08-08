import type { Metadata } from "next";
import { PillowcasePage } from "@/components/product/PillowcasePage";
import { getProductBySlug } from "@/data/products";
import { absoluteUrl } from "@/lib/site";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const product = getProductBySlug("grounding-pillowcase");

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: [
      product.categoryLabel,
      `${product.categoryLabel} UK`,
      `buy ${product.categoryLabel.toLowerCase()}`,
      "premium bedding",
      "luxury bedding UK",
      "better sleep",
      product.name,
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
      languages: {
        "en-GB": `/products/${product.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: product.seoTitle,
      description: product.description,
      url: absoluteUrl(`/products/${product.slug}`),
      type: "website",
      images: [
        {
          url: product.gallery?.[0]?.src || product.cartImage || "",
          width: 1200,
          height: 1500,
          alt: product.gallery?.[0]?.alt || product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.gallery?.[0]?.src || product.cartImage || ""],
    },
  };
}

export default async function PillowcaseRoute() {
  const product = getProductBySlug("grounding-pillowcase");

  if (!product) {
    notFound();
  }

  return <PillowcasePage product={product} />;
}
