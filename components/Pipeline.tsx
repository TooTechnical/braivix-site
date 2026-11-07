"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "./Reveal";

type Step = { title: string; body: ReactNode };

const EXTRACTED = [
  "General info (HGB, IFRS, etc.)",
  "Full Balance Sheet — assets, equity, debt maturity",
  "P&L — revenue, EBIT, taxes",
  "Cash Flow",
  "Credit-critical notes — repayment schedules, collateral, credit facilities",
];

const STEPS: Step[] = [
  {
    title: "Deep Data Extraction & Structuring",
    body: (
      <>
        <p>
          We deliver a ready-to-use structured list of financial data. Every line item includes current and prior
          year values, original report labels, currency, page numbers, and extraction status.
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-teal">What we extract</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {EXTRACTED.map((item) => (
            <li key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-mist/85">
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: "Native Excel Export (Plug & Play)",
    body: (
      <>
        <p>
          Analysts don’t want another dashboard; they want their models. Export all extracted data and calculated
          indicators directly to Excel in the format your team is used to (line items in rows, years in columns).
          Drop it seamlessly into your bank’s existing financial model.
        </p>
        <ExcelSketch />
      </>
    ),
  },
  {
    title: "Automated Cross-Checks & Anomaly Alerts",
    body: (
      <p>
        Spot red flags before underwriting even begins. We automatically verify if the balance sheet balances, if
        profit matches its line items, flag sharp YoY spikes, and detect anomalies like operating losses hidden behind
        positive net profit.
      </p>
    ),
  },
  {
    title: "Purpose-Built M&A Calculations",
    body: (
      <p>
        We don’t just parse PDFs — we answer your core question:{" "}
        <em className="not-italic text-mist">Can we finance this buyer for this deal?</em> Get instant calculations for
        Normalized EBITDA (adjusted for owner remuneration and one-offs), debt capacity, and DSCR tailored to your
        specific loan structure and tranches.
      </p>
    ),
  },
];

/** Tiny decorative "rows × years" grid that hints at the Excel layout. */
function ExcelSketch() {
  const rows = ["Revenue", "EBIT", "Total equity", "Net debt"];
  return (
    <div aria-hidden="true" className="mt-6 max-w-sm overflow-hidden rounded-lg border border-white/10 text-xs">
      <div className="grid grid-cols-[1.6fr_1fr_1fr] bg-white/[0.04] text-teal">
        <span className="px-3 py-2">Line item</span>
        <span className="px-3 py-2 text-right">2024</span>
        <span className="px-3 py-2 text-right">2025</span>
      </div>
      {rows.map((r) => (
        <div key={r} className="grid grid-cols-[1.6fr_1fr_1fr] border-t border-white/5 text-mist/70">
          <span className="px-3 py-2">{r}</span>
          <span className="px-3 py-2 text-right">
            <span className="inline-block h-1.5 w-10 rounded bg-white/15 align-middle" />
          </span>
          <span className="px-3 py-2 text-right">
            <span className="inline-block h-1.5 w-12 rounded bg-teal/40 align-middle" />
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Scroll-linked progress of the light along the timeline + step activation.
  useEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;
    const steps = Array.from(list.querySelectorAll<HTMLElement>(".step"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const focus = window.innerHeight * 0.55; // the "reading line"
      const p = Math.min(1, Math.max(0, (focus - rect.top) / rect.height));
      track.style.setProperty("--progress", p.toFixed(4));
      steps.forEach((s) => {
        const top = s.getBoundingClientRect().top + 8;
        s.classList.toggle("is-active", top < focus);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="pipeline" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal className="reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-teal">The Pipeline</p>
            <h2 className="mt-5 text-4xl font-light leading-[1.1] tracking-[-0.015em] md:text-5xl">
              From Raw PDF to Lender-Ready&nbsp;Data
            </h2>
            <p className="muted mt-6 max-w-md text-lg leading-relaxed">
              Stop wasting analyst hours on manual spreading. Here is what you get out of the box:
            </p>
          </Reveal>
        </div>

        <div ref={trackRef} className="relative">
          <div className="timeline-track" aria-hidden="true">
            <div className="timeline-fill" />
            <div className="timeline-spark">
              <div className="flare" style={{ width: 90, height: 90, left: 0, top: 0 }} />
            </div>
          </div>

          <ol ref={listRef} className="space-y-20 md:space-y-28">
            {STEPS.map((step, i) => (
              <li key={step.title} className="step relative pl-14">
                <span className="step-node" aria-hidden="true" />
                <div className="step-body">
                  <p className="text-sm tabular-nums text-teal">0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-normal leading-snug text-snow md:text-[1.7rem]">{step.title}</h3>
                  <div className="muted mt-4 max-w-xl text-[1.05rem] leading-relaxed">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
