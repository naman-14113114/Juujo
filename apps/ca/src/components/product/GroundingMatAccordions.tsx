"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const accordionData = [
  {
    title: "Product Details",
    content: (
      <div className="space-y-4 text-sm text-[var(--plum)]">
        <p>Our grounding mat is designed for simple, everyday use—whether at your desk, on the floor, or while relaxing. Made with a copper-infused surface for high conductivity, it ensures a reliable grounding connection whenever you need it. The anti-slip backing keeps it securely in place, while reinforced edges prevent wear over time. Finished in a sleek black design, it’s a custom product created exclusively for Juujo.</p>
        
        <div>
          <strong className="block text-[var(--ink)] mb-1">Materials</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Copper-infused surface for effective grounding</li>
            <li>Durable, skin-safe material for daily use</li>
            <li>Smooth, comfortable texture for extended contact</li>
            <li>Anti-slip backing for stability</li>
            <li>Reinforced edges for long-term durability</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--ink)] mb-1">Dimensions:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>40 × 60 cm (16" × 24")</li>
            <li>Compact and easy to place under feet or on a desk</li>
            <li>Lightweight and portable</li>
            <li>Ideal for home, office, or travel</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--ink)] mb-1">Design & Compatibility</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Designed for use while working, sitting, or relaxing</li>
            <li>Place under feet, on a desk, or on the floor</li>
            <li>Includes 5m coil cord and grounding plug</li>
            <li>Compatible with grounded outlets (EU / UK / DK / CH & IT / USA)</li>
            <li>Works best with direct skin contact</li>
          </ul>
        </div>

        <div>
          <strong className="block text-[var(--ink)] mb-1">Key Features</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Reliable grounding at home or work</li>
            <li>Stable, non-slip design</li>
            <li>Easy plug-and-use setup</li>
            <li>Simple to clean and maintain</li>
            <li>Built for everyday use</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "How Does it Work?",
    content: (
      <div className="space-y-4 text-sm text-[var(--plum)]">
        <ul className="list-disc pl-5 space-y-1">
          <li>The Grounding Mat connects only to the grounded part of your outlet using the included grounding cord and grounding plug.</li>
          <li>It does not connect to electricity, and no electricity flows through the mat or your body.</li>
          <li>Once connected, the copper-infused conductive surface allows your body to make direct contact with the Earth's natural energy while you work, relax, read, meditate, or watch TV.</li>
          <li>Simply place your bare feet or skin on the mat and enjoy the benefits of grounding throughout the day.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "What's Included",
    content: (
      <div className="space-y-4 text-sm text-[var(--plum)]">
        <ul className="list-disc pl-5 space-y-1">
          <li>1× Grounding Mat (Black)</li>
          <li>1× User Manual</li>
          <li>1× Grounding Cord & Grounding Plug (Choose Your Country Type)</li>
        </ul>
        <p>Ready to use right out of the box. No additional equipment required.</p>
      </div>
    ),
  },
  {
    title: "When can I expect results?",
    content: (
      <div className="space-y-4 text-sm text-[var(--plum)]">
        <ul className="list-none pl-0 space-y-3">
          <li>
            <strong className="block text-[var(--ink)]">Day 1</strong>
            Feel more relaxed, focused, and connected throughout the day.
          </li>
          <li>
            <strong className="block text-[var(--ink)]">Day 1–3</strong>
            Notice improved comfort while working, reading, or relaxing at home.
          </li>
          <li>
            <strong className="block text-[var(--ink)]">Day 4–7</strong>
            Experience steadier energy, better recovery, and a greater sense of well-being.
          </li>
          <li>
            <strong className="block text-[var(--ink)]">Day 7+</strong>
            Enjoy the benefits of making grounding part of your daily routine.
          </li>
        </ul>
      </div>
    ),
  }
];

export function GroundingMatAccordions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col border-t mt-4" style={{ borderColor: "var(--border)" }}>
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="border-b" style={{ borderColor: "var(--border)" }}>
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between py-4 text-left font-medium text-[var(--ink)] transition-colors hover:text-[var(--gold)]"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                style={{ color: "var(--muted)" }}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
