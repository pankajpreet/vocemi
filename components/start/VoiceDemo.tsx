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

/**
 * Retell renders a fixed launcher pinned bottom-right, and there is no
 * attribute to place it inline -- the same shape of problem the page had with
 * ElevenLabs. Its shadow root is open, so we adopt it instead: move the host
 * into the demo card and neutralise the fixed positioning from inside.
 *
 * Two other things are patched here:
 *
 * - "Your RetellAI assistant" is a hardcoded string in their bundle, read from
 *   no attribute. Replaced via CSS rather than by rewriting textContent, since
 *   the widget is a React tree that would overwrite the node on next render.
 * - Class selectors are prefix matches so they survive their build hash
 *   changing. If a future bundle renames these, the widget reverts to floating
 *   rather than disappearing.
 *
 * Their "Powered by Retell" link is deliberately left alone: data-white-label
 * is the supported way to drop attribution, and that needs a token from them.
 */
const WIDGET_CSS = `
  [class*="_container_"] {
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    max-width: none !important;
    z-index: auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
  }
  [class*="_window_"] {
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    max-width: none !important;
    margin: 0 0 12px 0 !important;
  }
  [class*="_brandSubtitle_"] { font-size: 0 !important; }
  [class*="_brandSubtitle_"]::after {
    content: "Ask about pricing, hours, or booking a visit";
    font-size: 14px;
    line-height: 1.4;
  }
`;

/** The widget mounts async, so poll briefly rather than assume it's there. */
function adoptWidget(target: HTMLElement) {
  let tries = 0;
  const timer = window.setInterval(() => {
    if (++tries > 40) return window.clearInterval(timer);

    const host = Array.from(document.querySelectorAll<HTMLElement>("*")).find(
      (el) => el.shadowRoot?.querySelector('[class*="_container_"]')
    );
    if (!host?.shadowRoot) return;
    window.clearInterval(timer);

    if (!host.shadowRoot.getElementById("vocemi-widget-css")) {
      const style = document.createElement("style");
      style.id = "vocemi-widget-css";
      style.textContent = WIDGET_CSS;
      host.shadowRoot.appendChild(style);
    }
    if (host.parentElement !== target) target.appendChild(host);
  }, 200);
  return () => window.clearInterval(timer);
}

/**
 * Next.js navigates client-side, so nothing here unmounts on its own -- the
 * call window would follow the visitor to the homepage. Tear the widget down
 * when the section leaves.
 */
function teardownWidget() {
  document.getElementById("retell-widget")?.remove();
  document.getElementById(RECAPTCHA_ID)?.remove();
  document
    .querySelectorAll<HTMLElement>(".grecaptcha-badge")
    .forEach((el) => el.remove());
  Array.from(document.querySelectorAll<HTMLElement>("*"))
    .filter((el) => el.shadowRoot?.querySelector('[class*="_container_"]'))
    .forEach((el) => el.remove());
}

export default function VoiceDemo() {
  const [started, setStarted] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => teardownWidget, []);

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
    // Not data-color: that's shorthand and, per their bundle, it wins over
    // data-theme-color -- which would paint the widget's background brand
    // blue. It now sits on a light panel inside the card, so set the two
    // separately: white ground, brand accents.
    s.dataset.themeColor = "#FFFFFF";
    s.dataset.componentColor = "#3B54F4";
    s.dataset.logoUrl = `${window.location.origin}/logo.svg`;
    s.dataset.fabText = "Talk to an AI employee";
    s.dataset.botName = "Vocemi";
    s.dataset.autoOpen = "true";
    s.dataset.showAiPopup = "false";
    if (retellRecaptchaKey) s.dataset.recaptchaKey = retellRecaptchaKey;
    document.body.appendChild(s);
    if (mountRef.current) adoptWidget(mountRef.current);
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
              {/* The widget is moved in here once it mounts. Light panel:
                  its own chrome is built for a pale background. */}
              <div
                ref={mountRef}
                className="rounded-2xl bg-sand p-3 min-h-[88px] flex items-center justify-center"
              >
                <span className="text-ink/40 text-[13.5px]">
                  Connecting&hellip;
                </span>
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
