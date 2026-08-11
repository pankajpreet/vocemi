import { Mail, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import Reveal from "@/components/home/Reveal";
import TrackedLink from "./TrackedLink";

export default function StartCta() {
  const { phone, email } = siteConfig.contact;

  return (
    <section className="max-w-[860px] mx-auto px-6 py-14 md:py-20">
      <Reveal>
        <div className="bg-ink rounded-3xl p-8 md:p-14 text-center relative overflow-hidden">
          <div
            className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full animate-floatSlow"
            style={{
              background:
                "radial-gradient(circle, rgba(59,84,244,0.35), transparent 70%)",
            }}
          />
          <h2 className="font-display text-[28px] md:text-[42px] font-extrabold tracking-[-0.025em] text-white m-0 mb-3.5 relative">
            Ready to stop missing calls?
          </h2>
          <p className="text-[16px] md:text-[16.5px] text-white/60 leading-[1.6] m-0 mb-8 relative max-w-[440px] mx-auto">
            Book a free 15-minute assessment. We&apos;ll map the first workflow
            worth automating in your business &mdash; no charge, no pitch deck.
          </p>
          <TrackedLink
            href={siteConfig.bookCallUrl}
            event="book_call_clicked"
            external
            className="relative inline-block bg-brand text-white px-[30px] py-4 rounded-[9px] font-semibold text-[15.5px] hover:bg-[#5A70FF] transition-colors"
          >
            Book a free assessment
          </TrackedLink>

          {siteConfig.leadFormUrl && (
            <div className="relative mt-5">
              <TrackedLink
                href={siteConfig.leadFormUrl}
                event="lead_form_opened"
                external
                className="text-white/50 text-[14px] underline underline-offset-4 hover:text-white/80 transition-colors"
              >
                Not ready to book? Tell us what you&apos;d automate
              </TrackedLink>
            </div>
          )}
        </div>
      </Reveal>

      {/* Direct contact — the low-friction path for someone with one question. */}
      <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
        {phone && (
          <>
            <TrackedLink
              href={`tel:${phone}`}
              event="tap_to_call"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] text-[15px] font-semibold hover:border-ink/35 transition-colors"
            >
              <Phone size={17} />
              Call us
            </TrackedLink>
            <TrackedLink
              href={`sms:${phone}`}
              event="tap_to_text"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] text-[15px] font-semibold hover:border-ink/35 transition-colors"
            >
              <MessageSquare size={17} />
              Text us
            </TrackedLink>
          </>
        )}
        <a
          href={`mailto:${email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] text-[15px] font-semibold hover:border-ink/35 transition-colors"
        >
          <Mail size={17} />
          {email}
        </a>
      </div>

      <div className="mt-5 text-center">
        <TrackedLink
          href="/pankajpreet-vocemi.vcf"
          event="save_contact"
          className="text-[13.5px] text-ink/45 hover:text-brand transition-colors"
        >
          Save our contact card
        </TrackedLink>
      </div>
    </section>
  );
}
