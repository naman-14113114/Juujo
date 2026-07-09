import { homeAsset, productAsset, productMediaAsset } from "@/lib/media";
import { groundingFlatSheet, groundingMat, groundingSheets } from "./products";

export const homeHero = {
  eyebrow: "Premium bedding for better sleep",
  title: "Sleep, softened.",
  copy: "Considered bedding made for real rest: fitted grounding sheets, flat grounding sheets, and grounding mats. Breathable materials, honest craftsmanship, and a calmer night from the first evening.",
  ctaLabel: "Shop grounding",
  ctaHref: `/products/${groundingSheets.slug}`,
  images: [
    { src: productMediaAsset("custom-image-v2-1.png", "grounding-sheets", "images"), alt: "Juujo bedding on a calm, made bed" },
    { src: productMediaAsset("Gemini_Generated_Image_uic6bquic6bquic6.jpg", "grounding-sheets", "images"), alt: "Juujo bedding in a warm bedroom" },
    { src: productMediaAsset("US_cam_1_lightgray.jpg", "grounding-sheets", "images"), alt: "Close up of Juujo bedding texture" },
  ],
};

export const homeMaskSpotlight = {
  eyebrow: "Signature comfort",
  title: "Bedding designed around how you actually sleep",
  copy: "Every Juujo piece is built for comfort first: breathable weaves, even weight, and materials that stay soft wash after wash. Choose your colour and size, then settle in.",
  image: { src: productMediaAsset("custom-image-v2-2.png", "grounding-sheets", "images"), alt: "Juujo bedding product spotlight" },
  product: groundingSheets,
};

export const homeSkincareGuideIntro = {
  eyebrow: "Find your fit",
  title: "Not sure where to start?",
  copy: "Tell us how you sleep and we will point you to the right grounding setup, whether you run warm, sleep restlessly, or just want a softer, more supportive setup.",
  ctaLabel: "Explore the range",
  ctaHref: `/products/${groundingFlatSheet.slug}`,
};

export const homeTechnologySpotlight = {
  eyebrow: "Materials that matter",
  title: "Breathable, honest, built to last.",
  copy: "From premium silver-threaded weaves to conductive carbon mats, each product is made with materials chosen for comfort and durability, not shortcuts.",
  ctaLabel: "Shop flat sheets",
  ctaHref: `/products/${groundingFlatSheet.slug}`,
  image: { src: productMediaAsset("graylinen3_png-min.png", "grounding-sheets", "images"), alt: "Breathable cooling weave detail" },
};

export const homeFeatureCards = [
  {
    title: "Breathable by design",
    copy: "Weaves chosen to stay temperature-friendly, so you spend less of the night too warm.",
    image: productMediaAsset("graylinen3_png-min.png", "grounding-sheets", "images"),
  },
  {
    title: "Comfort you can feel",
    copy: "Soft, premium materials that stay comfortable and keep their shape wash after wash.",
    image: productMediaAsset("US_cam_1_lightgray.jpg", "grounding-sheets", "images"),
  },
  {
    title: "Made for every bed",
    copy: "Multiple colours and sizes across fitted and flat sheets to match your space.",
    image: productMediaAsset("TGC-mat1.png", "grounding-mat", "images"),
  },
];

export const homeLightTherapy = {
  eyebrow: "The Juujo promise",
  title: "Better sleep, made simple.",
  copy: "We keep bedding honest: clear materials, fair pricing, and a 120-night trial so you can feel the difference at home before you commit. No hype, just rest.",
  image: { src: productMediaAsset("custom-image-v2-3.png", "grounding-sheets", "images"), alt: "Calm bedroom editorial image" },
};

export const homeYoungerYou = {
  title: "A calmer night, every night",
  copy: "Fitted grounding sheets to settle in, flat sheets for versatile comfort, and grounding mats for your desk or couch. Build the setup that helps you rest.",
  image: { src: productMediaAsset("custom-image-v2-4.png", "grounding-sheets", "images"), alt: "Juujo bedding collection" },
};

export const homeTorchSpotlight = {
  eyebrow: "Versatile grounding",
  title: "The grounding mat for anywhere.",
  copy: "Connect to the earth's natural energy field from your desk, couch, or floor. Versatile, portable, and easy to use.",
  ctaLabel: "Shop grounding mat",
  ctaHref: `/products/${groundingMat.slug}`,
  image: { src: productMediaAsset("TGC-mat1.png", "grounding-mat", "images"), alt: "Juujo grounding mat" },
  product: groundingMat,
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
  image: productMediaAsset("hero-1.png", "grounding-sheets", "images"),
};

// Kept for compatibility with the home page, now referencing grounding products.
export { groundingMat as pillows };
