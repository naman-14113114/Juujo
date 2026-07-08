import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";

export function GroundingHowItWorksSection() {
  const steps = [
    {
      num: "01",
      description:
        "Place the Grounding Sheets over your mattress and regular sheets",
      video: "fca637c42e3148119829236a41c9d822.HD-720p-1.6Mbps-30063117.mp4",
    },
    {
      num: "02",
      description: "Plug the cord to the grounded outlet only (non-electrical)",
      video: "ef00debfeb23499f8063e6e2f29aa1a3.HD-720p-4.5Mbps-27333911.mp4",
    },
    {
      num: "03",
      description: "Connect the Grounding Cord to the sheet port",
      video: "82a30d448d1d4c939d8b616929133bc2.HD-720p-4.5Mbps-27334301.mp4",
    },
  ];

  return (
    <section
      className="juujo-section bg-white py-14 md:py-24"
      id="how-it-works"
    >
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Simple Setup"
          title={
            <>
              How to <em className="juujo-italic text-[var(--gold)]">Use</em>
            </>
          }
          copy="Setting up your Juujo Grounding Sheet takes less than two minutes. No complex wiring required."
          align="center"
        />

        <div className="mt-12 md:mt-20 grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-6 group">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[var(--cream)]">
                <video
                  src={productMediaAsset(
                    step.video,
                    "grounding-sheets",
                    "videos",
                  )}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--plum)] font-semibold text-white shadow-lg">
                  {step.num}
                </div>
              </div>
              <div>
                <h3 className="juujo-display text-xl text-[var(--plum)] leading-relaxed">
                  {step.description}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
