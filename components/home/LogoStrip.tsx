import Image from "next/image";
import { clientLogos } from "@/lib/homeContent";

/**
 * Client strip.
 *
 * Each client gets a monogram tile plus a wordmark rather than their real
 * logo: we don't hold their brand files, and an approximation of someone's
 * trademark reads worse than honest type. Drop a file in public/logos and set
 * `src` on the entry in homeContent to swap in the real mark.
 */
export default function LogoStrip() {
  return (
    <section className="border-y border-ink/10 bg-sand py-9">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="text-center text-[12.5px] font-semibold uppercase tracking-[0.06em] text-ink/40 mb-7">
          Trusted by teams who answer the phone for a living
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {clientLogos.map((client) => (
            <div
              key={client.name + client.sub}
              className="flex items-center gap-3 bg-white border border-ink/10 rounded-full pl-2 pr-5 py-2 max-w-full transition-all duration-200 hover:border-ink/25 hover:-translate-y-0.5"
            >
              {client.src ? (
                <Image
                  src={client.src}
                  alt={client.name}
                  width={120}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              ) : (
                <>
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-extrabold text-[13px] flex-shrink-0"
                    style={{ background: client.tint, color: client.ink }}
                  >
                    {client.initials}
                  </span>
                  {/* min-w-0 lets a long client label wrap inside the pill
                      instead of pushing it past the viewport on narrow phones. */}
                  <span className="text-left leading-tight min-w-0">
                    <span className="block font-display text-[15px] font-bold text-ink">
                      {client.name}
                    </span>
                    <span className="block text-[12px] text-ink/45">
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
