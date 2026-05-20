"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookCallButton from "./BookCallButton";

type TabId = "missed" | "reactivation";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  helper?: string;
  onChange: (value: number) => void;
}

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  helper,
  onChange,
}: SliderFieldProps) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-2xl font-bold bg-gradient-to-r from-primary-accent to-primary-accent-cyan bg-clip-text text-transparent">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="vocemi-slider w-full"
        style={{
          background: `linear-gradient(to right, #7D3CFE 0%, #4DECE1 ${percent}%, rgba(255,255,255,0.1) ${percent}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      {helper && (
        <p className="mt-2 text-xs text-gray-400 leading-relaxed">{helper}</p>
      )}
    </div>
  );
}

interface PrimaryStatProps {
  label: string;
  value: string;
  suffix?: string;
}

function PrimaryStat({ label, value, suffix }: PrimaryStatProps) {
  return (
    <div className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 rounded-xl p-4 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-primary-accent to-primary-accent-cyan bg-clip-text text-transparent">
        {value}
      </p>
      {suffix && <p className="text-xs text-gray-500 mt-1">{suffix}</p>}
    </div>
  );
}

interface SecondaryStatProps {
  value: string;
  label: string;
}

function SecondaryStat({ value, label }: SecondaryStatProps) {
  return (
    <div className="bg-primary-dark/40 border border-primary-accent/10 rounded-lg p-3 text-center">
      <p className="text-lg sm:text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{label}</p>
    </div>
  );
}

export default function RevenueCalculator() {
  const [activeTab, setActiveTab] = useState<TabId>("missed");

  const [missedCallsPerDay, setMissedCallsPerDay] = useState(20);
  const [missedAvgValue, setMissedAvgValue] = useState(500);
  const [missedCloseRate, setMissedCloseRate] = useState(30);

  const [dormantLeads, setDormantLeads] = useState(500);
  const [reactAvgValue, setReactAvgValue] = useState(500);
  const [reactivationRate, setReactivationRate] = useState(15);

  const missed = useMemo(() => {
    const calls = Math.max(0, missedCallsPerDay);
    const value = Math.max(0, missedAvgValue);
    const close = Math.max(0, missedCloseRate) / 100;
    const daily = calls * value * close;
    const monthly = daily * 30;
    const yearly = monthly * 12;
    const missedCallsMonthly = calls * 30;
    const lostDealsMonthly = missedCallsMonthly * close;
    const hoursWastedMonthly = (missedCallsMonthly * 5) / 60;
    return {
      daily,
      monthly,
      yearly,
      missedCallsMonthly,
      lostDealsMonthly,
      hoursWastedMonthly,
    };
  }, [missedCallsPerDay, missedAvgValue, missedCloseRate]);

  const reactivation = useMemo(() => {
    const leads = Math.max(0, dormantLeads);
    const value = Math.max(0, reactAvgValue);
    const rate = Math.max(0, reactivationRate) / 100;
    const likelyWins = leads * rate;
    const recoverableRevenue = likelyWins * value;
    const monthlyLift = recoverableRevenue / 12;
    const timeSavedHours = (leads * 3) / 60;
    return {
      likelyWins,
      recoverableRevenue,
      monthlyLift,
      timeSavedHours,
      leadsReengaged: leads,
    };
  }, [dormantLeads, reactAvgValue, reactivationRate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          ROI Calculator
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Most businesses don&apos;t realize how much revenue they&apos;re bleeding from missed calls and dormant leads. Run the numbers, then fix it.
        </p>
      </motion.div>

      {/* Tab switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="inline-flex bg-primary-dark/60 border border-primary-accent/20 rounded-full p-1">
          <button
            type="button"
            onClick={() => setActiveTab("missed")}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === "missed"
                ? "bg-gradient-to-r from-primary-accent to-primary-accent-alt text-white shadow-lg shadow-primary-accent/30"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Missed Calls
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reactivation")}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === "reactivation"
                ? "bg-gradient-to-r from-primary-accent to-primary-accent-alt text-white shadow-lg shadow-primary-accent/30"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Reactivation Calls
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-primary-secondary/40 backdrop-blur-sm border border-primary-accent/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl"
      >
        <AnimatePresence mode="wait">
          {activeTab === "missed" ? (
            <motion.div
              key="missed"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10"
            >
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Missed Call Calculator
                </h3>
                <p className="text-gray-400 mb-6">
                  Estimate revenue lost from unanswered calls.
                </p>
                <div className="space-y-6">
                  <SliderField
                    label="Missed Calls / Day"
                    value={missedCallsPerDay}
                    min={0}
                    max={100}
                    step={1}
                    display={number.format(missedCallsPerDay)}
                    helper="Missed calls happen 7 days a week — even when you are closed."
                    onChange={setMissedCallsPerDay}
                  />
                  <SliderField
                    label="Avg Customer Value"
                    value={missedAvgValue}
                    min={50}
                    max={5000}
                    step={50}
                    display={currency.format(missedAvgValue)}
                    helper="What is a customer worth to your business?"
                    onChange={setMissedAvgValue}
                  />
                  <SliderField
                    label="Close Rate"
                    value={missedCloseRate}
                    min={0}
                    max={100}
                    step={1}
                    display={`${missedCloseRate}%`}
                    helper="What % of answered calls typically convert?"
                    onChange={setMissedCloseRate}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PrimaryStat
                    label="Daily Loss"
                    value={currency.format(missed.daily)}
                  />
                  <PrimaryStat
                    label="Monthly Loss"
                    value={currency.format(missed.monthly)}
                  />
                  <PrimaryStat
                    label="Total Yearly Loss"
                    value={currency.format(missed.yearly)}
                    suffix="per year"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <SecondaryStat
                    value={number.format(missed.missedCallsMonthly)}
                    label="Missed Calls / mo"
                  />
                  <SecondaryStat
                    value={number.format(missed.lostDealsMonthly)}
                    label="Lost Deals / mo"
                  />
                  <SecondaryStat
                    value={number.format(missed.hoursWastedMonthly)}
                    label="Hours Wasted / mo"
                  />
                </div>

                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-br from-primary-accent/15 to-primary-accent-cyan/10 border border-primary-accent/30 rounded-2xl p-5 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Want to plug this leak?
                    </h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Book a free 15-minute strategy call and we&apos;ll show you how Voice AI recovers this revenue.
                    </p>
                    <BookCallButton variant="primary" className="w-full sm:w-auto">
                      Book Your Call
                    </BookCallButton>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reactivation"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10"
            >
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Lead Reactivation Calculator
                </h3>
                <p className="text-gray-400 mb-6">
                  Estimate hidden revenue sitting in your CRM.
                </p>
                <div className="space-y-6">
                  <SliderField
                    label="Dormant Leads in Database"
                    value={dormantLeads}
                    min={0}
                    max={10000}
                    step={50}
                    display={number.format(dormantLeads)}
                    helper="Old or unconverted leads sitting in your CRM."
                    onChange={setDormantLeads}
                  />
                  <SliderField
                    label="Avg Customer Value"
                    value={reactAvgValue}
                    min={50}
                    max={5000}
                    step={50}
                    display={currency.format(reactAvgValue)}
                    helper="What is a customer worth to your business?"
                    onChange={setReactAvgValue}
                  />
                  <SliderField
                    label="Reactivation Rate"
                    value={reactivationRate}
                    min={0}
                    max={50}
                    step={1}
                    display={`${reactivationRate}%`}
                    helper="Typical AI-powered reactivation recovers 10–25% of dormant leads."
                    onChange={setReactivationRate}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <PrimaryStat
                    label="Recoverable Revenue"
                    value={currency.format(reactivation.recoverableRevenue)}
                  />
                  <PrimaryStat
                    label="Likely Wins"
                    value={number.format(reactivation.likelyWins)}
                    suffix="customers"
                  />
                  <PrimaryStat
                    label="Avg Monthly Lift"
                    value={currency.format(reactivation.monthlyLift)}
                    suffix="over 12 months"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <SecondaryStat
                    value={number.format(reactivation.leadsReengaged)}
                    label="Leads Re-engaged"
                  />
                  <SecondaryStat
                    value={number.format(reactivation.timeSavedHours)}
                    label="Hours Saved vs. Manual"
                  />
                </div>

                <div className="mt-auto pt-6">
                  <div className="bg-gradient-to-br from-primary-accent/15 to-primary-accent-cyan/10 border border-primary-accent/30 rounded-2xl p-5 text-center">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Ready to wake up your dormant leads?
                    </h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Our voice agents call every old lead, qualify them, and book the live ones — all on autopilot.
                    </p>
                    <BookCallButton variant="primary" className="w-full sm:w-auto">
                      Book Your Call
                    </BookCallButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <p className="text-center text-xs text-gray-500 mt-6">
        Estimates only. Actual results depend on your industry, lead quality, and current process.
      </p>
    </div>
  );
}
