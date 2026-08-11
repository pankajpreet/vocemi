"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { workflowSteps } from "@/lib/homeContent";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % workflowSteps.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="how-it-works" className="max-w-[1180px] mx-auto px-6 md:px-8 pt-20 md:pt-[110px] pb-16 md:pb-[90px] scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="max-w-[620px] mx-auto mb-12 md:mb-16 text-center"
      >
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
          How it works
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-ink m-0 mb-3.5">
          One workflow, fully handled
        </h2>
        <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0">
          Start with the repeatable work &mdash; answering, qualifying, booking
          &mdash; and watch it run end to end.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-7">
        <div
          className="hidden lg:block absolute top-[27px] left-[12.5%] right-[12.5%] h-px"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(22,24,28,0.18) 0 8px, transparent 8px 16px)",
          }}
        />
        <div className="hidden lg:block absolute top-[26px] left-[12.5%] right-[12.5%] h-[3px] rounded-sm bg-brand/15">
          <div
            className="h-full rounded-sm bg-brand transition-[width] duration-1000"
            style={{
              width: `${((activeStep + 1) / workflowSteps.length) * 100}%`,
              transitionTimingFunction: "cubic-bezier(.65,0,.35,1)",
            }}
          />
        </div>

        {workflowSteps.map((step, i) => {
          const active = i === activeStep;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-[1]"
            >
              <div
                className={`w-14 h-14 rounded-[14px] flex items-center justify-center font-display font-extrabold text-lg mb-5 text-white transition-all duration-500 ${
                  active ? "bg-brand scale-[1.08]" : "bg-ink scale-100"
                }`}
                style={{
                  boxShadow: active
                    ? "0 0 0 7px rgba(59,84,244,0.18), 0 10px 20px -8px rgba(22,24,28,0.4)"
                    : "0 10px 20px -8px rgba(22,24,28,0.4)",
                }}
              >
                {step.num}
              </div>
              <h3
                className={`font-display text-[17.5px] font-bold m-0 mb-2 tracking-[-0.01em] transition-colors duration-500 ${
                  active ? "text-brand" : "text-ink"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
