"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";

interface FaqListProps {
  faqs: { question: string; answer: string }[];
  /** Index open on load; -1 for all closed. */
  initialOpen?: number;
  numbered?: boolean;
}

/**
 * Light-theme accordion. Answers are always in the server HTML and collapsed
 * with CSS, so they match the FAQPage markup crawlers read.
 */
export default function FaqList({ faqs, initialOpen = 0, numbered = true }: FaqListProps) {
  const [openIdx, setOpenIdx] = useState(initialOpen);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const open = openIdx === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06 }}
            className={`bg-white border rounded-[14px] overflow-hidden transition-colors ${
              open ? "border-brand/30" : "border-ink/10"
            }`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIdx(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="w-full flex items-center gap-4 px-6 py-5 cursor-pointer text-left"
            >
              {numbered && (
                <span className="font-display font-extrabold text-ink/65 text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <span className="flex-1 font-semibold text-[15.5px] text-ink">
                {faq.question}
              </span>
              <span
                aria-hidden
                className={`w-7 h-7 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                  open ? "rotate-45 bg-brand text-white" : "bg-sand text-ink/65"
                }`}
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className={`px-6 pb-[22px] text-[14.5px] leading-[1.65] text-ink/65 ${
                    numbered ? "pl-[60px]" : ""
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
