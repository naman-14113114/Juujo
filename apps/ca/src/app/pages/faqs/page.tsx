import type { Metadata } from "next";
import { FaqPage } from "@/components/faq/FaqPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Help & Support - Juujo",
  description:
    "Find answers to shipping policies, return policies, order tracking, payment methods, and product questions about Juujo grounding bedding.",
  alternates: {
    canonical: "/pages/faqs",
  },
  openGraph: {
    title: "Juujo Help Center | Frequently Asked Questions",
    description:
      "Find answers to shipping policies, return policies, order tracking, payment methods, and product questions about Juujo grounding bedding.",
    url: absoluteUrl("/pages/faqs"),
  },
};

export default function Page() {
  return <FaqPage />;
}
