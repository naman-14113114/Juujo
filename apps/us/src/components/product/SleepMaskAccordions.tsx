"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { sleepMaskAccordionData } from "@/data/sleepMaskSections";

export function SleepMaskAccordions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className="flex flex-col border-t mt-4"
      style={{ borderColor: "var(--border)" }}
    >
      {sleepMaskAccordionData.map((item, index) => {
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
              <div className="overflow-hidden">
                <div className="space-y-4 text-[var(--muted)]">
                  <ul className="list-disc pl-5 space-y-1">
                    {item.items.map((point, idx) => (
                      <li key={idx}>
                        {point.includes(":") ? (
                          <>
                            <strong className="text-[var(--plum)] font-semibold">
                              {point.split(":")[0]}:
                            </strong>
                            {point.split(":")[1]}
                          </>
                        ) : (
                          point
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
