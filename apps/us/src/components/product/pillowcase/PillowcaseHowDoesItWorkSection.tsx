import { productMediaAsset } from "@/lib/media";

export function PillowcaseHowDoesItWorkSection() {
  return (
    <section
      className="juujo-section bg-[var(--cream)] py-7 md:py-12"
      id="how-does-this-work"
    >
      <div className="juujo-wrap max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Text */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h2 className="juujo-display text-[2.5rem] leading-[1.1] md:text-5xl text-[var(--plum)] mb-6">
              How Does This Work?
            </h2>
            <div className="juujo-body-copy max-w-lg text-[var(--muted)] space-y-4">
              <p>
                The Juujo Grounding Pillowcase works in perfect harmony with our grounding bedsheets to securely connect your entire body to the Earth&apos;s natural energy. Our Pillowcase specifically targets and grounds your head and neck area. 
              </p>
              <p>
                This targeted coverage maximizes your exposure to the Earth&apos;s beneficial electrons. When you use both, it feels as though your entire body is embraced by the Earth&apos;s calming energy. Our community frequently reports that this helps them:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Achieve deeper, more restful sleep</li>
                <li>Experience fewer aches and wake up refreshed</li>
                <li>Enjoy significantly more energy throughout the day</li>
              </ul>
              <p className="pt-2">
                It&apos;s incredibly simple to use. Just place it over your favorite pillow, plug it in, and sleep as you normally would.
              </p>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full order-1 md:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg">
              <img
                src={productMediaAsset("juujo-earthing-pillow-cover-health-benefits.png", "grounding-pillowcases", "images")}
                alt="How Juujo Grounding Pillowcase Works"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
