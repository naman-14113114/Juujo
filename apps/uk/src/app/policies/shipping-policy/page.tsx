import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping Policy | Juujo",
  description: "Detailed processing times, tracking rules, and free transit information for Juujo LED Skincare orders.",
  alternates: {
    canonical: "/policies/shipping-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="shipping-policy" />;
}
