import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Return Policy | Juujo",
  description: "Learn about the simple, stress-free replacement policy and guarantees for Juujo grounding bedding.",
  alternates: {
    canonical: "/policies/return-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="return-policy" />;
}
