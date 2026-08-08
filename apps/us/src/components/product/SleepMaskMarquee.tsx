import Image from "next/image";
import { productMediaAsset } from "@/lib/media";

export function SleepMaskMarquee() {
  const images = [
    { src: "juujo-premium-sleep-mask-black-1.png", alt: "Premium Sleep Mask Black" },
    { src: "juujo-premium-sleep-mask-pink-1.png", alt: "Premium Sleep Mask Pink" },
    { src: "juujo-premium-sleep-mask-green-1.png", alt: "Premium Sleep Mask Green" },
    { src: "juujo-premium-sleep-mask-black-2.png", alt: "Premium Sleep Mask Black Details" },
    { src: "juujo-premium-sleep-mask-pink-2.png", alt: "Premium Sleep Mask Pink Details" },
    { src: "juujo-premium-sleep-mask-green-2.png", alt: "Premium Sleep Mask Green Details" },
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section className="juujo-section border-y border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] py-7 md:py-12">
      <div className="juujo-wrap flex items-end justify-between gap-6">
        <div>
          <p className="juujo-mono text-[var(--gold)]">Next Level Beauty Sleep</p>
          <h2 className="juujo-display mt-3 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Real Results.
          </h2>
        </div>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="juujo-marquee">
          {duplicatedImages.map((image, idx) => (
            <div
              key={`${image.src}-${idx}`}
              className="relative aspect-square w-72 flex-none overflow-hidden rounded-3xl"
            >
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                sizes="288px"
                src={productMediaAsset(image.src, "sleep-mask", "images")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
