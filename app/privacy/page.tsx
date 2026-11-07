import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Privacy Policy | BrAIvix",
  description: "How BrAIvix handles personal information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Policies · Reviewed 7 November 2026"
      title="Privacy"
      accent="Policy."
      intro="We take the handling of business contact information seriously. This notice applies to the public BrAIvix website and enquiries submitted through its forms."
      sections={[
        { title: "Who is responsible?", paragraphs: ["BrAIvix Limited, based in Ireland, is responsible for the business contact information submitted through this website. For privacy requests or questions, email d.malone@braivix.com or m.smirnova@braivix.com."] },
        { title: "What we receive", paragraphs: ["When you contact us or request an offline test, we receive the name, work email, organisation, role and any message that you provide. Our hosting and communications providers may also process technical request information for service delivery and security. Do not include borrower financial reports, bank credentials or sensitive personal information in a public form."] },
        { title: "Why we use it", paragraphs: ["We use enquiry information to reply, discuss a potential pilot and manage the related business conversation. The anticipated legal bases are our legitimate interests in responding to relevant business enquiries and, where applicable, steps requested before a contract. We do not use these submissions to make automated lending decisions."] },
        { title: "Who may receive it", paragraphs: ["Enquiries are addressed to the BrAIvix team at m.smirnova@braivix.com and d.malone@braivix.com. The website hosting provider, email delivery provider and relevant mailbox provider process information on our behalf, subject to their terms and applicable data-protection arrangements. Where any processing takes place outside the EEA, appropriate safeguards must be assessed and applied."] },
        { title: "How long we keep it", paragraphs: ["Our proposed enquiry retention period is up to 12 months after the last meaningful contact, unless an active business relationship or legal requirement justifies longer retention. This period and mailbox deletion procedures must be confirmed internally before launch."] },
        { title: "Your rights", paragraphs: ["Subject to applicable law, you may request access, correction, erasure, restriction, portability or object to processing. Email either contact address above. You may also complain to the Irish Data Protection Commission at dataprotection.ie."] },
      ]}
      note="This is a draft operational privacy notice. Before publishing, BrAIvix must confirm its registered contact details, processor list, international transfers, actual retention arrangements and all cookies used by the live deployment."
    />
  );
}
