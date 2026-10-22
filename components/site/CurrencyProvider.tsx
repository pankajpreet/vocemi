"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { Currency } from "@/lib/plans";

const STORAGE_KEY = "vocemi-currency";

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "CAD" || stored === "USD") setCurrencyState(stored);
    } catch {
      // Storage blocked. The toggle still updates in-memory state.
    }
  }, []);

  const setCurrency = (next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked. The prices already changed for this visit.
    }
    trackEvent("pricing_currency_toggle", { currency: next });
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
