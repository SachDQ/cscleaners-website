import Link from "next/link";
import { Briefcase, Sparkles, Play } from "lucide-react";
import type { Metadata } from "next";

/**
 * Focused ad-funnel landing page.
 *
 * - No site header / footer (looks like a standalone brand)
 * - Single video + two CTAs (business or contractor)
 * - Designed to migrate cleanly to a separate brokerage domain
 *   when the brand name is locked in (CleanMatch / CleanLink / etc.).
 *
 * Set NEXT_PUBLIC_FUNNEL_VIDEO_URL to a YouTube / Vimeo embed URL or a /public MP4.
 * Set NEXT_PUBLIC_FUNNEL_BRAND to change the brand wordmark (default: "CleanMatch").
 */

export const metadata: Metadata = {
  title: "Cleaning that matches what your business actually needs",
  description:
    "We match Melbourne businesses with vetted commercial cleaners — and cleaners with the contracts they want. Fixed pricing, written agreements, one accountable contact.",
  alternates: { canonical: "https://cscleaners.com.au/match" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "CleanMatch — Melbourne commercial cleaning, matched",
    description:
      "We match businesses with vetted cleaners — fixed pricing, written agreements, one contact.",
    url: "https://cscleaners.com.au/match",
    type: "website",
  },
};

const BRAND = process.env.NEXT_PUBLIC_FUNNEL_BRAND || "CleanMatch";
const VIDEO_URL = process.env.NEXT_PUBLIC_FUNNEL_VIDEO_URL;

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}
function isVimeo(url: string) {
  return /vimeo\.com/.test(url);
}
function toEmbedUrl(url: string): string {
  if (isYouTube(url)) {
    // Convert watch?v=XX or youtu.be/XX → youtube.com/embed/XX
    const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
  }
  if (isVimeo(url)) {
    const m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}`;
  }
  return url;
}

function VideoFrame() {
  if (!VIDEO_URL) {
    return (
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#03045E] via-[#023E8A] to-[#0077B6] flex items-center justify-center shadow-2xl">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,209,102,0.4), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,180,216,0.4), transparent 50%)"
        }} />
        <div className="relative z-10 flex flex-col items-center text-white">
          <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur flex items-center justify-center mb-4">
            <Play size={28} className="ml-1" fill="white" />
          </div>
          <p className="text-sm font-semibold">Video coming soon</p>
          <p className="text-xs text-white/70 mt-1">90-second explainer of how we match cleaners to contracts</p>
        </div>
      </div>
    );
  }

  if (isYouTube(VIDEO_URL) || isVimeo(VIDEO_URL)) {
    return (
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
        <iframe
          src={toEmbedUrl(VIDEO_URL)}
          title="How CleanMatch works"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  // Local MP4 fallback
  return (
    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl bg-black">
      <video controls preload="metadata" playsInline className="w-full h-full" poster="/images/og-image.png">
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
    </div>
  );
}

export default function MatchPage() {
  return (
    <>
      <main
        className="min-h-screen flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at top, #1A1A2E 0%, #03045E 40%, #000814 100%)",
          color: "white",
        }}
      >
        {/* Top brand bar */}
        <header className="px-6 md:px-10 py-6 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00B4D8, #FFD166)" }}
            >
              <Sparkles size={18} className="text-[#03045E]" />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              {BRAND}
            </span>
          </div>
          <p className="text-xs text-white/50">Melbourne · VIC</p>
        </header>

        {/* Hero with video + 2 CTAs */}
        <section className="flex-1 flex items-center px-6 md:px-10 py-8">
          <div className="max-w-5xl mx-auto w-full">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD166] mb-4">
                Commercial cleaning, matched
              </p>
              <h1
                className="text-4xl md:text-6xl font-bold mb-5 leading-[1.05]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                The right cleaners for your premises.<br />
                <span style={{ color: "#FFD166" }}>The right contracts for your time.</span>
              </h1>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                We match Melbourne businesses with vetted commercial cleaners on transparent fixed pricing — and connect skilled cleaners with the contracts they actually want.
              </p>
            </div>

            <div className="mb-10">
              <VideoFrame />
            </div>

            {/* Two big CTAs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Link
                href="/business"
                className="group p-6 md:p-7 rounded-3xl flex items-center gap-5 transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #FFD166, #FFB627)",
                  color: "#1A1A2E",
                  boxShadow: "0 20px 40px -10px rgba(255, 209, 102, 0.4)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1A1A2E]/15 flex items-center justify-center shrink-0">
                  <Briefcase size={26} />
                </div>
                <div className="text-left flex-1">
                  <div
                    className="font-bold text-lg leading-tight mb-1"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    I need cleaning for my business
                  </div>
                  <div className="text-sm opacity-80">Get a fixed-price quote in 2 minutes</div>
                </div>
                <span className="text-2xl shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/contractor"
                className="group p-6 md:p-7 rounded-3xl flex items-center gap-5 transition-all hover:scale-[1.02] border border-white/15"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #00B4D8, #0077B6)" }}>
                  <Sparkles size={26} />
                </div>
                <div className="text-left flex-1">
                  <div
                    className="font-bold text-lg leading-tight mb-1 text-white"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    I&apos;m a cleaner looking for work
                  </div>
                  <div className="text-sm text-white/70">Join our subcontractor panel</div>
                </div>
                <span className="text-2xl text-white shrink-0 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/50">
              <span>$10M public liability</span>
              <span className="text-white/20">·</span>
              <span>Police-checked cleaners</span>
              <span className="text-white/20">·</span>
              <span>Written agreements</span>
              <span className="text-white/20">·</span>
              <span>Above Award rates for subs</span>
              <span className="text-white/20">·</span>
              <span>Reply within 2 business hours</span>
            </div>
          </div>
        </section>

        {/* Quiet footer */}
        <footer className="px-6 md:px-10 py-8 border-t border-white/10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <p>
              © 2026 {BRAND} — operated by Central Sea Cleaning · Melbourne, VIC · ABN on request
            </p>
            <div className="flex gap-5">
              <Link href="/about" className="hover:text-white/70">About</Link>
              <Link href="/privacy" className="hover:text-white/70">Privacy</Link>
              <Link href="/terms" className="hover:text-white/70">Terms</Link>
              <a href="tel:0404378911" className="hover:text-white/70">0404 378 911</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
