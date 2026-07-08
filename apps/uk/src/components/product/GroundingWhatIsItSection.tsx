import { productMediaAsset } from "@/lib/media";

export function GroundingWhatIsItSection() {
  return (
    <section
      className="juujo-section bg-[var(--cream)] py-14 md:py-24"
      id="what-is-grounding"
    >
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Video */}
          <div className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-lg">
              <video
                src={productMediaAsset(
                  "Video_Project_35.mp4?v=1",
                  "grounding-sheets",
                  "videos",
                )}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-center">
            <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-6">
              What is Grounding?
            </h2>
            <p className="text-[var(--muted)] leading-relaxed text-base max-w-lg">
              Beneath your feet lies a most marvelous gift from Nature − the
              very Earth itself, naturally equipped with extraordinary healing
              power that may just be the single most effective medicine
              available. Grounding as it is often called, connects you to this
              overlooked natural energy that nurtures and balances your body at
              the deepest levels, draining it of inflammation, pain, stress, and
              fatigue.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
