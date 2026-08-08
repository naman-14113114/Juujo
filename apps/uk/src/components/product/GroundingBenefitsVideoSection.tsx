import { SectionHeading } from "@/components/ui/SectionHeading";
import { productMediaAsset } from "@/lib/media";

export function GroundingBenefitsVideoSection() {
  return (
    <section
      className="juujo-section bg-[var(--cream)] py-7 md:py-12"
      id="grounding-benefits-video"
    >
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 flex flex-col justify-center">
            <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-6">
              How our Premium Grounding Sheets can benefit your health?
            </h2>
            <p className="juujo-body-copy max-w-lg text-[var(--muted)]">
              While grounding outdoors offers great health benefits, staying
              grounded indoors can be challenging. That&apos;s where our Grounding
              Sheets come in. Simply cover your mattress with the sheets,
              connect the grounding cable to an outlet, and enjoy grounding
              benefits every night. Consistent grounding will improve your sleep
              quality, reduce inflammation, boost energy levels, and lower
              stress.
            </p>
          </div>

          {/* Video Content */}
          <div className="order-1 w-full">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-xl">
                            <img
                src={productMediaAsset(
                  "juujo-earthing-sheet-benefits.gif",
                  "grounding-sheets",
                  "images",
                )}
                alt="Juujo Earthing Sheet Benefits"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

