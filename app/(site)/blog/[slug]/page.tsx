import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCta from "@/components/ContentCta";
import { ArticleStructuredData } from "@/components/StructuredData";
import { formatPostDate, getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

interface BlogPostPageProps {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const metadata = pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [siteConfig.founder.name],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const founder = siteConfig.founder;
  const related = getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        path={path}
        datePublished={post.date}
        dateModified={post.updated}
      />

      <article className="max-w-[760px] mx-auto px-6 md:px-8 pt-14 pb-16 md:pt-20">
        <Breadcrumbs
          items={[
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]}
        />

        <div className="flex items-center gap-3 text-[13px] mb-5">
          <span className="bg-brand-tint text-brand-dark font-semibold px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-ink/65">{post.readingMinutes} min read</span>
        </div>

        <h1 className="font-display text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.025em] font-extrabold text-ink m-0 mb-5">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl leading-[1.6] text-ink/60 m-0 mb-8">
          {post.description}
        </p>

        <div className="flex items-center gap-3 pb-8 mb-10 border-b border-ink/10">
          <Image
            src={founder.image}
            alt={founder.name}
            width={44}
            height={44}
            className="rounded-full object-cover bg-[#BB866B]"
          />
          <div className="text-[14px] leading-[1.45]">
            <Link href="/about" className="font-semibold text-ink hover:text-brand transition-colors">
              {founder.name}
            </Link>
            <div className="text-ink/65">
              {founder.role}, Vocemi &middot;{" "}
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              {post.updated && post.updated !== post.date && (
                <>
                  {" "}&middot; Updated{" "}
                  <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <section className="max-w-[1080px] mx-auto px-6 md:px-8 pb-16 md:pb-24">
        <ContentCta
          title="Hear it on a real call"
          text="The quickest way to judge voice AI is to talk to it. Try the demo, or book a short call to look at your own call patterns."
          placement="blog_post"
        />

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-extrabold text-ink m-0 mb-6">
              Keep reading
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="block bg-white border border-ink/10 rounded-2xl p-6 hover:border-brand/40 transition-colors"
                >
                  <div className="text-[12.5px] text-ink/65 mb-2">{other.category}</div>
                  <div className="font-display text-[18px] leading-[1.35] font-bold text-ink">
                    {other.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
