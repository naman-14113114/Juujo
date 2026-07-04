import { homeAsset, productAsset } from "@/lib/media";
import { coolingSheets, groundingSheets, pillows, weightedBlanket } from "./products";

export const homeHero = {
  eyebrow: "Premium bedding for better sleep",
  title: "Sleep, softened.",
  copy: "Considered bedding made for real rest: grounding sheets, weighted blankets, cooling sheets, and adaptive pillows. Breathable materials, honest craftsmanship, and a calmer night from the first evening.",
  ctaLabel: "Shop bedding",
  ctaHref: `/products/${groundingSheets.slug}`,
  images: [
    { src: homeAsset("01-home-bedding-hero.webp"), alt: "Juujo bedding on a calm, made bed" },
    { src: homeAsset("02-home-bedding-lifestyle.webp"), alt: "Juujo bedding in a warm bedroom" },
    { src: homeAsset("03-home-bedding-detail.webp"), alt: "Close up of Juujo bedding texture" },
  ],
};

export const homeMaskSpotlight = {
  eyebrow: "Signature comfort",
  title: "Bedding designed around how you actually sleep",
  copy: "Every Juujo piece is built for comfort first: breathable weaves, even weight, and materials that stay soft wash after wash. Choose your colour and size, then settle in.",
  image: { src: homeAsset("04-home-spotlight.webp"), alt: "Juujo bedding product spotlight" },
  product: groundingSheets,
};

export const homeSkincareGuideIntro = {
  eyebrow: "Find your fit",
  title: "Not sure where to start?",
  copy: "Tell us how you sleep and we will point you to the right bedding, whether you run warm, sleep restlessly, or just want a softer, more supportive setup.",
  ctaLabel: "Explore the range",
  ctaHref: `/products/${coolingSheets.slug}`,
};

export const homeTechnologySpotlight = {
  eyebrow: "Materials that matter",
  title: "Breathable, honest, built to last.",
  copy: "From heat-wicking cooling weaves to evenly distributed weighted fills, each product is made with materials chosen for comfort and durability, not shortcuts.",
  ctaLabel: "Shop cooling sheets",
  ctaHref: `/products/${coolingSheets.slug}`,
  image: { src: productAsset("02-cooling-sheets-weave.webp", "cooling-sheets"), alt: "Breathable cooling weave detail" },
};

export const homeFeatureCards = [
  {
    title: "Breathable by design",
    copy: "Weaves and fills chosen to stay temperature-friendly, so you spend less of the night too warm.",
    image: productAsset("02-cooling-sheets-weave.webp", "cooling-sheets"),
  },
  {
    title: "Comfort you can feel",
    copy: "Soft, premium materials that stay comfortable and keep their shape wash after wash.",
    image: productAsset("01-weighted-blanket-front.webp", "weighted-blankets"),
  },
  {
    title: "Made for every bed",
    copy: "Multiple colours and sizes across sheets, blankets, and pillows to match your space.",
    image: productAsset("01-pillow-front.webp", "pillows"),
  },
];

export const homeLightTherapy = {
  eyebrow: "The Juujo promise",
  title: "Better sleep, made simple.",
  copy: "We keep bedding honest: clear materials, fair pricing, and a 100-night trial so you can feel the difference at home before you commit. No hype, just rest.",
  image: { src: homeAsset("08-home-story.webp"), alt: "Calm bedroom editorial image" },
};

export const homeYoungerYou = {
  title: "A calmer night, every night",
  copy: "Grounding sheets to settle in, weighted blankets to feel cocooned, cooling sheets to stay comfortable, and pillows that adapt to you. Build the setup that helps you rest.",
  image: { src: homeAsset("09-home-collection.webp"), alt: "Juujo bedding collection" },
};

export const homeTorchSpotlight = {
  eyebrow: "Cocooned comfort",
  title: "The weighted blanket for settled sleep.",
  copy: "Evenly distributed weight and a breathable cover help you feel grounded and calm as you drift off. Choose 5kg, 7kg, or 9kg to suit you.",
  ctaLabel: "Shop weighted blankets",
  ctaHref: `/products/${weightedBlanket.slug}`,
  image: { src: productAsset("03-weighted-blanket-draped.webp", "weighted-blankets"), alt: "Juujo weighted blanket draped over a chair" },
  product: weightedBlanket,
};

export const homeWavelengthMap = {
  eyebrow: "Shop by need",
  title: "Find your comfort",
  copy: "Pick the concern that matters most and we will match you to the right Juujo bedding.",
  zones: ["Run warm", "Restless sleep", "Neck support", "Grounding", "Softness", "Durability"],
};

export const homeCustomerReviewsGrid = {
  title: "Why sleepers choose Juujo",
  copy: "Thousands of calmer nights, in their words.",
  ctaLabel: "About Us",
  ctaHref: "/pages/about-us",
  image: homeAsset("10-home-reviews-collage.webp"),
};

// Kept for compatibility with the home page, now referencing bedding products.
export { pillows };
