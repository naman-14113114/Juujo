import { productMediaAsset } from "@/lib/media";

export function SleepChoiceSection() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-12 md:py-24">
      <div className="juujo-wrap max-w-[1200px] mx-auto text-center">
        <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-4">
          The sleep choice of<br />people who sleep.
        </h2>
        <p className="juujo-body-copy max-w-2xl mx-auto text-[var(--muted)] mb-12">
          Join thousands of satisfied sleepers who have transformed their nights with our Premium Sleep Mask.
        </p>
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl">
           <img
                src={productMediaAsset(
                  "juujo-premium-sleep-mask-comparison.png",
                  "sleep-mask",
                  "images"
                )}
                alt="Premium Sleep Mask Comparison"
                className="absolute inset-0 h-full w-full object-cover"
              />
        </div>
      </div>
    </section>
  );
}
