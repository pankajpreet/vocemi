"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, CreditCard, KeyRound, Wrench } from "lucide-react";
import { trialDays } from "@/lib/plans";
import TrialForm from "./TrialForm";

const perks = [
  { icon: CreditCard, text: "No card" },
  { icon: KeyRound, text: "No login" },
  { icon: Wrench, text: "We build it for you" },
  { icon: CalendarClock, text: "Live in 7 days" },
];

/** Headline + form. The trial length follows the industry picked below. */
export default function FreeTrialContent() {
  const [industry, setIndustry] = useState("");
  const days = trialDays(industry);
  const onIndustryChange = useCallback((value: string) => setIndustry(value), []);

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
      <div className="lg:sticky lg:top-28 animate-fadeUp">
        <div className="inline-flex items-center gap-2 bg-brand-tint text-brand px-3.5 py-[7px] rounded-full text-[13px] font-semibold mb-5">
          <span className="w-[7px] h-[7px] rounded-full bg-brand animate-pulseDot" />
          Free trial
        </div>
        <h1 className="font-display text-[40px] md:text-[54px] leading-[1.05] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          Try your AI receptionist free for{" "}
          <span className="relative inline-flex overflow-hidden align-bottom text-brand">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={days}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {days}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          days
        </h1>
        <p className="text-[17px] leading-[1.65] text-ink/65 m-0 mb-7">
          14 days free (30 for HVAC &amp; plumbing). No card. No login. We build
          it for you and it&apos;s live in 7 days.
        </p>
        <ul className="m-0 p-0 list-none grid grid-cols-2 gap-3">
          {perks.map((perk, i) => (
            <motion.li
              key={perk.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
              className="flex items-center gap-2.5 bg-white border border-ink/10 rounded-xl px-3.5 py-3 text-[14px] font-semibold text-ink"
            >
              <perk.icon size={17} className="text-brand flex-shrink-0" aria-hidden />
              {perk.text}
            </motion.li>
          ))}
        </ul>
        <ol className="m-0 mt-8 p-0 list-none flex flex-col gap-3 text-[14.5px] text-ink/70">
          {[
            "Send this form (1 minute)",
            "Book a 15-minute kickoff call",
            "We build it and switch it on within 7 days",
            "Keep it on a plan, or walk away and owe nothing",
          ].map((step, i) => (
            <li key={step} className="flex gap-3 items-start">
              <span className="w-6 h-6 rounded-full bg-ink text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <TrialForm onIndustryChange={onIndustryChange} />
    </div>
  );
}
