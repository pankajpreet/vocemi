"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Vertical timeline whose line fills in as the visitor scrolls past it. */
export default function FixTimeline({ items }: { items: { title: string; desc: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <ol ref={ref} className="relative m-0 p-0 list-none flex flex-col gap-7 pl-12">
      <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-[3px] rounded bg-brand/15" />
      <motion.span
        aria-hidden
        className="absolute left-[15px] top-2 bottom-2 w-[3px] rounded bg-brand origin-top"
        style={{ scaleY }}
      />
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span className="absolute -left-12 top-0 w-[33px] h-[33px] rounded-full bg-white border-[3px] border-brand flex items-center justify-center font-display font-extrabold text-[13px] text-brand">
            {i + 1}
          </span>
          <h3 className="font-display text-[18px] font-bold text-ink m-0 mb-1">{item.title}</h3>
          <p className="text-[15px] leading-[1.6] text-ink/65 m-0">{item.desc}</p>
        </motion.li>
      ))}
    </ol>
  );
}
