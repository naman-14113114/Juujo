"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState } from "react";
import Image from "next/image";

export function GroundingTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  const timeline = [
    {
      label: "10 Minutes",
      title: "Blood Flow Begins Improving",
      description: "Within minutes of using grounding sheets, blood circulation begins improving as red blood cells become less clumped together - helping your body feel calmer, warmer, and more physically relaxed.",
      image: "/media/journey/step-3.gif",
    },
    {
      label: "Night 1",
      title: "Your Body Starts Relaxing",
      description: "Many people report feeling calmer and more comfortable after their first night on grounding sheets. As inflammation begins settling down and circulation improves, aches, tension, and physical discomfort may become less noticeable—making it easier to stay asleep through the night.",
      image: "/media/journey/step-5.jpg",
    },
    {
      label: "Week 1",
      title: "Fewer Nighttime Wake-Ups",
      description: "After a week of sleeping on grounding sheets, many people report waking up less during the night and falling back asleep more easily. As circulation improves and the body becomes more relaxed, sleep often feels deeper, more stable, and more restorative.",
      image: "/media/journey/step-2.gif",
    },
    {
      label: "Month 1",
      title: "Chronic Pain And Inflammation Begin Settling Down",
      description: "After several weeks of sleeping on grounding sheets, your body recovers more effectively overnight. Back pain, stiffness, and tension often become less noticeable as sleep improves and your body has more time to rest and recover.",
      image: "/media/journey/step-1.gif",
    },
    {
      label: "Month 3 & Beyond",
      title: "Better Sleep Compounds Into Better Days",
      description: "With consistent sleep on grounding sheets night after night, recovery improves, stress and stiffness continue settling down, and many people notice steadier energy, easier mornings, and a greater sense of well-being.",
      image: "/media/journey/step-4.gif",
    },
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-14 md:py-24" id="timeline">
      <div className="juujo-wrap max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="juujo-display text-3xl md:text-4xl text-[var(--night)] mb-4 font-light">
            Your First 30 Nights <span className="text-[var(--clay-deep)] font-normal">Sleeping on Grounding Sheets</span>
          </h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
            Grounding sheets work cumulatively. Night after night, many people report deeper sleep, better recovery, and waking up feeling more refreshed - supported by emerging grounding research.
          </p>
        </div>

        <div className="mt-20">
          {/* Timeline navigation */}
          <div className="relative mb-12 flex justify-between max-w-4xl mx-auto px-4">
            <div className="absolute left-[5%] right-[5%] top-1/2 h-[2px] -translate-y-1/2 bg-[var(--clay-deep)]"></div>
            {timeline.map((item, idx) => (
              <button
                key={idx}
                className="relative z-10 flex flex-col items-center group focus:outline-none"
                onClick={() => setActiveStep(idx)}
                type="button"
              >
                <div className="bg-[var(--cream)] p-2">
                  <div
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-300 ${
                      activeStep === idx
                        ? "border-[2px] border-[var(--clay-deep)] scale-150"
                        : "border-[2px] border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {activeStep === idx && (
                      <div className="h-2 w-2 rounded-full bg-[var(--clay-deep)]" />
                    )}
                  </div>
                </div>
                <span
                  className={`absolute top-12 whitespace-nowrap text-[13px] transition-colors duration-300 ${
                    activeStep === idx ? "font-medium text-[var(--clay-deep)]" : "text-[var(--muted)] group-hover:text-[var(--night)]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-28 grid items-center gap-12 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <Image
                src={timeline[activeStep].image}
                alt={timeline[activeStep].title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-3 text-sm text-[var(--clay-deep)]">{timeline[activeStep].label}</span>
              <h3 className="juujo-display mb-4 text-2xl md:text-3xl text-[var(--night)]">
                {timeline[activeStep].title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed text-sm md:text-base">
                {timeline[activeStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
