import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";

export type ContentSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  sections: ContentSection[];
  note?: string;
  showCta?: boolean;
};

export default function ContentPage({
  eyebrow, title, accent, intro, sections, note, showCta = false,
}: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="relative isolate">
        <section className="relative overflow-hidden pb-20 pt-40 sm:pb-24 md:pt-52">
          <div aria-hidden="true" className="pointer-events-none absolute -right-52 -top-40 -z-10 h-[650px] w-[650px] opacity-50">
            <div className="orb inset-0" />
            <div className="absolute left-1/4 top-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-teal/60 to-transparent" />
          </div>
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="reveal max-w-4xl">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-teal">{eyebrow}</p>
              <h1 className="mt-6 text-[2.8rem] font-light leading-[1.08] tracking-[-0.025em] sm:text-6xl lg:text-7xl">
                {title} {accent && <span className="text-teal">{accent}</span>}
              </h1>
              <p className="muted mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">{intro}</p>
            </Reveal>
          </div>
        </section>
        <section className="pb-24 md:pb-36">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-2 md:px-10">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={Math.min(index % 2, 1) * 120} className="reveal">
                <article className="h-full rounded-2xl border border-teal/15 bg-white/[0.025] p-7 transition-colors hover:border-teal/35 sm:p-10">
                  <p className="text-xs tracking-[0.2em] text-teal">0{index + 1}</p>
                  <h2 className="mt-4 text-2xl font-light tracking-[-0.01em] text-snow sm:text-3xl">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="muted mt-5 leading-7">{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-5 space-y-3 text-mist/80">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 leading-7">
                          <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
          {note && (
            <div className="mx-auto mt-10 max-w-7xl px-5 md:px-10">
              <p className="muted max-w-3xl border-l border-teal/40 pl-5 text-sm leading-7">{note}</p>
            </div>
          )}
          {showCta && (
            <div className="mx-auto mt-16 max-w-7xl px-5 md:px-10">
              <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-light text-snow md:text-3xl">Put it to the test.</h2>
                  <p className="muted mt-2">Explore whether BrAIvix fits your credit workflow.</p>
                </div>
                <Link href="/#offline-test" className="btn-solid">Request an offline test <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
