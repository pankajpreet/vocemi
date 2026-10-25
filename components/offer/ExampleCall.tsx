"use client";

import { motion } from "framer-motion";

interface ExampleCallProps {
  lines: { speaker: "Caller" | "Agent"; text: string }[];
  outcome: string;
}

/** Illustrative call; bubbles arrive one by one as the card scrolls in. */
export default function ExampleCall({ lines, outcome }: ExampleCallProps) {
  return (
    <div className="bg-coal rounded-3xl p-5 md:p-7 shadow-[0_40px_80px_-28px_rgba(20,22,27,0.55)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 text-white text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#37D67A] animate-pulseDot" />
          Example call
        </div>
        <span className="text-white/65 text-[12px] font-display">Illustrative</span>
      </div>
      <motion.ol
        className="m-0 p-0 list-none flex flex-col gap-2.5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ show: { transition: { staggerChildren: 0.3, delayChildren: 0.1 } } }}
      >
        {lines.map((line, index) => (
          <motion.li
            key={index}
            variants={{
              // A wipe rather than a fade: text is never drawn at reduced
              // contrast mid-animation.
              hidden: { clipPath: "inset(0 0 100% 0 round 16px)", y: 10 },
              show: {
                clipPath: "inset(0 0 0% 0 round 16px)",
                y: 0,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-[1.55] ${
              line.speaker === "Agent"
                ? "self-start bg-brand/15 border border-brand/30 text-white"
                : "self-end bg-white/[0.08] text-white/90"
            }`}
          >
            <span
              className={`block text-[10.5px] font-semibold uppercase tracking-[0.06em] mb-1 ${
                line.speaker === "Agent" ? "text-[#B4C0FF]" : "text-white/65"
              }`}
            >
              {line.speaker === "Agent" ? "Vocemi AI" : "Caller"}
            </span>
            {line.text}
          </motion.li>
        ))}
        <motion.li
          variants={{ hidden: { y: 8 }, show: { y: 0 } }}
          className="mt-3 pt-4 border-t border-white/10 text-[13.5px] leading-[1.6] text-white/65"
        >
          <span className="font-semibold text-white">Outcome: </span>
          {outcome}
        </motion.li>
      </motion.ol>
    </div>
  );
}
