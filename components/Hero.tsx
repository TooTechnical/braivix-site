import Link from "next/link";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* glowing sphere with a flare travelling along its rim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[38vw] top-[6vh] -z-10 aspect-square w-[95vw] sm:-right-[22vw] sm:w-[70vw] lg:-right-[8vw] lg:top-[3vh] lg:w-[min(58vw,860px)]"
      >
        <div className="orb inset-0" />
        <div className="orbit">
          <div className="flare" style={{ left: "85%", top: "85%" }} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="max-w-3xl">
          <Reveal as="h1" className="reveal text-[2.6rem] font-light leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem]">
            Scale SME M&amp;A lending.
            <span className="block text-teal">Without scaling your credit team.</span>
          </Reveal>

          <Reveal delay={150} className="reveal">
            <p className="muted mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              B2B AI infrastructure that turns unstructured PDF financials into a comprehensive credit analysis in
              under 60&nbsp;seconds. The loan, the risk, and the final decision stay right where they belong —{" "}
              <span className="text-mist">with your bank.</span>
            </p>
          </Reveal>

          <Reveal delay={300} className="reveal mt-12 flex flex-wrap items-center gap-8">
            <Link href="#offline-test" className="btn-solid">
              Run Offline Test
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="#pipeline" className="btn-line text-sm">
              See the pipeline
            </Link>
          </Reveal>
        </div>
      </div>

      {/* scroll cue: thin vertical line, as in the original design */}
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 hidden h-24 w-px overflow-hidden bg-white/10 md:block">
        <div className="h-1/2 w-px animate-[scrollcue_2.4s_ease-in-out_infinite] bg-gradient-to-b from-transparent to-mist" />
      </div>
    </section>
  );
}
