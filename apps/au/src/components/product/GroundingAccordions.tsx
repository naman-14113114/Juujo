"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const accordionData = [
  {
    title: "Product Details",
    content: (
      <div className="space-y-4 text-[var(--muted)]">
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
    title: "What's Included",
    content: (
      <div className="space-y-4 text-[var(--muted)]">
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
    title: "How Does it Work?",
    content: (
      <div className="space-y-4 text-[var(--muted)]">
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <div
      className="flex flex-col border-t"
      style={{ borderColor: "var(--border)" }}
    >
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className="border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-start justify-between gap-6 py-5 text-left juujo-display text-[1.25rem] text-[var(--plum)] transition-colors hover:text-[var(--gold)]"
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
              <div className="overflow-hidden">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
