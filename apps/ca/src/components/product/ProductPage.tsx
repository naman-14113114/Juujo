import type { Product } from "@/data/products";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TrustBadges } from "./TrustBadges";
import { GroundingBenefitsSection } from "./GroundingBenefitsSection";
import { GroundingHowItWorksSection } from "./GroundingHowItWorksSection";
import { GroundingScienceSection } from "./GroundingScienceSection";
import { GroundingComparisonSection } from "./GroundingComparisonSection";
import { GroundingTimelineSection } from "./GroundingTimelineSection";
import { GroundingWhatIsItSection } from "./GroundingWhatIsItSection";
import { GroundingBenefitsVideoSection } from "./GroundingBenefitsVideoSection";
import { GroundingMatWhatIsItSection } from "./GroundingMatWhatIsItSection";
import { GroundingMatBenefitsSection } from "./GroundingMatBenefitsSection";
import { GroundingMatHowToUseSection } from "./GroundingMatHowToUseSection";
import { GroundingMatTimelineSection } from "./GroundingMatTimelineSection";

/**
 * Category-agnostic Juujo product page. One flexible template for every bedding
 * category. Colour, size, and the Buy 1 / 2 / 3 quantity offer live in the hero
 * BuyBox. All LED/skincare-only sections (wavelengths, dermatologist,
 * before/after, app promo, comparison, video reviews, torch variant) removed.
 */
export function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      <TrustBadges />
      {product.category === "grounding-sheets" && (
        <>
          <GroundingWhatIsItSection />
          <GroundingBenefitsSection />
          <GroundingBenefitsVideoSection />
          <GroundingHowItWorksSection />
          <GroundingTimelineSection />
          <GroundingScienceSection />
          <GroundingComparisonSection />
        </>
      )}
      {product.category === "grounding-mat" && (
        <>
          <GroundingMatWhatIsItSection />
          <GroundingMatBenefitsSection />
          <GroundingMatHowToUseSection />
          <GroundingMatTimelineSection />
          <GroundingScienceSection />
        </>
      )}
      <ProductReviewsSection
        productHandle={
          product.category === "grounding-sheets" || product.category === "grounding-mat" ? product.slug : "buudy-led-mask"
        }
      />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
