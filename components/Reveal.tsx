"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** delay in ms, for staggering siblings */
  delay?: number;
  /** extra class toggled on the element when it enters the viewport */
  visibleClass?: string;
};

/** Fades + lifts its content in when it scrolls into view (once). */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, visibleClass = "is-visible" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(visibleClass);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visibleClass]);

  return (
    <Tag ref={ref} className={className} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
