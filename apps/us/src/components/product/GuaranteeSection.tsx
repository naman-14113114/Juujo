import Image from "next/image";

export function GuaranteeSection({ showVideo = true, productCategory, productId }: { showVideo?: boolean, productCategory?: string, productId?: string }) {
  const bgImage = productId === "grounding-flat-sheet"
    ? "/media/products/grounding-sheets/images/juujo-flat-sheet-guarantee-bg.jpg"
    : productCategory === "grounding-mat"
      ? "/media/products/grounding-mat/images/juujo-grounding-mat-banner.png"
      : "/media/products/grounding-sheets/images/juujo-guarantee-bg.png";

  return (
    <section className={`juujo-section relative overflow-hidden bg-[var(--ink)] py-14 pb-24 text-center md:py-24 md:pb-36 ${!showVideo ? 'bg-[var(--plum)]' : ''}`}>
      {showVideo && (
        <Image
          alt="Juujo guarantee lifestyle background"
          className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
          src={bgImage}
          fill
          unoptimized
        />
      )}

      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: "color-mix(in srgb, var(--night) 42%, transparent)" }}
      />

      <div className="juujo-wrap relative z-20 max-w-5xl">
        {/* <p className="juujo-eyebrow text-[var(--gold)]">Promise</p> */}
        <h2 className="juujo-display mx-auto mt-3 max-w-4xl text-[2rem] leading-[1.05] text-[var(--cream)] sm:text-[2.35rem] md:mt-4 md:text-6xl">
          Our <em className="juujo-italic text-[var(--gold)]">Juujo Goddess</em>
          <br />
          money back guarantee.
        </h2>
        <p className="mx-auto mt-6 hidden max-w-xl text-sm font-medium leading-7 text-white md:block md:text-base">
          Bring the natural benefits of grounding into your daily routine with Juujo. Designed for deeper sleep, better recovery, and effortless at-home use, Juujo gives you a premium rest experience you can trust every single night.
        </p>
        {/* <div className="mx-auto mt-10 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-[rgba(247,241,232,0.25)] bg-[rgba(18,9,20,0.52)] px-7 py-4 backdrop-blur-md">
          {["90 days", "Free returns", "Full refund"].map((item, index) => (
            <span className="contents" key={item}>
              {index > 0 ? (
                <span className="hidden h-4 w-px bg-[rgba(247,241,232,0.3)] sm:block" />
              ) : null}
              <span className="juujo-mono text-[var(--cream)]">{item}</span>
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
}
