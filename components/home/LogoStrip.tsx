import Image from "next/image";
import { clientLogos } from "@/lib/homeContent";

/**
 * Client strip.
 *
 * Each client gets a monogram tile plus a wordmark rather than their real
 * logo: we don't hold their brand files, and an approximation of someone's
 * trademark reads worse than honest type. Drop a file in public/logos and set
 * `src` on the entry in homeContent to swap in the real mark.
 *
 * Compact on purpose: it sits at the bottom of the hero so the names are in
 * the first viewport. The same industry line is still on each pill.
 */
export default function LogoStrip() {
  return (
    <div className="border-t border-ink/10 bg-sand">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-2.5 md:py-3.5">
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-4">
          <div className="text-[11px] md:text-[12.5px] font-semibold uppercase tracking-[0.04em] md:tracking-[0.06em] text-ink/65 leading-tight shrink-0">
            Trusted by teams who answer the phone for a living
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {clientLogos.map((client) => (
              <div
                key={client.name + client.sub}
                className="flex items-center gap-2 bg-white border border-ink/10 rounded-full pl-1 pr-3 py-1 max-w-full"
              >
                {client.src ? (
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={96}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                ) : (
                  <>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center font-display font-extrabold text-[11px] flex-shrink-0"
                      style={{ background: client.tint, color: client.ink }}
                    >
                      {client.initials}
                    </span>
                    <span className="text-left leading-tight min-w-0">
                      <span className="block font-display text-[13.5px] font-bold text-ink">
                        {client.name}
                      </span>
                      <span className="block text-[11px] text-ink/65">
                        {client.industry} &middot; {client.sub}
                      </span>
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
