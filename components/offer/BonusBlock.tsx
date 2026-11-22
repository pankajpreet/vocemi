"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { campaignPrice } from "@/lib/plans";
import { useCurrency } from "./Currency";
import { AnimatedPrice } from "./PlanCard";

/** Free first lead reactivation campaign, with a slowly travelling gradient edge. */
export default function BonusBlock({ compact = false }: { compact?: boolean }) {
  const { currency } = useCurrency();
  return (
    <div className="relative rounded-[22px] p-[1.5px] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-[-150%]"
        style={{
          background:
            "conic-gradient(from 0deg, #3B54F4, #7C90FF, #EEF0FE, #7C90FF, #3B54F4)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className={`relative bg-white rounded-[21px] ${compact ? "p-6" : "p-7 md:p-9"} flex flex-col sm:flex-row gap-5 sm:items-center`}>
        <motion.span
          className="w-14 h-14 rounded-2xl bg-brand-tint text-brand flex items-center justify-center flex-shrink-0"
          whileInView={{ rotate: [0, -10, 10, -6, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <Gift size={26} aria-hidden />
        </motion.span>
        <div>
          <div className="text-[12.5px] font-bold uppercase tracking-[0.06em] text-brand mb-1">
            Bonus
          </div>
          <h3 className="font-display text-[21px] md:text-[24px] font-extrabold tracking-[-0.01em] text-ink m-0 mb-2">
            We bring back your past customers, free{" "}
            <span className="text-ink/65 font-bold text-[0.8em]">
              (<AnimatedPrice value={campaignPrice(currency)} /> value)
            </span>
          </h3>
          <p className="text-[15px] leading-[1.65] text-ink/65 m-0">
            When you move from the free trial to any paid plan, we run your first
            lead reactivation campaign at no charge. The AI reaches out to past
            customers who&apos;ve agreed to hear from you and books them back in.
          </p>
        </div>
      </div>
    </div>
  );
}
