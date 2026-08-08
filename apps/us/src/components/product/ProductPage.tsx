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
import { SleepMaskFeaturesSection } from "./SleepMaskFeaturesSection";
import { SleepMaskBannerImagesSection } from "./SleepMaskBannerImagesSection";
import { SleepMaskGetBenefitsSection } from "./SleepMaskGetBenefitsSection";
import { SleepMaskSoGoodSection } from "./SleepMaskSoGoodSection";
import { SleepMaskNextLevelBeautySection } from "./SleepMaskNextLevelBeautySection";
import { SleepChoiceSection } from "./SleepChoiceSection";
import { SleepMaskMarquee } from "./SleepMaskMarquee";
import { SleepMaskAccordions } from "./SleepMaskAccordions";
import { GroundingWhatIsItSection } from "./GroundingWhatIsItSection";
import { GroundingBenefitsVideoSection } from "./GroundingBenefitsVideoSection";
import { GroundingMatWhatIsItSection } from "./GroundingMatWhatIsItSection";
import { GroundingMatBenefitsSection } from "./GroundingMatBenefitsSection";
import { GroundingMatHowToUseSection } from "./GroundingMatHowToUseSection";
import { GroundingMatTimelineSection } from "./GroundingMatTimelineSection";
import { CompanionAppPromo } from "./CompanionAppPromo";
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
          {/* <CompanionAppPromo /> */}
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
          {/* <CompanionAppPromo /> */}
          <ProductReviewsSection productHandle={product.slug} />
          <GroundingMatWhatIsItSection />
        </>
      )}
      {product.category === "premium-sleep-mask" && (
        <>
          <SleepMaskNextLevelBeautySection />
          <SleepMaskMarquee />
          <SleepMaskBannerImagesSection />
          <SleepMaskGetBenefitsSection />
          <SleepMaskSoGoodSection />
          <SleepChoiceSection />
          <SleepMaskFeaturesSection />
          <ProductReviewsSection productHandle={product.slug} />
          <div className="juujo-wrap max-w-3xl mx-auto py-12">
             <SleepMaskAccordions />
          </div>
        </>
      )}
      {product.category !== "grounding-sheets" && product.category !== "grounding-mat" && product.category !== "premium-sleep-mask" && (
        <ProductReviewsSection productHandle="grounding-sheets" />
      )}
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection productCategory={product.category} productId={product.id} />
      <StickyAddToCart product={product} />
    </>
  );
}
