"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { homeFaqs } from "@/lib/homeContent";

export default function HomeFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="bg-sand py-20 md:py-[110px] scroll-mt-16">
      <div className="max-w-[800px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12"
        >
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            FAQ
          </div>
          <h2 className="font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] text-ink m-0">
            Questions before you build
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {homeFaqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-ink/10 rounded-[14px] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? -1 : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 cursor-pointer text-left"
                >
                  <span className="font-display font-extrabold text-ink/25 text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-semibold text-[15.5px] text-ink">
                    {faq.q}
                  </span>
                  <span
                    className={`text-xl text-ink/40 transition-transform duration-200 ${
                      open ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-[22px] pl-[60px] text-[14.5px] leading-[1.65] text-ink/60">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
