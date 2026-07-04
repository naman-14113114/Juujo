import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Juujo for product questions, order support, shipping help, and light therapy guidance.",
  alternates: {
    canonical: "/pages/contact-us",
  },
  openGraph: {
    title: "Contact Juujo",
    description:
      "Reach Juujo support for product questions, order support, shipping help, and light therapy guidance.",
    url: absoluteUrl("/pages/contact-us"),
  },
};

export default function Page() {
  return <ContactPage />;
}
