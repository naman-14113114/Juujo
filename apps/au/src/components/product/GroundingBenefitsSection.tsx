"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";
import { Moon, Leaf, HeartPulse, Play } from "lucide-react";

export function GroundingBenefitsSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const benefits = [
    {
      title: "Achieve Deeper, Restorative Sleep",
      description:
        "Connect to the earth's natural energy to fall asleep faster and wake up feeling completely refreshed.",
      icon: Moon,
    },
    {
      title: "Relieve Stress & Find Calm",
      description:
        "Neutralize free radicals to help your body unwind, reducing daily tension and promoting a peaceful state of mind.",
      icon: Leaf,
    },
    {
      title: "Soothe Aches & Inflammation",
      description:
        "Experience the soothing effect of natural grounding which can help ease joint discomfort and promote recovery.",
      icon: HeartPulse,
    },
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Benefits"
          title={
            <>
              Experience the{" "}
              <em className="juujo-italic text-[var(--gold)]">benefits</em> of
              natural grounding.
            </>
          }
          copy="Transform your bed into a restorative sanctuary. Our premium grounding sheet brings the earth's healing energy straight to your bedroom."
        />

        <div className="mt-12 md:mt-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 md:gap-12 order-2 md:order-1">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-none w-14 h-14 rounded-full bg-[var(--blush)] text-[var(--plum)] flex items-center justify-center">
                  <benefit.icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="juujo-display text-xl md:text-2xl text-[var(--plum)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl order-1 md:order-2">
            <video
              ref={videoRef}
              src={productMediaAsset(
                "doctor-earthing-video-720p.mp4",
                "grounding-sheets",
                "videos",
              )}
              controls={isPlaying}
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10"
                aria-label="Play video"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Play
                    className="w-8 h-8 md:w-10 md:h-10 text-[var(--plum)] ml-2"
                    fill="currentColor"
                  />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
