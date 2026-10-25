"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const waveBars = Array.from({ length: 28 }, (_, i) => ({
  dur: 0.7 + (i % 5) * 0.15,
  delay: (i % 7) * 0.08,
}));

const lines: { speaker: "caller" | "ai"; text: string }[] = [
  {
    speaker: "ai",
    text: "Thanks for calling Glow Med Spa. I'm the clinic's AI assistant. How can I help?",
  },
  {
    speaker: "caller",
    text: "Hi, I'd like to book a Botox consult. Do you have anything this week?",
  },
  {
    speaker: "ai",
    text: "I can book that for you. I have Thursday at 2 or Friday at 11. Which works?",
  },
  { speaker: "caller", text: "Thursday at 2, please." },
];

const STEP_MS = 2100;
const RESTART_MS = 5200;

/**
 * Illustrative call that plays itself: bubbles arrive one at a time, the AI
 * "types" before each reply, and a booking chip lands at the end. Loops.
 * Reduced-motion visitors get the finished conversation, still.
 */
export default function HeroCallCard() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(lines.length);

  useEffect(() => {
    if (reduce) {
      setStep(lines.length);
      return;
    }
    setStep(0);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const delay = step >= lines.length ? RESTART_MS : step === 0 ? 700 : STEP_MS;
    const timer = window.setTimeout(
      () => setStep((s) => (s >= lines.length ? 0 : s + 1)),
      delay
    );
    return () => window.clearTimeout(timer);
  }, [step, reduce]);

  const shown = lines.slice(0, step);
  const nextIsAi = step < lines.length && lines[step].speaker === "ai";
  const booked = step >= lines.length;

  return (
    <div className="relative">
      <div className="bg-coal rounded-[22px] p-5 md:p-7 relative shadow-[0_40px_80px_-24px_rgba(20,22,27,0.55)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 text-white text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#37D67A] animate-pulseDot" />
            Missed call, answered by AI
          </div>
          <span className="text-white/65 text-[12px] font-display">Illustrative</span>
        </div>
        <div className="flex items-end gap-1 h-12 px-1 mb-5" aria-hidden>
          {waveBars.map((bar, i) => (
            <span
              key={i}
              className="flex-1 max-w-[6px] rounded-[3px] bg-gradient-to-b from-brand to-brand-light h-full origin-bottom animate-wave"
              style={{
                animationDuration: `${bar.dur}s`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Fixed height so the hero doesn't jump as bubbles arrive. */}
        <div className="flex flex-col gap-2.5 min-h-[300px] sm:min-h-[270px]" aria-live="off">
          <AnimatePresence initial={false}>
            {shown.map((line, i) => (
              <motion.div
                key={`${i}-${line.text}`}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-[14px] leading-[1.5] ${
                  line.speaker === "ai"
                    ? "self-start bg-brand/15 border border-brand/30 text-white"
                    : "self-end bg-white/[0.08] text-white/90"
                }`}
              >
                <span
                  className={`block text-[10.5px] font-semibold uppercase tracking-[0.06em] mb-1 ${
                    line.speaker === "ai" ? "text-[#B4C0FF]" : "text-white/65"
                  }`}
                >
                  {line.speaker === "ai" ? "Vocemi AI" : "Caller"}
                </span>
                {line.text}
              </motion.div>
            ))}
            {nextIsAi && step > 0 && (
              <motion.div
                key={`typing-${step}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="self-start bg-brand/15 border border-brand/30 rounded-2xl px-4 py-3 flex gap-1.5"
                aria-hidden
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-1.5 h-1.5 rounded-full bg-brand-light"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {booked && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute -bottom-5 left-4 sm:-left-6 bg-white border border-ink/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0_18px_40px_-16px_rgba(22,24,28,0.35)]"
          >
            <span className="w-9 h-9 rounded-xl bg-[#EAF6EE] text-[#1B7C52] flex items-center justify-center">
              <CalendarCheck size={18} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-bold text-ink">Consult booked</span>
              <span className="block text-[12px] text-ink/60">Thu 2:00 pm · text sent</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden sm:flex absolute -top-4 -right-3 bg-white border border-ink/10 rounded-full pl-2 pr-3.5 py-1.5 items-center gap-2 shadow-[0_14px_30px_-14px_rgba(22,24,28,0.35)] animate-floatSlow">
        <span className="w-6 h-6 rounded-full bg-brand text-white text-[11px] font-extrabold flex items-center justify-center">
          7
        </span>
        <span className="text-[12.5px] font-semibold text-ink">Live in 7 days</span>
      </div>
    </div>
  );
}
