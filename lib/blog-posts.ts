import fs from "fs";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  htmlContent: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".json"));
  const posts = files.map((f) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, f), "utf-8");
    return JSON.parse(raw) as BlogPost;
  });
  // Sort by date descending (newest first)
  return posts.sort((a, b) => {
    const months: Record<string, number> = {
      January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
      July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
    };
    const parseDate = (d: string) => {
      const parts = d.split(" ");
      const month = months[parts[0]] ?? 0;
      const year = parseInt(parts[1] ?? "0");
      return year * 100 + month;
    };
    return parseDate(b.date) - parseDate(a.date);
  });
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
