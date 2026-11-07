import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Security | BrAIvix",
  description: "How BrAIvix approaches information security, data handling, traceability and bank pilot assurance.",
};

export default function SecurityPage() {
  return (
    <ContentPage
      eyebrow="Security and assurance"
      title="Trust needs"
      accent="evidence."
      intro="Financial institutions rightly expect strong controls, independent assurance and clear accountability. Our approach is to demonstrate those controls before requesting access to sensitive customer information."
      sections={[
        { title: "Data protection by design", paragraphs: ["For any pilot involving financial information, the scope, retention period, permitted users, hosting arrangements and deletion process need to be defined in writing. Please do not submit confidential borrower documents through the public contact form."] },
        { title: "Traceable analytical results", paragraphs: ["We are building workflows that distinguish extracted data from deterministic calculations and unsupported indicators. Human review, source evidence and visible exceptions are essential parts of the intended process."] },
        { title: "Access and operational controls", paragraphs: ["Before production onboarding, we expect to document access restrictions, environment separation, secrets management, incident response and change-control arrangements with each institution."] },
        { title: "Independent validation", paragraphs: ["Security questionnaires, penetration testing, privacy assessments and independent audit evidence must be completed as required by each bank. We will share verified assurance documentation when it is available."] },
      ]}
      note="This page describes our security approach and planned assurance work; it is not a claim that BrAIvix currently holds SOC 2 or ISO 27001 certification. Ask our team for the latest independently verified status."
      showCta
    />
  );
}
