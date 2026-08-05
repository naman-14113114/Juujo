"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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

const accordionData = [
  {
    eyebrow: "Features",
    title: "What makes our sheets unique?",
    content: (
      <ul className="grid gap-3">
        {groundingSheetFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <li
              key={index}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)]">
                    {Icon ? <Icon size={20} stroke={1.5} /> : null}
                  </span>
                  <div>
                    <p className="font-bold text-[var(--plum)]">
                      {feature.title}
                    </p>
                    <p className="mt-0.5 italic font-semibold text-[var(--gold)]">
                      {feature.kicker}
                    </p>
                  </div>
                </div>
                <span className="juujo-display text-[var(--gold)] font-medium self-start mt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-[var(--muted)]">
                {feature.body}
              </p>
            </li>
          );
        })}
      </ul>
    ),
  },
  {
    eyebrow: "Specifications",
    title: "Product Details",
    content: (
      <div className="space-y-4 text-[var(--muted)] text-[16px] md:text-[18px]">
        <p>
          Our grounding fitted sheet is designed to replace your regular
          bedsheet while providing a comfortable and secure fit for everyday
          use.
        </p>

        <div>
          <strong className="block text-[var(--plum)] font-semibold mb-1">
            Materials
          </strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>90% soft, breathable cotton</li>
            <li>10% conductive silver threads</li>
            <li>Tested & compliant with EU safety standards</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--plum)] font-semibold mb-1">
            Sizes & Fit
          </strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fitted sheet for mattresses up to 30cm deep</li>
            <li>Choose the same size as your bed</li>
            <li>Designed for standard European bed sizes</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--plum)] font-semibold mb-1">
            Design & Compatibility
          </strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Works with all bed types and mattresses</li>
            <li>
              Can be used alone or under your regular bedsheet. Compatible with
              natural fabrics like cotton, bamboo, and linen
            </li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--plum)] font-semibold mb-1">
            Key Features
          </strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Conductive silver threads woven throughout the fabric. Designed
              for daily use and long-term durability. Used by thousands as part
              of their sleep routine
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "In the box",
    title: "What's Included",
    content: (
      <div className="space-y-4 text-[var(--muted)] text-[16px] md:text-[18px]">
        <ul className="list-disc pl-5 space-y-1">
          <li>1x Grounding fitted sheet</li>
          <li>1x 5-meter grounding cord</li>
          <li>1x Grounding plug (choose your country type)</li>
          <li>1x User manual</li>
        </ul>
        <p>Ready to use out of the box. No additional equipment needed.</p>
      </div>
    ),
  },
  {
    eyebrow: "Usage",
    title: "How Does it Work?",
    content: (
      <div className="space-y-4 text-[var(--muted)] text-[16px] md:text-[18px]">
        <p>
          The grounding sheet connects only to the grounded part of your outlet
          using the included cord and grounding plug.
        </p>
        <p>
          It does not connect to electricity and no electricity flows through
          the sheet or your body.
        </p>
        <p>
          Once connected, the conductive silver threads allow your body to make
          direct contact with the Earth while you rest or sleep.
        </p>
        <p>Simply plug it in and lie down — it works automatically.</p>
      </div>
    ),
  },
];

export function GroundingAccordions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe: collapse accordion on mobile after mount to avoid hydration mismatch
      setOpenIndex(null);
    }
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-label="Product details"
      className="mt-8 rounded-[18px] border border-[var(--border)] bg-[rgba(247,241,232,.64)] px-5"
    >
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className="border-b border-[var(--border)] last:border-b-0"
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-5 py-4 text-left"
              aria-expanded={isOpen}
              type="button"
            >
              <span>
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--gold)]">{item.eyebrow}</span>
                <span className="juujo-display mt-1 block text-[1.25rem] text-[var(--plum)]">
                  {item.title}
                </span>
              </span>
              <ChevronDown
                className={`flex-none text-[var(--plum)] transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
                size={19}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
