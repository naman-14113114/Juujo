import type { Product } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PillowcaseBuyBox } from "./PillowcaseBuyBox";

export function PillowcaseHero({ product }: { product: Product }) {
  return (
    <section
      className="juujo-section bg-[var(--cream)] pt-4 pb-7 [overflow-anchor:none] md:pt-6 md:pb-12"
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="juujo-wrap relative z-10 grid gap-8 [overflow-anchor:none] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProductGallery images={product.gallery} hasGifts={false} />
        </div>
        <div className="[overflow-anchor:none]">
          <PillowcaseBuyBox product={product} />
        </div>
      </div>
    </section>
  );
}
