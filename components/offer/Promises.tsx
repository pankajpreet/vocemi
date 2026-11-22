"use client";

import { motion } from "framer-motion";
import { promises } from "@/lib/plans";

/** Four promises, each number drawing its ring in as the row scrolls in. */
export default function Promises() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {promises.map((promise, i) => (
        <motion.div
          key={promise.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-ink/10 rounded-2xl p-6"
        >
          <div className="relative w-14 h-14 mb-5">
            <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden>
              <circle cx="28" cy="28" r="25" fill="none" stroke="#EEF0FE" strokeWidth="4" />
              <motion.circle
                cx="28"
                cy="28"
                r="25"
                fill="none"
                stroke="#3B54F4"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: "easeInOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-lg text-ink">
              {i + 1}
            </span>
          </div>
          <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-1.5">
            {promise.title}
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-ink/65 m-0">{promise.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
