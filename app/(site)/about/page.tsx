import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

const founder = siteConfig.founder;

export const metadata: Metadata = pageMetadata({
  title: "About Vocemi & Founder Pankajpreet Singh",
  description:
    "Meet Pankajpreet Singh and learn how Calgary-based Vocemi approaches Voice AI workflows, human approval, and measurable implementation.",
  path: "/about",
  socialDescription:
    "Meet the founder and learn how Vocemi approaches practical Voice AI workflows with clear human boundaries.",
  image: {
    url: founder.image,
    width: 800,
    height: 800,
    alt: "Pankajpreet Singh, founder of Vocemi",
  },
});

const expertise = [
  "Backend development",
  "Software architecture",
  "Test-driven development",
  "Java",
  "Go",
  "Python",
  "Kubernetes",
  "Docker",
  "Cloud deployment",
];

// What the founder is known for, for search engines. Leads with the Voice AI
// work Vocemi does; the individual languages and tools stay in the visible
// engineering-background chips rather than defining his expertise.
const knowsAbout = [
  "Voice AI",
  "Conversational AI",
  "AI receptionists",
  "Call automation",
  "Lead qualification",
  "Software architecture",
  "Backend development",
  "Cloud deployment",
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: founder.name,
  jobTitle: founder.role,
  image: `${siteConfig.url}${founder.image}`,
  sameAs: [founder.linkedin],
  knowsAbout,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Punjab Technical University",
  },
  worksFor: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

const principles = [
  {
    number: "01",
    title: "Start with one workflow",
    text: "Choose a repeatable call process with a clear beginning, handoff, and finish line.",
  },
  {
    number: "02",
    title: "Define human boundaries",
    text: "Pricing exceptions, unusual requests, and judgment calls wait for an approved person.",
  },
  {
    number: "03",
    title: "Show the real system",
    text: "Use live demonstrations, visible formulas, and labelled examples instead of invented performance claims.",
  },
];

export default function AboutPage() {
  const demoHref = siteConfig.voiceDemoAvailable ? "/start#talk" : "/start";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main>
        <section className="max-w-[1080px] mx-auto px-6 md:px-8 py-14 md:py-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="max-w-[520px]">
            <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
              About Vocemi
            </div>
            <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-6">
              Practical Voice AI, with people kept in control
            </h1>
            <p className="text-lg leading-[1.7] text-ink/60 m-0 mb-5">
              Vocemi is a Calgary-based Voice AI business focused on the
              repeatable work around customer calls: answering, qualification,
              booking, follow-up, and clear reporting.
            </p>
            <p className="text-[16px] leading-[1.7] text-ink/60 m-0">
              The approach is simple: agree on the workflow and its limits
              before launch, automate only the approved path, and send
              exceptions back to a person.
            </p>
          </div>

          <div className="bg-sand rounded-3xl p-5 md:p-7">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#BB866B]">
              <Image
                src={founder.image}
                alt="Pankajpreet Singh, founder of Vocemi"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-5">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-ink m-0 mb-1">
                  {founder.name}
                </h2>
                <p className="text-sm text-ink/50 m-0">
                  {founder.role}, Vocemi &middot; {siteConfig.location}
                </p>
              </div>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
              >
                LinkedIn
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-[1080px] mx-auto px-6 md:px-8 pb-16 md:pb-24">
          <div className="border-t border-ink/10 pt-12 md:pt-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-16">
            <div>
              <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
                Engineering background
              </div>
              <h2 className="font-display text-3xl md:text-[42px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0">
                Built by an experienced software engineer
              </h2>
            </div>
            <div>
              <p className="text-[16px] leading-[1.75] text-ink/60 m-0 mb-5">
                Pankajpreet is a Senior Developer at Arctic Wolf with a
                professional background in software development, architecture,
                and agile delivery. Previous engineering roles include Flipp,
                Digital14, Metapack, and freelance software development.
              </p>
              <p className="text-[16px] leading-[1.75] text-ink/60 m-0 mb-7">
                He holds a B.Tech in Computer Science and Engineering from
                Punjab Technical University. His listed technical experience
                includes backend development, test-driven development,
                containers, and cloud deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span
                    key={skill}
                    className="bg-brand-tint text-brand-dark px-3 py-1.5 rounded-full text-[13px] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-sand py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto px-6 md:px-8">
            <div className="max-w-[680px] mb-10">
              <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
                How Vocemi works
              </div>
              <h2 className="font-display text-3xl md:text-[42px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0">
                Clear scope before clever technology
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="bg-white border border-ink/10 rounded-2xl p-7"
                >
                  <div className="font-display font-extrabold text-brand text-sm mb-5">
                    {principle.number}
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink m-0 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-ink/60 m-0">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-[900px] mx-auto px-6 md:px-8 py-16 md:py-24 text-center">
          <h2 className="font-display text-3xl md:text-[42px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink m-0 mb-4">
            See the workflow before deciding
          </h2>
          <p className="text-[16.5px] leading-[1.65] text-ink/60 max-w-[620px] mx-auto mb-8">
            Try the demonstration or book a short call to map one repeatable
            workflow in your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <TrackedLink
              href={demoHref}
              event="demo_cta_clicked"
              properties={{ placement: "about_final_cta" }}
              className="inline-flex items-center justify-center gap-2 bg-brand text-white px-6 py-3.5 rounded-[9px] font-semibold hover:bg-brand-dark transition-colors"
            >
              {siteConfig.voiceDemoAvailable
                ? "Try the live demo"
                : "See how it works"}
              <ArrowRight size={17} />
            </TrackedLink>
            <TrackedLink
              href={siteConfig.bookCallUrl}
              event="book_call_clicked"
              properties={{ placement: "about_final_cta" }}
              external
              className="inline-flex items-center justify-center border border-ink/15 text-ink px-6 py-3.5 rounded-[9px] font-semibold hover:border-ink/35 transition-colors"
            >
              Book a free call
            </TrackedLink>
          </div>
        </section>
      </main>
    </>
  );
}
