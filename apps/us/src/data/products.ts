import {
  productAsset,
  productMediaAsset,
  type ProductImage,
} from "@/lib/media";
import { market, type StoreCurrency } from "@/lib/market";
import type { FAQItem } from "./productSections";

/**
 * Juujo product model.
 *
 * Built to scale to new bedding categories without redesign. Each product has
 * multiple colours and sizes, a variant matrix (colour x size -> real
 * ShopBase/PlusBase product + variant ids), and a quantity offer (Buy 1 / 2 / 3)
 * that replaces the old free-gift mechanic. Prices are dynamic: the live price
 * comes from the selected variant and the chosen quantity tier.
 *
 * Placeholder ids/prices below are safe to swap for real values later without
 * touching any component.
 */

export type ProductCategory =
  | "grounding-sheets"
  | "grounding-mat"
  | "weighted-blankets"
  | "cooling-sheets"
  | "pillows";

export type ProductColor = {
  id: string;
  name: string;
  /** Swatch colour (hex is fine here; UI is decorative, not brand tokens). */
  hex: string;
  image?: string;
};

export type ProductSize = {
  id: string;
  name: string;
  dimensions?: string;
};

export type ProductVariant = {
  colorId: string;
  sizeId: string;
  /** ShopBase/PlusBase ids (placeholder until real store data is wired). */
  productId: string;
  variantId: string;
  sku: string;
  priceCents: number;
  compareAtCents: number;
  inStock: boolean;
};

