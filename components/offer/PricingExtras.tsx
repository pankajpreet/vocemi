"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { comebackSprint, everyPlanIncludes, sprintPrice } from "@/lib/plans";
import { useCurrency } from "./Currency";
import { AnimatedPrice } from "./PlanCard";

/** "Every plan includes": each check mark draws itself in turn. */
export function IncludesList() {
  return (
    <motion.ul
      className="m-0 p-0 list-none grid sm:grid-cols-2 gap-x-8 gap-y-4"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      {everyPlanIncludes.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="flex gap-3 text-[15.5px] leading-[1.55] text-ink/80"
        >
          <span className="w-6 h-6 rounded-full bg-brand flex-shrink-0 mt-0.5 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden>
              <motion.path
                d="M3.5 8.5l3 3 6-7"
                fill="none"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0 },
                  show: { pathLength: 1, transition: { duration: 0.45, delay: 0.15 } },
                }}
              />
            </svg>
          </span>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function AddOnBlock() {
  const { currency } = useCurrency();
  return (
    <div className="bg-white border border-ink/10 rounded-[22px] p-7 md:p-9 flex flex-col sm:flex-row gap-5 sm:items-center h-full">
      <motion.span
        className="w-14 h-14 rounded-2xl bg-[#FBEAF0] text-[#C0326F] flex items-center justify-center flex-shrink-0"
        whileInView={{ rotate: -360 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.2, ease: "easeInOut" }}
      >
        <RotateCcw size={24} aria-hidden />
      </motion.span>
      <div>
        <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-[#C0326F] mb-1">
          Add-on
        </div>
        <h3 className="font-display text-[21px] md:text-[24px] font-extrabold tracking-[-0.01em] text-ink m-0 mb-2">
          More {comebackSprint.name}s:{" "}
          <AnimatedPrice value={sprintPrice(currency)} /> each
        </h3>
        <p className="text-[15px] leading-[1.65] text-ink/65 m-0">
          The AI reaches out to past customers who&apos;ve agreed to hear from
          you (old quotes, lapsed clients, overdue tune-ups and check-ups) and
          books them back in. Up to {comebackSprint.contacts} contacts per
          sprint. Every message names your business and includes an opt-out.
        </p>
      </div>
    </div>
  );
}
