"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconSparkles,
  IconLeaf,
  IconShieldCheck,
  IconHeart,
  IconDiamond,
  IconWashMachine,
} from "@tabler/icons-react";

const groundingSheetFeatures = [
  {
    title: "Silver Thread Blend",
    kicker: "Conductive Power",
    body: "Utilizing a high-conductivity 10% silver thread blend to connect you to Earth's energy.",
    icon: IconSparkles,
  },
  {
    title: "Organic Cotton",
    kicker: "Gentle & Soft",
    body: "BareEarth only uses soft, hypoallergenic organic cotton that breathes easily, regulates temperature, and stays gentle on sensitive skin.",
    icon: IconLeaf,
  },
  {
    title: "Naturally Antimicrobial",
    kicker: "Clean & Fresh",
    body: "Silver helps prevent odor-causing bacteria, keeping sheets cleaner and more hygienic between washes.",
    icon: IconShieldCheck,
  },
  {
    title: "Eco-Friendly & Chemical-Free",
    kicker: "Safe & Non-Toxic",
    body: "Every sheet is crafted from responsibly sourced, non-toxic materials. They're free of harsh chemicals and safe for both your skin and the planet.",
    icon: IconHeart,
  },
  {
    title: "Premium 400 Thread Count",
    kicker: "Hotel-Quality",
    body: "Made with 400 thread count for a smooth feel, lasting durability, and hotel-quality comfort.",
    icon: IconDiamond,
  },
  {
    title: "Machine Washable",
    kicker: "Easy Care",
    body: "Machine washable and built to maintain conductivity, comfort, and shape with regular use.",
    icon: IconWashMachine,
  },
];

export function FeatureGrid() {
  return (
    <section className="juujo-section border-y border-[var(--border)] bg-[rgba(241,223,210,.42)] py-7 md:py-12">
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Why Juujo"
          title={
            <>
              What makes our sheets{" "}
              <em className="juujo-italic text-[var(--gold)]">unique</em>?
            </>
          }
        />

        {/* Desktop View: Original Grid */}
        <div className="mt-10 gap-px bg-[rgba(58,31,61,.15)] md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {groundingSheetFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                className="bg-[var(--cream)] p-8 transition-all duration-300 hover:bg-[var(--card)] hover:shadow-xl md:p-10 group"
                key={`desktop-${feature.title}`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Glowing Icon Container */}
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
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>

        {/* Mobile View: Accordion (Commented Out as requested)
        <div className="mt-10 md:hidden bg-[var(--cream)] border-y border-[var(--border)]">
          <ul>
            ...
          </ul>
        </div>
        */}
      </div>
    </section>
  );
}
