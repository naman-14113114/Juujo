export type NavigationItem =
  | { label: string; href: string }
  | { label: string; items: { label: string; href: string }[] };

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Grounding Sheets",
    items: [
      {
        label: "Fitted Grounding Sheet",
        href: "/products/grounding-fitted-sheets",
      },
      { label: "Flat Grounding Sheet", href: "/products/grounding-flat-sheet" },
    ],
  },
  {
    label: "Grounding Mat",
    href: "/products/grounding-mat",
  },
];

export const secondaryNavigation = [
  { label: "About Us", href: "/pages/about-us" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "Contact Us", href: "/pages/contact-us" },
];

export const announcementItems = [
  "Free shipping on all orders",
  "120-night sleep trial",
  "Sign up and enjoy £10 off",
  "Loved by 40,000+ sleepers",
];
