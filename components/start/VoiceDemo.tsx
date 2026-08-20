"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { demoPrompts } from "@/lib/startContent";

const waveBars = Array.from({ length: 18 }, (_, i) => ({
  dur: 0.7 + (i % 5) * 0.15,
  delay: (i % 7) * 0.08,
}));

const WIDGET_SRC = "https://dashboard.retellai.com/retell-widget-v2.js";
const RECAPTCHA_SRC = "https://www.google.com/recaptcha/api.js";
const RECAPTCHA_ID = "retell-recaptcha";

/**
 * The live demo — the one thing this page can do that a printed card can't.
 *
 * Retell ships as a floating launcher, so we don't try to inline it. Instead
 * the script is injected only when the visitor taps, with data-auto-open set:
 * because we control *when* it loads, "auto open" becomes "open on tap", and
 * the visitor gets into the call in one tap rather than two.
 *
 * Nothing third-party is fetched before that tap, which keeps a cold load
 * silent for someone who scanned the card standing in public.
 */
export default function VoiceDemo() {
  const [started, setStarted] = useState(false);
  const { retellPublicKey, retellVoiceAgentId, retellRecaptchaKey } =
    siteConfig;

  // Both credentials are required. Without them the section omits itself and
  // StartHero drops its "Talk to an AI employee" CTA, so there's no dead link.
  if (!retellPublicKey || !retellVoiceAgentId) return null;

  const injectWidget = () => {
    if (document.getElementById("retell-widget")) return;
    const s = document.createElement("script");
    s.id = "retell-widget";
    s.src = WIDGET_SRC;
    s.type = "module";
    s.dataset.voicePublicKey = retellPublicKey;
    s.dataset.voiceAgentId = retellVoiceAgentId;
    s.dataset.title = "Vocemi AI Employee";
    s.dataset.color = "#3B54F4";
    s.dataset.fabText = "Talk to an AI employee";
    s.dataset.botName = "Vocemi";
    s.dataset.autoOpen = "true";
    s.dataset.showAiPopup = "false";
    if (retellRecaptchaKey) s.dataset.recaptchaKey = retellRecaptchaKey;
    document.body.appendChild(s);
  };

  const startCall = () => {
    trackEvent("voice_demo_started");
    setStarted(true);
    // Tell StickyCta to get out of the call widget's way.
    window.dispatchEvent(new CustomEvent("vocemi:call-started"));

    // Retell doesn't bundle reCAPTCHA — Google's script has to be loaded
    // separately, and must be in place before the widget tries to verify.
    if (retellRecaptchaKey && !document.getElementById(RECAPTCHA_ID)) {
      const r = document.createElement("script");
      r.id = RECAPTCHA_ID;
      r.src = `${RECAPTCHA_SRC}?render=${retellRecaptchaKey}`;
      // Inject the widget either way: if Google is blocked or slow, let Retell
      // report the failure rather than leaving a button that does nothing.
      r.onload = injectWidget;
      r.onerror = injectWidget;
      document.head.appendChild(r);
      return;
    }

    injectWidget();
  };

  return (
    <section id="talk" className="max-w-[860px] mx-auto px-6 py-14 md:py-20 scroll-mt-6">
      <div className="bg-coal rounded-[20px] p-7 md:p-10 relative overflow-hidden shadow-[0_40px_80px_-24px_rgba(20,22,27,0.55)]">
        <div
          className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full animate-floatSlow pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)",
          }}
        />

        <div className="relative">
          <div className="inline-flex items-center gap-2 text-brand-light text-[11.5px] font-semibold uppercase tracking-[0.06em] mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-[#37D67A] animate-pulseDot" />
            Live AI demo
          </div>

          <h2 className="font-display text-[28px] md:text-4xl font-extrabold tracking-[-0.025em] text-white m-0 mb-3">
            Don&apos;t take our word for it.
          </h2>
          <p className="text-[16px] text-white/60 leading-[1.6] m-0 mb-7 max-w-[440px]">
            Talk to a Vocemi AI employee right now. No signup, no download
            &mdash; it answers like it would for your customers.
          </p>

          {started ? (
            <>
              <div className="rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4">
                <div className="flex items-center gap-2.5 text-white text-[14.5px] font-semibold mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#37D67A] animate-pulseDot" />
                  Your call is opening
                </div>
                <p className="text-white/55 text-[14px] leading-[1.6] m-0">
                  The call window is on screen now &mdash; allow the microphone
                  when your browser asks, then talk to it like a customer would.
                </p>
              </div>

              <ul className="mt-6 m-0 p-0 list-none flex flex-col gap-2">
                {demoPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="text-white/45 text-[13.5px] flex items-center gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                    {prompt}
                  </li>
                ))}
              </ul>

              <p className="text-white/35 text-[13px] leading-[1.6] mt-5 m-0">
                Nothing happening? Your browser needs microphone permission for
                this page &mdash; check the address bar.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-end gap-1 h-10 mb-7">
                {waveBars.map((bar, i) => (
                  <span
                    key={i}
                    className="w-[5px] rounded-[3px] bg-gradient-to-b from-brand to-brand-light h-full origin-bottom animate-wave"
                    style={{
                      animationDuration: `${bar.dur}s`,
                      animationDelay: `${bar.delay}s`,
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={startCall}
                className="inline-flex items-center gap-2.5 bg-brand text-white px-[30px] py-4 rounded-[9px] font-semibold text-[15.5px] hover:bg-[#5A70FF] transition-colors"
              >
                <Mic size={18} />
                Tap to talk
              </button>

              <ul className="mt-7 m-0 p-0 list-none flex flex-col gap-2">
                {demoPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="text-white/45 text-[13.5px] flex items-center gap-2.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                    {prompt}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
