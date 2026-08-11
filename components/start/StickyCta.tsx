"use client";

import { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { siteConfig } from "@/lib/config";
import TrackedLink from "./TrackedLink";

/**
 * Mobile-only action bar.
 *
 * Appears once the hero (and its buttons) have scrolled away, and stands down
 * in two places: near the bottom of the page, so it never covers the final CTA
 * or the contact links, and while the live-demo section is on screen, where a
 * "Talk to AI" button would just scroll the visitor to where they already are.
 */
export default function StickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [demoOnScreen, setDemoOnScreen] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const visible = pastHero && !demoOnScreen && !callStarted;

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const fromBottom =
        document.documentElement.scrollHeight - (y + window.innerHeight);
      setPastHero(y > 500 && fromBottom > 560);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const demo = document.getElementById("talk");
    const observer = demo
      ? new IntersectionObserver(
          ([entry]) => setDemoOnScreen(entry.isIntersecting),
          { threshold: 0.25 }
        )
      : null;
    if (demo && observer) observer.observe(demo);

    // Once the voice demo is live, the ElevenLabs call bar owns the bottom
    // of the screen — two stacked bars would fight for the same thumb.
    const onCallStarted = () => setCallStarted(true);
    window.addEventListener("vocemi:call-started", onCallStarted);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("vocemi:call-started", onCallStarted);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-ink/10 bg-cream/95 backdrop-blur-[10px] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2.5">
        <a
          href="#talk"
          tabIndex={visible ? undefined : -1}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-white py-3.5 rounded-[9px] text-[14.5px] font-semibold"
        >
          <Mic size={16} />
          Talk to AI
        </a>
        <TrackedLink
          href={siteConfig.bookCallUrl}
          event="book_call_clicked"
          external
          className="flex-1 inline-flex items-center justify-center bg-brand text-white py-3.5 rounded-[9px] text-[14.5px] font-semibold"
        >
          Book a call
        </TrackedLink>
      </div>
    </div>
  );
}
