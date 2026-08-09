import { productMediaAsset, type ProductImage } from "@/lib/media";

export type SleepMaskColor = "green" | "pink" | "black";

export type SleepMaskMediaSet = {
  gallery: ProductImage[];
  nextLevel: ProductImage;
  transform: ProductImage;
  blackout: ProductImage;
  wraparound: ProductImage;
  comfort: ProductImage;
  comparison: ProductImage;
};

const imagePath = (fileName: string) =>
  productMediaAsset(fileName, "sleep-mask", "images");

const image = (fileName: string, alt: string): ProductImage => ({
  src: imagePath(fileName),
  alt,
});

export const sleepMaskMedia: Record<SleepMaskColor, SleepMaskMediaSet> = {
  green: {
    gallery: [1, 2, 3, 4, 5].map((index) =>
      image(
        `juujo-premium-sleep-mask-green-${index}.png`,
        `Green Premium Sleep Mask view ${index}`,
      ),
    ),
    nextLevel: image(
      "juujo-premium-sleep-mask-green-6.png",
      "Woman resting in the Green Premium Sleep Mask on silk bedding",
    ),
    transform: image(
      "juujo-premium-sleep-mask-green-9.png",
      "Woman wearing the Green Premium Sleep Mask in bed",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-green-7.png",
      "Green Premium Sleep Mask blocking bright light",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-green-8.png",
      "Close view of the Green Premium Sleep Mask wraparound design",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-green-6.png",
      "Couple sleeping comfortably in Green Premium Sleep Masks",
    ),
    comparison: image(
      "juujo-premium-sleep-mask-banner-3.png",
      "Green Juujo Premium Sleep Mask",
    ),
  },
  pink: {
    gallery: [1, 2, 3, 4, 5].map((index) =>
      image(
        `juujo-premium-sleep-mask-pink-${index}.png`,
        `Pink Premium Sleep Mask view ${index}`,
      ),
    ),
    nextLevel: image(
      "juujo-premium-sleep-mask-pink-3.png",
      "Woman resting in the Pink Premium Sleep Mask on silk bedding",
    ),
    transform: image(
      "juujo-premium-sleep-mask-pink-9.png",
      "Woman wearing the Pink Premium Sleep Mask in bed",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-pink-8.png",
      "Pink Premium Sleep Mask creating a dark sleep environment",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-pink-2.png",
      "Wide wraparound shape of the Pink Premium Sleep Mask",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-pink-7.png",
      "Woman settling the Pink Premium Sleep Mask comfortably",
    ),
    comparison: image(
      "juujo-premium-sleep-mask-pink-4.png",
      "Pink Juujo Premium Sleep Mask",
    ),
  },
  black: {
    gallery: [1, 2, 3, 6, 8].map((index) =>
      image(
        `juujo-premium-sleep-mask-black-${index}.png`,
        `Black Premium Sleep Mask view ${index}`,
      ),
    ),
    nextLevel: image(
      "juujo-premium-sleep-mask-black-7.png",
      "Woman resting in the Black Premium Sleep Mask on silk bedding",
    ),
    transform: image(
      "juujo-premium-sleep-mask-black-banner-2.png",
      "Woman wearing the Black Premium Sleep Mask in bed",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-black-banner-1.png",
      "Black Premium Sleep Mask creating total darkness",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-black-4.png",
      "Wide wraparound shape of the Black Premium Sleep Mask",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-black-7.png",
      "Woman sleeping comfortably in the Black Premium Sleep Mask",
    ),
    comparison: image(
      "juujo-premium-sleep-mask-banner-7.png",
      "Black Juujo Premium Sleep Mask",
    ),
  },
};

export const sleepMaskSharedMedia = {
  skinIcon: image(
    "juujo-premium-sleep-mask-banner-4.png",
    "Silk skin care benefit",
  ),
  hairIcon: image(
    "juujo-premium-sleep-mask-banner-5.png",
    "Silk hair care benefit",
  ),
  wellnessIcon: image(
    "juujo-premium-sleep-mask-banner-6.png",
    "Rest and wellness benefit",
  ),
  alternative: image(
    "juujo-premium-sleep-mask-comparison.png",
    "Typical thin sleep mask alternative",
  ),
};

export function isSleepMaskColor(value?: string): value is SleepMaskColor {
  return value === "green" || value === "pink" || value === "black";
}

export function getSleepMaskPreloadOrder(initialColor: SleepMaskColor) {
  const otherColors = (Object.keys(sleepMaskMedia) as SleepMaskColor[]).filter(
    (color) => color !== initialColor,
  );
  const lowerImages = (color: SleepMaskColor) => {
    const media = sleepMaskMedia[color];
    return [
      media.nextLevel,
      media.transform,
      media.blackout,
      media.wraparound,
      media.comfort,
      media.comparison,
    ];
  };

  const ordered = [
    ...sleepMaskMedia[initialColor].gallery,
    ...otherColors.flatMap((color) => sleepMaskMedia[color].gallery),
    ...lowerImages(initialColor),
    ...otherColors.flatMap(lowerImages),
    ...Object.values(sleepMaskSharedMedia),
  ];

  return ordered.filter(
    (entry, index, all) =>
      all.findIndex((candidate) => candidate.src === entry.src) === index,
  );
}

export const sleepMaskHeroImageCount = Object.values(sleepMaskMedia).reduce(
  (total, media) => total + media.gallery.length,
  0,
);
