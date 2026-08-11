"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import TrackedLink from "./TrackedLink";

/**
 * Video section with a lite-embed facade.
 *
 * Nothing autoplays, because until the visitor taps there is no player to
 * play: no <iframe>, no <video>, and no YouTube script in the DOM. The poster
 * is drawn in CSS rather than fetched, so a cold load makes zero third-party
 * requests. That's a stronger guarantee than muting a player that exists, and
 * it keeps the page silent for someone who scanned the card in public.
 *
 * autoplay=1 below applies only to the user-initiated swap — it saves a second
 * tap inside the player once they've already chosen to watch.
 */
export default function VslSection() {
  const [playing, setPlaying] = useState(false);
  const videoId = siteConfig.startVideoId;

  // No video yet? Ship the page without a half-finished player.
  if (!videoId) return null;

  return (
    <section className="bg-sand border-y border-ink/10">
      <div className="max-w-[860px] mx-auto px-6 py-14 md:py-20">
        <h2 className="font-display text-[28px] md:text-4xl font-extrabold tracking-[-0.025em] text-ink m-0 mb-3">
          See it in 90 seconds
        </h2>
        <p className="text-[16px] text-ink/60 leading-[1.6] m-0 mb-7 max-w-[520px]">
          What actually happens when a customer calls and nobody&apos;s free to
          pick up.
        </p>

        <div className="relative rounded-2xl overflow-hidden bg-coal aspect-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Vocemi demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                trackEvent("vsl_played");
                setPlaying(true);
              }}
              aria-label="Play the Vocemi demo video"
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
            >
              <span
                className="absolute -top-10 -right-10 w-[220px] h-[220px] rounded-full animate-floatSlow pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)",
                }}
              />
              <span className="relative w-16 h-16 rounded-full bg-brand flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Play size={26} className="text-white ml-1" fill="currentColor" />
              </span>
              <span className="relative text-white/70 text-[13.5px] font-medium">
                Watch the 90-second demo
              </span>
            </button>
          )}
        </div>

        <div className="mt-7">
          <TrackedLink
            href={siteConfig.bookCallUrl}
            event="book_call_clicked"
            external
            className="inline-block bg-ink text-white px-[26px] py-3.5 rounded-[9px] text-[15.5px] font-semibold hover:bg-brand transition-colors"
          >
            Book a free assessment
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
