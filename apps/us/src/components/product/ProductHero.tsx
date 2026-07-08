import type { Product } from "@/data/products";
import { ProductGallery } from "./ProductGallery";
import { ProductBuyBox } from "./ProductBuyBox";
import { GroundingBuyBox } from "./GroundingBuyBox";
import { GroundingMatBuyBox } from "./GroundingMatBuyBox";

export function ProductHero({ product }: { product: Product }) {
  const BuyBox =
    product.category === "grounding-sheets" 
      ? GroundingBuyBox 
      : product.category === "grounding-mat"
      ? GroundingMatBuyBox
      : ProductBuyBox;
  return (
    <section
      className="juujo-section bg-[var(--cream)] pt-8 pb-14 [overflow-anchor:none] md:pt-12 md:pb-24"
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="juujo-wrap relative z-10 grid gap-8 [overflow-anchor:none] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProductGallery images={product.gallery} hasGifts={false} />
        </div>
        <div className="[overflow-anchor:none]">
          <BuyBox product={product} />
        </div>
      </div>
    </section>
  );
}
