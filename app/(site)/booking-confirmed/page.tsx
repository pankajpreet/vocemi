"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const confirmationKey = "vocemi_booking_completed";

export default function BookingConfirmedPage() {
  useEffect(() => {
    if (window.sessionStorage.getItem(confirmationKey)) return;

    trackEvent("booking_completed", { page: "/booking-confirmed" });
    window.sessionStorage.setItem(confirmationKey, "true");
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center">
      <section className="max-w-[680px] mx-auto px-6 py-20 text-center">
        <span className="w-16 h-16 rounded-full bg-[#EAF6EE] text-[#1F8F5F] inline-flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="font-display text-[38px] md:text-[50px] leading-[1.08] font-extrabold tracking-[-0.025em] text-ink m-0 mb-4">
          Your call is booked
        </h1>
        <p className="text-lg leading-[1.65] text-ink/60 m-0 mb-8">
          Check your inbox for the calendar confirmation. We&apos;ll use the
          call to understand your workflow and decide whether Voice AI is a
          useful fit.
        </p>
        <Link
          href="/"
          className="inline-flex bg-ink text-white px-6 py-3.5 rounded-[9px] font-semibold hover:bg-brand transition-colors"
        >
          Return to Vocemi
        </Link>
      </section>
    </div>
  );
}
