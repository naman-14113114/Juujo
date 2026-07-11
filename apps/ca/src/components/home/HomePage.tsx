import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import {
  homeCustomerReviewsGrid,
  homeFeatureCards,
  homeLightTherapy,
  homeMaskSpotlight,
  homeSkincareGuideIntro,
  homeTechnologySpotlight,
  homeTorchSpotlight,
  homeYoungerYou,
} from "@/data/home";
import { productMediaAsset } from "@/lib/media";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { SectionHeading } from "@/components/ui/SectionHeading";

function TorchSpotlight() {
  const data = homeTorchSpotlight;
  return (
    <section className="juujo-section bg-[var(--plum)] py-7 md:py-12 text-[var(--cream)]">
      <div className="juujo-wrap grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center">
        <div className="lg:order-2">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={
              <>
                {data.title.split(" ").slice(0, -2).join(" ")}{" "}
                <em className="juujo-italic">
                  {data.title.split(" ").slice(-2).join(" ")}
                </em>
              </>
            }
            copy={data.copy}
            invert
          />
          <Button
            asChild
            className="mt-8 !border-[var(--cream)] !text-[var(--cream)] hover:!bg-[var(--blush)] hover:!text-[var(--plum)]"
          >
            <Link href={`/products/${data.product.slug}`}>
              {homeTorchSpotlight.ctaLabel}
              <ArrowRight size={17} />
            </Link>
          </Button>
        </div>
        <div className="relative w-full aspect-square overflow-hidden rounded-[18px] bg-[var(--cream)]">
          <Image
            alt={data.image.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            src={data.image.src}
          />
        </div>
      </div>
    </section>
  );
}

function SkincareGuideIntro() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap flex flex-col items-center text-center">
        <SectionHeading
          eyebrow={homeSkincareGuideIntro.eyebrow}
          title={homeSkincareGuideIntro.title}
          copy={homeSkincareGuideIntro.copy}
          align="center"
        />
        <Button asChild className="mt-8">
          <Link href={homeSkincareGuideIntro.ctaHref}>
            {homeSkincareGuideIntro.ctaLabel}
            <ArrowRight size={17} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function TechnologySpotlight() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* LEFT — light therapy text + button + mask spotlight image */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center text-center gap-2 mb-8">
              <SectionHeading
                eyebrow=""
                title={homeLightTherapy.title}
                copy={homeLightTherapy.copy}
                align="center"
              />
              <div className="py-6">
                <Button asChild>
                  <Link href={`/products/${homeTechnologySpotlight.ctaHref.split("/").pop()}`}>
                    Buy Now
                    <ArrowRight size={17} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full mt-auto">
              <Image
                alt={homeMaskSpotlight.image.alt}
                className="block h-auto w-full object-cover rounded-[25px] shadow-sm"
                width={544}
                height={544}
                sizes="(min-width: 1024px) 45vw, 90vw"
                src={homeMaskSpotlight.image.src}
              />
            </div>
          </div>

          {/* RIGHT — stats image + REVEAL A YOUNGER YOU + copy stacked */}
          <div className="flex flex-col h-full">
            <div className="w-full mb-8">
              <Image
                alt={homeTechnologySpotlight.image.alt}
                className="block h-auto w-full object-cover rounded-[25px] shadow-sm"
                width={544}
                height={544}
                sizes="(min-width: 1024px) 45vw, 90vw"
                src={homeTechnologySpotlight.image.src}
              />
            </div>
            <div className="flex flex-col items-center text-center mt-auto">
              <SectionHeading
                eyebrow=""
                title={homeYoungerYou.title}
                copy={homeYoungerYou.copy}
                align="center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function HomeFeatureGrid() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap">
        <SectionHeading
          eyebrow="Why Juujo"
          title={
            <>
              Light therapy that covers the <em className="juujo-italic">details</em>.
            </>
          }
          copy="Dense LED coverage, flexible treatments, and built-in neck care help the daily ritual feel simple while still feeling complete."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {homeFeatureCards.map((feature) => (
            <article
              className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)]"
              key={feature.title}
            >
              <img
                alt={feature.title}
                className="block h-auto w-full bg-[var(--blush)]"
                src={feature.image}
              />
              <div className="p-5">
                <h2 className="juujo-display text-2xl text-[var(--plum)]">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {feature.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LightTherapyStory() {
  return (
    <section
      className="juujo-section bg-[var(--plum)] py-7 md:py-12 text-[var(--cream)]"
      id="light-therapy"
    >
      <div className="juujo-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[rgba(247,241,232,.08)]">
          <Image
            alt={homeLightTherapy.image.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 90vw"
            src={homeLightTherapy.image.src}
          />
        </div>
        <SectionHeading
          eyebrow={homeLightTherapy.eyebrow}
          title={
            <>
              What is light therapy and{" "}
              <em className="juujo-italic">where did it come from?</em>
            </>
          }
          copy={homeLightTherapy.copy}
          invert
        />
      </div>
    </section>
  );
}

function RevealYoungerYou() {
  return null;
}

function CustomerReviewsGrid() {
  return (
    <section className="hidden md:block relative w-full overflow-hidden bg-[var(--plum)]">
      <div className="relative w-full">
        <Image
          src={homeCustomerReviewsGrid.image}
          alt={homeCustomerReviewsGrid.title}
          width={1800}
          height={1000}
          className="w-full h-auto block"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <SectionHeading
          eyebrow=""
          title={homeCustomerReviewsGrid.title}
          copy={homeCustomerReviewsGrid.copy}
          align="center"
          invert
        />
        <Button asChild className="mt-8 !border-[var(--cream)] !text-[var(--cream)] hover:!bg-[var(--blush)] hover:!text-[var(--plum)]">
          <Link href={homeCustomerReviewsGrid.ctaHref}>
            {homeCustomerReviewsGrid.ctaLabel}
          </Link>
        </Button>
      </div>
    </section>
  );
}

function HomeVideoHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-[var(--plum)] flex items-center">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block h-full w-full object-cover"
          src="/videos/juujo-hero-bg.mp4"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="juujo-wrap relative z-10 w-full text-[var(--cream)]">
        <div className="max-w-xl">
          <div className="mb-4 flex w-fit items-center gap-2">
            <div
              className="text-2xl sm:text-3xl leading-none text-[var(--gold)]"
              aria-hidden="true"
            >
              ★★★★★
            </div>
            <span className="font-sans text-xs sm:text-sm font-medium text-[var(--cream)]">
              Excellent 4.9/5 | 10,000+ Customers
            </span>
          </div>
          
          <h1 className="juujo-display text-5xl md:text-6xl mb-6 leading-[1.1]">
            Canada's #1<br/>Grounding Brand
          </h1>
          
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90 font-light">
            The longer you're grounded, the better your health. Stay grounded 24/7 with the world's best grounding products.
          </p>
          
          <Button asChild className="mb-8 w-full sm:w-auto !bg-[var(--gold)] !text-[var(--cream)] !border-none hover:!bg-[var(--clay-deep)] hover:!text-[var(--ink)] text-lg py-6 px-8 rounded-full font-bold uppercase tracking-wide transition-all duration-300 hover:scale-[1.02]">
            <Link href="/products/grounding-fitted-sheets">
              Better Sleep, Less Pain - Start Healing Today
            </Link>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium opacity-90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              120-Day Money-Back
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Free Shipping On All Orders
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HomeVideoHero />
      <SkincareGuideIntro />
      <TechnologySpotlight />
      {/* <LightTherapyStory /> */}
      <HomeFeatureGrid />
      <TorchSpotlight />
      <CustomerReviewsGrid />
    </>
  );
}
