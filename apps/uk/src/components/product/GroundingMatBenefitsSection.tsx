import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";
import { Moon, Leaf, HeartPulse } from "lucide-react";

export function GroundingMatBenefitsSection() {
  const benefits = [
    {
      title: "Achieve Deeper, Restorative Sleep",
      description: "Connect to the earth's natural energy to fall asleep faster and wake up feeling completely refreshed.",
      icon: Moon,
    },
    {
      title: "Relieve Stress & Find Calm",
      description: "Neutralize free radicals to help your body unwind, reducing daily tension and promoting a peaceful state of mind.",
      icon: Leaf,
    },
    {
      title: "Soothe Aches & Inflammation",
      description: "Experience the soothing effect of natural grounding which can help ease joint discomfort and promote recovery.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-14 md:py-24">
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Benefits"
          title={
            <>
              Experience the <em className="juujo-italic text-[var(--gold)]">benefits</em> of natural grounding.
            </>
          }
          copy="Transform any space into a restorative sanctuary. Our premium grounding mat brings the earth's healing energy straight to your desk, couch, or floor."
        />

        <div className="mt-12 md:mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 md:gap-12 order-2 md:order-1">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-none w-14 h-14 rounded-full bg-[var(--blush)] text-[var(--plum)] flex items-center justify-center">
                  <benefit.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="juujo-display text-xl md:text-2xl text-[var(--plum)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full order-1 md:order-2">
            <Image
              src={productMediaAsset("mat-benefits-diagram.png", "grounding-mat", "images")}
              alt="Juujo Grounding Mat Benefits Diagram"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain rounded-2xl shadow-xl"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
