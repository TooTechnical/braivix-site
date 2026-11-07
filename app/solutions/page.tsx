import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Solutions | BrAIvix",
  description: "Explore financial data extraction, credit analysis support and underwriting workflow solutions for lenders.",
};

export default function SolutionsPage() {
  return (
    <ContentPage
      eyebrow="Solutions"
      title="Built around the"
      accent="credit workflow."
      intro="BrAIvix is being developed to make complex financial documents easier for lending professionals to review, check and analyse — without handing over the lending decision."
      sections={[
        { title: "Acquisition and SME lending", paragraphs: ["Bring annual accounts, balance sheets, income statements and supporting notes into one consistent review process. The objective is to reduce rekeying and help analysts spend more time on judgement."] },
        { title: "Credit and risk teams", paragraphs: ["Give reviewers clear source references, documented calculations and visible exceptions. Analysts should be able to trace a figure back to the underlying document rather than trust an unexplained score."] },
        { title: "Bank-specific analysis", paragraphs: ["Different banks apply different definitions, thresholds and lending policies. BrAIvix is designed for configurable analytical workflows; specific rules and integrations must be agreed and validated for each institution."] },
        { title: "Controlled pilot evaluation", paragraphs: ["Start with a historic, closed case where the outcome is already known. Compare the extracted figures and indicators with your team’s results before discussing live use or integration."] },
      ]}
      note="BrAIvix remains under development. Illustrative capabilities are not a guarantee of accuracy, product availability, or integration readiness. Independent verification and bank approval are required for lending use."
      showCta
    />
  );
}
