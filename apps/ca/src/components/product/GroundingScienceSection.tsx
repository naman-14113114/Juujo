import Image from "next/image";
import { productMediaAsset } from "@/lib/media";

export function GroundingScienceSection() {
  const stats = [
    {
      value: "90%",
      description:
        "Noticed that this product has significantly improved their sleep and energy levels.",
    },
    {
      value: "93%",
      description:
        "A study by Dr. Oschman found that patients had less inflammation and pain. Infrared images showed this.",
    },
    {
      value: "99%",
      description:
        "Researcher found that grounding reduced red blood cell clumping. This suggests it may benefit cardiovascular health.",
    },
  ];

  return (
    <section
      className="juujo-section bg-[var(--cream)] py-7 md:py-12"
      id="science"
    >
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col order-2 md:order-1">
            <h2 className="juujo-display text-[2rem] leading-[1.2] md:text-4xl text-[var(--plum)] mb-8">
              What the{" "}
              <em className="juujo-italic text-[var(--gold)]">Science</em> Says
              About Grounding?
            </h2>

            <div className="flex flex-col">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-6 py-6 ${idx !== stats.length - 1 ? "border-b border-[var(--border)]" : ""}`}
                >
                  <div className="relative w-[72px] h-[72px] flex-shrink-0">
                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="text-[var(--cream)] stroke-current"
                        strokeWidth="6"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-[var(--gold)] stroke-current"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${parseInt(stat.value) * 2.51} 251.2`}
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="juujo-display text-xl text-[var(--plum)]">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                  <p className="juujo-copy text-base font-medium">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="juujo-eyebrow mt-6">
              Based on Peer Reviewed Scientific Studies. Updated to 2024.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="w-full h-full flex flex-col justify-center order-1 md:order-2">
            <Image
              src={productMediaAsset(
                "Before_5.png",
                "grounding-sheets",
                "images",
              )}
              alt="Thermal imaging before and after grounding"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
