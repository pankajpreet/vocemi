"use client";

import Link from "next/link";
import CallDemoLink from "./CallDemoLink";
import { btnPrimary, btnSecondary } from "./styles";

export default function SiteStickyCta() {
  return (
    <nav
      aria-label="Get started"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-ink/10 bg-cream/95 backdrop-blur-[10px] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex gap-2.5 max-w-[1180px] mx-auto">
        <CallDemoLink
          placement="sticky_mobile"
          label="hear"
          className={`${btnSecondary} flex-1 min-w-0 px-3`}
        />
        <Link href="/free-trial" className={`${btnPrimary} flex-1 min-w-0 px-3`}>
          Start free trial
        </Link>
      </div>
    </nav>
  );
}
