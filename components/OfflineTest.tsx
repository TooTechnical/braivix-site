"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; bank: string; role: string; email: string };

const EMPTY: Fields = { name: "", bank: "", role: "", email: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Run Offline Test" request form.
 * Posts to /api/lead (app/api/lead/route.ts), which forwards to the backend.
 */
export default function OfflineTest() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (!values.name.trim()) er.name = "Please enter your name";
    if (!values.bank.trim()) er.bank = "Please enter your bank";
    if (!values.role.trim()) er.role = "Please enter your position";
    if (!EMAIL_RE.test(values.email.trim())) er.email = "Please enter a valid work email";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    // honeypot: real people never fill the hidden "website" field
    const website = (new FormData(e.currentTarget).get("website") as string) || "";

    // Static preview build (no server): pretend it worked so the flow can be reviewed.
    if (process.env.NEXT_PUBLIC_FORM_MODE === "demo") {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, source: "offline-test", page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  const input = (k: keyof Fields, label: string, type = "text", autoComplete?: string) => (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        name={k}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? "true" : undefined}
        className="field"
      />
      {errors[k] && <span className="mt-1.5 block text-xs text-alert">{errors[k]}</span>}
    </label>
  );

  return (
    <section id="offline-test" className="relative isolate scroll-mt-10 overflow-hidden pb-24 pt-40 md:pb-28 md:pt-56">
      {/* horizon with a flare on top, as in the closing frame of the design */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full">
        <div className="horizon top-24 md:top-32" />
        <div className="absolute left-1/2 top-24 md:top-32">
          <div className="flare flare--flat" style={{ width: 260, height: 260 }} />
        </div>
        <div className="beam left-1/2 top-0 h-24 md:h-32" />
      </div>

      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Reveal className="reveal text-center">
          <h2 className="text-4xl font-light leading-[1.1] tracking-[-0.015em] md:text-5xl">Run an Offline Test</h2>
          <p className="muted mx-auto mt-6 max-w-xl text-lg leading-relaxed">
            Pick one closed deal with a known outcome. We run it offline, and you compare the result with your own
            analysis. No integration, no access to your systems.
          </p>
        </Reveal>

        <Reveal delay={150} className="reveal mt-14">
          {status === "sent" ? (
            <div role="status" className="rounded-2xl border border-teal/30 bg-white/[0.03] px-8 py-12 text-center">
              <p className="text-2xl font-light text-snow">Thank you — request received.</p>
              <p className="muted mt-3">We’ll be in touch shortly to arrange the test.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {input("name", "Name", "text", "name")}
              {input("bank", "Bank", "text", "organization")}
              {input("role", "Position", "text", "organization-title")}
              {input("email", "Work email", "email", "email")}

              {/* honeypot (hidden from people and screen readers) */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="mt-6 flex flex-col items-center gap-5 sm:col-span-2">
                <button type="submit" className="btn-solid min-w-56" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Request Offline Test"}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-alert">
                    Something went wrong. Please try again or write to m.smirnova@braivix.com.
                  </p>
                )}
                <p className="muted max-w-md text-center text-xs leading-relaxed">
                  We use these details only to arrange the test. See our{" "}
                  <a href="/privacy" className="underline decoration-white/30 underline-offset-4 hover:text-mist">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
