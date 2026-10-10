"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import TrackedLink from "@/components/start/TrackedLink";

type TabId = "missed" | "reactivation";

const fmt = (n: number) => n.toLocaleString("en-US");

interface SliderFieldProps {
  label: string;
  display: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  helper?: string;
  onChange: (value: number) => void;
}

function SliderField({ label, display, min, max, step = 1, value, helper, onChange }: SliderFieldProps) {
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex justify-between text-[14.5px] font-semibold text-ink mb-2">
        <span>{label}</span>
        <span className="text-brand">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand"
        aria-label={label}
      />
      {helper && (
        <div className="text-[12.5px] text-ink/65 mt-1.5">{helper}</div>
      )}
    </div>
  );
}

function ResultValue({ value, label, size = "sm" }: { value: string; label: string; size?: "sm" | "lg" }) {
  return (
    <div>
      <div
        key={value}
        className={`font-display font-extrabold text-ink animate-popIn ${
          size === "lg" ? "text-[34px] md:text-[38px] text-brand" : "text-2xl"
        }`}
      >
        {value}
      </div>
      <div className={`text-ink/65 ${size === "lg" ? "text-[13px]" : "text-[12.5px]"}`}>
        {label}
      </div>
    </div>
  );
}

function BookButton() {
  return (
    <TrackedLink
      href={siteConfig.bookCallUrl("homepage_opportunity_estimator")}
      event="book_call_clicked"
      properties={{ placement: "homepage_opportunity_estimator" }}
      external
      className="block bg-ink text-white text-center py-[13px] rounded-[9px] font-semibold text-[14.5px] hover:bg-brand transition-colors"
    >
      Book a free call
    </TrackedLink>
  );
}

export default function RoiCalculator() {
  const [tab, setTab] = useState<TabId>("missed");

  const [missedCalls, setMissedCalls] = useState(10);
  const [avgValue, setAvgValue] = useState(250);
  const [closeRate, setCloseRate] = useState(20);

  const [dormantLeads, setDormantLeads] = useState(50);
  const [reactAvgValue, setReactAvgValue] = useState(250);
  const [reactRate, setReactRate] = useState(10);

  const weeklyOpportunity = Math.round(
    missedCalls * (closeRate / 100) * avgValue
  );
  const monthlyOpportunity = Math.round((weeklyOpportunity * 52) / 12);
  const yearlyOpportunity = weeklyOpportunity * 52;

  const reactWon = Math.round(dormantLeads * (reactRate / 100));
  const reactRevenue = reactWon * reactAvgValue;

  const tabButton = (active: boolean) =>
    `px-[22px] py-[11px] rounded-lg text-sm font-semibold border-none cursor-pointer transition-colors ${
      active ? "bg-brand text-white" : "bg-white/[0.08] text-white/60 hover:text-white"
    }`;

  return (
    <section id="calculator" className="bg-coal py-20 md:py-[100px] scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-[640px] mx-auto mb-10 md:mb-[50px] text-center"
        >
          <div className="text-[13px] font-bold text-brand-light uppercase tracking-[0.06em] mb-3">
            Opportunity estimator
          </div>
          <h2 className="font-display text-3xl md:text-[46px] font-extrabold tracking-[-0.025em] leading-[1.1] text-white m-0 mb-3.5">
            Estimate your potential opportunity
          </h2>
          <p className="text-[16.5px] text-white/55 leading-[1.6] m-0">
            Start with the example scenario, then replace every input with
            numbers from your own business.
          </p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          <button type="button" onClick={() => setTab("missed")} className={tabButton(tab === "missed")}>
            Missed Calls
          </button>
          <button type="button" onClick={() => setTab("reactivation")} className={tabButton(tab === "reactivation")}>
            Reactivation Calls
          </button>
        </div>

        {tab === "missed" && (
          <div className="bg-white rounded-[20px] p-6 md:p-10 grid lg:grid-cols-2 gap-10 lg:gap-12">
            <div>
              <SliderField
                label="Missed Calls / Week"
                display={fmt(missedCalls)}
                min={0}
                max={200}
                value={missedCalls}
                helper="Use the number your business actually misses in a normal week."
                onChange={setMissedCalls}
              />
              <SliderField
                label="Avg Customer Value"
                display={`$${fmt(avgValue)}`}
                min={50}
                max={5000}
                step={50}
                value={avgValue}
                helper="Use your own average sale or customer value."
                onChange={setAvgValue}
              />
              <SliderField
                label="Close Rate"
                display={`${closeRate}%`}
                min={1}
                max={100}
                value={closeRate}
                helper="Use the percentage of answered calls your business normally converts."
                onChange={setCloseRate}
              />
            </div>
            <div className="bg-sand rounded-2xl p-7 flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <ResultValue value={`$${fmt(weeklyOpportunity)}`} label="Weekly opportunity" />
                <ResultValue value={`$${fmt(monthlyOpportunity)}`} label="Monthly opportunity" />
              </div>
              <div className="border-t border-ink/10 pt-5 mb-5">
                <ResultValue value={`$${fmt(yearlyOpportunity)}`} label="Annual opportunity" size="lg" />
                <p className="text-[12px] leading-[1.5] text-ink/65 m-0 mt-3">
                  Formula: missed calls per week × close rate × average customer
                  value. This estimates gross revenue opportunity, not profit
                  or guaranteed revenue.
                </p>
              </div>
              <BookButton />
            </div>
          </div>
        )}

        {tab === "reactivation" && (
          <div className="bg-white rounded-[20px] p-6 md:p-10 grid lg:grid-cols-2 gap-10 lg:gap-12">
            <div>
              <SliderField
                label="Dormant Leads / Month"
                display={fmt(dormantLeads)}
                min={10}
                max={1000}
                step={10}
                value={dormantLeads}
                helper="Past leads and customers who never converted or came back."
                onChange={setDormantLeads}
              />
              <SliderField
                label="Avg Customer Value"
                display={`$${fmt(reactAvgValue)}`}
                min={50}
                max={5000}
                step={50}
                value={reactAvgValue}
                onChange={setReactAvgValue}
              />
              <SliderField
                label="Reactivation Rate"
                display={`${reactRate}%`}
                min={1}
                max={50}
                value={reactRate}
                helper="Use a rate supported by your own past campaigns, or test a range."
                onChange={setReactRate}
              />
            </div>
            <div className="bg-sand rounded-2xl p-7 flex flex-col justify-center">
              <div className="mb-5">
                <ResultValue value={fmt(reactWon)} label="Customers Reactivated / mo" />
              </div>
              <div className="border-t border-ink/10 pt-5 mb-5">
                <ResultValue value={`$${fmt(reactRevenue)}`} label="Potential revenue / month" size="lg" />
                <p className="text-[12px] leading-[1.5] text-ink/65 m-0 mt-3">
                  Formula: dormant leads × reactivation rate × average customer
                  value. This is a scenario, not a forecast.
                </p>
              </div>
              <BookButton />
            </div>
          </div>
        )}

        <div className="text-center text-[12.5px] text-white/50 mt-[22px]">
          Example values are illustrative. Replace them with your own data;
          actual results depend on lead quality, operations, and market conditions.
        </div>
      </div>
    </section>
  );
}
