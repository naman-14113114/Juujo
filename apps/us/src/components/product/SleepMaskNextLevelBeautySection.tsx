import { productMediaAsset } from "@/lib/media";

export function SleepMaskNextLevelBeautySection() {
  return (
    <section className="bg-[var(--plum)] py-12 md:py-24">
      <div className="juujo-wrap max-w-[1200px] mx-auto text-center">
        <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--gold)] mb-12">
          Next level beauty sleep.
        </h2>
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
           <img
                src={productMediaAsset(
                  "juujo-premium-sleep-mask-banner-3.png",
                  "sleep-mask",
                  "images"
                )}
                alt="Premium Sleep Mask Next Level Beauty"
                className="absolute inset-0 h-full w-full object-cover"
              />
        </div>
      </div>
    </section>
  );
}
