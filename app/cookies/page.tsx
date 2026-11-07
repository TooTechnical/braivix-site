import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";

export const metadata: Metadata = {
  title: "Cookie Policy | BrAIvix",
  description: "Information about cookies, site technologies and your choices when visiting BrAIvix.",
};

export default function CookiesPage() {
  return (
    <ContentPage
      eyebrow="Policies · Reviewed 7 November 2026"
      title="Cookie"
      accent="Policy."
      intro="This notice explains how cookies and similar technologies may be used on the BrAIvix website."
      sections={[
        { title: "What are cookies?", paragraphs: ["Cookies are small files stored on your device by websites. Similar technologies can include local storage and tracking pixels. Some support a service you request; others may measure usage or support advertising."] },
        { title: "Current website implementation", paragraphs: ["The website frontend reviewed for this policy does not intentionally install advertising or analytics trackers. Hosting and security services may use technically necessary cookies or other request-level information. The live deployment must be checked before publication to confirm the full list and duration of any cookies."] },
        { title: "Non-essential technologies", paragraphs: ["We will not intentionally enable non-essential analytics, targeting or marketing cookies without an appropriate consent mechanism. A privacy notice alone is not consent. If the website introduces non-essential tracking, we will first provide clear choices and a way to withdraw consent."] },
        { title: "Your choices", paragraphs: ["You can inspect and remove stored cookies through your browser settings. Blocking essential technologies may affect site functionality. For questions about the live website’s technology or this policy, contact d.malone@braivix.com."] },
      ]}
      note="Pre-launch verification required: review the deployed domain, hosting configuration and all third-party scripts; update this notice with actual cookie names, providers, purposes and lifetimes if any are present."
    />
  );
}
