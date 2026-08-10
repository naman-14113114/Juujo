"use client";

/* eslint-disable @next/next/no-img-element -- Direct URLs let the initial preloader warm the exact assets used during color swaps. */

import { useEffect, useState, type ReactNode } from "react";
import { Check, Quote, X } from "lucide-react";
import type { Product } from "@/data/products";
import {
  getSleepMaskPreloadOrder,
  isSleepMaskColor,
  sleepMaskHeroImageCount,
  sleepMaskMedia,
  sleepMaskPressMedia,
  sleepMaskSharedMedia,
  type SleepMaskColor,
} from "@/data/sleepMaskMedia";
import { ProductHero } from "./ProductHero";
import { StickyAddToCart } from "./StickyAddToCart";

const INITIAL_COLOR: SleepMaskColor = "green";

const juujoAdvantages = [
  "Stays on all night",
  "Cloud-soft padding",
  "Full wraparound coverage",
  "22 Momme silk",
  "True blackout",
  "No skin creasing",
  "Hair protecting",
];

const alternativeDrawbacks = [
  "Fall off easily",
  "Thin and unpadded",
  "Straps can dig in",
  "Synthetic fabric",
  "Light enters",
  "Crease skin",
  "Snag hair",
];

function VariantImage({
  src,
  alt,
  className,
  color,
}: {
  src: string;
  alt: string;
  className: string;
  color: SleepMaskColor;
}) {
  return (
    <img
      alt={alt}
      className={className}
      data-sleep-mask-color={color}
      decoding="async"
      fetchPriority="low"
      height={1254}
      loading="eager"
      src={src}
      width={1254}
    />
  );
}

function SleepMaskMediaPreloader() {
  return (
    <div aria-hidden="true" className="hidden">
      {getSleepMaskPreloadOrder(INITIAL_COLOR)
        .slice(1)
        .map((media, index) => (
          <img
            alt=""
            data-sleep-mask-preload="true"
            decoding="async"
            fetchPriority={
              index < sleepMaskHeroImageCount - 1 ? "auto" : "low"
            }
            height={1}
            key={media.src}
            loading="eager"
            src={media.src}
            width={1}
          />
        ))}
    </div>
  );
}

function NextLevelSection({ color }: { color: SleepMaskColor }) {
  const media = sleepMaskMedia[color];

  return (
    <section className="bg-[rgba(241,223,210,.42)]">
      <div className="grid min-h-[560px] lg:grid-cols-2">
        <div className="flex items-center px-6 py-14 sm:px-10 lg:px-[max(3rem,8vw)] lg:py-20">
          <div className="max-w-xl">
            <p className="juujo-eyebrow">Beauty sleep, upgraded</p>
            <h2 className="juujo-display mt-3 text-[2.35rem] leading-[1.08] text-[var(--plum)] md:text-5xl">
              Next-level beauty sleep in total darkness.
            </h2>
            <p className="juujo-body-copy mt-6 text-[var(--muted)]">
              Light can interrupt the natural rhythm of rest. Juujo creates a
              soft, cushioned blackout cocoon, while smooth mulberry silk glides
              across the skin without the tugging of ordinary mask fabrics.
            </p>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <VariantImage
            alt={media.nextLevel.alt}
            className="absolute inset-0 !h-full !w-full object-cover"
            color={color}
            src={media.nextLevel.src}
          />
        </div>
      </div>
    </section>
  );
}

const pressQuotes = [
  {
    quote: "This silk mask is exactly what the doctor ordered.",
    author: "Vanessa Powell",
    logo: sleepMaskPressMedia[0],
  },
  {
    quote: "The new must-have in the beauty industry.",
    author: "Hannah Lynn Tan",
    logo: sleepMaskPressMedia[1],
  },
  {
    quote: "The Rolls Royce of the eye mask world.",
    author: "Jayne Cherrington",
    logo: sleepMaskPressMedia[2],
  },
  {
    quote: "You will be in the land of nod in no time.",
    author: "Zak Maoui",
    logo: sleepMaskPressMedia[3],
  },
  {
    quote: "Loved by celebrities and beauty editors alike.",
    author: "Grace Lindsay",
    logo: sleepMaskPressMedia[4],
  },
];

