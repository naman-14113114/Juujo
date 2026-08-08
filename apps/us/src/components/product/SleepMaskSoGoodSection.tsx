import { productMediaAsset } from "@/lib/media";

export function SleepMaskSoGoodSection() {
  return (
    <section className="juujo-section bg-[var(--plum)] py-12 md:py-24 text-[var(--cream)]">
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-1 w-full">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
              <img
                src={productMediaAsset(
                  "juujo-premium-sleep-mask-banner-7.png",
                  "sleep-mask",
                  "images"
                )}
                alt="Premium Sleep Mask Lifestyle"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-2 flex flex-col justify-center">
            <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl mb-6">
              So good, you will never want to take it off.
            </h2>
            <p className="juujo-body-copy max-w-lg text-[rgba(247,241,232,0.8)]">
              Designed for the ultimate sleep experience, our Premium Sleep Mask delivers total darkness, unmatched comfort, and a luxurious feel that helps you drift off effortlessly and wake up beautifully.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
