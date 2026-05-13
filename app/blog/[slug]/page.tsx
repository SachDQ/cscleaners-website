import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="pt-32 pb-16"
          style={{
            background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)",
          }}
        >
          <div className="container mx-auto px-6 max-w-4xl text-white">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "#FFD166", color: "#1A1A2E" }}
              >
                {post.category}
              </span>
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime} read
              </span>
            </div>
          </div>
        </section>

        {/* Hero image */}
        {post.image && (
          <div className="w-full" style={{ background: "#0077B6" }}>
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="relative w-full h-56 md:h-80 rounded-b-3xl overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-16" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Article */}
              <article className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
                <style>{`
                  .prose-content p { margin-bottom: 1rem; color: #374151; line-height: 1.75; }
                  .prose-content p.lead { font-size: 1.125rem; color: #1A1A2E; font-weight: 500; margin-bottom: 1.5rem; }
                  .prose-content h2 { font-family: var(--font-syne), sans-serif; font-size: 1.4rem; font-weight: 700; color: #1A1A2E; margin-top: 2rem; margin-bottom: 0.75rem; }
                  .prose-content h3 { font-family: var(--font-syne), sans-serif; font-size: 1.1rem; font-weight: 700; color: #1A1A2E; margin-top: 1.5rem; margin-bottom: 0.5rem; }
                  .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin-bottom: 1rem; color: #374151; }
                  .prose-content li { margin-bottom: 0.4rem; line-height: 1.7; }
                  .prose-content ul li { list-style-type: disc; }
                  .prose-content ol li { list-style-type: decimal; }
                  .prose-content strong { color: #1A1A2E; font-weight: 600; }
                `}</style>
                <div
                  className="prose-content"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </article>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* CTA */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3
                    className="font-bold text-[#1A1A2E] mb-2"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    Get a Free Quote
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Fixed price in under 60 seconds. No phone calls required.
                  </p>
                  <Link
                    href="/quote"
                    className="btn btn-primary w-full justify-center text-sm"
                  >
                    Get My Price <ArrowRight size={13} />
                  </Link>
                </div>

                {/* More posts */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <h3
                    className="font-bold text-[#1A1A2E] mb-4"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    More Articles
                  </h3>
                  <div className="space-y-4">
                    {otherPosts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="block group"
                      >
                        <p className="text-sm font-semibold text-[#1A1A2E] group-hover:text-[#0077B6] transition-colors leading-snug">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {p.readTime} read · {p.category}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
