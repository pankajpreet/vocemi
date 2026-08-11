import Link from "next/link";

/**
 * Deliberately not the site Navbar: its links are homepage hash anchors that
 * do nothing from /start. A landing page reached by QR wants one mark and no
 * exits — the persistent actions live in the sticky bar instead.
 */
export default function StartHeader() {
  return (
    <header className="border-b border-ink/10 bg-cream">
      <div className="max-w-[860px] mx-auto px-6 flex items-center justify-between py-4">
        <span className="flex items-center gap-2.5 font-display font-extrabold text-lg tracking-tight text-ink">
          <span className="w-7 h-7 rounded-lg bg-brand inline-flex items-center justify-center flex-shrink-0">
            <span className="w-[9px] h-[9px] rounded-full bg-white" />
          </span>
          Vocemi
        </span>
        <Link
          href="/"
          className="text-[13.5px] font-medium text-ink/50 hover:text-brand transition-colors"
        >
          vocemi.com
        </Link>
      </div>
    </header>
  );
}
