import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Blog posts live in content/blog as Markdown with frontmatter. Adding a post
 * is one new file: the index, sitemap, and structured data all read from here.
 *
 * Required frontmatter: title, description, date (YYYY-MM-DD), category.
 * Optional: updated (YYYY-MM-DD), metaTitle (when the <title> should differ
 * from the on-page headline).
 */

export type BlogCategory = "Guide" | "AI news";

export interface BlogPostMeta {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

const postsDir = path.join(process.cwd(), "content", "blog");

// External links open in a new tab; internal links stay as normal navigation.
const markdown = new Marked({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : "";
      const external = /^https?:\/\//.test(href);
      const rel = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${titleAttr}${rel}>${text}</a>`;
    },
  },
});

function readPost(fileName: string): BlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDir, fileName), "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "description", "date", "category"]) {
    if (!data[field]) {
      throw new Error(`content/blog/${fileName} is missing "${field}"`);
    }
  }

  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle,
    description: data.description,
    // gray-matter parses bare YAML dates into Date objects.
    date: toIsoDate(data.date),
    updated: data.updated ? toIsoDate(data.updated) : undefined,
    category: data.category,
    readingMinutes: Math.max(1, Math.round(words / 230)),
    html: markdown.parse(content, { async: false }) as string,
  };
}

function toIsoDate(value: string | Date) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : value;
}

/** Newest first. */
export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function formatPostDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
