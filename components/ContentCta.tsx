import { siteConfig } from "@/lib/config";
import TrackedLink from "@/components/start/TrackedLink";
import { buttonClass, CallDemoButton, TrialButton } from "@/components/offer/CtaButtons";

/** Closing call / free-trial prompt for blog posts, industry and service pages. */
export default function ContentCta({
  title,
  text,
  placement,
  industry,
}: {
  title: string;
  text: string;
  /** Analytics placement, e.g. "blog_post" or "industry_page". */
  placement: string;
  /** Pre-selects the industry on the free-trial form. */
  industry?: string;
}) {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/#how-it-works";

  return (
    <div className="relative overflow-hidden bg-ink text-white rounded-3xl p-8 md:p-12 text-center">
      <div
        aria-hidden
        className="absolute -top-[70px] -left-[50px] w-[240px] h-[240px] rounded-full animate-floatSlow"
        style={{ background: "radial-gradient(circle, rgba(59,84,244,0.32), transparent 70%)" }}
      />
      <h2 className="relative font-display text-2xl md:text-[34px] leading-[1.15] font-extrabold tracking-[-0.02em] m-0 mb-3">
        {title}
      </h2>
      <p className="relative text-white/65 text-[16px] leading-[1.65] max-w-[560px] mx-auto m-0 mb-7">
        {text}
      </p>
      <div className="relative flex flex-col sm:flex-row justify-center gap-3">
        <TrialButton placement={placement} variant="dark" industry={industry} label="Start my free trial" />
        {siteConfig.demoCallAvailable ? (
          <CallDemoButton placement={placement} variant="ghostDark" />
        ) : (
          <TrackedLink
            href={demoHref}
            event="demo_cta_clicked"
            properties={{ placement }}
            className={buttonClass("ghostDark")}
          >
            {siteConfig.voiceDemoAvailable ? "Try the live demo" : "See how it works"}
          </TrackedLink>
        )}
      </div>
    </div>
  );
}
