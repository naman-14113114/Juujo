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
  {
    id: "review-01",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486304350_448129a4-6d94-4e44-b8af-511f3e7999b2.webp",
    src: productMediaAsset("review-01.mp4", "grounding-sheets", "videos"),
    fallbackSrc:
      "https://cdn2.videowise.com/converted/videos/1680194145059_06e68cf3-1a7d-4636-a05a-8c1922a066a4_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-02",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486138534_38dd960f-2287-4bfc-b1be-af40bc8ef5d6.webp",
    src: productMediaAsset("review-02.mp4", "grounding-sheets", "videos"),
    fallbackSrc:
      "https://cdn2.videowise.com/converted/videos/1686511751028_e8ecbe6c-94ca-4754-bff1-4bdfff8aad16_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-03",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485722607_ded18359-40b7-427c-b2a9-62e48436f87c.webp",
    src: productMediaAsset("review-03.mp4", "grounding-sheets", "videos"),
    fallbackSrc:
      "https://cdn2.videowise.com/converted/videos/1679081088110_c7eea873-a477-4a43-aafb-bcbc47f285ca_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-04",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485860443_d12fd0ec-8701-4fe7-8e68-1c801ff59f85.webp",
    src: productMediaAsset("review-04.mp4", "grounding-sheets", "videos"),
    fallbackSrc:
      "https://cdn2.videowise.com/converted/videos/1684780828045_7e4e871c-89be-45e4-9fb5-1d4c9ac1f30f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-05",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485816239_f9dba8d1-d096-4067-aff8-eb4a72366122.webp",
    src: productMediaAsset("review-05.mp4", "grounding-sheets", "videos"),
    fallbackSrc:
      "https://cdn2.videowise.com/converted/videos/1679081092710_1bac0b63-1caf-46ec-8a9e-33981ec0d67c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-06",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485713943_cdd6cc24-2387-470e-b124-abd3854c444a.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081090744_9551ac45-ed4a-43b8-b9ac-8213907377b3_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-07",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485680835_1fadaf66-e8f6-4c8b-aa7c-4396245b1faa.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081088709_a5c725fc-6f49-4c5b-a9df-fcc86e2f961c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-08",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485637662_4fa63d64-8298-4f58-9f47-9adfa370720d.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081087361_1db3b2cc-7be9-4715-bb3f-0fefa4d95837_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-09",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485657649_d1f364b2-99cf-46f6-96f5-e4e7c804a5d9.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081086957_557b2d69-79d2-4cee-8ba8-63e316eff8c7_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-10",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485662907_1e32b62d-e59f-4f2e-abaf-aa9707c46121.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080157636_4c0c5485-0c6c-476f-bcd4-086de0efc4d1_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-11",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485718861_90220ac1-9cdb-473c-8c10-b35687131177.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081086115_9020e9ed-ef75-440f-abce-58841caacb36_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-12",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485624094_cecf6646-da77-4ac9-883e-7cf30e8e552f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080526334_a0e26759-7e98-43bf-a8fe-040939abf286_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-13",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485613490_a1d783da-99e3-4a91-b8d0-79bcddf4abfe.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679081085529_9c218c6e-a0e2-439b-81ff-c50a5407fda3_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-14",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486208158_29d80d75-e1ff-4e39-b80a-ab619343d7cd.webp",
    src: "https://cdn2.videowise.com/converted/videos/1680194146707_01323415-baa1-49fb-8fbe-8999c06b4f92_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-15",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485623797_ca63ba95-91e6-464b-aa69-c33b028a278e.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080560470_ddd1fcb3-c697-4b68-97b1-5f59c1785c9f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-16",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485614738_57d086fc-b048-4943-80ba-2e48eb216f79.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080559256_14815e68-76c4-4f4c-8991-323dbaa4c875_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-17",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485864339_9ebd6aeb-50d4-4a65-bcf6-5e8375e300d3.webp",
    src: "https://cdn2.videowise.com/converted/videos/1680194146380_4a1dfd25-f7cb-4f36-99b3-9f347213bd09_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-18",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485607620_ce8129d0-16a2-403d-9ef6-15f2d31ca9fb.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080553322_9cc8ec50-1e9b-4003-a64b-b7e5ead46693_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-19",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485604796_4f40348a-0122-4862-9991-381075c11974.webp",
    src: "https://cdn2.videowise.com/converted/videos/1679080003371_048b58f6-6a7b-42b9-bcdf-3497fb4566c9_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-20",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485973867_0371638d-c985-4dc3-880a-201d20ff0843.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495777020_4be03046-1648-42e3-8d35-8cc2988703fd_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-21",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485966523_e259ced8-349a-4757-8484-cbbede120591.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495788646_9c258eff-7927-476a-b762-a80b0f06d9b6_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-22",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719485968766_cf0be9a8-a1de-43df-ab1b-4e216bc5870f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1685495790866_dc5a4963-5545-4605-a051-037126fa3441_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-23",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486127842_b494c98a-fffc-4212-a210-fa087c5557a5.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511754055_118a8958-9318-41c7-a32d-7274fcd00e1f_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-24",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486148762_77c98016-f2cb-4ac8-ace0-858d47fa077f.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511755900_b02e84dc-b238-4083-8adc-bf1e03031116_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-25",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486133236_7778286b-f568-4290-9e0d-dbc77c7c059b.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511743499_33e12c2d-1a10-4f64-be09-d753d4993093_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-26",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486138545_f0794e86-5c68-4520-bf50-aab136b03516.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511747618_c7adc1a0-07e9-4168-b9a6-61ec3fa055dc_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-27",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486056792_591ed0b5-bfc7-4b3a-8157-697d2f003ee1.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511742070_88202514-7c65-4c97-91ea-6df0aa4491d5_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-28",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486143433_69a5ad16-e0be-41c5-80b5-2f984b593616.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511744702_3d725a4a-1a9b-4bfc-963b-687a7e9c1681_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-29",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486030997_e6361edb-97d6-4158-985a-5c39e242e738.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511740669_a9093ce7-c7f1-434f-92a0-663217393a67_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-30",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486133504_f0995a73-a08e-465b-b9dc-b6afd05afa47.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511736936_e8e21d3f-5411-4eae-9e30-6990bccbdb74_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-31",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486042898_a3733ea2-e5a4-4063-ab48-5969ea7c25fd.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511721203_4c27669b-75b8-4d66-b4db-014b87d8e851_h264c_h264q6clip.mp4#t=0.1",
  },
  {
    id: "review-32",
    poster:
      "https://images.videowise.com/cdn_v_i/XS/converted/thumbnails/1719486031184_db6562f9-5414-468e-ab1e-2b3d3df446a9.webp",
    src: "https://cdn2.videowise.com/converted/videos/1686511718245_136b4b13-74af-4d7f-9a5b-202728b15358_h264q6clip.mp4#t=0.1",
  },
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
