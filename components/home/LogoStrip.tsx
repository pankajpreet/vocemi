import Image from "next/image";
import { clientLogos } from "@/lib/homeContent";

/**
 * Client strip.
 *
 * Each client is a typographic wordmark rather than their real logo: we don't
 * hold their brand files, and an approximation of someone's trademark reads
 * worse than honest type. Drop a file in public/logos and set `src` on the
 * entry in homeContent to swap in the real mark.
 *
 * Muted by default and full strength on hover, so three unrelated brand
 * palettes don't compete with the page.
 */
export default function LogoStrip() {
  return (
    <section className="border-y border-ink/10 bg-sand py-8">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="text-center text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink/40 mb-6">
          Trusted by teams who answer the phone for a living
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
          {clientLogos.map((client) => (
            <div
              key={client.name + client.sub}
              className="flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity duration-200"
            >
              {client.src ? (
                <Image
                  src={client.src}
                  alt={client.name}
                  width={160}
                  height={44}
                  className="h-11 w-auto object-contain grayscale hover:grayscale-0 transition-[filter] duration-200"
                />
              ) : (
                <span className="font-display text-[19px] font-extrabold tracking-[-0.02em] text-ink leading-tight">
                  {client.accent && (
                    <span className="text-brand">{client.accent}</span>
                  )}
                  {client.accent
                    ? client.name.slice(client.accent.length)
                    : client.name}
                </span>
              )}
              <span className="text-[12.5px] text-ink/45 mt-1">
                {client.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
