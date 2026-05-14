import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-posts";

export const dynamic = "force-static";

const BASE = "https://cscleaners.com.au";

const SERVICES = [
  "residential-cleaning",
  "deep-cleaning",
  "end-of-lease-cleaning",
  "commercial-cleaning",
  "builders-cleaning",
  "specialist-cleaning",
];

const SUBURBS = [
  "thomastown","brunswick","richmond","carlton","st-kilda","doncaster",
  "ringwood","frankston","dandenong","footscray","fitzroy","collingwood",
  "south-yarra","prahran","hawthorn","glen-waverley","box-hill","moorabbin",
  "essendon","coburg","heidelberg","balwyn","glen-iris","camberwell",
  "nunawading","craigieburn","point-cook","werribee","sunshine","melton",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about/`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/quote/`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/faq/`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog/`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/locations/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy/`, lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms/`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const suburbPages: MetadataRoute.Sitemap = SUBURBS.map((s) => ({
    url: `${BASE}/locations/${s}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...suburbPages];
}
