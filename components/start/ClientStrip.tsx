import Image from "next/image";
import { clientLogos } from "@/lib/homeContent";

/**
 * Compact client strip for /start.
 *
 * Sits directly under the hero: someone who just scanned a card off a stranger
 * wants evidence other businesses already said yes, before they'll spend a
 * minute talking to a demo. Shares clientLogos with the homepage strip.
 */
export default function ClientStrip() {
  return (
    // Cream, not sand: the VSL section below is sand, and two sand bands in a
    // row merge into one block separated only by a hairline.
    <section className="border-t border-ink/10 bg-cream">
      <div className="max-w-[860px] mx-auto px-6 py-7">
        <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/40 mb-4">
          Already answering calls for
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {clientLogos.map((client) => (
            <div key={client.name + client.sub}>
              {client.src ? (
                <Image
                  src={client.src}
                  alt={client.name}
                  width={140}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              ) : (
                <div className="font-display text-[16px] font-extrabold tracking-[-0.02em] text-ink leading-tight">
                  {client.accent && (
                    <span className="text-brand">{client.accent}</span>
                  )}
                  {client.accent
                    ? client.name.slice(client.accent.length)
                    : client.name}
                </div>
              )}
              <div className="text-[12px] text-ink/45 mt-0.5">{client.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
