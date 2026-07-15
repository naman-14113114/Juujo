import type { Product } from "@/data/products";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { ProductHero } from "./ProductHero";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { TrustBadges } from "./TrustBadges";
import { GroundingBenefitsSection } from "./GroundingBenefitsSection";
import { GroundingHowItWorksSection } from "./GroundingHowItWorksSection";
import { GroundingFlatSheetHowItWorksSection } from "./GroundingFlatSheetHowItWorksSection";
import { GroundingExpectationsSection } from "./GroundingExpectationsSection";
import { GroundingScienceSection } from "./GroundingScienceSection";
import { GroundingComparisonSection } from "./GroundingComparisonSection";
// import { GroundingTimelineSection } from "./GroundingTimelineSection";
import { GroundingWhatIsItSection } from "./GroundingWhatIsItSection";
import { GroundingBenefitsVideoSection } from "./GroundingBenefitsVideoSection";
import { GroundingMatWhatIsItSection } from "./GroundingMatWhatIsItSection";
import { GroundingMatBenefitsSection } from "./GroundingMatBenefitsSection";
import { GroundingMatHowToUseSection } from "./GroundingMatHowToUseSection";
import { GroundingMatTimelineSection } from "./GroundingMatTimelineSection";
import { FeatureGrid } from "./FeatureGrid";
import { VideoReviews } from "./VideoReviews";

/**
 * Category-agnostic Juujo product page. One flexible template for every bedding
 * category. Colour, size, and the Buy 1 / 2 / 3 quantity offer live in the hero
 * BuyBox. LED/skincare-only sections are no longer rendered; this template is
 * fully grounding/bedding focused.
 */
export function ProductPage({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      {product.id === "grounding-sheets" && <VideoReviews />}
      <TrustBadges />
      {product.category === "grounding-sheets" && (
        <>
          <GroundingBenefitsSection />
          <GroundingBenefitsVideoSection />
          {product.id === "grounding-flat-sheet" ? (
            <GroundingFlatSheetHowItWorksSection />
          ) : (
            <GroundingHowItWorksSection />
          )}
          <GroundingExpectationsSection />
          {/* <GroundingTimelineSection /> */}
          <GroundingScienceSection />
          <FeatureGrid />
          <ProductReviewsSection productHandle={product.slug} />
          <GroundingWhatIsItSection />
          <GroundingComparisonSection />
        </>
      )}
      {product.category === "grounding-mat" && (
        <>
          <GroundingMatBenefitsSection />
          <GroundingMatHowToUseSection />
          <GroundingMatTimelineSection />
          <GroundingScienceSection />
          <FeatureGrid />
          <ProductReviewsSection productHandle={product.slug} />
          <GroundingMatWhatIsItSection />
        </>
      )}
      {product.category !== "grounding-sheets" && product.category !== "grounding-mat" && (
        <ProductReviewsSection productHandle="grounding-sheets" />
      )}
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection productCategory={product.category} productId={product.id} />
      <StickyAddToCart product={product} />
    </>
  );
}
