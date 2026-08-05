import Image from "next/image";
import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { productAsset } from "@/lib/media";

export function CompanionAppPromo() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-14 md:py-24" id="juujo-app">
      <div className="juujo-wrap grid items-center gap-8 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-[1200/799] w-full overflow-hidden rounded-[18px] bg-[var(--cream)]">
          <Image
            alt="Juujo companion app"
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            src={productAsset("sleep_monitoring_app.png")}
          />
          <span className="juujo-mono absolute left-5 top-5 rounded-full bg-[rgba(247,241,232,.9)] px-4 py-2 text-[var(--plum)] backdrop-blur">
            Free with Juujo
          </span>
        </div>
        <div>
          <p className="juujo-eyebrow">Companion App</p>
          <h2 className="juujo-display mt-2 text-[2.5rem] leading-tight text-[var(--plum)] md:text-5xl">
            Juujo <span className="text-[var(--gold)]">Sleep App</span>.
          </h2>
          <p className="juujo-copy mt-3">
            The Juujo Sleep App is the ultimate companion for your grounding journey.
            It helps you track your sleep quality, monitor your grounding sessions,
            and discover personalized insights to improve your overall well-being.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Track", "Monitor", "Improve"].map((step) => (
              <div
                className="rounded-lg border border-[rgba(58,31,61,.12)] bg-[var(--card)] px-3 py-2 text-center"
                key={step}
              >
                <p className="juujo-mono text-[var(--plum)] font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
