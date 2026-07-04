import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartMinimalFooter } from "@/components/layout/CartMinimalFooter";
import { CartMinimalHeader } from "@/components/layout/CartMinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteChrome } from "@/components/layout/RouteChrome";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { ClarityAnalytics } from "@/components/integrations/ClarityAnalytics";
import { KlaviyoAnalytics } from "@/components/integrations/KlaviyoAnalytics";
import { PageMediaPreloader } from "@/components/integrations/PageMediaPreloader";
import { TawkToWidget } from "@/components/integrations/TawkToWidget";
import { market } from "@/lib/market";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(market.siteUrl),
  title: {
    default: "Juujo | Premium Bedding for Better Sleep",
    template: "%s | Juujo",
  },
  description:
    "Juujo premium bedding for better sleep: grounding sheets, weighted blankets, cooling bed sheets, and adaptive pillows. Breathable materials, honest craft, 100-night trial.",
  applicationName: "Juujo",
  keywords: [
    "premium bedding UK",
    "grounding sheets UK",
    "weighted blanket UK",
    "cooling bed sheets UK",
    "adaptive pillows UK",
    "luxury bedding for better sleep",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
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
    siteName: "Juujo",
    type: "website",
    url: market.siteUrl,
    locale: "en_GB",
    title: "Juujo | Premium Bedding for Better Sleep",
    description:
      "Considered bedding made for real rest: grounding sheets, weighted blankets, cooling sheets, and adaptive pillows. Breathable, premium, 100-night trial.",
    images: [
      {
        url: "/images/home/01-home-bedding-hero.webp",
        width: 1200,
        height: 1500,
        alt: "Juujo premium bedding on a calm, made bed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juujo | Premium Bedding for Better Sleep",
    description:
      "Grounding sheets, weighted blankets, cooling sheets, and adaptive pillows. Breathable materials, honest craft, 100-night trial.",
    images: ["/images/home/01-home-bedding-hero.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${fraunces.variable} ${jetBrains.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <CartProvider>
          <RouteChrome
            cartFooter={<CartMinimalFooter />}
            cartHeader={
              <>
                <AnnouncementBar />
                <CartMinimalHeader />
              </>
            }
            defaultFooter={<Footer />}
            defaultHeader={
              <>
                <AnnouncementBar />
                <Header />
              </>
            }
          >
            {children}
          </RouteChrome>
          <PageMediaPreloader />
          <CartDrawer />
        </CartProvider>
        <ClarityAnalytics />
        <KlaviyoAnalytics />
        <TawkToWidget />
      </body>
    </html>
  );
}
