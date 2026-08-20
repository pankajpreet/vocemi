import Image from "next/image";
import { clientLogos } from "@/lib/homeContent";

/**
 * Compact client strip for /start.
 *
 * Sits directly under the hero: someone who just scanned a card off a stranger
 * wants evidence other businesses already said yes, before they'll spend a
 * minute talking to a demo. Shares clientLogos with the homepage strip.
 *
 * Cream, not sand — the video section below it is sand, and two sand bands in
 * a row merge into one block separated only by a hairline.
 */
export default function ClientStrip() {
  return (
    <section className="border-t border-ink/10 bg-cream">
      <div className="max-w-[860px] mx-auto px-6 py-8">
        <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/40 mb-4">
          Already answering calls for
        </div>
        <div className="flex flex-wrap gap-2.5">
          {clientLogos.map((client) => (
            <div
              key={client.name + client.sub}
              className="flex items-center gap-2.5 bg-white border border-ink/10 rounded-full pl-1.5 pr-4 py-1.5 max-w-full"
            >
              {client.src ? (
                <Image
                  src={client.src}
                  alt={client.name}
                  width={110}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center font-display font-extrabold text-[12px] flex-shrink-0"
                    style={{ background: client.tint, color: client.ink }}
                  >
                    {client.initials}
                  </span>
                  {/* min-w-0 lets a long client label wrap inside the pill
                      instead of pushing it past the viewport at 320px. */}
                  <span className="text-left leading-tight min-w-0">
                    <span className="block font-display text-[13.5px] font-bold text-ink">
                      {client.name}
                    </span>
                    <span className="block text-[11.5px] text-ink/45">
                      {client.industry} &middot; {client.sub}
                    </span>
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
