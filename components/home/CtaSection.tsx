import { siteConfig } from "@/lib/config";
import Reveal from "./Reveal";

export default function CtaSection() {
  return (
    <section className="max-w-[1180px] mx-auto px-6 md:px-8 py-16 md:py-[100px]">
      <Reveal>
        <div className="bg-ink rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full animate-floatSlow"
            style={{
              background:
                "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)",
            }}
          />
          <h2 className="font-display text-3xl md:text-[42px] font-extrabold tracking-[-0.025em] text-white m-0 mb-3.5 relative">
            Ready to stop missing calls?
          </h2>
          <p className="text-[16.5px] text-white/60 m-0 mb-[30px] relative">
            Book a free 15-minute call. We&apos;ll map your first workflow together.
          </p>
          <a
            href={siteConfig.bookCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block bg-brand text-white px-[30px] py-[15px] rounded-[9px] font-semibold text-[15.5px] hover:bg-[#5A70FF] transition-colors"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}
