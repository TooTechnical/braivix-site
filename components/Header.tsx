"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "./nav";


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.95rem] text-mist/80 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/#offline-test" className="btn-line text-[0.95rem]">
            Run Offline Test
          </Link>
        </div>

        <button
          type="button"
          className="relative h-10 w-10 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute left-2 right-2 h-px bg-mist transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-[14px]"}`}
          />
          <span className={`absolute left-2 right-2 top-1/2 h-px bg-mist transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`absolute left-2 right-2 h-px bg-mist transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-[26px]"}`}
          />
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 md:hidden ${open ? "max-h-[100svh]" : "max-h-0"}`}
      >
        <nav className="flex h-[calc(100svh-4.5rem)] flex-col gap-2 px-5 pb-10 pt-6" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-4 text-2xl text-mist"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#offline-test" onClick={() => setOpen(false)} className="btn-solid mt-8 self-start">
            Run Offline Test
          </Link>
        </nav>
      </div>
    </header>
  );
}
