"use client";

import { useState } from "react";
import Image from "next/image";

export function GroundingMatTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  const timeline = [
    {
      label: "10 Minutes",
      title: "Blood Circulation Starts Improving",
      description:
        "Just moments after resting your feet on the grounding mat, your blood flow can start to enhance as red blood cells un-clump. This process helps your body achieve a warmer, calmer, and more physically relaxed state.",
      image: "/media/journey/step-3.gif",
    },
    {
      label: "Day 1",
      title: "Your Body Begins to Relax",
      description:
        "Many users experience a growing sense of calm and comfort after their first day with the grounding mat. As inflammation subsides and circulation increases, physical discomforts like stiffness and tension can diminish, leaving you feeling more at ease throughout the day.",
      image: "/media/journey/mat-day-1.webp",
    },
    {
      label: "Week 1",
      title: "Reduced Tension During Work",
      description:
        "Following a week of consistent use, many individuals feel noticeably more relaxed while sitting at their desk or lounging. With improved blood flow, your body can maintain a warmer, calmer, and more comfortable feeling as you go about your daily activities.",
      image: "/media/journey/mat-week-1.webp",
    },
    {
      label: "Month 1",
      title: "Noticeable Relief from Aches and Inflammation",
      description:
        "After a few weeks of incorporating the grounding mat into your routine, your body can start to feel significantly more comfortable. General aches, joint stiffness, and bodily tension often become less apparent as your system relaxes and circulation reaches optimal levels.",
      image: "/media/journey/step-1.gif",
    },
    {
      label: "Month 3 & Beyond",
      title: "Consistent Comfort and Energy Over Time",
      description:
        "By making grounding a seamless part of your lifestyle, these positive effects continue to compound. With long-term use, many people discover they feel more energized, less stiff, and profoundly calmer whether they are working, resting, or enjoying everyday life.",
      image: "/media/journey/step-4.gif",
    },
  ];

  return (
    <section
      className="juujo-section bg-[var(--cream)] py-7 md:py-12"
      id="timeline"
    >
      <div className="juujo-wrap max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="juujo-display text-3xl md:text-4xl text-[var(--night)] mb-4 font-light">
            Your First 30 Days{" "}
            <span className="text-[var(--clay-deep)] font-normal">
              Using a Grounding Mat
            </span>
          </h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-3xl mx-auto text-base">
            Grounding mats work cumulatively. With daily use, many people report
            feeling calmer, more comfortable, and more refreshed.
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
                    activeStep === idx
                      ? "font-medium text-[var(--clay-deep)]"
                      : "text-[var(--muted)] group-hover:text-[var(--night)]"
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
              <span className="mb-3 text-sm text-[var(--clay-deep)]">
                {timeline[activeStep].label}
              </span>
              <h3 className="juujo-display mb-4 text-2xl md:text-3xl text-[var(--night)]">
                {timeline[activeStep].title}
              </h3>
              <p className="text-[var(--muted)] leading-relaxed text-base">
                {timeline[activeStep].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
