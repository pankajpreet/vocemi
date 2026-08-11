"use client";

import { useState } from "react";
import Script from "next/script";
import { Mic } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { demoPrompts } from "@/lib/startContent";

const waveBars = Array.from({ length: 18 }, (_, i) => ({
  dur: 0.7 + (i % 5) * 0.15,
  delay: (i % 7) * 0.08,
}));

/**
 * The live demo — the one thing this page can do that a printed card can't.
 *
 * The ElevenLabs bundle is unversioned third-party JS, so it loads only once
 * the visitor taps. Before that the card is pure CSS and costs nothing.
 *
 * The widget defaults to a fixed, full-viewport floating launcher. We pull it
 * into the card with the CSS override in globals.css, so the demo reads as
 * part of the page rather than a support bubble in the corner.
 *
 * Starting the call takes two taps — ours to load the widget, then the
 * widget's own "Start a call", which is also the browser's cue to ask for the
 * microphone. The bundle exposes no documented way to start a call
 * programmatically, and rendering the widget on load would pull third-party JS
 * into a page that should stay silent until asked.
 */
export default function VoiceDemo() {
  const [started, setStarted] = useState(false);
  const agentId = siteConfig.elevenLabsAgentId;

  if (!agentId) return null;

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
              <p className="text-white/70 text-[14.5px] leading-[1.6] m-0 mb-4">
                Hit <span className="text-white font-semibold">Start a call</span>{" "}
                below and talk to it exactly like a customer would.
              </p>

              {/* Light panel: the widget's own chrome is built for a pale
                  background, and it keeps their UI visibly theirs. */}
              <div className="rounded-2xl bg-sand overflow-hidden">
                <elevenlabs-convai agent-id={agentId} />
              </div>
              <Script
                src="https://unpkg.com/@elevenlabs/convai-widget-embed"
                strategy="afterInteractive"
              />

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
                onClick={() => {
                  trackEvent("voice_demo_started");
                  setStarted(true);
                  // Tell StickyCta to get out of the call bar's way.
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
