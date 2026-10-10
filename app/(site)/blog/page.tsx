import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { formatPostDate, getAllPosts } from "@/lib/blog";
import { industryGuides } from "@/lib/industryContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Voice AI Guides & News for Small Businesses",
  description:
    "Practical guides and plain-language news on AI receptionists, voice agents, missed calls and Canadian calling rules, from the Vocemi team in Calgary.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-[1080px] mx-auto px-6 md:px-8 pt-14 pb-20 md:pt-20 md:pb-28">
      <Breadcrumbs items={[{ name: "Blog", path: "/blog" }]} />

      <div className="max-w-[720px] mb-12 md:mb-16">
        <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-4">
          Guides & AI news
        </div>
        <h1 className="font-display text-[40px] md:text-[56px] leading-[1.06] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          Voice AI, explained for business owners
        </h1>
        <p className="text-lg leading-[1.65] text-ink/60 m-0">
          Practical guides on answering, booking and follow-up, plus what new
          voice AI releases actually mean for a small business phone line.
        </p>
        <p className="text-lg leading-[1.65] text-ink/60 m-0 mt-4">
          Written for owners and operators of service businesses who are
          evaluating AI receptionists and voice AI.
        </p>
        <p className="text-[15.5px] leading-[1.7] text-ink/70 m-0 mt-4">
          <Link href="/services" className="text-brand hover:text-brand-dark">
            Services
          </Link>
          {" · "}
          <Link
            href="/services/ai-receptionist"
            className="text-brand hover:text-brand-dark"
          >
            AI receptionist
          </Link>
          {" · "}
          <Link
            href="/services/lead-reactivation"
            className="text-brand hover:text-brand-dark"
          >
            Lead reactivation
          </Link>
          {" · "}
          <Link href="/industries" className="text-brand hover:text-brand-dark">
            Industries
          </Link>
          {industryGuides.map((industry) => (
            <span key={industry.slug}>
              {" · "}
              <Link
                href={`/industries/${industry.slug}`}
                className="text-brand hover:text-brand-dark"
              >
                {industry.name}
              </Link>
            </span>
          ))}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white border border-ink/10 rounded-2xl p-7 md:p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(22,24,28,0.18)]"
          >
            <div className="flex items-center gap-3 text-[12.5px] mb-4">
              <span className="bg-brand-tint text-brand-dark font-semibold px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-ink/65">
                {formatPostDate(post.date)} &middot; {post.readingMinutes} min read
              </span>
            </div>
            <h2 className="font-display text-[21px] leading-[1.3] font-bold text-ink m-0 mb-3">
              {post.title}
            </h2>
            <p className="text-[15px] leading-[1.6] text-ink/60 m-0 mb-6">
              {post.description}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
              Read the article
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
