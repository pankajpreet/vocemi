import Link from "next/link";

/**
 * Deliberately not the site Navbar: its links are homepage hash anchors that
 * do nothing from /start. A landing page reached by QR wants one mark and no
 * exits — the persistent actions live in the sticky bar instead.
 */
export default function StartHeader() {
  return (
    <header className="border-b border-ink/10 bg-cream">
      <div className="max-w-[860px] mx-auto px-6 flex items-center py-4">
        {/* The mark is the way back to the main site — no separate text link. */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-extrabold text-lg tracking-tight text-ink hover:opacity-80 transition-opacity"
        >
          <span className="w-7 h-7 rounded-lg bg-brand inline-flex items-center justify-center flex-shrink-0">
            <span className="w-[9px] h-[9px] rounded-full bg-white" />
          </span>
          Vocemi
        </Link>
      </div>
    </header>
  );
}
