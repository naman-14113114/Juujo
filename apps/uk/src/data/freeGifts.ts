import { productMediaAsset } from "@/lib/media";

export type FreeGiftDetailSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type FreeGiftDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  note: string;
  image: string;
  imageAlt: string;
  cardTitle: string;
  cardBullets: string[];
  sections: FreeGiftDetailSection[];
  primaryCtaLabel: string;
};

const bundleFooter =
  "The Juujo bedding offer works best as a complete sleep ritual: the grounding sheet, the free grounding mat, and the care guide all support the same goal of deeper, more restful sleep.";

export const freeGiftBundleFooter = bundleFooter;

export const freeGiftDetails: FreeGiftDetail[] = [
  {
    slug: "grounding-mat",
    eyebrow: "Free Bonus Gift",
    title: "Juujo Grounding Mat",
    seoTitle: "Juujo Grounding Mat Bonus Gift",
    seoDescription:
      "Explore the Juujo Grounding Mat included as a free companion gift with the Juujo Grounding Sheet offer.",
    intro:
      "The Juujo Grounding Mat adds flexibility to the main sheet offer. While the Grounding Sheet grounds your bed, the mat lets you stay grounded at a desk, on the couch, or on the floor.",
    note:
      "The current Juujo Grounding Sheet offer includes the Grounding Mat as a free bonus gift.",
    image: productMediaAsset("free_torch.png"),
    imageAlt: "Juujo Grounding Mat bonus gift",
    cardTitle: "Why customers like this bonus",
    cardBullets: [
      "Great for desk, couch, and floor use",
      "Smaller format for travel and quick sessions",
      "Complements the full-size sheet instead of replacing it",
      "Makes the bundle feel more complete",
    ],
    sections: [
      {
        title: "Where a smaller companion helps",
        paragraphs: [
          "Some customers love the idea of a main sheet for sleep and a smaller companion for daytime grounding. The mat fits that role well because it gives the bundle more flexibility.",
          "It helps the offer feel like a system rather than a single product.",
        ],
        bullets: [
          "Desk and workspace grounding",
          "Couch and floor use during travel",
          "Extra attention around detail zones",
          "A convenient companion when you do not want a full sheet session",
        ],
      },
      {
        title: "Why this bonus improves the bundle",
        paragraphs: [
          "It answers a common question before it is asked: What if I want grounding during the day too? Instead of buying another product later, the offer already covers both sleep and daytime grounding.",
          "That makes the bundle feel more generous and easier to justify.",
        ],
      },
    ],
    primaryCtaLabel: "Claim The Sheet + Free Gift",
  },
  {
    slug: "care-guide",
    eyebrow: "Customer Guide Bonus",
    title: "The Juujo Sleep Guide",
    seoTitle: "The Juujo Sleep Guide Bonus",
    seoDescription:
      "Learn what is inside the Juujo Sleep Guide delivered after your Grounding Sheet purchase, including care tips and sleep routines.",
    intro:
      "This is not a generic PDF. It is a full Juujo customer guide designed to help Grounding Sheet buyers get more value from the product from day one. It explains grounding simply, shows how to build a routine, and turns uncertainty into a clear sleep plan.",
    note:
      "The Juujo Sleep Guide is delivered after your Grounding Sheet purchase. The private guide file is not published on this page.",
    image: productMediaAsset("free_guide-v2.webp"),
    imageAlt: "Juujo Sleep Guide bonus",
    cardTitle: "What customers unlock inside",
    cardBullets: [
      "Grounding explained simply",
      "Your sheet care and washing guidance",
      "Sleep-type guidance and weekly routines",
      "Morning and evening rituals, and a results timeline",
    ],
    sections: [
      {
        title: "What is inside the guide",
        paragraphs: [
          "The guide walks customers through the Juujo method from first principles to practical routines. It covers the science of grounding, how to care for your sheet, sleep-type matching, weekly protocols, morning and evening rituals, and the best habits to pair with grounding.",
          "It also includes a results timeline, travel tips, routine examples by lifestyle, common myths, and a bonus chapter on the Juujo bedtime ritual.",
        ],
        bullets: [
          "Welcome to the Juujo Method",
          "The Science of Grounding",
          "Caring for Your Sheet",
          "Find Your Sleep Type",
          "Your Personalised Routine",
          "The Daily Routine: AM and PM",
          "The Best Habits to Pair",
          "Results timeline, travel tips, and sleep guidance",
        ],
      },
      {
        title: "Why the guide matters",
        paragraphs: [
          "A common hesitation is simple: What if I buy the sheet and still do not know how to use it properly? The guide removes that fear. It gives customers a clear starting point and makes the purchase feel supported instead of self-directed.",
          "That turns the order into a complete ritual, not just a product shipment.",
        ],
      },
    ],
    primaryCtaLabel: "Buy To Unlock This Guide",
  },
];

export function getFreeGiftDetail(slug: string) {
  return freeGiftDetails.find((gift) => gift.slug === slug);
}
