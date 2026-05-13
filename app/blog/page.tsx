import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Tips & Guides",
  description: "Expert cleaning tips, end-of-lease guides, and home care advice from the Central Sea Cleaning team in Melbourne.",
};

const posts = [
  { slug: "end-of-lease-cleaning-checklist-melbourne", title: "The Complete End-of-Lease Cleaning Checklist (Melbourne 2025)", excerpt: "Everything you need to know to get your full bond back — room by room, based on the REIV inspection standard.", category: "Bond Cleaning", date: "May 2025", readTime: "6 min" },
  { slug: "how-to-choose-a-cleaning-service-melbourne", title: "How to Choose a Cleaning Service in Melbourne (Without Getting Burned)", excerpt: "The 7 questions you should ask before booking any cleaner. Protect yourself from no-shows, price hikes and hidden fees.", category: "Guides", date: "April 2025", readTime: "5 min" },
  { slug: "eco-cleaning-products-safe-kids-pets", title: "Are Your Cleaning Products Safe for Kids and Pets?", excerpt: "What to look for on labels, which chemicals to avoid, and why we switched to eco-friendly products across our entire service.", category: "Eco Cleaning", date: "April 2025", readTime: "4 min" },
  { slug: "how-often-should-i-clean-my-home", title: "How Often Should You Really Clean Your Home?", excerpt: "A practical room-by-room schedule — what needs weekly attention, what can wait, and what most people forget entirely.", category: "Home Tips", date: "March 2025", readTime: "4 min" },
  { slug: "carpet-cleaning-melbourne-guide", title: "Carpet Steam Cleaning in Melbourne: What to Expect", excerpt: "How professional carpet cleaning works, how long it takes to dry, and why it matters for your bond return.", category: "Specialist Cleaning", date: "March 2025", readTime: "5 min" },
  { slug: "office-cleaning-melbourne-checklist", title: "The Office Cleaning Checklist Every Melbourne Business Needs", excerpt: "A clean office isn't just aesthetic — it affects productivity, health and the impression you make on clients.", category: "Commercial", date: "February 2025", readTime: "4 min" },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-6xl text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Cleaning Tips & Guides</h1>
            <p className="text-lg text-white/80">Expert advice from the Central Sea Cleaning team.</p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="h-44 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}>
                    <span className="text-4xl">🧹</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#FFD166", color: "#1A1A2E" }}>{post.category}</span>
                      <span className="text-xs text-gray-400">{post.readTime} read</span>
                    </div>
                    <h2 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#0077B6] transition-colors" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{post.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{post.date}</span>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-[#0077B6] group-hover:translate-x-1 transition-all" />
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
