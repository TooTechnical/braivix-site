import Reveal from "./Reveal";

const POINTS = [
  {
    title: "100% Traceability",
    text: "Calculations run on deterministic Python. AI is strictly fenced and used only for data extraction — never for credit decisions.",
  },
  {
    title: "SaaS, Not Consulting",
    text: "A plug-and-play infrastructure layer that integrates seamlessly into your existing underwriting workflow.",
  },
];

/** "No Black Boxes" — the designer's two intersecting spheres, each carrying one promise. */
export default function Control() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-light leading-[1.1] tracking-[-0.015em] md:text-5xl">
            No Black Boxes.
            <span className="block text-teal">Total Control.</span>
          </h2>
        </Reveal>

        <Reveal
          className="venn relative mx-auto mt-16 flex max-w-5xl flex-col items-center md:mt-24 md:flex-row md:justify-center"
          visibleClass="is-visible"
        >
          {POINTS.map((p, i) => (
            <div
              key={p.title}
              className={`venn-circle ${i === 0 ? "venn-left md:-mr-[6%]" : "venn-right -mt-[12%] md:-ml-[6%] md:mt-0"} relative flex aspect-square w-[min(88vw,440px)] items-center justify-center`}
            >
              <div className="orb inset-0" aria-hidden="true" />
              <div className={`relative max-w-[62%] text-center ${i === 0 ? "md:pr-[8%]" : "md:pl-[8%]"}`}>
                <h3 className="text-xl font-normal text-snow md:text-2xl">{p.title}</h3>
                <p className="muted mt-3 text-[0.95rem] leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
          {/* star where the spheres meet */}
          <div className="venn-star pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
            <div className="flare" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
