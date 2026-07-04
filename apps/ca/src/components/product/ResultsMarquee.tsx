import Image from "next/image";
import { realLifeImages } from "@/data/productSections";

export function ResultsMarquee() {
  const images = [...realLifeImages, ...realLifeImages];

  return (
    <section className="juujo-section border-y border-[var(--border)] bg-[var(--plum)] text-[var(--cream)] md: py-14 md:py-24">
      <div className="juujo-wrap flex items-end justify-between gap-6">
        <div>
          <p className="juujo-mono text-[var(--gold)]">Reviews & Real Results</p>
          <h2 className="juujo-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl">
            Juujo mask, in real life.
          </h2>
        </div>
        <p className="juujo-mono hidden text-[rgba(247,241,232,.62)] md:block">
          01 / 01
        </p>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="juujo-marquee">
          {images.map((image, index) => (
            <div
              className="relative h-72 w-72 flex-none overflow-hidden rounded-2xl bg-[var(--ink)]"
              key={`${image.src}-${index}`}
            >
              <Image alt={image.alt} className="object-cover" fill sizes="288px" src={image.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
