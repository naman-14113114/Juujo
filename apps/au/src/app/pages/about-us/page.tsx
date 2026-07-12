import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Juujo Grounding Bedding - UK",
  description:
    "Learn about Juujo, our bedding specialists, our story of honest grounding comfort, and our mission to make restful sleep simple and accessible.",
  alternates: {
    canonical: "/pages/about-us",
  },
  openGraph: {
    title: "About Juujo | Premium Grounding Bedding",
    description:
      "Learn about our bedding specialists, our story of honest grounding comfort, and our mission to deliver better sleep.",
    url: absoluteUrl("/pages/about-us"),
  },
};

export default function Page() {
  return <AboutPage />;
}
