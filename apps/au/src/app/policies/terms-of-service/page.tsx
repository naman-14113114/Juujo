import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service | Juujo",
  description: "Store operations, guidelines, terms, conditions, and service agreements of Juujo.",
  alternates: {
    canonical: "/policies/terms-of-service",
  },
};

export default function Page() {
  return <PolicyPage policyType="terms-of-service" />;
}
