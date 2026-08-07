import { productMediaAsset } from "@/lib/media";

export function PillowcaseWhyUseSection() {
  return (
    <section
      className="juujo-section bg-[var(--cream)] py-7 md:py-12"
      id="why-use-grounding"
    >
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col justify-center order-2">
            <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-6">
              Why Do You Need a Grounding Pillowcase?
            </h2>
            <div className="juujo-body-copy max-w-lg text-[var(--muted)] space-y-4">
              <p>
                Your brain manages every single function in your body, making it incredibly important to ground your head and neck.
              </p>
              <p>
                While our Juujo grounding bedsheets are fantastic, they might not always maintain direct contact with your skin or your head as you move during sleep. That is exactly where our grounding pillowcase steps in—it guarantees that your head and neck receive continuous, restorative Earth energy throughout the entire night.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="w-full order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
              <img
                src={productMediaAsset("juujo-earthing-grounding-pillowcase-benefits.png", "grounding-pillowcases", "images")}
                alt="Why you need a Juujo Grounding Pillowcase"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
