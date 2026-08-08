import { productAsset, productMediaAsset } from "@/lib/media";

export type Feature = {
  title: string;
  kicker: string;
  body: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const features: Feature[] = [
  {
    title: "100% Mulberry Silk",
    kicker: "Luxurious 22-Momme",
    body: "Experience unparalleled softness with 22-momme pure mulberry silk that glides over your skin, minimizing friction and keeping your face crease-free while you rest.",
  },
  {
    title: "Total Blackout Design",
    kicker: "Deep, Undisturbed Sleep",
    body: "Designed with a wide profile that perfectly contours to your face, blocking out 100% of incoming light to help you achieve a deeper, more restorative sleep anytime, anywhere.",
  },
  {
    title: "Cloud-Like Padding",
    kicker: "Ultimate Comfort",
    body: "Say goodbye to pressure on your eyes. Our ultra-plush cloud padding feels weightless, offering a gentle, cushiony embrace that lets you drift off instantly.",
  },
  {
    title: "Fully Adjustable Fit",
    kicker: "Tailored to You",
    body: "Featuring a smooth, adjustable strap that ensures a secure, personalized fit without snagging your hair or feeling too tight, accommodating all head sizes.",
  },
  {
    title: "Skin & Hair Protection",
    kicker: "Beauty Sleep Realized",
    body: "The premium silk surface helps retain your skin's natural moisture and prevents hair breakage or tangles, ensuring you wake up looking and feeling refreshed.",
  }
];

export const faqs: FAQItem[] = [
  {
    question: "What material is the sleep mask made of?",
    answer: "Our Premium Sleep Mask is crafted from 100% pure, 22-momme mulberry silk, offering exceptional durability, softness, and skin-friendly properties."
  },
  {
    question: "Will it completely block out light?",
    answer: "Yes! The wide, cloud-padded design is specifically engineered to contour to your face and provide 100% total blackout, perfect for both nighttime sleeping and daytime napping."
  },
  {
    question: "Is the strap adjustable?",
    answer: "Absolutely. The mask features a fully adjustable strap that guarantees a secure, comfortable fit without pulling your hair."
  },
  {
    question: "How do I clean my silk sleep mask?",
    answer: "We recommend hand washing your mask in cold water with a gentle, silk-friendly detergent. Lay it flat to dry to maintain its luxurious feel and shape."
  },
  {
    question: "Will it put pressure on my eyes?",
    answer: "Not at all. The mask is generously padded to ensure it sits softly against your face without pressing into your eyelids or lashes."
  }
];

export const sleepMaskAccordionData = [
  {
    title: "Unique Features & Benefits",
    items: [
      "Clinically proven to enhance skin: Our silk minimizes friction, locking in moisture to help prevent sleep creases and early signs of aging.",
      "Big, squishy, cloud-like padding: Creates a plush, face-hugging cocoon that blocks out 100% of light without putting pressure on your eyes.",
      "22 Momme, padded mulberry silk: The ultimate luxury standard—hypoallergenic, breathable, and incredibly soft for deep, restorative rest.",
      "Total blackout design: Expertly crafted wide profile to block light completely, day or night."
    ]
  },
  {
    title: "Materials",
    items: [
      "100% pure 22-momme mulberry silk (exterior and lining).",
      "Ultra-soft, cloud-like synthetic padding for lightweight comfort.",
      "Hypoallergenic, breathable, and naturally resistant to absorbing body oils or skin creams."
    ]
  },
  {
    title: "Care Instructions",
    items: [
      "Because silk naturally resists absorbing oils and skincare products, your mask requires less frequent washing.",
      "Hand Wash Recommended: Wash in cold water using a gentle, pH-neutral or silk-specific detergent.",
      "Spot Cleaning: Clean small spots gently as they appear to maintain the integrity of the silk.",
      "Drying: Lay flat to dry naturally. Do not wring, tumble dry, or expose to direct sunlight."
    ]
  }
];
