import { Product } from "@/data/products";
import { PillowcaseHero } from "./pillowcase/PillowcaseHero";
import { TrustBadges } from "@/components/product/TrustBadges";
import { PillowcaseBenefitsSection } from "./pillowcase/PillowcaseBenefitsSection";
import { PillowcaseHowItWorksSection } from "./pillowcase/PillowcaseHowItWorksSection";

import { PillowcaseScienceSection } from "./pillowcase/PillowcaseScienceSection";
import { PillowcaseHowDoesItWorkSection } from "./pillowcase/PillowcaseHowDoesItWorkSection";
import { PillowcaseWhyUseSection } from "./pillowcase/PillowcaseWhyUseSection";
import { ProductReviewsSection } from "@/components/product/ProductReviewsSection";
import { PillowcaseWhatIsItSection } from "./pillowcase/PillowcaseWhatIsItSection";

import { FAQSection } from "@/components/product/FAQSection";
import { GuaranteeSection } from "@/components/product/GuaranteeSection";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";

export function PillowcasePage({ product }: { product: Product }) {
  return (
    <>
      <PillowcaseHero product={product} />
      <TrustBadges />
      <PillowcaseHowDoesItWorkSection />
      <PillowcaseWhyUseSection />
      {/* <PillowcaseBenefitsSection /> */}
      <PillowcaseHowItWorksSection />

      <PillowcaseScienceSection />
      <ProductReviewsSection productHandle={product.slug} />
      <PillowcaseWhatIsItSection />

      <FAQSection faqs={product.faqs} />
      <GuaranteeSection productCategory={product.category} productId={product.id} />
      <StickyAddToCart product={product} />
    </>
  );
}
