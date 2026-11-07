import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Company | BrAIvix",
  description: "Learn about BrAIvix, an Ireland-based technology company developing financial analysis infrastructure for lenders.",
};

export default function CompanyPage() {
  return (
    <>
      <ContentPage
        eyebrow="Company"
        title="Infrastructure for"
        accent="better decisions."
        intro="BrAIvix Limited is an Ireland-based technology company developing AI-assisted financial analysis infrastructure for banks and lending teams."
        sections={[
          { title: "Our purpose", paragraphs: ["Make financial information easier to interpret and verify. We want credit professionals to work with structured evidence instead of losing time to repeated manual extraction."] },
          { title: "Our philosophy", paragraphs: ["Automation should support human expertise, not pretend to replace it. A lender remains accountable for its credit policy, risk appetite, underwriting decisions and customer relationships."] },
          { title: "What we are building", paragraphs: ["A modular platform for financial-document extraction, calculations, source traceability and configurable lender workflows. Our immediate focus is testing accuracy and usefulness on real-world historic cases."] },
          { title: "Work with us", paragraphs: ["We welcome conversations with banks, financial institutions and potential distribution partners who are interested in carefully scoped product evaluations."] },
        ]}
        showCta
      />
      <span className="sr-only"><Link href="/contact">Contact BrAIvix</Link></span>
    </>
  );
}