function EditorialQuote() {
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveQuote((current) => (current + 1) % pressQuotes.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="border-y border-[var(--border)] bg-[var(--cream)] py-12 text-center md:py-16">
      <div className="juujo-wrap max-w-4xl">
        <Quote
          aria-hidden="true"
          className="mx-auto h-7 w-7 text-[var(--gold)]"
          strokeWidth={1.5}
        />
        <div className="relative mx-auto mt-5 min-h-[108px] max-w-3xl sm:min-h-[96px]">
          {pressQuotes.map((pressQuote, index) => (
            <blockquote
              aria-hidden={index !== activeQuote}
              className={`absolute inset-0 flex flex-col items-center justify-start transition-opacity duration-300 ${
                index === activeQuote ? "opacity-100" : "opacity-0"
              }`}
              key={pressQuote.quote}
            >
              <p className="juujo-display text-xl leading-[1.35] text-[var(--plum)] sm:text-2xl">
                &ldquo;{pressQuote.quote}&rdquo;
              </p>
              <cite className="mt-3 text-xs font-semibold uppercase not-italic tracking-[0.12em] text-[var(--muted)]">
                {pressQuote.author}
              </cite>
            </blockquote>
          ))}
        </div>
        <div
          aria-label="Editorial features"
          className="mt-7 grid grid-cols-3 items-center justify-center gap-x-4 gap-y-4 sm:grid-cols-5 sm:gap-x-7"
        >
          {pressQuotes.map((pressQuote, index) => (
            <button
              aria-label={`Show ${pressQuote.logo.alt} quote`}
              aria-pressed={index === activeQuote}
              className={`mx-auto flex h-11 w-full max-w-[132px] items-center justify-center border-b-2 px-1 transition-opacity duration-200 active:scale-[0.97] ${
                index === activeQuote
                  ? "border-[var(--gold)] opacity-100"
                  : "border-transparent opacity-45 hover:opacity-75"
              }`}
              key={pressQuote.logo.src}
              onClick={() => setActiveQuote(index)}
              type="button"
            >
              <img
                alt={pressQuote.logo.alt}
                className="max-h-8 w-auto max-w-full object-contain"
                decoding="async"
                fetchPriority="low"
                height={80}
                loading="eager"
                src={pressQuote.logo.src}
                width={240}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function TransformSection({ color }: { color: SleepMaskColor }) {
  const media = sleepMaskMedia[color];

  return (
    <section className="relative min-h-[520px] overflow-hidden md:min-h-[680px]">
      <VariantImage
        alt={media.transform.alt}
        className="absolute inset-0 !h-full !w-full object-cover"
        color={color}
        src={media.transform.src}
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="juujo-wrap relative flex min-h-[520px] items-end justify-center pb-14 pt-24 text-center md:min-h-[680px] md:pb-20">
        <div className="max-w-4xl text-[var(--cream)]">
          <h2 className="juujo-display text-[2.5rem] leading-[1.05] md:text-6xl">
            Transform your life with Juujo silk.
          </h2>
        </div>
      </div>
    </section>
  );
}

function SoGoodHero({ color }: { color: SleepMaskColor }) {
  const media = sleepMaskMedia[color];

  return (
    <section className="relative min-h-[500px] overflow-hidden md:min-h-[650px]">
      <VariantImage
        alt={media.soGoodHero.alt}
        className="absolute inset-0 !h-full !w-full object-cover"
        color={color}
        src={media.soGoodHero.src}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="juujo-wrap relative flex min-h-[500px] items-end justify-center pb-14 pt-24 text-center md:min-h-[650px] md:pb-20">
        <div className="max-w-4xl text-[var(--cream)]">
          <h2 className="juujo-display text-[2.4rem] leading-[1.08] md:text-5xl">
            So good, you will never want to take it off.
          </h2>
          <p className="juujo-body-copy mx-auto mt-5 max-w-3xl text-[rgba(247,241,232,.86)]">
            Unlike an average sleep mask, double lining and cloud-soft padding
            block even the tiniest ray of light for a softer retreat from the
            world.
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Skin",
      image: sleepMaskSharedMedia.skinIcon,
      iconMaskSize: "70%",
      body: "Smooth silk helps reduce friction, pulling, and morning creases around the delicate eye area.",
    },
    {
      title: "Hair",
      image: sleepMaskSharedMedia.hairIcon,
      iconMaskSize: "100%",
      body: "The soft wraparound surface is gentle on hair and helps avoid the snagging of narrow elastic straps.",
    },
    {
      title: "Wellness",
      image: sleepMaskSharedMedia.wellnessIcon,
      iconMaskSize: "100%",
      body: "A darker sleep environment supports an easier wind-down at home, while travelling, or during daytime rest.",
    },
  ];

  return (
    <section className="bg-[var(--cream)] py-14 md:py-24">
      <div className="juujo-wrap">
        <div className="text-center">
          <p className="juujo-eyebrow">Silk from every angle</p>
          <h2 className="juujo-display mt-3 text-[2.35rem] leading-[1.08] text-[var(--plum)] md:text-5xl">
            Get all the benefits.
          </h2>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16">
          {benefits.map((benefit) => (
            <article className="text-center" key={benefit.title}>
              <span
                aria-label={benefit.image.alt}
                className="mx-auto block h-20 w-20 bg-[#219937]"
                role="img"
                style={{
                  WebkitMaskImage: `url(${benefit.image.src})`,
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: benefit.iconMaskSize,
                  maskImage: `url(${benefit.image.src})`,
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: benefit.iconMaskSize,
                }}
              />
              <h3 className="juujo-display mt-6 text-3xl text-[var(--plum)]">
                {benefit.title}
              </h3>
              <p className="juujo-body-copy mx-auto mt-3 max-w-sm text-[var(--muted)]">
                {benefit.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoGoodSection({ color }: { color: SleepMaskColor }) {
  const media = sleepMaskMedia[color];
  const features = [
    {
      title: "100% True Blackout",
      body: "A generously shaped profile seals out distracting light from every angle.",
      image: media.blackout,
    },
    {
      title: "Wide Wraparound Design",
      body: "Broad, softly padded silk holds securely without a narrow strap pressing into the head.",
      image: media.wraparound,
    },
    {
      title: "Next-Level Comfort",
      body: "Cloud-like cushioning rests gently over the eyes, lashes, and temples through the night.",
      image: media.comfort,
    },
  ];

  return (
    <section className="bg-[var(--night)] py-14 text-[var(--cream)] md:py-24">
      <div className="juujo-wrap">
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {features.map((feature) => (
            <article key={feature.title}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[var(--night-soft)]">
                <VariantImage
                  alt={feature.image.alt}
                  className="absolute inset-0 !h-full !w-full object-cover"
                  color={color}
                  src={feature.image.src}
                />
              </div>
              <h3 className="juujo-display mt-6 text-2xl text-[var(--cream)]">
                {feature.title}
              </h3>
              <p className="juujo-body-copy mt-3 text-[rgba(247,241,232,.72)]">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SleepChoiceSection({ color }: { color: SleepMaskColor }) {
  return (
    <section className="bg-[var(--sand)] py-14 md:py-24">
      <div className="juujo-wrap">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--cream)] lg:grid-cols-[0.8fr_1fr_1fr]">
          <div className="flex items-center p-8 md:p-10">
            <h2 className="juujo-display text-[2.2rem] leading-[1.08] text-[var(--plum)] md:text-4xl">
              The sleep mask of choice.
            </h2>
          </div>

          <div className="border-t border-[var(--border)] p-8 lg:border-l lg:border-t-0">
            <div className="flex h-32 items-center justify-center">
              <VariantImage
                alt={sleepMaskSharedMedia.juujoComparison.alt}
                className="max-h-28 w-auto max-w-full object-contain"
                color={color}
                src={sleepMaskSharedMedia.juujoComparison.src}
              />
            </div>
            <h3 className="juujo-display mt-3 text-3xl text-[var(--plum)]">
              Juujo
            </h3>
            <ul className="mt-5 space-y-2.5 text-[var(--ink)]">
              {juujoAdvantages.map((advantage) => (
                <li className="flex items-start gap-2.5" key={advantage}>
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-none text-[var(--gold)]"
                    strokeWidth={2.2}
                  />
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--border)] bg-[rgba(58,31,61,.05)] p-8 lg:border-l lg:border-t-0">
            <div className="flex h-32 items-center justify-center">
              <img
                alt={sleepMaskSharedMedia.alternative.alt}
                className="max-h-24 w-auto max-w-full object-contain"
                decoding="async"
                fetchPriority="low"
                height={250}
                loading="eager"
                src={sleepMaskSharedMedia.alternative.src}
                width={459}
              />
            </div>
            <h3 className="juujo-display mt-3 text-3xl text-[var(--plum)]">
              Alternatives
            </h3>
            <ul className="mt-5 space-y-2.5 text-[var(--ink)]">
              {alternativeDrawbacks.map((drawback) => (
                <li className="flex items-start gap-2.5" key={drawback}>
                  <X
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-none text-[var(--muted)]"
                    strokeWidth={2.2}
                  />
                  <span>{drawback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SleepMaskExperience({
  product,
  reviews,
}: {
  product: Product;
  reviews: ReactNode;
}) {
  const [activeColor, setActiveColor] =
    useState<SleepMaskColor>(INITIAL_COLOR);
  const activeMedia = sleepMaskMedia[activeColor];
  const activeVariant = product.variants.find(
    (variant) => variant.colorId === activeColor,
  );
  const activeCartImage =
    product.colors.find((color) => color.id === activeColor)?.image ??
    activeMedia.gallery[0].src;

  return (
    <div data-active-sleep-mask-color={activeColor}>
      <SleepMaskMediaPreloader />
      <ProductHero
        activeColor={activeColor}
        galleryImages={activeMedia.gallery}
        onColorChange={(colorId) => {
          if (isSleepMaskColor(colorId)) {
            setActiveColor(colorId);
          }
        }}
        product={product}
      />
      <NextLevelSection color={activeColor} />
      <EditorialQuote />
      <TransformSection color={activeColor} />
      <BenefitsSection />
      <SoGoodHero color={activeColor} />
      <SoGoodSection color={activeColor} />
      <SleepChoiceSection color={activeColor} />
      {reviews}
      <StickyAddToCart
        activeColorId={activeColor}
        image={activeCartImage}
        product={product}
        variantId={activeVariant?.variantId}
      />
    </div>
  );
}
