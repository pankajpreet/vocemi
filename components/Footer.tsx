import { siteConfig } from "@/lib/config";

const exploreLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Services", href: "/#services" },
  { label: "ROI Calculator", href: "/#calculator" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 pt-14 pb-10 bg-cream">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-2.5 font-display font-extrabold text-lg text-ink mb-3.5">
            <span className="w-6 h-6 rounded-md bg-brand inline-flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white" />
            </span>
            Vocemi
          </div>
          <p className="text-sm text-ink/55 leading-relaxed max-w-xs">
            Empowering businesses through voice AI &mdash; intelligent, always-on customer interactions.
          </p>
        </div>

        <div>
          <div className="text-[12.5px] font-bold uppercase tracking-wider text-ink/40 mb-3.5">
            Explore
          </div>
          <div className="flex flex-col gap-2.5 text-[14.5px]">
            {exploreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-ink/70 hover:text-brand transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[12.5px] font-bold uppercase tracking-wider text-ink/40 mb-3.5">
            Contact
          </div>
          <div className="flex flex-col gap-2.5 text-[14.5px]">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-ink/70 hover:text-brand transition-colors"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={siteConfig.bookCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 hover:text-brand transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto mt-9 px-6 md:px-8 pt-6 border-t border-ink/10 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink/40">
        <span>&copy; {currentYear} Vocemi. All rights reserved.</span>
        <a href="/privacy" className="hover:text-brand transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}
