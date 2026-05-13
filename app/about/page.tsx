import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Shield, Leaf, Award, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the Central Sea Cleaning team. Melbourne's trusted cleaning company — police-checked, eco-friendly, fully insured. Serving all Melbourne suburbs since 2019.",
  alternates: { canonical: "https://cscleaners.com.au/about" },
};

const values = [
  { icon: Shield, title: "Trust First", desc: "Every cleaner is police-checked and in-person interviewed before their first job. You're inviting someone into your home — we take that seriously." },
  { icon: Leaf, title: "Eco Committed", desc: "We use non-toxic, biodegradable cleaning products across all services. Safe for your family, your pets, and the environment." },
  { icon: Award, title: "Guaranteed Work", desc: "We don't consider a job done until you're satisfied. Every clean comes with our written re-clean guarantee." },
];

const stats = [
  { value: "500+", label: "Happy clients" },
  { value: "30", label: "Melbourne suburbs" },
  { value: "4.9★", label: "Average rating" },
  { value: "7 days", label: "Available" },
];

const team = [
  {
    name: "Marcus Chen",
    role: "Founder & Operations",
    bio: "Marcus started Central Sea after years in hospitality — obsessed with the idea that service should mean something. He personally interviews every cleaner before they join the team.",
    initial: "MC",
  },
  {
    name: "Priya Nair",
    role: "Client Experience Lead",
    bio: "Priya handles scheduling, client feedback, and quality assurance. If something isn't right, she finds out why and fixes it — usually before the client has to ask.",
    initial: "PN",
  },
  {
    name: "Jordan Walsh",
    role: "Head of Training",
    bio: "Jordan developed our cleaning methodology and trains all new team members. Fifteen years in commercial and residential cleaning; obsessive about the details.",
    initial: "JW",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://cscleaners.com.au/about",
  url: "https://cscleaners.com.au/about",
  name: "About Central Sea Cleaning",
  description: "Melbourne cleaning company — police-checked, eco-friendly, fully insured.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://cscleaners.com.au/#business",
    name: "Central Sea Cleaning",
    foundingDate: "2019",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 30 },
    areaServed: { "@type": "State", name: "Victoria" },
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 70%, #00B4D8 100%)" }}>
          <div className="container mx-auto px-6 max-w-6xl text-white text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#90E0EF] mb-3">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              We&apos;re Central Sea Cleaning
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Melbourne&apos;s friendliest cleaning company — built on transparency, trust, and genuinely excellent work.
            </p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {stats.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <p className="text-3xl font-bold text-[#0077B6] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                    {s.value}
                  </p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-5 text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                  Why We Started
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>Central Sea Cleaning was founded by people who were tired of cleaning companies that overpromised and underdelivered — hidden charges on arrival, inconsistent cleaners, vague guarantees that meant nothing when something went wrong.</p>
                  <p>We built something different. Transparent fixed prices you can get online in 60 seconds. A dedicated cleaner who gets to know your home. A guarantee that&apos;s written down, not just said.</p>
                  <p>Today we serve hundreds of homes and businesses across all Melbourne suburbs — from Thomastown to St Kilda, Doncaster to Footscray. Every job, every time, to the standard we&apos;d want in our own home.</p>
                </div>
                <div className="mt-8">
                  <Link href="/quote" className="btn btn-primary">Get a Quote <ArrowRight size={14} /></Link>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="/images/11_team_photo.png" alt="Central Sea Cleaning team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-center text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-3xl p-8 shadow-sm text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}>
                    <v.icon size={26} className="text-[#0077B6]" />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Meet the Team
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Small enough to know your name, experienced enough to do the job right.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="bg-[#F8F9FA] rounded-3xl p-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-5"
                    style={{ background: "linear-gradient(135deg, #023E8A, #0077B6)" }}
                  >
                    {member.initial}
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0077B6] uppercase tracking-wide mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our cleaners / hiring standards */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="/images/10_cleaner_portrait.png" alt="Central Sea Cleaning professional" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-5 text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>How We Hire</h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Every Central Sea cleaner is personally interviewed, police-checked, and trained before they step foot in a client&apos;s home. We don&apos;t hire from a pool — we build a team.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "National Police Check before first assignment",
                    "In-person interview and reference verification",
                    "Structured training on our cleaning methodology",
                    "Ongoing quality reviews after every job",
                    "Public liability insured ($10M+)",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle size={16} className="text-[#0077B6] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews strip */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[1,2,3,4,5].map((i) => <Star key={i} size={20} className="text-[#FFD166]" fill="#FFD166" />)}
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              4.9 out of 5
            </p>
            <p className="text-gray-500 text-sm">Based on 127 verified reviews across Google and Facebook</p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #1A1A2E, #0077B6)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-center text-white">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Ready to meet your cleaner?
            </h2>
            <p className="text-white/75 mb-7">Get a fixed-price quote in 60 seconds. No calls, no surprises.</p>
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">
              Get My Quote <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
