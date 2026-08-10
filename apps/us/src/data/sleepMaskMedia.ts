import { productMediaAsset, type ProductImage } from "@/lib/media";

export type SleepMaskColor = "green" | "pink" | "black";

export type SleepMaskMediaSet = {
  gallery: ProductImage[];
  nextLevel: ProductImage;
  transform: ProductImage;
  soGoodHero: ProductImage;
  blackout: ProductImage;
  wraparound: ProductImage;
  comfort: ProductImage;
  swatch: ProductImage;
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
    soGoodHero: image(
      "juujo-premium-sleep-mask-green-7.png",
      "Woman enjoying the Green Premium Sleep Mask in soft sunlight",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-green-5.png",
      "Green Premium Sleep Mask blocking bright light",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-green-1.png",
      "Wide wraparound shape of the Green Premium Sleep Mask",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-green-8.png",
      "Woman sleeping comfortably in the Green Premium Sleep Mask",
    ),
    swatch: image(
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
      "juujo-premium-sleep-mask-pink-5.png",
      "Woman adjusting the Pink Premium Sleep Mask",
    ),
    transform: image(
      "juujo-premium-sleep-mask-pink-8.png",
      "Woman wearing the Pink Premium Sleep Mask in bed",
    ),
    soGoodHero: image(
      "juujo-premium-sleep-mask-pink-9.png",
      "Woman enjoying the Pink Premium Sleep Mask during a calm evening",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-pink-5.png",
      "Pink Premium Sleep Mask creating a dark sleep environment",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-pink-2.png",
      "Wide wraparound shape of the Pink Premium Sleep Mask",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-pink-1.png",
      "Woman resting comfortably in the Pink Premium Sleep Mask",
    ),
    swatch: image(
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
    soGoodHero: image(
      "juujo-premium-sleep-mask-black-banner-1.png",
      "Woman enjoying the Black Premium Sleep Mask in a calm bedroom",
    ),
    blackout: image(
      "juujo-premium-sleep-mask-black-1.png",
      "Black Premium Sleep Mask creating total darkness",
    ),
    wraparound: image(
      "juujo-premium-sleep-mask-black-3.png",
      "Wide wraparound shape of the Black Premium Sleep Mask",
    ),
    comfort: image(
      "juujo-premium-sleep-mask-black-4.png",
      "Woman sleeping comfortably in the Black Premium Sleep Mask",
    ),
    swatch: image(
      "juujo-premium-sleep-mask-banner-7.png",
      "Black Juujo Premium Sleep Mask",
    ),
  },
};

export const sleepMaskSharedMedia = {
  skinIcon: image(
    "juujo-premium-sleep-mask-banner-5.png",
    "Silk skin care benefit",
  ),
  hairIcon: image(
    "juujo-premium-sleep-mask-banner-6.png",
    "Silk hair care benefit",
  ),
  wellnessIcon: image(
    "juujo-premium-sleep-mask-banner-4.png",
    "Rest and wellness benefit",
  ),
  juujoComparison: image(
    "juujo-premium-sleep-mask-banner-7.png",
    "Black Juujo Premium Sleep Mask",
  ),
  alternative: image(
    "juujo-premium-sleep-mask-comparison.png",
    "Typical thin sleep mask alternative",
  ),
};

export const sleepMaskPressMedia = [
  image("juujo-press-logo-elle.png", "Elle"),
  image("juujo-press-logo-glamour.png", "Glamour"),
  image("juujo-press-logo-woman-and-home.png", "Woman and Home"),
  image("juujo-press-logo-gq.png", "GQ"),
  image("juujo-press-logo-marie-claire.png", "Marie Claire"),
];

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
      media.soGoodHero,
      media.blackout,
      media.wraparound,
      media.comfort,
      media.swatch,
    ];
  };

  const ordered = [
    ...sleepMaskMedia[initialColor].gallery,
    ...otherColors.flatMap((color) => sleepMaskMedia[color].gallery),
    ...lowerImages(initialColor),
    ...otherColors.flatMap(lowerImages),
    ...Object.values(sleepMaskSharedMedia),
    ...sleepMaskPressMedia,
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
