"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/data/products";
import { ProductGallery } from "./ProductGallery";
import { ProductBuyBox } from "./ProductBuyBox";
import { GroundingBuyBox } from "./GroundingBuyBox";
import { GroundingMatBuyBox } from "./GroundingMatBuyBox";

export function ProductHero({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState(product.colors[0]?.id);

  const displayImages = useMemo(() => {
    if (product.category === "premium-sleep-mask") {
       const colorName = product.colors.find((c) => c.id === activeColor)?.name;
       if (!colorName) return product.gallery;
       return product.gallery.filter(
         (img) =>
           img.alt.toLowerCase().includes(colorName.toLowerCase()) ||
           img.src.toLowerCase().includes(colorName.toLowerCase())
       );
    }
    return product.gallery;
  }, [product, activeColor]);

  return (
    <section
      className="juujo-section bg-[var(--cream)] pt-4 pb-7 [overflow-anchor:none] md:pt-6 md:pb-12"
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="juujo-wrap relative z-10 grid gap-8 [overflow-anchor:none] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProductGallery key={activeColor} images={displayImages} hasGifts={false} />
        </div>
        <div className="[overflow-anchor:none]">
          {product.category === "grounding-sheets" ? (
            <GroundingBuyBox product={product} />
          ) : product.category === "grounding-mat" ? (
            <GroundingMatBuyBox product={product} />
          ) : (
            <ProductBuyBox product={product} onColorChange={setActiveColor} />
          )}
        </div>
      </div>
    </section>
  );
}
