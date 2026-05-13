"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, Phone, ArrowRight } from "lucide-react";

const faqs = [
  {
    category: "Booking & Pricing",
    items: [
      {
        q: "How do I get a quote?",
        a: "Use our instant quote calculator on the homepage — select your service, enter your home size and any add-ons, and you'll get a price in seconds. No obligation, no waiting. You can also call us on 0404 378 911 or fill in the contact form.",
      },
      {
        q: "Do you charge extra for weekends or public holidays?",
        a: "Weekend cleans are priced the same as weekday cleans. Public holidays may attract a small surcharge of 10–15% — we'll always let you know in advance if that applies to your booking.",
      },
      {
        q: "Is there a minimum booking fee?",
        a: "Yes — our minimum booking is 2 hours. Most standard cleans fall comfortably within that. We don't pad hours to hit minimums.",
      },
      {
        q: "Do you offer ongoing discounts for regular clients?",
        a: "Absolutely. Fortnightly clients save 10%, and weekly clients save 15% off their recurring clean. Discounts apply automatically once you set up a regular schedule.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfer, all major credit and debit cards, and cash. Payment is due on the day of service unless you've arranged an invoice account for commercial work.",
      },
    ],
  },
  {
    category: "Our Cleaners",
    items: [
      {
        q: "Are your cleaners police-checked?",
        a: "Yes — every cleaner undergoes a National Police Check before their first assignment. We also conduct in-person interviews and reference checks. You'll never get a random contractor.",
      },
      {
        q: "Will I get the same cleaner each visit?",
        a: "For regular clients, we always aim to send the same cleaner or small team. Consistency matters — your cleaner learns your preferences and your home layout. If your regular cleaner is unavailable, we notify you in advance.",
      },
      {
        q: "Are your cleaners insured?",
        a: "Yes. Central Sea Cleaning holds public liability insurance. All cleaners work under that cover, so if anything is accidentally damaged during a clean, you're protected.",
      },
      {
        q: "Do I need to be home during the clean?",
        a: "Not at all. Many clients leave a key or provide a code. We're equally comfortable with you home or away — entirely your call. We'll send a completion message when we're done.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        q: "What's included in a standard house clean?",
        a: "A standard clean covers all rooms: vacuuming and mopping floors, dusting surfaces, cleaning bathrooms (toilet, sink, shower/bath, mirrors), wiping down kitchen benches and splashback, and taking out bin liners. It doesn't include inside oven, inside fridge, or windows unless added.",
      },
      {
        q: "What's the difference between a standard clean and a deep clean?",
        a: "A deep clean goes further — inside oven, inside fridge, skirting boards, light switches, door frames, window tracks, inside cupboards, and a more thorough scrub of bathrooms and kitchen. We recommend a deep clean for first-time clients or homes that haven't been professionally cleaned in 3+ months.",
      },
      {
        q: "Do you guarantee bond/end-of-lease cleans?",
        a: "Yes. Our end-of-lease clean comes with a bond-back guarantee. If your agent or landlord identifies any issues, we'll return within 72 hours and fix them at no charge — provided the items were within scope of what we cleaned.",
      },
      {
        q: "Do you do carpet steam cleaning?",
        a: "Yes — carpet steam cleaning is available as an add-on to any clean, or as a standalone service. We use hot water extraction equipment that removes deep-set dirt and most stains. Prices depend on room count.",
      },
      {
        q: "Can you clean commercial premises?",
        a: "Yes. We service offices, retail spaces, medical rooms, and short-stay accommodation. Commercial contracts include flexible scheduling (early morning, after-hours, weekends) and a dedicated account manager.",
      },
    ],
  },
  {
    category: "Products & Environment",
    items: [
      {
        q: "What cleaning products do you use?",
        a: "We use eco-friendly, biodegradable products that are safe for children and pets. Our products are free from harsh bleach and ammonia. If you have specific allergies or sensitivities, let us know and we'll work around them.",
      },
      {
        q: "Do I need to supply any products or equipment?",
        a: "No — we bring everything: vacuum, mop, all cleaning products, and microfibre cloths. Just ensure we can access the property and there's running water. If you prefer we use your own products for any reason, we're happy to.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-[#0077B6] transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800 text-sm md:text-base">{q}</span>
        <ChevronDown
          className="shrink-0 text-[#0077B6] transition-transform duration-200"
          size={18}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm md:text-base text-gray-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative pt-32 pb-16 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 70%, #00B4D8 100%)" }}
        >
          <div className="container mx-auto px-6 max-w-4xl text-white text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#90E0EF] mb-3">
              Help Centre
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Everything you need to know about booking, pricing, and what to expect from a Central Sea clean.
            </p>
          </div>
        </section>

        {/* FAQ accordion */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            {faqs.map((group) => (
              <div key={group.category} className="mb-10">
                <h2
                  className="text-xs font-bold tracking-widest uppercase text-[#0077B6] mb-4"
                >
                  {group.category}
                </h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
                  {group.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}

            {/* Still have questions */}
            <div
              className="mt-10 rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 100%)" }}
            >
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Still have a question?
              </h2>
              <p className="text-white/80 mb-6">
                Call us directly or send a message — we usually respond within the hour.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:0404378911"
                  className="inline-flex items-center gap-2 bg-[#FFD166] text-[#1A1A2E] font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
                >
                  <Phone size={18} />
                  0404 378 911
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Send a message
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((g) =>
              g.items.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              }))
            ),
          }),
        }}
      />
      <Footer />
    </>
  );
}
