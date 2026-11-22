"use client";

import { MotionConfig } from "framer-motion";
import { CurrencyProvider } from "./Currency";

/** Reduced-motion users get every animation's end state, instantly. */
export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CurrencyProvider>{children}</CurrencyProvider>
    </MotionConfig>
  );
}
