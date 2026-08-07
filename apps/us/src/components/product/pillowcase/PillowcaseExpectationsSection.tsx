"use client";

import { Activity, Moon, Lightbulb, Heart, Shield } from "lucide-react";
import Image from "next/image";
import { productMediaAsset } from "@/lib/media";

export function PillowcaseExpectationsSection() {
  const steps = [
    {
      period: "Immediate",
      title: "Blood Flow Begins Improving",
      description: "Within minutes of using a grounding pillowcase, blood circulation begins improving as red blood cells become less clumped together - helping your body feel calmer.",
      icon: Activity,
    },
    {
      period: "Night 1",
      title: "Your Body Starts Relaxing",
      description: "Many people report feeling calmer and more comfortable after their first night. Aches, tension, and physical discomfort may become less noticeable.",
      icon: Moon,
    },
    {
      period: "Week 1",
      title: "Fewer Nighttime Wake-Ups",
      description: "After a week of sleeping on a grounding pillowcase, many people report waking up less during the night and falling back asleep more easily.",
      icon: Lightbulb,
    },
    {
      period: "Weeks 2-3",
      title: "Chronic Pain & Inflammation Begin Settling Down",
      description: "Neck tension, stiffness, and physical discomfort may become less noticeable as sleep improves and your body has more time to rest and recover.",
      icon: Heart,
    },
    {
      period: "Month 1+",
      title: "Better Sleep Compounds Into Better Days",
      description: "With consistent sleep on a grounding pillowcase, recovery improves. Many people notice steadier energy, easier mornings, and a greater sense of well-being.",
      icon: Shield,
    }
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12" id="expectations">
      <div className="juujo-wrap max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden rounded-[18px]">
            <Image
              src={productMediaAsset(
                "juujo-grounding-pillowcase-1.jpg",
                "grounding-sheets",
                "images",
              )}
              alt="Premium Grounding Pillowcase Timeline"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col">
            <h2 className="juujo-display text-3xl md:text-4xl text-[var(--night)] mb-10 leading-tight">
              What to Expect From Sleeping Grounded: <span className="text-[var(--clay-deep)] font-light block mt-2">Mind & Body Wellness That Keeps Getting Better</span>
            </h2>

            <div className="flex flex-col">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isLast = idx === steps.length - 1;
                
                return (
                  <div key={idx} className="flex gap-5 group">
                    <div className="relative flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--clay-deep)] bg-white text-[var(--clay-deep)] z-10">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      {!isLast && (
                        <div className="absolute top-10 bottom-[-16px] w-[1.5px] bg-[var(--clay-deep)]/20" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-sm font-bold text-[var(--clay-deep)] uppercase tracking-wider">{step.period}</span>
                        <span className="text-[var(--muted)]/50 hidden sm:inline">|</span>
                        <span className="font-semibold text-lg text-[var(--night)]">{step.title}</span>
                      </div>
                      <p className="juujo-body-copy text-[var(--muted)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
