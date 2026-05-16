import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessLeadForm from "@/components/BusinessLeadForm";
import { CheckCircle, Phone, ArrowRight, Shield, FileText, Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Cleaning Melbourne | Fixed-Price Quotes from CS Cleaners",
  description:
    "Commercial cleaning across Melbourne — offices, medical, childcare, body corporate. Performed by our team and qualified subcontractors. Fully insured, transparent pricing, fixed monthly fee with no surprise charges.",
  alternates: { canonical: "https://cscleaners.com.au/business" },
  openGraph: {
    title: "Commercial Cleaning Melbourne — CS Cleaners",
    description:
      "Commercial cleaning for Melbourne businesses. Insured, transparent pricing, fixed monthly fee. Get a quote in two minutes.",
    url: "https://cscleaners.com.au/business",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial Cleaning Melbourne",
  description:
    "CS Cleaners delivers commercial cleaning services across Melbourne, performed directly by our team and qualified subcontractors. Fully insured, transparent fixed pricing.",
  provider: {
    "@type": "LocalBusiness",
    name: "Central Sea Cleaning",
    url: "https://cscleaners.com.au",
    telephone: "+61404378911",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
  },
  areaServed: { "@type": "State", name: "Victoria" },
  serviceType: "Commercial cleaning",
  audience: { "@type": "BusinessAudience", audienceType: "Businesses" },
};

const TRUST_BULLETS = [
  { icon: Shield, label: "Public liability insurance", sub: "$10M cover on every job" },
  { icon: FileText, label: "Written service agreement", sub: "Clear scope, no surprises" },
  { icon: Clock, label: "Reply within 2 hours", sub: "Real human, every time" },
  { icon: MapPin, label: "Northern & inner Melbourne", sub: "Expanding by suburb, not by promise" },
];

const PREMISES = [
  { emoji: "🏢", label: "Offices", desc: "Open-plan, executive suites, co-working, meeting rooms" },
  { emoji: "🩺", label: "Medical & dental", desc: "Practices, allied health, day surgeries" },
  { emoji: "🎒", label: "Childcare & schools", desc: "Daily disinfection, WWCC-cleared cleaners" },
  { emoji: "💪", label: "Gyms & fitness", desc: "High-touch sanitisation, change rooms, mats" },
  { emoji: "🛍️", label: "Retail", desc: "Strip presentations, end-of-trade, after-hours" },
  { emoji: "🏘️", label: "Body corporate / strata", desc: "Common areas, lobbies, lifts, carparks" },
];

const HOW_WE_WORK = [
  {
    n: "01",
    title: "Free site walk-through",
    body: "We meet you on site for 10–15 minutes to scope the job properly. No quote goes out without eyes on the premises for contracts above $1,000/month.",
  },
  {
    n: "02",
    title: "Fixed-price written proposal",
    body: "You receive a written proposal within 48 hours: scope by area, frequency, inclusions and exclusions, insurance reps, GST, payment terms. No surprise charges.",
  },
  {
    n: "03",
    title: "We perform the work",
    body: "Cleans are performed by our team and qualified subcontractors engaged on signed agreements. You always deal with us — one point of contact, one invoice.",
  },
  {
    n: "04",
    title: "You can audit anytime",
    body: "Photo completion reports on request, a clear escalation path, and a written quality guarantee. If anything is missed, we re-clean within 48 hours at no charge.",
  },
];

const FAQS = [
  {
    q: "Do you use your own cleaners or subcontractors?",
    a: "Both. CS Cleaners performs work directly with our team and engages qualified subcontractors when a contract calls for additional capacity or specialist skills. Every subcontractor we engage is on a signed sub-contractor agreement with insurance, police check and a clear scope. You always invoice and deal with us.",
  },
  {
    q: "What does your pricing look like?",
    a: "A fixed monthly fee based on scope, frequency and square metres. We provide a written breakdown so you can compare against your current arrangement. Consumables and equipment are included unless explicitly excluded. GST is shown separately.",
  },
  {
    q: "What's your minimum contract size?",
    a: "We don't take contracts below $300 per month — the admin overhead outweighs the value for both sides. Typical commercial contracts start around $600/month for weekly office cleans of 200–400 sqm.",
  },
  {
    q: "How do you handle contract changes or cancellations?",
    a: "Our standard agreement is month-to-month with 30 days written notice on either side after the first 3 months. No lock-ins, no auto-rollover into multi-year terms. Scope changes are repriced in writing and never automatic.",
  },
  {
    q: "Are you insured?",
    a: "Yes. $10M public liability is held with a major Australian insurer, with a current Certificate of Currency available on request. WorkSafe Victoria coverage applies to every worker performing services under our contracts.",
  },
  {
    q: "Are you on government supplier panels?",
    a: "We are registered on standard supplier portals (Buying for Victoria, VendorPanel, TenderLink) and bid on local council and small NFP tenders. For large state tenders requiring multi-year trading history we partner with established head contractors.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BusinessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative pt-32 pb-20 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #023E8A 60%, #0077B6 100%)" }}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                  style={{ background: "rgba(255,209,102,0.2)", color: "#FFD166" }}
                >
                  For businesses · Melbourne
                </div>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  Commercial cleaning that&apos;s actually accountable.
                </h1>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  CS Cleaners delivers commercial cleaning across Melbourne — performed directly by our team and qualified subcontractors. Fully insured. Transparent fixed pricing. One contact, one invoice, no surprises.
                </p>
                <div className="flex flex-wrap gap-4 mb-7">
                  <a href="#quote" className="btn btn-primary">Get a quote in 2 minutes <ArrowRight size={14} /></a>
                  <a href="tel:0404378911" className="btn btn-secondary">
                    <Phone size={14} /> 0404 378 911
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {TRUST_BULLETS.map((t) => (
                    <div key={t.label} className="flex items-start gap-2.5">
                      <t.icon size={18} className="shrink-0 mt-0.5 text-[#FFD166]" />
                      <div>
                        <div className="text-sm font-semibold">{t.label}</div>
                        <div className="text-xs text-white/60">{t.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="quote">
                <BusinessLeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Premises types */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                What we clean
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Premises we&apos;re set up for
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PREMISES.map((p) => (
                <div key={p.label} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{p.emoji}</div>
                  <h3
                    className="font-bold text-[#1A1A2E] mb-1"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {p.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                How we work
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Four steps from enquiry to first clean
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {HOW_WE_WORK.map((s) => (
                <div key={s.n} className="bg-white p-7 rounded-2xl shadow-sm">
                  <div
                    className="text-4xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne), sans-serif", color: "#0077B6" }}
                  >
                    {s.n}
                  </div>
                  <h3
                    className="font-bold text-lg text-[#1A1A2E] mb-2"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The honest pitch — explains the head-contractor model in plain English */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="rounded-3xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-5"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Why work with a head contractor instead of a chain?
              </h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> You get a real local operator named on every email, not a call-centre.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Same cleaner each visit wherever possible — they learn your premises.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> We bring specialist subcontractors (medical, builders, carpet steam) when the contract calls for it — without you needing to manage them.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> One invoice, one signed agreement, one accountable contact. No multi-vendor admin.</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Transparent fixed monthly fee — you know what you pay before signing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                Common questions
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Things facilities managers ask
              </h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((f) => (
                <div key={f.q} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3
                    className="font-bold text-[#1A1A2E] mb-2 text-base"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {f.q}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #1A1A2E, #0077B6)" }}>
          <div className="container mx-auto px-6 max-w-3xl text-center text-white">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Ready to compare us against your current cleaner?
            </h2>
            <p className="text-white/75 mb-7 max-w-xl mx-auto">
              Get a written fixed-price proposal within 48 hours. No obligation, no lock-in.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#quote" className="btn btn-primary text-base px-8 py-4">
                Start the quote <ArrowRight size={16} />
              </Link>
              <Link href="/contractor" className="text-white/80 underline self-center text-sm">
                Looking to work with us as a cleaner? Apply here →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
