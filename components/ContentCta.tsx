import { ArrowRight } from "lucide-react";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";

/** Closing demo + booking prompt for blog posts and industry pages. */
export default function ContentCta({
  title,
  text,
  placement,
}: {
  title: string;
  text: string;
  /** Analytics placement, e.g. "blog_post" or "industry_page". */
  placement: string;
}) {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <div className="bg-ink text-white rounded-3xl p-8 md:p-12 text-center">
      <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] font-extrabold tracking-[-0.02em] m-0 mb-3">
        {title}
      </h2>
      <p className="text-white/60 text-[16px] leading-[1.65] max-w-[560px] mx-auto m-0 mb-7">
        {text}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <TrackedLink
          href={demoHref}
          event="demo_cta_clicked"
          properties={{ placement }}
          className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3.5 rounded-[9px] font-semibold hover:bg-brand-dark transition-colors"
        >
          {siteConfig.voiceDemoAvailable ? "Try the live demo" : "See how it works"}
          <ArrowRight size={17} />
        </TrackedLink>
        <TrackedLink
          href={siteConfig.bookCallUrl(placement)}
          event="book_call_clicked"
          properties={{ placement }}
          external
          className="inline-flex items-center justify-center border border-white/25 text-white px-6 py-3.5 rounded-[9px] font-semibold hover:border-white/60 transition-colors"
        >
          Book a free call
        </TrackedLink>
      </div>
    </div>
  );
}
