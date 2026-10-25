"use client";

import { motion } from "framer-motion";
import { ArrowRight, Ban, Users } from "lucide-react";

interface WontDoProps {
  items: string[];
  /** Short line under the list. */
  note?: string;
  dark?: boolean;
}

/**
 * The "what it won't do" list. Each item slides in, then its handoff arrow
 * travels to "Your team", the point being that nothing is dropped.
 */
export default function WontDo({ items, note, dark = true }: WontDoProps) {
  return (
    <div
      className={`rounded-3xl p-6 md:p-10 ${
        dark ? "bg-coal text-white" : "bg-white border border-ink/10 text-ink"
      }`}
    >
      <ul className="m-0 p-0 list-none flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl px-4 py-3.5 ${
              dark ? "bg-white/[0.06]" : "bg-sand"
            }`}
          >
            <span className="flex items-center gap-3 flex-1 min-w-0">
              <span className="w-8 h-8 rounded-full bg-[#F7DADA] text-[#B42318] inline-flex items-center justify-center flex-shrink-0">
                <Ban size={15} strokeWidth={2.5} aria-hidden />
              </span>
              <span className={`text-[15px] leading-[1.5] ${dark ? "text-white/85" : "text-ink/80"}`}>
                {item}
              </span>
            </span>
            <span className="flex items-center gap-2 pl-11 sm:pl-0">
              <motion.span
                aria-hidden
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
                className={dark ? "text-brand-light" : "text-brand"}
              >
                <ArrowRight size={16} />
              </motion.span>
              <span
                className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3 py-1.5 rounded-full ${
                  dark ? "bg-brand/25 text-white" : "bg-brand-tint text-brand"
                }`}
              >
                <Users size={13} aria-hidden />
                Your team
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
      {note && (
        <p className={`text-[14.5px] leading-[1.65] m-0 mt-6 ${dark ? "text-white/65" : "text-ink/65"}`}>
          {note}
        </p>
      )}
    </div>
  );
}
