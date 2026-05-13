import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides",
  description:
    "Expert cleaning tips, end-of-lease guides, and home care advice from the Central Sea Cleaning team in Melbourne.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main>
        <section
          className="pt-32 pb-16"
          style={{
            background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)",
          }}
        >
          <div className="container mx-auto px-6 max-w-6xl text-white text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Cleaning Tips &amp; Guides
            </h1>
            <p className="text-lg text-white/80">
              Expert advice from the Central Sea Cleaning team.
            </p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {post.image ? (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-44 flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}
                    >
                      <span className="text-4xl">🧹</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: "#FFD166", color: "#1A1A2E" }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {post.readTime} read
                      </span>
                    </div>
                    <h2
                      className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#0077B6] transition-colors"
                      style={{ fontFamily: "var(--font-syne), sans-serif" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.date}</span>
                      <ArrowRight
                        size={14}
                        className="text-gray-300 group-hover:text-[#0077B6] group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
