import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FreeTrialContent from "@/components/FreeTrialContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Start Your Free AI Receptionist Trial: 14 Days, No Card | Vocemi",
  absoluteTitle: true,
  description:
    "Sign up for a free 14-day AI receptionist trial (30 days for HVAC & plumbing). No card, no login. We build it for you and it's live in 7 days.",
  path: "/free-trial",
});

export default function FreeTrialPage() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -left-40 w-[600px] h-[600px] rounded-full animate-floatSlow"
        style={{ background: "radial-gradient(circle, rgba(59,84,244,0.12), transparent 65%)" }}
      />
      <div className="relative max-w-[1180px] mx-auto px-6 md:px-8 pt-10 pb-20 md:pt-14 md:pb-28">
        <Breadcrumbs items={[{ name: "Free trial", path: "/free-trial" }]} />
        <FreeTrialContent />
      </div>
    </section>
  );
}
