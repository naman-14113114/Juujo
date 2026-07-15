"use client";

import { Activity, Moon, Lightbulb, Heart, Shield, Sun } from "lucide-react";
import Image from "next/image";

export function GroundingExpectationsSection() {
  const steps = [
    {
      period: "Week 1",
      title: "Reconnection Phase",
      description: "Gentle nervous system adjustments, vibrant dreams, and mild detoxing as you reconnect with the earth.",
      icon: Activity,
    },
    {
      period: "Weeks 2-4",
      title: "Deeper Rest",
      description: "More profound and undisturbed sleep, accompanied by subtle improvements in daily energy and mood.",
      icon: Moon,
    },
    {
      period: "Weeks 5-8",
      title: "Enhanced Clarity & Recovery",
      description: "Sharper mental focus, quicker physical and emotional recovery from daily stressors.",
      icon: Lightbulb,
    },
    {
      period: "Months 3-4",
      title: "Easing Inflammation",
      description: "Noticeably easier mobility, reduced bodily stiffness, steady energy levels, and more stable emotions.",
      icon: Heart,
    },
    {
      period: "Months 5-6",
      title: "Strengthened Systems",
      description: "A hardier immune response, better gut health, balanced hormones, and greater cognitive resilience.",
      icon: Shield,
    },
    {
      period: "Long Term",
      title: "Lasting Vitality",
      description: "Sustained energy, strong immunity, and a profound, compounding sense of overall calm and wellness.",
      icon: Sun,
    }
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12" id="expectations">
      <div className="juujo-wrap max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden rounded-[18px]">
            <Image
              src="/media/journey/woman-meditation.jpg"
              alt="Premium Grounding Timeline"
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
                      <p className="text-[var(--muted)] text-base leading-relaxed">
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