export type QuantityTier = {
  quantity: number;
  label: string;
  /** Percent off the per-unit price for this tier. */
  discountPct: number;
  badge?: string;
  recommended?: boolean;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type IncludedItem = {
  quantity: string;
  label: string;
  tag?: string;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  name: string;
  heroTitle: string;
  heroEmphasis: string;
  shortDescription: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  currency: StoreCurrency;
  /** Base price = default (first) variant. Live price is per selected variant. */
  priceCents: number;
  compareAtCents: number;
  rating: number;
  reviewCount: number;
  customerCount: string;
  cartImage: string;
  gallery: ProductImage[];
  colors: ProductColor[];
  sizes: ProductSize[];
  variants: ProductVariant[];
  quantityTiers: QuantityTier[];
  material?: string;
  care?: string;
  specs: ProductSpec[];
  included?: IncludedItem[];
  highlights: string[];
  keyBenefits?: string[];
  differentiators?: string[];
  faqs: FAQItem[];
  badges: string[];
};

/** Shared quantity offer: Buy 1, Buy 2 (save 10%), Buy 3 (best value, save 20%). */
export const defaultQuantityTiers: QuantityTier[] = [
  { quantity: 1, label: "Buy 1", discountPct: 0 },
  { quantity: 2, label: "Buy 2", discountPct: 10, badge: "Save 10%" },
  {
    quantity: 3,
    label: "Buy 3",
    discountPct: 20,
    badge: "Best value",
    recommended: true,
  },
];

type SizePricing = ProductSize & { priceCents: number; compareAtCents: number };

/** Build the colour x size variant matrix with placeholder store ids. */
function buildVariants(
  base: string,
  colors: ProductColor[],
  sizes: SizePricing[],
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  colors.forEach((color, ci) => {
    sizes.forEach((size, si) => {
      variants.push({
        colorId: color.id,
        sizeId: size.id,
        // One store product id per product; one variant id per colour+size.
        productId: `PLACEHOLDER-${base}-PRODUCT`,
        variantId: `PLACEHOLDER-${base}-${ci + 1}${si + 1}`,
        sku: `JUUJO-${base}-${color.id}-${size.id}`.toUpperCase(),
        priceCents: size.priceCents,
        compareAtCents: size.compareAtCents,
        inStock: true,
      });
    });
  });
  return variants;
}

/* ------------------------------------------------------------------ */
/* Grounding Sheets                                                    */
/* ------------------------------------------------------------------ */

// Real per-size pricing sourced from thegrounding.co product JSON.
// Prices differ by size; compareAt is 2x the sale price (their standard display).

const groundingColors: ProductColor[] = [
  { id: "white", name: "White", hex: "#f2efe8", image: productMediaAsset("whitelinen3_jpg-min.jpg", "grounding-sheets", "images") },
  { id: "grey",  name: "Grey",  hex: "#9b9a95", image: productMediaAsset("graylinen3_png-min.png",  "grounding-sheets", "images") },
  { id: "green", name: "Green", hex: "#5c6b52", image: productMediaAsset("greenlinen3_png-min.png", "grounding-sheets", "images") },
];

const groundingSizes: SizePricing[] = [
  { id: "single",    name: "Single",    dimensions: "27 x 78 in", priceCents: 10995, compareAtCents: 21990 },
  { id: "twin",      name: "Twin",      dimensions: "39 x 75 in", priceCents: 14995, compareAtCents: 29990 },
  { id: "twin-xl",   name: "Twin XL",   dimensions: "39 x 80 in", priceCents: 15995, compareAtCents: 31990 },
  { id: "full",      name: "Full",      dimensions: "54 x 75 in", priceCents: 16995, compareAtCents: 33990 },
  { id: "queen",     name: "Queen",     dimensions: "60 x 80 in", priceCents: 16995, compareAtCents: 33990 },
  { id: "king",      name: "King",      dimensions: "76 x 80 in", priceCents: 18995, compareAtCents: 37990 },
  { id: "cali-king", name: "Cali King", dimensions: "72 x 84 in", priceCents: 18995, compareAtCents: 37990 },
];

// Real ShopBase/PlusBase ids for the fitted grounding sheet, keyed by
// `${colorId}-${sizeId}`. Source: user's "Fitted Grounding Sheets" doc.
// ShopBase assigns a distinct product id per size within a colour.
// A null variantId means that colour+size is out of stock.
const groundingSheetIds: Record<string, { productId: string; variantId: string | null }> = {
  "white-single":    { productId: "1000000669114144", variantId: "1000020490757976" },
  "white-twin":      { productId: "1000000669114547", variantId: "1000020490760779" },
  "white-twin-xl":   { productId: "1000000669114144", variantId: "1000020490757981" },
  "white-full":      { productId: "1000000669114547", variantId: "1000020490760780" },
  "white-queen":     { productId: "1000000669114144", variantId: "1000020490757983" },
  "white-king":      { productId: "1000000669114218", variantId: "1000020490759920" },
  "white-cali-king": { productId: "1000000669114547", variantId: "1000020490760772" },
  "grey-single":     { productId: "1000000669114144", variantId: "1000020490757995" },
  "grey-twin":       { productId: "1000000669114547", variantId: "1000020490760803" },
  "grey-twin-xl":    { productId: "1000000669114144", variantId: "1000020490757998" },
  "grey-full":       { productId: "1000000669114547", variantId: "1000020490760804" },
  "grey-queen":      { productId: "1000000669114144", variantId: "1000020490757994" },
  "grey-king":       { productId: "1000000669114218", variantId: "1000020490759921" },
  "grey-cali-king":  { productId: "1000000669114547", variantId: "1000020490760792" },
  "green-single":    { productId: "1000000669114547", variantId: "1000020490760742" },
  "green-twin":      { productId: "1000000669114547", variantId: "1000020490760739" },
  "green-twin-xl":   { productId: "1000000669114547", variantId: null },
  "green-full":      { productId: "1000000669114547", variantId: "1000020490760740" },
  "green-queen":     { productId: "1000000669114547", variantId: "1000020490760729" },
  "green-king":      { productId: "1000000669114547", variantId: "1000020490760730" },
  "green-cali-king": { productId: "1000000669114547", variantId: "1000020490760728" },
};

/** Build the fitted-sheet variant matrix using the real store ids above. */
function buildGroundingVariants(
  colors: ProductColor[],
  sizes: SizePricing[],
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  colors.forEach((color) => {
    sizes.forEach((size) => {
      const ids = groundingSheetIds[`${color.id}-${size.id}`];
      variants.push({
        colorId: color.id,
        sizeId: size.id,
        productId: ids?.productId ?? "",
        variantId: ids?.variantId ?? "",
        sku: `JUUJO-GROUNDING-${color.id}-${size.id}`.toUpperCase(),
        priceCents: size.priceCents,
        compareAtCents: size.compareAtCents,
        inStock: Boolean(ids?.variantId),
      });
    });
  });
  return variants;
}

// Real ShopBase/PlusBase ids for the FLAT grounding sheet, keyed by
// `${colorId}-${sizeId}`. Source: user's "Flat Grounding Sheets.docx".
// Green is entirely out of stock. White/Grey Cali King are out of stock.
const groundingFlatSheetIds: Record<string, { productId: string; variantId: string | null }> = {
  "white-single":    { productId: "1000000669115427", variantId: "1000020490757976" },
  "white-twin":      { productId: "1000000668486093", variantId: "1000020478581936" },
  "white-twin-xl":   { productId: "1000000669280338", variantId: "1000020494966604" },
  "white-full":      { productId: "1000000668486093", variantId: "1000020478581946" },
  "white-queen":     { productId: "1000000669280338", variantId: "1000020494966605" },
  "white-king":      { productId: "1000000668486093", variantId: "1000020478581940" },
  "white-cali-king": { productId: "1000000668486093", variantId: null },
  "grey-single":     { productId: "1000000669115427", variantId: "1000020490798339" },
  "grey-twin":       { productId: "1000000668486093", variantId: "1000020478581967" },
  "grey-twin-xl":    { productId: "1000000669280338", variantId: "1000020494966606" },
  "grey-full":       { productId: "1000000668486093", variantId: "1000020478581954" },
  "grey-queen":      { productId: "1000000669280338", variantId: "1000020494966607" },
  "grey-king":       { productId: "1000000668486093", variantId: "1000020478582025" },
  "grey-cali-king":  { productId: "1000000668486093", variantId: null },
  "green-single":    { productId: "", variantId: null },
  "green-twin":      { productId: "", variantId: null },
  "green-twin-xl":   { productId: "", variantId: null },
  "green-full":      { productId: "", variantId: null },
  "green-queen":     { productId: "", variantId: null },
  "green-king":      { productId: "", variantId: null },
  "green-cali-king": { productId: "", variantId: null },
};

/** Build the flat-sheet variant matrix using the real store ids above. */
function buildGroundingFlatVariants(
  colors: ProductColor[],
  sizes: SizePricing[],
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  colors.forEach((color) => {
    sizes.forEach((size) => {
      const ids = groundingFlatSheetIds[`${color.id}-${size.id}`];
      variants.push({
        colorId: color.id,
        sizeId: size.id,
        productId: ids?.productId ?? "",
        variantId: ids?.variantId ?? "",
        sku: `JUUJO-GROUNDING-FLAT-${color.id}-${size.id}`.toUpperCase(),
        priceCents: size.priceCents,
        compareAtCents: size.compareAtCents,
        inStock: Boolean(ids?.variantId),
      });
    });
  });
  return variants;
}

export const groundingSheets: Product = {
  id: "grounding-sheets",
  sku: "JUUJO-GROUNDING-QUEEN-GRAPHITE",
  slug: "grounding-sheets",
  category: "grounding-sheets",
  categoryLabel: "Grounding Sheets",
  name: "PremiumGrounding Bed Sheet",
  heroTitle: "Grounding",
  heroEmphasis: "Fitted Sheet",
  shortDescription:
    "Conductive silver-threaded grounding sheet for calmer, more settled nights.",
  description:
    "A soft, breathable fitted sheet woven with conductive silver threads and a grounding cord for your bed. Designed for people who want a calmer, more settled wind-down and a simple upgrade to their sleep setup.",
  seoTitle: "Grounding Sheet | Juujo Premium Bedding",
  seoDescription:
    "Juujo Grounding Sheet with conductive silver threads and grounding cord. Soft, breathable, machine washable, available in three colours and multiple sizes.",
  currency: market.currency,
  priceCents: 16995,       // Queen price â€” the default selected size
  compareAtCents: 33990,
  rating: 4.9,
  reviewCount: 4274,
  customerCount: "40,000+",
  cartImage: productMediaAsset("main1-1.jpg", "grounding-sheets", "images"),
  gallery: [
    { src: productMediaAsset("juujo-grounding-bed-sheets-texture-close-up.png", "grounding-sheets", "images"), alt: "Grounding sheet texture" },
    { src: productMediaAsset("b9bf397deb504e42b5ac5be802662db8.HD-1080p-3.3Mbps-43631279.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet lifestyle video", animated: true },
    { src: productMediaAsset("juujo-grounding-fitted-sheet-mattress.png", "grounding-sheets", "images"), alt: "Grounding sheet setting" },
    { src: productMediaAsset("Video_Project_34.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet video", animated: true },
    { src: productMediaAsset("374974684d48448181a86f198f569415.HD-1080p-2.5Mbps-42863921.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet close-up video", animated: true },
    { src: productMediaAsset("3fe80a78c0a1471d947a133326381d98.HD-1080p-2.5Mbps-29703316.mp4", "grounding-sheets", "videos"), alt: "Using the grounding sheet", animated: true },
    { src: productMediaAsset("juujo-grounding-bed-sheets-lifestyle-sleeping.png", "grounding-sheets", "images"), alt: "Grounding sheet lifestyle" },
    { src: productMediaAsset("juujo-earthing-sheets-bedroom-view.png", "grounding-sheets", "images"), alt: "Grounding sheet view" },
    { src: productMediaAsset("juujo-conductive-silver-thread-sheets.png", "grounding-sheets", "images"), alt: "Grounding sheet close up" },
    { src: productMediaAsset("juujo-science-of-grounding-benefits.png", "grounding-sheets", "images"), alt: "Science of grounding infographic" },
    { src: productMediaAsset("juujo-grounding-sheets-customer-testimonial.png", "grounding-sheets", "images"), alt: "Customer testimonial cozy bedroom" },
    { src: productMediaAsset("juujo-grounding-bed-sheets-showcase.png", "grounding-sheets", "images"), alt: "Grounding sheet showcase" },
    { src: productMediaAsset("juujo-grounding-sheets-features-guide.png", "grounding-sheets", "images"), alt: "Grounding sheet features" },
    { src: productMediaAsset("juujo-earthing-bed-sheet-visual.png", "grounding-sheets", "images"), alt: "Grounding sheet visual" },
    { src: productMediaAsset("juujo-grounding-bed-sheets-corner-fit.png", "grounding-sheets", "images"), alt: "Grounding sheet angle 1" },
    { src: productMediaAsset("juujo-grounding-sheets-deep-pocket.png", "grounding-sheets", "images"), alt: "Grounding sheet angle 2" },
    { src: productMediaAsset("juujo-grounding-bedding-presentation.png", "grounding-sheets", "images"), alt: "Grounding sheet presentation" },
    { src: productMediaAsset("juujo-grounding-sheets-comfort-sleep.png", "grounding-sheets", "images"), alt: "Grounding sheet comfort" },
    { src: productMediaAsset("juujo-grounding-bed-sheets-health-benefits.png", "grounding-sheets", "images"), alt: "Grounding sheet health" },
    { src: productMediaAsset("juujo-grounding-sheets-fabric-detail.png", "grounding-sheets", "images"), alt: "Grounding sheet detail view" },
    { src: productMediaAsset("juujo-premium-earthing-sheets-display.png", "grounding-sheets", "images"), alt: "Grounding sheet display" },
    // { src: productMediaAsset("US_cam_1_lightgray.jpg", "grounding-sheets", "images"), alt: "Grounding sheet light gray perspective 1" },
    // { src: productMediaAsset("US_cam_2_draft2_31a3d82e-01c8-4644-8178-99729119a0c6.jpg", "grounding-sheets", "images"), alt: "Grounding sheet light gray perspective 2" },
    // { src: productMediaAsset("4603e65ff0a64b56b03b8107d58c91f0.HD-1080p-3.3Mbps-35985735.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet usage", animated: true },
    // { src: productMediaAsset("render_scene_PhysCamera001_gray_final.jpg", "grounding-sheets", "images"), alt: "Grounding sheet gray render" },
    // { src: productMediaAsset("dfsfsasaa.jpg", "grounding-sheets", "images"), alt: "Conductive silver threads detail" },
    // { src: productMediaAsset("EN_Bed_Sheet_-_How_to_Wash.png", "grounding-sheets", "images"), alt: "How to wash" },
    // { src: productMediaAsset("EN_Grounding_Bed_Sheet_Benefits.png", "grounding-sheets", "images"), alt: "Benefits" },
    // { src: productMediaAsset("EN_Sleep_Risk_reversal.png", "grounding-sheets", "images"), alt: "Sleep Risk Reversal" },
    // { src: productMediaAsset("main1-1.jpg", "grounding-sheets", "images"), alt: "Juujo grounding sheet on a made bed" },
    // { src: productMediaAsset("Pillowcase1Revised.jpg", "grounding-sheets", "images"), alt: "Pillowcase matching grounding sheet" },
    // { src: productMediaAsset("juujo-grounding-sheets-premium-quality.png", "grounding-sheets", "images"), alt: "Grounding sheet detail" },
    // { src: productMediaAsset("juujo-earthing-sheets-lifestyle-morning.png", "grounding-sheets", "images"), alt: "Grounding sheet lifestyle 2" },
    // { src: productMediaAsset("EN_Fitted_Bed_Sheets.png", "grounding-sheets", "images"), alt: "Fitted Bed Sheets" },
    // { src: productMediaAsset("EN_BEFORE_vs_AFTER.png", "grounding-sheets", "images"), alt: "Before vs After" },
    // { src: productMediaAsset("SV_Scientifically_Proven_to_Treat.jpg", "grounding-sheets", "images"), alt: "Scientifically Proven" },
    // { src: productMediaAsset("EN_MATERIALS_FBS.jpg", "grounding-sheets", "images"), alt: "Materials" },
    // { src: productMediaAsset("Bed_Sheet_-_New_Hero_18-04-26.jpg", "grounding-sheets", "images"), alt: "New Hero" },
    // { src: productMediaAsset("fca637c42e3148119829236a41c9d822.thumbnail.0000000000_1100x.jpg", "grounding-sheets", "images"), alt: "Thumbnail" },
    // { src: productMediaAsset("whitelinen3_jpg-min.jpg", "grounding-sheets", "images"), alt: "White linen" },
    // { src: productMediaAsset("greenlinen3_png-min.png", "grounding-sheets", "images"), alt: "Green linen" },
    // { src: productMediaAsset("graylinen3_png-min.png", "grounding-sheets", "images"), alt: "Gray linen" },
    // { src: productMediaAsset("custom-image-v2-3.png", "grounding-sheets", "images"), alt: "Custom Image 3" },
    // { src: productMediaAsset("custom-image-v2-4.png", "grounding-sheets", "images"), alt: "Custom Image 4" },
    // { src: productMediaAsset("custom-image-v2-2.png", "grounding-sheets", "images"), alt: "Custom Image 2" },
    // { src: productMediaAsset("custom-image-v2-6.png", "grounding-sheets", "images"), alt: "Custom Image 6" },
    // { src: productMediaAsset("custom-image-v2-5.png", "grounding-sheets", "images"), alt: "Custom Image 5" },
    // { src: productMediaAsset("Gemini_Generated_Image_uic6bquic6bquic6.jpg", "grounding-sheets", "images"), alt: "Lifestyle Image" },
    // { src: productMediaAsset("custom-image-v2-1.png", "grounding-sheets", "images"), alt: "Custom Image 1" }
  ],
  colors: groundingColors,
  sizes: groundingSizes,
  variants: buildGroundingVariants(groundingColors, groundingSizes),
  quantityTiers: defaultQuantityTiers,
  material: "95% organic cotton, 5% conductive silver fibre",
  care: "Machine wash cold, gentle cycle. Do not bleach. Tumble dry low.",
  specs: [
    { label: "Material", value: "Organic cotton with silver fibre" },
    { label: "Conductive thread", value: "Pure silver, evenly woven" },
    { label: "Includes", value: "Fitted sheet, grounding cord, adaptor" },
    { label: "Thread feel", value: "Soft, breathable, 300 thread count" },
    { label: "Care", value: "Machine washable, cold gentle cycle" },
    { label: "Sizes", value: "Single, Twin, Twin XL, Full, Queen, King, Cali King" },
  ],
  included: [
    { quantity: "1x", label: "Grounding fitted sheet" },
    { quantity: "1x", label: "Grounding cord" },
    { quantity: "1x", label: "Wall adaptor" },
    { quantity: "1x", label: "Setup guide" },
  ],
  highlights: [
    "Conductive silver threads woven throughout",
    "Soft, breathable organic cotton",
    "Simple plug-in grounding cord",
    "Machine washable and durable",
  ],
  keyBenefits: [
    "Calmer, more settled wind-down",
    "A comfortable, breathable sleep surface",
    "Easy to set up on any bed",
    "Built to last wash after wash",
  ],
  faqs: [
    {
      question: "What is a grounding sheet?",
      answer:
        "A grounding sheet is a fitted sheet woven with conductive threads and connected to your home's grounding point with an included cord. Many people use it as part of a calming wind-down routine.",
    },
    {
      question: "Is it comfortable to sleep on?",
      answer:
        "Yes. The sheet is soft, breathable organic cotton with a 300 thread count feel, so it behaves like a premium fitted sheet.",
    },
    {
      question: "Can I machine wash it?",
      answer:
        "Yes. Machine wash cold on a gentle cycle and tumble dry low. Avoid bleach and fabric softener to keep the conductive threads working well.",
    },
    {
      question: "Which size should I choose?",
      answer:
        "Pick the size that matches your mattress, from Single through to Cali King. Each has a deep fitted skirt to stay secure overnight.",
    },
  ],
  badges: [
    "100-night trial",
    "Free shipping",
    "Easy returns",
    "OEKO-TEX certified fabric",
  ],
};

export const groundingFlatSheet: Product = {
  ...groundingSheets,
  id: "grounding-flat-sheet",
  sku: "JUUJO-GROUNDING-FLAT-QUEEN-GRAPHITE",
  slug: "grounding-flat-sheet",
  name: "Juujo Grounding Flat Sheet",
  heroEmphasis: "Flat Sheet",
  shortDescription:
    "Conductive silver-threaded grounding flat sheet for calmer, more settled nights.",
  description:
    "A soft, breathable flat sheet woven with conductive silver threads and a grounding cord for your bed. Designed for people who want a calmer, more settled wind-down and a simple upgrade to their sleep setup.",
  seoTitle: "Grounding Flat Sheet | Juujo Premium Bedding",
  seoDescription:
    "Juujo Grounding Flat Sheet with conductive silver threads and grounding cord. Soft, breathable, machine washable, available in three colours and multiple sizes.",
  gallery: [
    // --- Inherited from fitted sheets (reorder or remove as needed) ---
    // { src: productMediaAsset("juujo-grounding-bed-sheets-texture-close-up.png", "grounding-sheets", "images"), alt: "Grounding sheet texture" },
    { src: productMediaAsset("juujo-flat-sheet-8.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet presentation" },
    { src: productMediaAsset("b9bf397deb504e42b5ac5be802662db8.HD-1080p-3.3Mbps-43631279.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet lifestyle video", animated: true },
    // { src: productMediaAsset("juujo-grounding-fitted-sheet-mattress.png", "grounding-sheets", "images"), alt: "Grounding sheet setting" },
    // { src: productMediaAsset("Video_Project_34.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet video", animated: true },
    // { src: productMediaAsset("374974684d48448181a86f198f569415.HD-1080p-2.5Mbps-42863921.mp4", "grounding-sheets", "videos"), alt: "Grounding sheet close-up video", animated: true },
    // { src: productMediaAsset("3fe80a78c0a1471d947a133326381d98.HD-1080p-2.5Mbps-29703316.mp4", "grounding-sheets", "videos"), alt: "Using the grounding sheet", animated: true },
    { src: productMediaAsset("juujo-grounding-bed-sheets-lifestyle-sleeping.png", "grounding-sheets", "images"), alt: "Grounding sheet lifestyle" },
    { src: productMediaAsset("juujo-earthing-sheets-bedroom-view.png", "grounding-sheets", "images"), alt: "Grounding sheet view" },
    { src: productMediaAsset("juujo-conductive-silver-thread-sheets.png", "grounding-sheets", "images"), alt: "Grounding sheet close up" },
    { src: productMediaAsset("juujo-science-of-grounding-benefits.png", "grounding-sheets", "images"), alt: "Science of grounding infographic" },
    // { src: productMediaAsset("juujo-grounding-sheets-customer-testimonial.png", "grounding-sheets", "images"), alt: "Customer testimonial cozy bedroom" },
    { src: productMediaAsset("juujo-grounding-bed-sheets-showcase.png", "grounding-sheets", "images"), alt: "Grounding sheet showcase" },
    { src: productMediaAsset("juujo-grounding-sheets-features-guide.png", "grounding-sheets", "images"), alt: "Grounding sheet features" },
    { src: productMediaAsset("juujo-earthing-bed-sheet-visual.png", "grounding-sheets", "images"), alt: "Grounding sheet visual" },
    { src: productMediaAsset("juujo-grounding-bed-sheets-corner-fit.png", "grounding-sheets", "images"), alt: "Grounding sheet angle 1" },
    { src: productMediaAsset("juujo-grounding-sheets-deep-pocket.png", "grounding-sheets", "images"), alt: "Grounding sheet angle 2" },
    // { src: productMediaAsset("juujo-grounding-bedding-presentation.png", "grounding-sheets", "images"), alt: "Grounding sheet presentation" },
    // { src: productMediaAsset("juujo-grounding-sheets-comfort-sleep.png", "grounding-sheets", "images"), alt: "Grounding sheet comfort" },
    // { src: productMediaAsset("juujo-grounding-bed-sheets-health-benefits.png", "grounding-sheets", "images"), alt: "Grounding sheet health" },
    { src: productMediaAsset("juujo-grounding-sheets-fabric-detail.png", "grounding-sheets", "images"), alt: "Grounding sheet detail view" },
    // { src: productMediaAsset("juujo-premium-earthing-sheets-display.png", "grounding-sheets", "images"), alt: "Grounding sheet display" },
    // --- New flat sheet images (reorder as needed) ---
    { src: productMediaAsset("juujo-flat-sheet-1.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet lifestyle" },
    { src: productMediaAsset("juujo-flat-sheet-2.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet on bed" },
    { src: productMediaAsset("juujo-flat-sheet-3.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet detail" },
    { src: productMediaAsset("juujo-flat-sheet-4.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet setup" },
    // { src: productMediaAsset("juujo-flat-sheet-5.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet comfort" },
    { src: productMediaAsset("juujo-flat-sheet-6.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet features" },
    { src: productMediaAsset("juujo-flat-sheet-7.png", "grounding-sheets", "images"), alt: "Juujo grounding flat sheet silver threads" },
  ],
  variants: buildGroundingFlatVariants(groundingColors, groundingSizes),
  specs: [
    { label: "Material", value: "Organic cotton with silver fibre" },
    { label: "Conductive thread", value: "Pure silver, evenly woven" },
    { label: "Includes", value: "Flat sheet, grounding cord, adaptor" },
    { label: "Thread feel", value: "Soft, breathable, 300 thread count" },
    { label: "Care", value: "Machine washable, cold gentle cycle" },
    { label: "Sizes", value: "Double, Queen, King" },
  ],
  included: [
    { quantity: "1x", label: "Grounding flat sheet" },
    { quantity: "1x", label: "Grounding cord" },
    { quantity: "1x", label: "Wall adaptor" },
    { quantity: "1x", label: "Setup guide" },
  ],
};

/* ------------------------------------------------------------------ */
/* Grounding Mat                                                       */
/* ------------------------------------------------------------------ */

const matColors: ProductColor[] = [
  { id: "black", name: "Black", hex: "#111111" },
];

const matSizes: SizePricing[] = [
  { id: "desk", name: "Desk Mat", dimensions: "10in x 27in", priceCents: 6900, compareAtCents: 14900 },
  { id: "couch", name: "Couch Mat", dimensions: "16in x 24in", priceCents: 8900, compareAtCents: 17900 },
  { id: "floor", name: "Floor Mat", dimensions: "24in x 36in", priceCents: 10900, compareAtCents: 21900 },
];

export const groundingMat: Product = {
  id: "grounding-mat",
  sku: "JUUJO-GROUNDING-MAT",
  slug: "grounding-mat",
  category: "grounding-mat",
  categoryLabel: "Grounding Mat",
  name: "Grounding Mat",
  heroTitle: "Grounding",
  heroEmphasis: "Mat",
  shortDescription: "A versatile grounding mat for your desk, couch, or floor.",
  description: "Experience the benefits of grounding wherever you are. Perfect for under your desk while working, at the couch, or on the floor. Includes grounding cord.",
  seoTitle: "Grounding Mat | Juujo Premium",
  seoDescription: "Juujo Grounding Mat for desk, couch, or floor. Connect to the earth's natural energy indoors.",
  currency: market.currency,
  priceCents: 6995,
  compareAtCents: 13995,
  rating: 4.9,
  reviewCount: 1542,
  customerCount: "40,000+",
  cartImage: productMediaAsset("TGC-mat1.png", "grounding-mat", "images"),
  gallery: [
    { src: productMediaAsset("mat-benefits-diagram.png", "grounding-mat", "images"), alt: "Grounding mat benefits diagram" },
    { src: productMediaAsset("6206ed4066fb4719a6fe41321145df27.HD-1080p-7.2Mbps-36900726.mp4", "grounding-mat", "videos"), alt: "Grounding mat usage video", animated: true },
    { src: productMediaAsset("juujo-grounding-mat-earth-connection.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Earth Connection" },
    { src: productMediaAsset("juujo-grounding-mat-health-benefits.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Health Benefits" },
    { src: productMediaAsset("juujo-earthing-mat-office-desk.png", "grounding-mat", "images"), alt: "Juujo Earthing Mat Office Desk" },
    { src: productMediaAsset("juujo-grounding-mat-relaxing-home.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Relaxing Home" },
    { src: productMediaAsset("juujo-grounding-mat-better-sleep.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Better Sleep" },
    { src: productMediaAsset("juujo-earthing-mat-features-guide.png", "grounding-mat", "images"), alt: "Juujo Earthing Mat Features Guide" },
    { src: productMediaAsset("juujo-grounding-mat-customer-testimonial.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Customer Testimonial" },
    { src: productMediaAsset("juujo-grounding-mat-daily-use.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Daily Use" },
    { src: productMediaAsset("science_grounding_font_green_fixed_clean.png", "grounding-mat", "images"), alt: "Science of grounding infographic" },
    { src: productMediaAsset("juujo-grounding-mat-health-info.png", "grounding-mat", "images"), alt: "Juujo Grounding Mat Health Info" },
    { src: productMediaAsset("a0c706eb701446b5b7b6daf744da9e7a.HD-1080p-7.2Mbps-36900662.mp4", "grounding-mat", "videos"), alt: "Grounding mat connection", animated: true },
  ],
  colors: matColors,
  sizes: matSizes,
  // Real ShopBase/PlusBase ids for the free grounding mat (from the docs).
  variants: [
    {
      colorId: "black",
      sizeId: "desk",
      productId: "1000000669152669",
      variantId: "1000020491331605",
      sku: "JUUJO-GROUNDING-MAT-DESK",
      priceCents: 6900,
      compareAtCents: 14900,
      inStock: true,
    },
    {
      colorId: "black",
      sizeId: "couch",
      productId: "1000000669250727",
      variantId: "1000020494356823",
      sku: "JUUJO-GROUNDING-MAT-COUCH",
      priceCents: 8900,
      compareAtCents: 17900,
      inStock: true,
    },
    {
      colorId: "black",
      sizeId: "floor",
      productId: "1000000669250727",
      variantId: "1000020494356820",
      sku: "JUUJO-GROUNDING-MAT-FLOOR",
      priceCents: 10900,
      compareAtCents: 21900,
      inStock: true,
    },
  ],
  quantityTiers: defaultQuantityTiers,
  material: "Conductive carbon infused leatherette",
  care: "Wipe clean with a damp cloth.",
  specs: [
    { label: "Material", value: "Conductive carbon leatherette" },
    { label: "Includes", value: "Grounding mat, grounding cord, adaptor" },
    { label: "Care", value: "Wipe clean" },
    { label: "Size", value: "68 x 25 cm" },
  ],
  included: [
    { quantity: "1x", label: "Grounding mat" },
    { quantity: "1x", label: "Grounding cord" },
    { quantity: "1x", label: "Wall adaptor" },
  ],
  highlights: [
    "Conductive carbon surface",
    "Versatile for desk or couch",
    "Simple plug-in grounding cord",
    "Easy to wipe clean",
  ],
  keyBenefits: [
    "Calmer, more settled feeling",
    "Connect to the earth indoors",
    "Easy to set up anywhere",
    "Built to last",
  ],
  faqs: [
    {
      question: "Where can I use the mat?",
      answer: "The mat is perfect for use under your desk while working, at the couch, or on the floor.",
    },
    {
      question: "How do I clean it?",
      answer: "Simply wipe clean with a damp cloth. Do not machine wash.",
    },
  ],
  badges: [],
};

/* ------------------------------------------------------------------ */
/* Weighted Blankets                                                   */
/* ------------------------------------------------------------------ */

const weightedColors: ProductColor[] = [
  { id: "oat", name: "Oat", hex: "#d8ccb6" },
  { id: "clay", name: "Clay", hex: "#b9765a" },
  { id: "slate", name: "Slate", hex: "#4b525c" },
];

const weightedSizes: SizePricing[] = [
  { id: "5kg", name: "5 kg", dimensions: "125 x 180 cm", priceCents: 14900, compareAtCents: 19900 },
  { id: "7kg", name: "7 kg", dimensions: "150 x 200 cm", priceCents: 16900, compareAtCents: 22900 },
  { id: "9kg", name: "9 kg", dimensions: "150 x 200 cm", priceCents: 18900, compareAtCents: 24900 },
];

export const weightedBlanket: Product = {
  id: "weighted-blanket",
  sku: "JUUJO-WEIGHTED-7KG-OAT",
  slug: "weighted-blanket",
  category: "weighted-blankets",
  categoryLabel: "Weighted Blankets",
  name: "Juujo Weighted Blanket",
  heroTitle: "Weighted",
  heroEmphasis: "Blanket",
  shortDescription:
    "Evenly weighted, breathable blanket for a calmer, cocooned night's sleep.",
  description:
    "A premium weighted blanket with evenly distributed glass beads and a soft, breathable cover. The gentle, even weight helps you feel cocooned and settled as you drift off.",
  seoTitle: "Weighted Blanket | Juujo Premium Bedding",
  seoDescription:
    "Juujo Weighted Blanket with evenly distributed glass beads and a breathable cover. Choose 5kg, 7kg, or 9kg in three colours.",
  currency: market.currency,
  priceCents: 16900,
  compareAtCents: 22900,
  rating: 4.9,
  reviewCount: 5310,
  customerCount: "40,000+",
  cartImage: productAsset("01-weighted-blanket-front.webp", "weighted-blankets"),
  gallery: [
    { src: productAsset("01-weighted-blanket-front.webp", "weighted-blankets"), alt: "Juujo weighted blanket folded on a bed" },
    { src: productAsset("02-weighted-blanket-texture.webp", "weighted-blankets"), alt: "Soft breathable cover texture" },
    { src: productAsset("03-weighted-blanket-draped.webp", "weighted-blankets"), alt: "Weighted blanket draped over a chair" },
    { src: productAsset("04-weighted-blanket-stitch.webp", "weighted-blankets"), alt: "Even box stitching detail" },
    { src: productAsset("05-weighted-blanket-lifestyle.webp", "weighted-blankets"), alt: "Person relaxing under the weighted blanket" },
  ],
  colors: weightedColors,
  sizes: weightedSizes,
  variants: buildVariants("WEIGHTED", weightedColors, weightedSizes),
  quantityTiers: defaultQuantityTiers,
  material: "Breathable cotton cover with hypoallergenic glass bead fill",
  care: "Removable cover is machine washable. Spot clean the inner blanket.",
  specs: [
    { label: "Fill", value: "Hypoallergenic glass beads" },
    { label: "Cover", value: "Breathable cotton, removable" },
    { label: "Stitching", value: "Even box-stitch, no bead shift" },
    { label: "Weights", value: "5 kg, 7 kg, 9 kg" },
    { label: "Care", value: "Machine washable cover" },
    { label: "Guidance", value: "Choose roughly 10% of body weight" },
  ],
  highlights: [
    "Evenly distributed glass beads",
    "Breathable, temperature-friendly cover",
    "Box-stitched so beads stay put",
    "Removable, machine-washable cover",
  ],
  keyBenefits: [
    "A cocooned, settled feeling at bedtime",
    "Even weight with no cold or heavy spots",
    "Stays comfortable through the night",
    "Simple to keep clean",
  ],
  faqs: [
    {
      question: "Which weight should I choose?",
      answer:
        "A common guide is roughly 10% of your body weight. If you are between weights or share the blanket, size up for a more grounded feel.",
    },
    {
      question: "Will it make me too hot?",
      answer:
        "The cover is a breathable cotton designed to stay temperature-friendly, so most sleepers find it comfortable year round.",
    },
    {
      question: "How do I wash it?",
      answer:
        "Unzip and machine wash the removable cover. Spot clean the inner weighted layer as needed.",
    },
    {
      question: "Is it good for two people?",
      answer:
        "A weighted blanket works best sized to one person. For a shared bed, many couples choose two blankets so each can pick their own weight.",
    },
  ],
  badges: [
    "100-night trial",
    "Free shipping",
    "Easy returns",
    "Hypoallergenic fill",
  ],
};

/* ------------------------------------------------------------------ */
/* Cooling Bed Sheets                                                  */
/* ------------------------------------------------------------------ */

const coolingColors: ProductColor[] = [
  { id: "cloud", name: "Cloud White", hex: "#eceae4" },
  { id: "mist", name: "Sea Mist", hex: "#a9c2bd" },
  { id: "dusk", name: "Dusk Blue", hex: "#6b7f97" },
];

const coolingSizes: SizePricing[] = [
  { id: "double", name: "Double", dimensions: "137 x 191 cm", priceCents: 11900, compareAtCents: 16900 },
  { id: "queen", name: "Queen", dimensions: "153 x 203 cm", priceCents: 12900, compareAtCents: 17900 },
  { id: "king", name: "King", dimensions: "183 x 203 cm", priceCents: 14900, compareAtCents: 19900 },
];

export const coolingSheets: Product = {
  id: "cooling-sheets",
  sku: "JUUJO-COOLING-QUEEN-CLOUD",
  slug: "cooling-bed-sheets",
  category: "cooling-sheets",
  categoryLabel: "Cooling Bed Sheets",
  name: "Juujo Cooling Bed Sheets",
  heroTitle: "Cooling",
  heroEmphasis: "Sheets",
  shortDescription:
    "Silky, breathable cooling sheet set that helps warm sleepers stay comfortable.",
  description:
    "A silky-smooth, breathable sheet set designed to wick heat and moisture, so warm sleepers stay comfortable through the night. Includes a fitted sheet, flat sheet, and pillowcases.",
  seoTitle: "Cooling Bed Sheets | Juujo Premium Bedding",
  seoDescription:
    "Juujo Cooling Bed Sheets in a breathable, heat-wicking weave. Silky, skin-friendly, and available in three colours and multiple sizes.",
  currency: market.currency,
  priceCents: 12900,
  compareAtCents: 17900,
  rating: 4.9,
  reviewCount: 3870,
  customerCount: "40,000+",
  cartImage: productAsset("01-cooling-sheets-front.webp", "cooling-sheets"),
  gallery: [
    { src: productAsset("01-cooling-sheets-front.webp", "cooling-sheets"), alt: "Juujo cooling bed sheets on a made bed" },
    { src: productAsset("02-cooling-sheets-weave.webp", "cooling-sheets"), alt: "Close up of the breathable cooling weave" },
    { src: productAsset("03-cooling-sheets-set.webp", "cooling-sheets"), alt: "Full sheet set with pillowcases" },
    { src: productAsset("04-cooling-sheets-drape.webp", "cooling-sheets"), alt: "Silky drape of the cooling sheet" },
    { src: productAsset("05-cooling-sheets-lifestyle.webp", "cooling-sheets"), alt: "Cooling sheets in a bright bedroom" },
  ],
  colors: coolingColors,
  sizes: coolingSizes,
  variants: buildVariants("COOLING", coolingColors, coolingSizes),
  quantityTiers: defaultQuantityTiers,
  material: "Breathable heat-wicking microfibre weave",
  care: "Machine wash cold, tumble dry low. Do not bleach.",
  specs: [
    { label: "Weave", value: "Breathable, heat-wicking" },
    { label: "Feel", value: "Silky smooth, skin-friendly" },
    { label: "Set includes", value: "Fitted, flat, 2 pillowcases" },
    { label: "Fitted depth", value: "Fits mattresses up to 40 cm" },
    { label: "Care", value: "Machine washable, quick drying" },
    { label: "Sizes", value: "Double, Queen, King" },
  ],
  included: [
    { quantity: "1x", label: "Fitted sheet" },
    { quantity: "1x", label: "Flat sheet" },
    { quantity: "2x", label: "Pillowcases" },
  ],
  highlights: [
    "Breathable, heat-wicking weave",
    "Silky, skin-friendly feel",
    "Deep fitted corners stay put",
    "Quick drying and low maintenance",
  ],
  keyBenefits: [
    "Cooler, more comfortable nights",
    "Less waking up too warm",
    "A soft, premium sheet feel",
    "Easy care that lasts",
  ],
  faqs: [
    {
      question: "How do the sheets stay cool?",
      answer:
        "The weave is engineered to be breathable and to wick heat and moisture away from the skin, which helps warm sleepers stay comfortable.",
    },
    {
      question: "What is included in the set?",
      answer:
        "Each set includes a fitted sheet, a flat sheet, and two pillowcases. Sizing follows your mattress: Double, Queen, or King.",
    },
    {
      question: "Will they fit a deep mattress?",
      answer:
        "Yes. The fitted sheet has deep corners that fit mattresses up to 40 cm, including most toppers.",
    },
    {
      question: "How should I wash them?",
      answer:
        "Machine wash cold and tumble dry low. Avoid bleach to protect the cooling finish.",
    },
  ],
  badges: [
    "100-night trial",
    "Free shipping",
    "Easy returns",
    "OEKO-TEX certified fabric",
  ],
};

/* ------------------------------------------------------------------ */
/* Pillows                                                             */
/* ------------------------------------------------------------------ */

const pillowColors: ProductColor[] = [
  { id: "white", name: "Classic White", hex: "#efeee9" },
  { id: "linen", name: "Warm Linen", hex: "#d6c7ac" },
];

const pillowSizes: SizePricing[] = [
  { id: "standard", name: "Standard", dimensions: "48 x 74 cm", priceCents: 6900, compareAtCents: 9900 },
  { id: "king", name: "King", dimensions: "51 x 92 cm", priceCents: 7900, compareAtCents: 10900 },
  { id: "pair", name: "Pair (2)", dimensions: "2 x Standard", priceCents: 11900, compareAtCents: 17900 },
];

export const pillows: Product = {
  id: "pillows",
  sku: "JUUJO-PILLOW-STANDARD-WHITE",
  slug: "pillows",
  category: "pillows",
  categoryLabel: "Pillows",
  name: "Juujo Adaptive Pillow",
  heroTitle: "Adaptive",
  heroEmphasis: "Pillow",
  shortDescription:
    "Adjustable-loft pillow with a breathable cover that adapts to how you sleep.",
  description:
    "An adaptive pillow with a supportive yet soft fill and a breathable, washable cover. The loft can be adjusted to suit back, side, and front sleepers for comfortable neck support.",
  seoTitle: "Adaptive Pillow | Juujo Premium Bedding",
  seoDescription:
    "Juujo Adaptive Pillow with adjustable loft and a breathable, washable cover. Supportive comfort for every sleep position.",
  currency: market.currency,
  priceCents: 6900,
  compareAtCents: 9900,
  rating: 4.9,
  reviewCount: 6120,
  customerCount: "40,000+",
  cartImage: productAsset("01-pillow-front.webp", "pillows"),
  gallery: [
    { src: productAsset("01-pillow-front.webp", "pillows"), alt: "Juujo adaptive pillow on a bed" },
    { src: productAsset("02-pillow-loft.webp", "pillows"), alt: "Adjustable loft fill detail" },
    { src: productAsset("03-pillow-cover.webp", "pillows"), alt: "Breathable washable cover" },
    { src: productAsset("04-pillow-support.webp", "pillows"), alt: "Pillow supporting a sleeper's neck" },
    { src: productAsset("05-pillow-lifestyle.webp", "pillows"), alt: "Pair of pillows on a styled bed" },
  ],
  colors: pillowColors,
  sizes: pillowSizes,
  variants: buildVariants("PILLOW", pillowColors, pillowSizes),
  quantityTiers: defaultQuantityTiers,
  material: "Adaptive fill with a breathable, washable cotton cover",
  care: "Cover is machine washable. Fill is spot clean and refreshable.",
  specs: [
    { label: "Loft", value: "Adjustable, add or remove fill" },
    { label: "Support", value: "Soft yet supportive" },
    { label: "Cover", value: "Breathable cotton, removable" },
    { label: "Sleepers", value: "Back, side, and front" },
    { label: "Care", value: "Machine washable cover" },
    { label: "Options", value: "Standard, King, or a pair" },
  ],
  highlights: [
    "Adjustable loft for any sleep position",
    "Soft yet supportive adaptive fill",
    "Breathable, washable cover",
    "Holds its shape night after night",
  ],
  keyBenefits: [
    "Comfortable neck support",
    "Personalised height and feel",
    "Cooler, breathable comfort",
    "Easy to keep fresh and clean",
  ],
  faqs: [
    {
      question: "Can I change how tall the pillow is?",
      answer:
        "Yes. The adaptive fill can be added or removed so you can set the loft that suits back, side, or front sleeping.",
    },
    {
      question: "Is the cover washable?",
      answer:
        "The breathable cotton cover is removable and machine washable. The fill can be spot cleaned and refreshed.",
    },
    {
      question: "Which option should I buy?",
      answer:
        "Choose Standard or King to match your pillowcases, or the Pair option to do both sides of the bed at a better price.",
    },
    {
      question: "Is it suitable for hot sleepers?",
      answer:
        "The breathable cover and fill are designed to stay comfortable and airy, which most warm sleepers appreciate.",
    },
  ],
  badges: [
    "100-night trial",
    "Free shipping",
    "Easy returns",
    "Hypoallergenic fill",
  ],
};

/* ------------------------------------------------------------------ */
/* Registry + helpers                                                  */
/* ------------------------------------------------------------------ */

export const products = [
  groundingSheets,
  groundingFlatSheet,
  groundingMat,
  // weightedBlanket,
  // coolingSheets,
  // pillows,
];

export const productsById = Object.fromEntries(
  products.map((product) => [product.id, product]),
) as Record<string, Product>;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return productsById[id];
}

/** Resolve the variant for a colour + size, falling back to the first variant. */
export function getVariant(
  product: Product,
  colorId?: string,
  sizeId?: string,
): ProductVariant {
  return (
    product.variants.find(
      (variant) =>
        (!colorId || variant.colorId === colorId) &&
        (!sizeId || variant.sizeId === sizeId),
    ) ?? product.variants[0]
  );
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}

/** Per-unit price for a variant after applying a quantity tier's discount. */
export function unitPriceForTier(
  variant: ProductVariant,
  tier: QuantityTier,
): number {
  return Math.round(variant.priceCents * (1 - tier.discountPct / 100));
}

/** Total price for a variant at a given quantity tier. */
export function totalPriceForTier(
  variant: ProductVariant,
  tier: QuantityTier,
): number {
  return unitPriceForTier(variant, tier) * tier.quantity;
}
