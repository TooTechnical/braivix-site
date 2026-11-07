import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | BrAIvix",
  description: "Contact BrAIvix to discuss bank pilots, partnerships and financial analysis infrastructure.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="relative isolate min-h-[80svh] overflow-hidden pb-28 pt-40 md:pt-52">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-5 -z-10 h-[560px] w-[560px] opacity-40"><div className="orb inset-0" /></div>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:px-10">
          <Reveal className="reveal">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-teal">Get in touch</p>
            <h1 className="mt-6 text-[2.8rem] font-light leading-[1.08] tracking-[-0.025em] sm:text-6xl">Start a <span className="text-teal">conversation.</span></h1>
            <p className="muted mt-7 max-w-md text-lg leading-relaxed">Interested in a banking pilot, technology partnership or a conversation about our financial analysis platform? Send our team a message.</p>
            <div className="muted mt-10 space-y-3 text-sm">
              <p><a className="hover:text-white" href="mailto:m.smirnova@braivix.com">m.smirnova@braivix.com</a></p>
              <p><a className="hover:text-white" href="mailto:d.malone@braivix.com">d.malone@braivix.com</a></p>
            </div>
          </Reveal>
          <Reveal delay={150} className="reveal">
            <div className="rounded-2xl border border-teal/15 bg-white/[0.025] p-6 sm:p-9"><ContactForm /></div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
