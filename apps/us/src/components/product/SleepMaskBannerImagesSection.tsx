import Image from "next/image";
import { productMediaAsset } from "@/lib/media";

export function SleepMaskBannerImagesSection() {
  return (
    <section className="bg-[var(--cream)]">
      <div className="flex flex-col md:flex-row w-full">
        <div className="relative aspect-square md:aspect-auto w-full md:h-[600px] overflow-hidden">
          <Image
            src={productMediaAsset("juujo-premium-sleep-mask-banner-4.png", "sleep-mask", "images")}
            alt="Premium Sleep Mask Lifestyle"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square md:aspect-auto w-full md:h-[600px] overflow-hidden">
          <Image
            src={productMediaAsset("juujo-premium-sleep-mask-banner-5.png", "sleep-mask", "images")}
            alt="Premium Sleep Mask Detail"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
