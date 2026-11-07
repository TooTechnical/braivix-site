import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Terms of Service | BrAIvix",
  description: "Terms applicable to the public BrAIvix website and its informational content.",
};

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Policies · Reviewed 7 November 2026"
      title="Website"
      accent="Terms."
      intro="These terms concern use of the public BrAIvix website. Any future software subscription, pilot or enterprise agreement will be governed by its own written contract."
      sections={[
        { title: "Use of this website", paragraphs: ["You may use the website to learn about BrAIvix and request information. Do not attempt to disrupt its services, access unauthorised systems or submit unlawful or misleading content."] },
        { title: "Product information", paragraphs: ["Descriptions of planned or developing functionality are informational only. Features, availability, integrations and timelines may change. No demo, illustration or website content constitutes a guarantee of accuracy or fitness for a particular lending use."] },
        { title: "Not financial advice", paragraphs: ["The website does not provide financial, legal, investment or credit advice. BrAIvix does not approve loans through this website. Financial institutions remain responsible for their own assessment and decisions."] },
        { title: "Intellectual property", paragraphs: ["Unless otherwise stated, BrAIvix branding, site design and original website content are owned by BrAIvix Limited or used under licence. Please contact us before reproducing site materials for commercial purposes."] },
        { title: "Links and availability", paragraphs: ["Links to third parties are supplied for convenience. We aim to maintain accurate information and reliable access but cannot guarantee the website is uninterrupted or error-free."] },
        { title: "Questions and applicable law", paragraphs: ["Questions about the website terms may be sent to d.malone@braivix.com. These terms are intended to be interpreted under Irish law, subject to any mandatory legal rights that apply."] },
      ]}
      note="These are draft public-website terms only. Legal counsel should review them before publication, particularly any liability allocation, consumer rights and future enterprise service terms."
    />
  );
}
