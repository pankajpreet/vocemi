"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  /** "number" → 1,234. "minsec" reads `to` as seconds → "3 min 16 s". */
  kind?: "number" | "minsec";
  className?: string;
}

const formats = {
  number: (n: number) => Math.round(n).toLocaleString("en-US"),
  minsec: (n: number) => {
    const total = Math.round(n);
    return `${Math.floor(total / 60)} min ${total % 60} s`;
  },
};

/**
 * Counts up once when scrolled into view. The real number is in the server
 * HTML (crawlers and no-JS readers see it), and reduced-motion users never
 * see the count.
 */
export default function CountUp({
  to,
  duration = 1.6,
  kind = "number",
  className,
}: CountUpProps) {
  const format = formats[kind];
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = format(value);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, format]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
