"use client";

import { useEffect, useRef, useState } from "react";
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
const WIDGET_ID = "retell-widget";

/**
 * Retell renders a launcher pinned bottom-right and exposes no attribute to
 * place it inline -- I checked every data-* its bundle reads. Its shadow root
 * is open, so we adopt it: move the host into the demo card and neutralise the
 * fixed positioning from inside.
 *
 * Closing is left to Retell. Its window collapses to its own launcher pill,
 * which reopens the call. We deliberately don't restore our "Tap to talk"
 * button instead: the widget is an ES module, so removing and re-adding the
 * script tag will not re-execute it, and a second tap would hang forever on
 * "Connecting".
 *
 * "Your RetellAI assistant" is a hardcoded string read from no attribute, so
 * it is replaced in CSS rather than by rewriting the node -- the widget is a
 * React tree and would put it back on its next render.
 *
 * Selectors are class-prefix matches so they survive Retell's build hash
 * changing. If a future bundle renames them, the widget reverts to floating
 * rather than vanishing.
 *
 * "Powered by Retell" is deliberately left alone -- data-white-label is the
 * supported way to drop attribution and needs a token from them.
 */
const WIDGET_CSS = `
  [class*="_container_"] {
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    max-width: none !important;
    z-index: auto !important;
    display: block !important;
  }
  [class*="_window_"] {
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    box-shadow: none !important;
  }
  /* Hide Retell's launcher only while the call window is open, so the two
     don't stack. Closed, the pill is what reopens the call, and it carries
     our data-fab-text. */
  [class*="_container_"]:has([class*="_windowOpen_"]) [class*="_bottomStack_"] {
    display: none !important;
  }
  [class*="_bottomStack_"] {
    justify-content: center !important;
    padding: 12px !important;
  }
  [class*="_brandSubtitle_"] { font-size: 0 !important; }
  [class*="_brandSubtitle_"]::after {
    content: "Ask about pricing, hours, or booking a visit";
    font-size: 14px;
    line-height: 1.4;
  }
`;

const findHost = (): HTMLElement | null =>
  Array.from(document.querySelectorAll<HTMLElement>("*")).find((el) =>
    el.shadowRoot?.querySelector('[class*="_container_"]')
  ) ?? null;

export default function VoiceDemo() {
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  // Captured at attach time so teardown never depends on a DOM search, which
  // can miss the host while Retell is mid-re-render.
  const hostRef = useRef<HTMLElement | null>(null);

  const { retellPublicKey, retellVoiceAgentId, retellRecaptchaKey } =
    siteConfig;

  useEffect(() => {
    if (!started) return;
    const target = mountRef.current;
    if (!target) return;

    const injectWidget = () => {
      if (document.getElementById(WIDGET_ID)) return;
      const s = document.createElement("script");
      s.id = WIDGET_ID;
      s.src = WIDGET_SRC;
      s.type = "module";
      s.dataset.voicePublicKey = retellPublicKey;
      s.dataset.voiceAgentId = retellVoiceAgentId;
      s.dataset.title = "Vocemi AI Employee";
      // Not data-color: their bundle resolves it ahead of data-theme-color,
      // which would paint the widget's background brand blue. It sits on a
      // light panel here, so set the two separately.
      s.dataset.themeColor = "#FFFFFF";
      s.dataset.componentColor = "#3B54F4";
      s.dataset.logoUrl = `${window.location.origin}/logo.svg`;
      s.dataset.fabText = "Talk to an AI employee";
      s.dataset.botName = "Vocemi";
      s.dataset.autoOpen = "true";
      s.dataset.showAiPopup = "false";
      if (retellRecaptchaKey) s.dataset.recaptchaKey = retellRecaptchaKey;
      document.body.appendChild(s);
    };

    // Retell doesn't bundle reCAPTCHA -- their docs require Google's script
    // separately, v3 only, and it must be in place before the widget verifies.
    if (retellRecaptchaKey && !document.getElementById(RECAPTCHA_ID)) {
      const r = document.createElement("script");
      r.id = RECAPTCHA_ID;
      r.src = `${RECAPTCHA_SRC}?render=${retellRecaptchaKey}`;
      // Inject the widget either way: if Google is blocked, let Retell report
      // the failure rather than leaving a button that does nothing.
      r.onload = injectWidget;
      r.onerror = injectWidget;
      document.head.appendChild(r);
    } else {
      injectWidget();
    }

    // The widget mounts async, so poll rather than assume it is there.
    const timer = window.setInterval(() => {
      const host = findHost();
      if (!host?.shadowRoot) return;
      window.clearInterval(timer);

      const root = host.shadowRoot;
      if (!root.getElementById("vocemi-widget-css")) {
        const style = document.createElement("style");
        style.id = "vocemi-widget-css";
        style.textContent = WIDGET_CSS;
        root.appendChild(style);
      }
      target.appendChild(host);
      hostRef.current = host;
      setReady(true);
    }, 200);
    const giveUp = window.setTimeout(() => window.clearInterval(timer), 15000);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(giveUp);
    };
  }, [started, retellPublicKey, retellVoiceAgentId, retellRecaptchaKey]);

  // Next.js navigates client-side, so nothing unmounts on its own -- without
  // this the call window follows the visitor to the homepage.
  useEffect(
    () => () => {
      document.getElementById(WIDGET_ID)?.remove();
      document.getElementById(RECAPTCHA_ID)?.remove();
      document
        .querySelectorAll<HTMLElement>(".grecaptcha-badge")
        .forEach((el) => el.remove());
      hostRef.current?.remove();
      findHost()?.remove();
    },
    []
  );

  // Both credentials are required. Without them the section omits itself and
  // StartHero drops its "Talk to an AI employee" CTA, so there's no dead link.
  if (!retellPublicKey || !retellVoiceAgentId) return null;

  return (
    <section
      id="talk"
      className="max-w-[860px] mx-auto px-6 py-14 md:py-20 scroll-mt-6"
    >
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
              {/* The widget is moved in here once it mounts. Light panel: its
                  own chrome is built for a pale background. */}
              <div
                ref={mountRef}
                className="rounded-2xl bg-sand overflow-hidden min-h-[88px]"
              >
                {!ready && (
                  <div className="h-[88px] flex items-center justify-center text-ink/40 text-[13.5px]">
                    Connecting&hellip;
                  </div>
                )}
              </div>

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
                onClick={() => {
                  trackEvent("voice_demo_started");
                  setStarted(true);
                  // Tell StickyCta to get out of the call window's way.
                  window.dispatchEvent(new CustomEvent("vocemi:call-started"));
                }}
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
