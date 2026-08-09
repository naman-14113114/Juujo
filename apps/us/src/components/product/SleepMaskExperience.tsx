"use client";

/* eslint-disable @next/next/no-img-element -- Direct URLs let the initial preloader warm the exact assets used during color swaps. */

import { useState, type ReactNode } from "react";
import { Check, Quote, X } from "lucide-react";
import type { Product } from "@/data/products";
import {
  getSleepMaskPreloadOrder,
  isSleepMaskColor,
  sleepMaskHeroImageCount,
  sleepMaskMedia,
  sleepMaskSharedMedia,
  type SleepMaskColor,
} from "@/data/sleepMaskMedia";
import { ProductHero } from "./ProductHero";
import { SleepMaskAccordions } from "./SleepMaskAccordions";
import { StickyAddToCart } from "./StickyAddToCart";

const INITIAL_COLOR: SleepMaskColor = "green";

const introBenefits = [
  "100% true blackout coverage",
  "22 Momme mulberry silk",
  "Cloud-soft wraparound padding",
  "Fully adjustable fit",
  "No pressure on eyelids or lashes",
  "Helps protect skin and hair",
];

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

function ProductIntroduction() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--cream)] py-12 md:py-20">
      <div className="juujo-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="juujo-eyebrow">The Juujo difference</p>
          <h2 className="juujo-display mt-3 text-[2.25rem] leading-[1.08] text-[var(--plum)] md:text-5xl">
            Your nightly ritual, wrapped in silk.
          </h2>
          <p className="juujo-body-copy mt-6 max-w-xl text-[var(--muted)]">
            The Juujo Premium Sleep Mask combines generous cloud padding with a
            wide silk profile that wraps gently around the face. It shuts out
            distracting light while helping reduce friction against delicate
            skin and hair.
          </p>
        </div>

        <div>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {introBenefits.map((benefit) => (
              <li
                className="juujo-body-copy flex items-start gap-3 text-[var(--ink)]"
                key={benefit}
              >
                <Check
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 flex-none text-[var(--gold)]"
                  strokeWidth={2}
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SleepMaskAccordions />
          </div>
        </div>
      </div>
    </section>
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

function EditorialQuote() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--cream)] py-12 text-center md:py-20">
      <div className="juujo-wrap max-w-5xl">
        <Quote
          aria-hidden="true"
          className="mx-auto h-8 w-8 text-[var(--gold)]"
          strokeWidth={1.5}
        />
        <blockquote className="juujo-display mx-auto mt-6 max-w-4xl text-[1.8rem] leading-[1.25] text-[var(--plum)] md:text-[2.5rem]">
          A cloud-soft silk mask that turns any bedroom, flight, or afternoon
          nap into a darker, calmer place to rest.
        </blockquote>
        <div
          aria-label="Editorial features"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-[var(--muted)]"
        >
          <span className="juujo-display text-2xl">Forbes</span>
          <span className="text-xl font-semibold tracking-[0.12em]">VOGUE</span>
          <span className="juujo-display text-2xl font-semibold">GQ</span>
          <span className="text-lg font-semibold tracking-[0.12em]">GLAMOUR</span>
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
      <div className="juujo-wrap relative flex min-h-[520px] items-end pb-14 pt-24 md:min-h-[680px] md:pb-20">
        <div className="max-w-3xl text-[var(--cream)]">
          <p className="juujo-mono text-sm uppercase text-[var(--cream)]">
            Darkness, wherever you need it
          </p>
          <h2 className="juujo-display mt-4 text-[2.5rem] leading-[1.05] md:text-6xl">
            Transform your life through better sleep.
          </h2>
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
      body: "Smooth silk helps reduce friction, pulling, and morning creases around the delicate eye area.",
    },
    {
      title: "Hair",
      image: sleepMaskSharedMedia.hairIcon,
      body: "The soft wraparound surface is gentle on hair and helps avoid the snagging of narrow elastic straps.",
    },
    {
      title: "Wellness",
      image: sleepMaskSharedMedia.wellnessIcon,
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
              <img
                alt={benefit.image.alt}
                className="mx-auto h-24 w-24 object-contain"
                decoding="async"
                fetchPriority="low"
                height={1024}
                loading="eager"
                src={benefit.image.src}
                width={1024}
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
        <div className="max-w-4xl">
          <p className="juujo-mono text-sm uppercase text-[var(--gold)]">
            Made for lights out
          </p>
          <h2 className="juujo-display mt-4 text-[2.4rem] leading-[1.08] md:text-5xl">
            So good, you will never want to take it off.
          </h2>
          <p className="juujo-body-copy mt-5 max-w-2xl text-[rgba(247,241,232,.78)]">
            Every detail is designed to feel softer, stay in place longer, and
            create the kind of darkness that makes switching off feel easy.
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-6 lg:mt-16">
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
  const media = sleepMaskMedia[color];

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
                alt={media.comparison.alt}
                className="max-h-28 w-auto max-w-full object-contain"
                color={color}
                src={media.comparison.src}
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
      <ProductIntroduction />
      <NextLevelSection color={activeColor} />
      <EditorialQuote />
      <TransformSection color={activeColor} />
      <BenefitsSection />
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
