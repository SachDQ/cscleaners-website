import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContractorApplicationForm from "@/components/ContractorApplicationForm";
import { CheckCircle, ArrowRight, Wallet, FileText, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subcontractor Cleaners — Apply to Join CS Cleaners' Panel",
  description:
    "We're building a panel of qualified subcontract cleaners for commercial contracts across northern Melbourne. Above-award rates, written agreements, no chasing payment. Apply in 3 minutes.",
  alternates: { canonical: "https://cscleaners.com.au/contractor" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Apply to Subcontract with CS Cleaners — Melbourne",
    description:
      "Join our subcontractor panel. Above-award rates, written agreements, reliable on-time payment.",
    url: "https://cscleaners.com.au/contractor",
    type: "website",
  },
};

const BULLETS = [
  {
    icon: Wallet,
    title: "Above-award rates, paid on time",
    body: "We pay above the Cleaning Services Award 2020 minimums on a clear fortnightly schedule. No chasing invoices, no 90-day terms, no missing pay slips.",
  },
  {
    icon: FileText,
    title: "Real written agreements",
    body: "Every job goes through a signed subcontractor agreement with scope, frequency, rate and payment terms locked in. You know what you&apos;re doing and what you&apos;re getting paid before you start.",
  },
  {
    icon: ShieldCheck,
    title: "We handle the admin",
    body: "Sales, quoting, client communication, scope changes, billing, follow-up — we do all of it. Your job is to do the clean to the agreed standard. We do the rest.",
  },
  {
    icon: MapPin,
    title: "Work near where you live",
    body: "We match jobs by suburb fit. Tell us where you can work and we won&apos;t send you halfway across Melbourne for a 90-minute clean.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Apply via the form",
    body: "Three minutes. We ask for the basics — ABN, suburbs you cover, premises types you have experience with, insurance and police-check status.",
  },
  {
    n: "02",
    title: "We review and reply",
    body: "We respond within 3 business days. If you&apos;re a fit for what we&apos;re pursuing, we&apos;ll set up a short call to walk through how we work.",
  },
  {
    n: "03",
    title: "Trial clean at a low-stakes site",
    body: "Before we put you in front of a real client, we book a paid trial on one of our own sites or a friendly client to confirm quality.",
  },
  {
    n: "04",
    title: "First contract assignment",
    body: "When a contract comes up that matches your coverage and capacity, we offer it to you with full scope, schedule and rate in writing. You take it or pass — no penalty either way.",
  },
];

const FAQS = [
  {
    q: "Do you have contracts ready for me right now?",
    a: "Honest answer: not necessarily. We are actively pursuing contracts across northern and inner Melbourne and building our subcontractor panel for when we win them. We will only contact you when there's a job that actually matches your suburbs and capacity. We won't waste your time.",
  },
  {
    q: "What rate do you pay?",
    a: "It depends on the contract type and your experience. We pay above the Cleaning Services Award 2020 minimums for commercial cleaning. We're closed-book on what we charge clients in most cases — but we'll always be clear with you about exactly what you'll be paid before you accept a job.",
  },
  {
    q: "Am I a contractor or an employee?",
    a: "You'll be engaged as a contractor under a written subcontractor agreement, with your own ABN, your own insurance, and your own control over how the work is performed. We're careful to operate within the contractor/employee distinction set out by the Fair Work Ombudsman and ATO. If a particular client requires an employed cleaner, we'll discuss that separately.",
  },
  {
    q: "What if I don't have public liability insurance yet?",
    a: "That's okay to start the conversation. Before we put you on a paying contract, we'll need to see a current Certificate of Currency for at least $10M public liability. We can point you to brokers that small Melbourne cleaners use (typical premium is $400–$700/year).",
  },
  {
    q: "Will I deal with the client directly?",
    a: "Day-to-day site stuff — yes, in a normal handover/feedback way. Contract matters, scope changes, pricing, complaints — those come through us. You're never alone with a difficult client.",
  },
  {
    q: "What about non-circumvent?",
    a: "Our agreement has a standard 12-month non-circumvent clause: you can't sign the same client directly while working with us or for 12 months after. In practice, our best subcontractors stay with us because going around us is more work than going through us.",
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

export default function ContractorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative pt-32 pb-20 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #03045E 60%, #0077B6 100%)" }}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="text-white">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5"
                  style={{ background: "rgba(255,209,102,0.2)", color: "#FFD166" }}
                >
                  For cleaners · Melbourne
                </div>
                <h1
                  className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  Subcontract with us. We bring the contracts, you bring the cleans.
                </h1>
                <p className="text-lg text-white/80 mb-7 leading-relaxed">
                  We&apos;re actively pursuing commercial cleaning contracts across northern and inner Melbourne and building a panel of qualified subcontractors. Above-award rates, written agreements, reliable on-time payment.
                </p>
                <a href="#apply" className="btn btn-primary">
                  Apply in 3 minutes <ArrowRight size={14} />
                </a>
                <p className="text-xs text-white/60 mt-5 max-w-md">
                  We will only contact you when there&apos;s a contract that matches your suburbs and capacity. No spam, no time-wasting.
                </p>
              </div>
              <div id="apply">
                <ContractorApplicationForm />
              </div>
            </div>
          </div>
        </section>

        {/* What we offer */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                What we offer
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Why subcontract with us
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BULLETS.map((b) => (
                <div key={b.title} className="p-7 rounded-2xl border border-gray-100">
                  <b.icon size={24} className="text-[#0077B6] mb-4" />
                  <h3
                    className="font-bold text-lg text-[#1A1A2E] mb-2"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: b.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                How it works
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                From application to first job
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS.map((p) => (
                <div key={p.n} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div
                    className="text-3xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-syne), sans-serif", color: "#0077B6" }}
                  >
                    {p.n}
                  </div>
                  <h3
                    className="font-bold text-base text-[#1A1A2E] mb-2"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements summary */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="rounded-3xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
              <h2
                className="text-2xl md:text-3xl font-bold text-[#1A1A2E] mb-5"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Minimum requirements
              </h2>
              <p className="text-gray-600 mb-5 text-sm">
                We can help you get any of these in place if you don&apos;t have them yet — we&apos;ll just need them before you start a paid contract with us.
              </p>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Active ABN (or applied for)</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Public liability insurance, $10M cover ($400–$700/year through standard brokers)</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> National police check (under 12 months old)</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Working with Children Check if you want childcare/school work</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Reliable transport to job sites</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> At least 12 months commercial or end-of-lease cleaning experience (residential-only welcome but we trial first)</li>
                <li className="flex gap-3"><CheckCircle size={18} className="shrink-0 mt-0.5 text-[#0077B6]" /> Good written English for site reports and client communication, or a reliable English-speaking partner on the team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0077B6] mb-2">
                Honest answers
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[#1A1A2E]"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Questions cleaners ask
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
              Get on the panel
            </h2>
            <p className="text-white/75 mb-7 max-w-xl mx-auto">
              Three-minute application. We&apos;ll contact you only when we have a contract that matches your fit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#apply" className="btn btn-primary text-base px-8 py-4">
                Apply now <ArrowRight size={16} />
              </Link>
              <Link href="/business" className="text-white/80 underline self-center text-sm">
                Looking to hire cleaners for your business? See business page →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
