import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function StartFooter() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      {/* Bottom padding clears the sticky mobile action bar. */}
      <div className="max-w-[860px] mx-auto px-6 py-9 pb-28 md:pb-9">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-display font-extrabold text-base text-ink mb-2.5 hover:opacity-80 transition-opacity"
        >
          <span className="w-6 h-6 rounded-md bg-brand inline-flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white" />
          </span>
          Vocemi
        </Link>
        <p className="text-[13.5px] text-ink/50 m-0 mb-4">
          AI voice agents &amp; business automation &middot;{" "}
          {siteConfig.location}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink/45">
          <Link href="/privacy" className="hover:text-brand transition-colors">
            Privacy
          </Link>
          <span>
            &copy; {new Date().getFullYear()} Vocemi. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
