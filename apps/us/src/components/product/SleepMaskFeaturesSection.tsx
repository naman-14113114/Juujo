"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/sleepMaskSections";
import { productMediaAsset } from "@/lib/media";
import {
  IconMoonStars,
  IconEyeClosed,
  IconFeather,
  IconAdjustments,
  IconSparkles,
} from "@tabler/icons-react";

const featureIcons = [
  IconSparkles,
  IconMoonStars,
  IconFeather,
  IconAdjustments,
  IconEyeClosed,
];

export function SleepMaskFeaturesSection() {
  return (
    <>
      <section className="juujo-section border-y border-[var(--border)] bg-[rgba(241,223,210,.42)] py-7 md:py-12">
        <div className="juujo-wrap">
          <SectionHeading
            eyebrow="Why Juujo"
            title={
              <>
                What makes our sleep mask{" "}
                <em className="juujo-italic text-[var(--gold)]">unique</em>?
              </>
            }
          />
          <div className="mt-10 gap-px bg-[rgba(58,31,61,.15)] md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <article
                  className="bg-[var(--cream)] p-8 transition-all duration-300 hover:bg-[var(--card)] hover:shadow-xl md:p-10 group"
                  key={`desktop-${feature.title}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)] shadow-sm">
                      {Icon ? <Icon size={24} stroke={1.5} /> : null}
                    </span>
                    <div className="flex flex-1 items-center gap-4">
                      <span className="h-px flex-1 bg-[rgba(58,31,61,.15)]" />
                      <span className="juujo-display text-base text-[var(--gold)] font-medium">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <h3 className="juujo-display mt-6 text-2xl text-[var(--plum)] transition-colors duration-300 group-hover:text-[var(--gold)]">
                    {feature.title}
                  </h3>
                  <p className="juujo-display mt-2.5 italic text-[var(--plum-soft)]">
                    {feature.kicker}
                  </p>
                  <p className="juujo-body-copy mt-4 text-[var(--muted)]">
                    {feature.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] py-12 md:py-24 border-b border-[var(--border)]">
        <div className="juujo-wrap max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="w-full">
              <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-lg">
                <img
                  src={productMediaAsset(
                    "juujo-premium-sleep-mask-banner-3.png",
                    "sleep-mask",
                    "images"
                  )}
                  alt="Premium Sleep Mask in use"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-6">
                Deep Sleep, Redefined.
              </h2>
              <p className="juujo-body-copy max-w-lg text-[var(--muted)] mb-6">
                Achieve total darkness and uninterrupted rest anywhere you go. Our Premium Sleep Mask features <strong>big squishy cloud-like padding</strong> and is crafted with <strong>22 Momme, padded mulberry silk</strong>. It naturally contours to your face, locking out every sliver of light while protecting your skin and hair.
              </p>
              <ul className="juujo-body-copy max-w-lg text-[var(--muted)] mb-6 list-disc pl-5 space-y-2">
                <li><strong>Clinically proven to enhance skin</strong> by minimizing friction and retaining natural moisture.</li>
                <li><strong>Big squishy cloud-like padding</strong> for ultimate weightless comfort.</li>
                <li><strong>22 Momme, padded mulberry silk</strong> for a luxurious, hypoallergenic resting experience.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
