import type { MetadataRoute } from "next";
import { market } from "@/lib/market";

const routes = [
  { path: "/", lastModified: "2026-07-03", changeFrequency: "weekly", priority: 1 },
  { path: "/products/grounding-sheets", lastModified: "2026-07-03", changeFrequency: "weekly", priority: 1 },
  { path: "/products/weighted-blanket", lastModified: "2026-07-03", changeFrequency: "weekly", priority: 1 },
  { path: "/products/cooling-bed-sheets", lastModified: "2026-07-03", changeFrequency: "weekly", priority: 1 },
  { path: "/products/pillows", lastModified: "2026-07-03", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cart", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.4 },
  { path: "/pages/contact-us", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/about-us", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/faqs", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.6 },
  { path: "https://juujo.com/order-tracking", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.5 },
  { path: "/policies/shipping-policy", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/return-policy", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/refund-policy", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/privacy-policy", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.3 },
  { path: "/policies/terms-of-service", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.3 },
  { path: "/policies/cookies-policy", lastModified: "2026-07-03", changeFrequency: "monthly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${market.siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
