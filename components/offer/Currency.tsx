"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { currencyLabel, type Currency } from "@/lib/plans";

const STORAGE_KEY = "vocemi:currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency, placement?: string) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "usd",
  setCurrency: () => {},
});

function readStored(): Currency | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "usd" || value === "cad" ? value : null;
  } catch {
    // Private mode, blocked site data, sandboxed preview: USD it is.
    return null;
  }
}

function writeStored(currency: Currency) {
  try {
    window.localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Choice still applies for this page view.
  }
}

/**
 * USD by default. The stored choice is read after mount, so the server HTML
 * (USD) and the first client render always match.
 */
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("usd");

  useEffect(() => {
    const stored = readStored();
    if (stored) setCurrencyState(stored);
  }, []);

  const setCurrency = useCallback((next: Currency, placement?: string) => {
    setCurrencyState(next);
    writeStored(next);
    trackEvent("pricing_currency_toggle", {
      currency: next,
      ...(placement ? { placement } : {}),
    });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

const options: Currency[] = ["usd", "cad"];

export function CurrencyToggle({
  placement,
  className = "",
}: {
  placement: string;
  className?: string;
}) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label="Show prices in"
      className={`inline-flex items-center gap-1 bg-white border border-ink/10 rounded-full p-1 shadow-[0_6px_18px_-10px_rgba(22,24,28,0.25)] ${className}`}
    >
      {options.map((option) => {
        const active = option === currency;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => !active && setCurrency(option, placement)}
            className={`relative px-4 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors ${
              active ? "text-white" : "text-ink/65 hover:text-ink"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`currency-pill-${placement}`}
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{currencyLabel[option]}</span>
          </button>
        );
      })}
    </div>
  );
}
