"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CallDemoButton, TrialButton } from "./CtaButtons";

/**
 * Mobile-only bar that keeps "Call our AI" and "Start free trial" in reach.
 * Slides in after the first scroll, and stays off /free-trial, where the
 * form is the call to action.
 */
export default function SiteStickyCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const hidden = pathname?.startsWith("/free-trial");
  const visible = scrolled && !hidden;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 240);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-ink/10 bg-cream/95 backdrop-blur-[10px] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex gap-2.5">
        <CallDemoButton
          placement="sticky_mobile"
          variant="secondary"
          showNumber={false}
          tabIndex={visible ? undefined : -1}
          className="flex-1 bg-white py-3.5 px-3 text-[14.5px]"
        />
        <TrialButton
          placement="sticky_mobile"
          tabIndex={visible ? undefined : -1}
          className="flex-1 py-3.5 px-3 text-[14.5px]"
        />
      </div>
    </div>
  );
}
