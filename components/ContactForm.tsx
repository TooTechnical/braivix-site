"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";

type Fields = { name: string; bank: string; email: string; message: string };
const EMPTY: Fields = { name: "", bank: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const change = (field: keyof Fields) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((old) => ({ ...old, [field]: event.target.value }));
    if (error) setError("");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    if (!fields.name.trim() || !fields.bank.trim() || !EMAIL_RE.test(fields.email.trim()) || !fields.message.trim()) {
      setError("Please complete all fields with a valid email address.");
      return;
    }
    setState("sending");
    setError("");
    const website = (new FormData(event.currentTarget).get("website") as string) || "";

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website, source: "contact", page: "/contact" }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setFields(EMPTY);
      setState("sent");
    } catch {
      setState("error");
      setError("Your message could not be sent. Please email m.smirnova@braivix.com or d.malone@braivix.com directly.");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-teal/30 bg-white/[0.03] px-8 py-12 text-center">
        <h2 className="text-2xl font-light text-snow">Your message has been submitted.</h2>
        <p className="muted mt-4">Thank you for contacting BrAIvix. Our team will review your enquiry.</p>
        <button type="button" onClick={() => setState("idle")} className="btn-line mt-6">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-7" noValidate>
      <div className="grid gap-7 sm:grid-cols-2">
        <label>
          <span className="text-sm text-mist">Name</span>
          <input className="field" name="name" autoComplete="name" required maxLength={120} value={fields.name} onChange={change("name")} placeholder="Your name" />
        </label>
        <label>
          <span className="text-sm text-mist">Company / organisation</span>
          <input className="field" name="bank" autoComplete="organization" required maxLength={150} value={fields.bank} onChange={change("bank")} placeholder="Organisation name" />
        </label>
      </div>
      <label>
        <span className="text-sm text-mist">Work email</span>
        <input className="field" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} onChange={change("email")} placeholder="you@company.com" />
      </label>
      <label>
        <span className="text-sm text-mist">How can we help?</span>
        <textarea className="field min-h-36 resize-y" name="message" required maxLength={2000} value={fields.message} onChange={change("message")} placeholder="Tell us a little about your enquiry" />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <p className="muted text-xs leading-relaxed">Please do not upload or paste confidential borrower information or credentials. Read our <Link href="/privacy" className="underline underline-offset-4 hover:text-mist">Privacy Policy</Link>.</p>
        {error && <p className="mt-4 text-sm text-alert" role="alert">{error}</p>}
        <button className="btn-solid mt-7" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
