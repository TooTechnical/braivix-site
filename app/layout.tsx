import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrAIvix — AI credit analysis for SME M&A lending",
  description:
    "B2B AI infrastructure that turns unstructured PDF financials into a comprehensive credit analysis in under 60 seconds. The loan, the risk and the final decision stay with your bank.",
  icons: { icon: "/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#040b0d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* without JavaScript, show everything instead of waiting for the scroll animation */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <div className="ambient" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
