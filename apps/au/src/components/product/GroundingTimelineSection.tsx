import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export function GroundingTimelineSection() {
  const timeline = [
    {
      time: "Night 1",
      title: "Immediate Calm",
      description: "Experience a deeper, more restful sleep as your body connects to the earth's natural energy field.",
    },
    {
      time: "Week 1",
      title: "Reduced Inflammation",
      description: "Notice a reduction in daily aches, stiffness, and joint discomfort as free radicals are neutralized.",
    },
    {
      time: "Week 4",
      title: "Sustained Vitality",
      description: "Wake up feeling refreshed with improved overall energy levels and a more balanced mood throughout the day.",
    },
  ];

  return (
    <section className="juujo-section bg-[var(--cream)] py-14 md:py-24" id="timeline">
      <div className="juujo-wrap max-w-5xl">
        <SectionHeading
          eyebrow="What to Expect"
          title={
            <>
              Your <em className="juujo-italic text-[var(--gold)]">Journey</em> with Grounding
            </>
          }
          copy="While everyone is different, here is what most of our customers experience when they start sleeping grounded."
          align="center"
        />

        <div className="mt-16 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-[var(--gold)]/30"></div>

          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-12 h-12 rounded-full bg-[var(--cream)] border-4 border-[var(--gold)] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={24} className="text-[var(--gold)]" />
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)] w-full h-full">
                  <span className="text-[var(--gold)] font-semibold uppercase tracking-wider text-sm mb-3 block">
                    {item.time}
                  </span>
                  <h3 className="juujo-display text-xl text-[var(--plum)] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
