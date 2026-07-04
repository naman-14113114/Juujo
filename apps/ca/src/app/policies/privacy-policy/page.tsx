import type { Metadata } from "next";
import { PolicyPage } from "@/components/policies/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Juujo",
  description: "Understand how Juujo collects, protects and handles your personal information when buying LED masks.",
  alternates: {
    canonical: "/policies/privacy-policy",
  },
};

export default function Page() {
  return <PolicyPage policyType="privacy-policy" />;
}
