"use client";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";
import { Moon, Leaf, HeartPulse } from "lucide-react";

export function PillowcaseBenefitsSection() {
  const benefits = [
    {
      title: "Fall asleep faster and stay asleep",
      description:
        "Connect to the earth's natural energy to fall asleep faster and stay asleep throughout the night.",
      icon: Moon,
    },
    {
      title: "Wake up energized every morning",
      description:
        "Wake up feeling completely refreshed and energized every morning without relying on caffeine.",
      icon: Leaf,
    },
    {
      title: "Reduce inflammation and daily pain",
      description:
        "Improve sleep naturally — no medication required to ease tension and physical discomfort.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Benefits"
          title={
            <>
              Experience the{" "}
              <em className="juujo-italic text-[var(--gold)]">benefits</em> of
              natural grounding.
            </>
          }
          copy="An effortless addition to your nightly routine. Simply place the Earthing Pillowcase over your pillow and sleep as usual."
        />

        <div className="mt-12 md:mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 md:gap-12 order-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-none text-[#219937] mt-1">
                  <benefit.icon size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="juujo-display text-xl md:text-2xl text-[var(--plum)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="juujo-body-copy text-[var(--muted)]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-2xl order-1">
            <Image
              src={productMediaAsset(
                "juujo-grounding-pillowcase-1.jpg",
                "grounding-sheets",
                "images",
              )}
              alt="Grounding Pillowcase Benefits"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
