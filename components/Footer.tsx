import { siteConfig } from "@/lib/config";
import TrackedLink from "@/components/start/TrackedLink";
import NapLine, { ProfileLinks } from "@/components/NapLine";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Lead reactivation", href: "/services/lead-reactivation" },
  { label: "Data & privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 pt-14 pb-28 lg:pb-10 bg-cream">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <div className="flex items-center gap-2.5 font-display font-extrabold text-lg text-ink mb-3">
          <span className="w-6 h-6 rounded-md bg-brand inline-flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white" />
          </span>
          Vocemi
        </div>
        <p className="text-[15px] text-ink/75 m-0 mb-6">
          Based in Calgary · Serving Canada &amp; the US
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink/75 hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <NapLine
          emailPlacement="footer"
          className="text-[14.5px] leading-relaxed text-ink/75 m-0 mb-3"
          linkClassName="text-ink/75 hover:text-brand transition-colors"
        />
        <ProfileLinks
          className="flex flex-wrap gap-x-5 gap-y-2 text-[14.5px] mb-6"
          linkClassName="text-ink/75 hover:text-brand transition-colors"
        />
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink/65">
          <span>&copy; {currentYear} Vocemi. All rights reserved.</span>
          <a href="/privacy" className="hover:text-brand">
            Privacy
          </a>
          <a href="/security" className="hover:text-brand">
            Security
          </a>
          <TrackedLink
            href={siteConfig.bookCallUrl("footer")}
            event="book_call_clicked"
            properties={{ placement: "footer" }}
            external
            className="hover:text-brand"
          >
            Book a call
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
