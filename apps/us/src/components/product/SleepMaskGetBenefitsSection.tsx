import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";

export function SleepMaskGetBenefitsSection() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-12 md:py-24 border-y border-[var(--border)]">
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <SectionHeading
              eyebrow="Benefits"
              title={<>Get All The <em className="juujo-italic text-[var(--gold)]">Benefits</em>.</>}
              align="left"
            />
            <p className="juujo-body-copy max-w-lg text-[var(--muted)] mb-6">
              Deeper sleep is not just about feeling rested—it is about complete restoration. Our mask locks out light to help your body naturally produce melatonin, while the smooth silk surface prevents friction damage to your skin and hair.
            </p>
            <ul className="juujo-body-copy max-w-lg text-[var(--muted)] list-disc pl-5 space-y-2">
              <li>Wake up feeling refreshed and energized</li>
              <li>Protect the delicate skin around your eyes</li>
              <li>Prevent bed-head and hair breakage</li>
              <li>Perfect for travel, shift work, or daytime napping</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 w-full">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
              <img
                src={productMediaAsset(
                  "juujo-premium-sleep-mask-banner-6.png",
                  "sleep-mask",
                  "images"
                )}
                alt="Premium Sleep Mask Benefits"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
