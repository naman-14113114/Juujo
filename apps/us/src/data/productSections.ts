import { productAsset, productMediaAsset } from "@/lib/media";

export type Feature = {
  title: string;
  kicker: string;
  body: string;
};

export type Transformation = {
  id: string;
  concern: string;
  image: string;
  title: string;
  quote: string;
  name: string;
};

export type ReviewVideo = {
  id: string;
  poster: string;
  src: string;
  fallbackSrc?: string;
};

export type Wavelength = {
  nm: string;
  name: string;
  description: string;
  color: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export const features: Feature[] = [
  {
    title: "100% Organic Cotton",
    kicker: "Naturally Breathable",
    body: 'Sleep on the purest materials. Juujo Grounding Sheets are made with 100% premium organic cotton, providing a luxuriously soft and breathable surface that keeps you cool all night long.',
  },
  {
    title: "Conductive Silver Threads",
    kicker: "Pure Silver Matrix",
    body: "Woven intricately with pure, highly conductive silver threads, our sheets create a seamless connection to the Earth's natural energy, helping to neutralize free radicals while you sleep.",
  },
  {
    title: "Universal Fit",
    kicker: "Deep Pocket Design",
    body: "Designed to fit seamlessly on any mattress. Our deep pocket design ensures that your grounding sheet stays firmly in place, no matter how much you toss and turn.",
  },
  {
    title: "Easy Maintenance",
    kicker: "Machine Washable",
    body: 'Keeping your grounding sheet clean is simple. It is fully machine washable on a gentle cycle, ensuring durability and longevity without losing its conductive properties.',
  },
  {
    title: "Safe & Certified",
    kicker: "Expert Approved",
    body: "Your safety is our priority. The Juujo Grounding Sheet is OEKO-TEX certified, ensuring it's free from harmful chemicals, and includes a built-in safety resistor in the cord.",
  },
  {
    title: "Juujo Sleep App",
    kicker: "Your personal sleep coach",
    body: "Pair your grounding sheet with the free Juujo app at app.juujo.com for guided wind-down sessions, personalized sleep tracking, and tips to improve your restorative rest.",
  },
];

export const realLifeImages = [
  {
    src: productAsset("main1-1.jpg"),
    alt: "Dermatologist recommended Juujo Grounding Sheet",
  },
  {
    src: productAsset("main2-1.jpg"),
    alt: "Juujo Grounding Sheet close-up",
  },
  {
    src: productAsset("main3-1.jpg"),
    alt: "Juujo Grounding Sheet warranty",
  },
  {
    src: productAsset("main4-1.jpg"),
    alt: "Juujo Grounding Sheet lifestyle use",
  },
  {
    src: productAsset("main1-1.jpg"),
    alt: "Soft organic cotton Juujo Grounding Sheet",
  },
  {
    src: productAsset("main2-1.jpg"),
    alt: "Juujo Grounding Sheet award 2026",
  },
  {
    src: productAsset("main3-1.jpg"),
    alt: "Juujo Grounding Sheet sleep benefits",
  },
  {
    src: productAsset("main4-1.jpg"),
    alt: "Juujo Grounding Sheet starter kit",
  },
];

export const transformations: Transformation[] = [
  {
    id: "result-01",
    image: productAsset("main1-1.jpg"),
    concern: "Restless Sleep",
    title: "Best investment ever",
    quote:
      '"I have noticed a significant reduction in my nighttime restlessness and wake up feeling refreshed."',
    name: "Donna P.",
  },
  {
    id: "result-02",
    image: productAsset("main2-1.jpg"),
    concern: "Morning Fatigue",
    title: "IT REALLY WORKS!!",
    quote:
      '"After using for 1 month, I cannot believe the difference! My morning energy levels are amazing."',
    name: "Jane P.",
  },
  {
    id: "result-03",
    image: productAsset("main3-1.jpg"),
    concern: "Stress & Tension",
    title: "Incredible results",
    quote:
      '"In less than 2 months, I noticed the daily tension I carried in my shoulders has melted away."',
    name: "Sarah K.",
  },
  {
    id: "result-04",
    image: productAsset("main4-1.jpg"),
    concern: "Joint Discomfort",
    title: "Better than anything",
    quote:
      '"Within just a few weeks, my achy joints started to feel so much better when waking up."',
    name: "Michelle L.",
  },
  {
    id: "result-05",
    image: productAsset("main1-1.jpg"),
    concern: "Overall Wellbeing",
    title: "Changed my life!",
    quote:
      '"I never thought a bed sheet could make such a difference. This is a total game changer."',
    name: "James D.",
  },
  {
    id: "result-06",
    image: productAsset("main2-1.jpg"),
    concern: "Sleep Quality",
    title: "Literal Glow Up",
    quote:
      '"My sleep quality has improved immensely. I finally get those deep, uninterrupted 8 hours!"',
    name: "Karen W.",
  },
  {
    id: "result-07",
    image: productAsset("main3-1.jpg"),
    concern: "Anxiety",
    title: "Mind looks refreshed",
    quote:
      '"The anxious thoughts keeping me up at night have vanished. I feel so much calmer."',
    name: "Linda S.",
  },
  {
    id: "result-08",
    image: productAsset("main4-1.jpg"),
    concern: "Recovery",
    title: "Smooth as silk",
    quote:
      '"The overall recovery after my workouts has improved immensely. It feels incredibly restorative."',
    name: "Jennifer H.",
  },
];

export const reviewVideos: ReviewVideo[] = [
  { id: "review-1", poster: "", src: productMediaAsset("Grounding Sheets Video - 1.mp4", "grounding-sheets", "videos") },
  { id: "review-2", poster: "", src: productMediaAsset("Grounding Sheets Video - 2.mp4", "grounding-sheets", "videos") },
  { id: "review-3", poster: "", src: productMediaAsset("Grounding Sheets Video - 3.mp4", "grounding-sheets", "videos") },
  { id: "review-4", poster: "", src: productMediaAsset("Grounding Sheets Video - 4.mp4", "grounding-sheets", "videos") },
  { id: "review-5", poster: "", src: productMediaAsset("Grounding Sheets Video - 5.mp4", "grounding-sheets", "videos") },
  { id: "review-6", poster: "", src: productMediaAsset("Grounding Sheets Video - 6.mp4", "grounding-sheets", "videos") },
  { id: "review-7", poster: "", src: productMediaAsset("Grounding Sheets Video - 7.mp4", "grounding-sheets", "videos") },
  { id: "review-8", poster: "", src: productMediaAsset("Grounding Sheets Video - 8.mp4", "grounding-sheets", "videos") },
  { id: "review-9", poster: "", src: productMediaAsset("Grounding Sheets Video - 9.mp4", "grounding-sheets", "videos") },
  { id: "review-10", poster: "", src: productMediaAsset("Grounding Sheets Video - 10.mp4", "grounding-sheets", "videos") },
  { id: "review-11", poster: "", src: productMediaAsset("Grounding Sheets Video - 11.mp4", "grounding-sheets", "videos") },
  { id: "review-12", poster: "", src: productMediaAsset("Grounding Sheets Video - 12.mp4", "grounding-sheets", "videos") },
];

export const wavelengths: Wavelength[] = [
  {
    nm: "830nm",
    name: "INFRA-RED",
    color: "#a52c25",
    description: "Grounding support for deeper rest",
  },
  {
    nm: "633nm",
    name: "RED",
    color: "#d4523a",
    description: "Anti-ageing and Revitalisation",
  },
  {
    nm: "415nm",
    name: "BLUE",
    color: "#4a6acf",
    description: "Sleep upgrade",
  },
  {
    nm: "525nm",
    name: "GREEN",
    color: "#5cc987",
    description: "Reduces dark spots",
  },
  {
    nm: "490nm",
    name: "CYAN",
    color: "#5dc4d8",
    description: "Reduces Swollen capillaries",
  },
  {
    nm: "590nm",
    name: "YELLOW",
    color: "#e8c34a",
    description: "Balances skin texture",
  },
  {
    nm: "390nm",
    name: "PURPLE",
    color: "#8a52c0",
    description: "Red and Blue in one",
  },
  {
    nm: "510nm",
    name: "WHITE",
    color: "#f5f0e0",
    description: "Speed up skin metabolism",
  },
];

export const torchWavelengths: Wavelength[] = [
  
  {
    nm: "630nm",
    name: "RED",
    color: "#d4523a",
    description:
      "Supports a calmer, more settled bedtime routine.",
  },
  {
    nm: "660nm",
    name: "DEEP RED",
    color: "#b9332c",
    description:
      "A softer, more settled wind-down for restful evenings.",
  },
  {
    nm: "850nm",
    name: "NIR",
    color: "#7a2b2b",
    description:
      "Gentle, even support for a more relaxed body and mind.",
  },
  
];

export const torchFeatures: Feature[] = [
  {
    title: "Compact Build",
    kicker: "4.92 inch handheld design",
    body: "Lightweight enough for home, the office, or travel, with durable one-button operation for quick targeted sessions.",
  },
  {
    title: "Clinical Strength",
    kicker: "3 comfort details",
    body: "The mat combines a soft surface, secure cord, and silver threading for a focused grounding routine.",
  },
  {
    title: "Precision Comfort",
    kicker: "630, 660, 850nm",
    body: "Use the mat for localized grounding on the couch, floor, desk, or other target areas.",
  },
  {
    title: "Rapid Treatment",
    kicker: "Targeted 1 to 5 minute sessions",
    body: "Place the mat under the target area for quick sessions, building gradually as your routine settles in.",
  },
];

export const torchDetailImages = [
  {
    src: productAsset("Bed_Sheet_-_New_Hero_18-04-26.jpg", "grounding-sheets"),
    alt: "Juujo Grounding Sheet detail",
  },
  {
    src: productAsset("Bed_Sheet_-_New_Hero_18-04-26.jpg", "grounding-sheets"),
    alt: "Juujo Grounding Sheet flat lay",
  },
  {
    src: productAsset("Bed_Sheet_-_New_Hero_18-04-26.jpg", "grounding-sheets"),
    alt: "Juujo Grounding Sheet on bed",
  },
];

export const torchHowToUse = [
  "Set up the grounding mat on a chair, couch, floor, or desk, then place the target area on it before use.",
  "Position the device 4 to 6 inches away from the skin for best results.",
  "Treat each area that needs attention for 5 to 15 minutes, starting with 1 to 2 minutes per area.",
  "Increase time slowly over the next few weeks as your routine settles in.",
  "Use four to ten times a week depending on your routine, allowing at least 6 hours between multiple daily sessions.",
];

export const torchFaqs: FAQItem[] = [
  {
    question: "How does this grounding mat work?",
    answer:
      "The mat uses conductive silver threading linked to a grounded outlet, providing a continuous path that supports a calm, settled feeling during rest.",
  },
  {
    question: "Can I use this device on any part of my body?",
    answer:
      "Yes, the compact design allows localized application on most body areas, including the back, knees, and shoulders. Always follow the user manual for positioning and session duration.",
  },
  {
    question: "Can I use it in my country?",
    answer:
      "Yes. The Juujo Grounding Mat is dual voltage, which means it can be used worldwide without any issues.",
  },
  {
    question:
      "What if I am pregnant, sensitive to light, have epilepsy, or take light sensitive medication?",
    answer:
      "Consult your physician or another qualified healthcare professional before starting any new wellness routine. People who are pregnant or have a medical condition should check before use.",
  },
  {
    question: "Do you sell this anywhere else?",
    answer:
      "The Juujo Grounding Mat is included free with the Juujo Grounding Sheet offer at juujo.com. There are no other authorized online sites.",
  },
];

export const expertVideo = {
  poster: productAsset("Bed_Sheet_-_New_Hero_18-04-26.jpg", "grounding-sheets"),
  src: productMediaAsset(
    "Video_Project_34.mp4",
    "grounding-sheets",
    "videos",
  ),
};

export const comparison = {
  intro: "Here is a comparison, but really, there is no comparison.",
  columns: [
    { label: "Juujo", price: "£179", featured: true },
    { label: "Brand A", price: "£299" },
    { label: "Brand B", price: "£399" },
    { label: "Brand C", price: "£372" },
  ],
  rows: [
    ["Portable", "Hands-free, cordless and rechargeable", "-", "-", "-"],
    ["Light Colours", "Organic cotton + silver thread", "3 total", "1 total", "3 total"],
    ["Neck Coverage", "Yes", "-", "-", "-"],
    ["Customizable treatments", "Yes", "-", "-", "Yes"],
    ["Hands-free, cordless, rechargeable", "Yes", "Yes", "-", "-"],
    ["App companion (iPhone/Android)", "Yes", "-", "-", "-"],
    [
      "Treatment Time (Full Face + Neck)",
      "3 mins",
      "10 mins",
      "10 mins",
      "3 mins",
    ],
  ],
};

export const touchTech = [
  {
    title: "Built-in Tap Tech",
    body: "Cycle through your personalised colour treatments with just a gentle tap.",
  },
  {
    title: "Lightweight & Portable",
    body: "Take spa-quality treatments anywhere with the long-lasting rechargeable battery.",
  },
  {
    title: "Effortless Consistency",
    body: "Just put it on for 3 minutes a day and let the mask do the work while you watch your favourite show.",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "What is a grounding sheet?",
    answer:
      "A grounding sheet is a fitted sheet woven with conductive threads and connected to your home's grounding point with an included cord. Many people use it as part of a calming wind-down routine.",
  },
  {
    question: "Is it comfortable to sleep on?",
    answer:
      "Yes. The sheet is soft, breathable organic cotton with a 300 thread count feel, so it behaves like a premium fitted sheet.",
  },
  {
    question: "Can I machine wash it?",
    answer:
      "Yes. Machine wash cold on a gentle cycle and tumble dry low. Avoid bleach and fabric softener to keep the conductive threads working well.",
  },
  {
    question: "Which size should I choose?",
    answer:
      "Pick the size that matches your mattress: Double, Queen, or King. Each has a deep fitted skirt to stay secure overnight.",
  },
  {
    question: "Can I use it in my country?",
    answer:
      "Yes! The Juujo Grounding Sheet comes with country-specific adaptors and can be used worldwide without any issues.",
  },
  {
    question: "Do you sell this anywhere else?",
    answer:
      "The Juujo Grounding Sheet is exclusively sold through our official websites. There are no other authorized online sites.",
  },
];
