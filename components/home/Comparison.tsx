"use client";

import { motion } from "framer-motion";
import { humanCons, aiPros } from "@/lib/homeContent";

export default function Comparison() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-20 md:py-[110px]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[640px] mx-auto mb-12 md:mb-14 text-center"
      >
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          Vocemi vs. a human hire
        </div>
        <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] text-ink m-0 mb-3.5">
          Use people for judgment. Use AI for repeatable work.
        </h2>
        <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0">
          Vocemi doesn&apos;t replace your team &mdash; it takes the repetitive
          call handling off their plate.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border border-ink/10 rounded-2xl p-8"
        >
          <h3 className="font-display text-lg font-bold text-ink m-0 mb-1.5">
            Human hire
          </h3>
          <div className="text-[26px] font-extrabold font-display text-ink/35 line-through mb-1">
            ~$4,500&ndash;$6,000/mo
          </div>
          <div className="text-[12.5px] text-ink/45 mb-5">
            Illustrative employer-cost comparison, not a guaranteed figure.
          </div>
          <div className="flex flex-col gap-3">
            {humanCons.map((con) => (
              <div key={con} className="flex gap-2.5 text-[14.5px] text-ink/65">
                <span className="text-ink/30">&mdash;</span>
                {con}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-[1.5px] border-brand rounded-2xl p-8 bg-brand-tint"
        >
          <h3 className="font-display text-lg font-bold text-ink m-0 mb-1.5">
            Vocemi AI Employee
          </h3>
          <div className="text-[26px] font-extrabold font-display text-brand mb-1">
            From $750/mo
          </div>
          <div className="text-[12.5px] text-ink/50 mb-5">
            Plus a one-time setup fee, scoped to your workflow.
          </div>
          <div className="flex flex-col gap-3">
            {aiPros.map((pro) => (
              <div key={pro} className="flex gap-2.5 text-[14.5px] text-ink font-medium">
                <span className="text-brand">&#10003;</span>
                {pro}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
