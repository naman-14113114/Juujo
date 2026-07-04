export const market = {
  brandName: "Juujo",
  supportEmail: "support@juujo.com",
  siteUrl: "https://uk.juujo.com",
  locale: "en-GB",
  currency: "GBP",
  country: "United Kingdom",
  marketLabel: "UK",
  madeInLabel: "Designed in the UK",
  checkoutSource: "uk_juujo",
  checkoutUtmSource: "uk.juujo.com",
  checkoutUtmCampaign: "uk_bedding",
  supportHours: "Monday to Friday, 9:00 AM to 5:00 PM GMT",
} as const;

export type StoreCurrency = "USD" | "GBP" | "CAD" | "AUD";
