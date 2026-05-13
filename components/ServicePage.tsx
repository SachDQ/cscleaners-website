import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { CheckCircle, ArrowRight, Phone, Star } from "lucide-react";

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  price: string;
  priceNote?: string;
  includes: string[];
  addOns?: { label: string; price: string }[];
  faqs: { q: string; a: string }[];
  upsell?: { title: string; href: string; price: string };
}

export default function ServicePage({
  title, subtitle, description, heroImage, price, priceNote,
  includes, addOns, faqs, upsell,
}: ServicePageProps) {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 70%, #00B4D8 100%)" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(255,209,102,0.25)", color: "#FFD166" }}>
                  Melbourne-Wide Service
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{title}</h1>
                <p className="text-lg text-white/80 mb-6 leading-relaxed">{subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/quote" className="btn btn-primary">Get a Fixed-Price Quote <ArrowRight size={14} /></Link>
                  <a href="tel:0404378911" className="btn btn-secondary"><Phone size={14} /> 0404 378 911</a>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex text-yellow-400">★★★★★</div>
                  <span className="text-white/70 text-sm">4.9 · 300+ Melbourne reviews</span>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image src={heroImage} alt={title} fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing + Includes */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold mb-5 text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>What&apos;s Included</h2>
                <p className="text-gray-500 leading-relaxed mb-8">{description}</p>
                <ul className="space-y-3">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle size={17} className="text-[#0077B6] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing card */}
              <div>
                <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100 sticky top-28">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Fixed-Price Quote</h3>
                    <Star size={20} className="text-yellow-400" />
                  </div>
                  <div className="text-4xl font-bold text-[#0077B6] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{price}</div>
                  {priceNote && <p className="text-gray-400 text-sm mb-6">{priceNote}</p>}
                  <div className="space-y-2 mb-6">
                    {["Transparent fixed pricing", "No hidden charges", "Satisfaction guaranteed", "7-day free re-clean"].map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-[#0077B6]" /> {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/quote" className="btn btn-primary w-full justify-center mb-3">Get My Exact Price <ArrowRight size={14} /></Link>
                  <a href="tel:0404378911" className="flex items-center justify-center gap-2 text-sm text-[#0077B6] font-semibold py-2">
                    <Phone size={13} /> Or call 0404 378 911
                  </a>

                  {/* Add-ons */}
                  {addOns && addOns.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Add-Ons</p>
                      <div className="space-y-2">
                        {addOns.map((a) => (
                          <div key={a.label} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{a.label}</span>
                            <span className="font-bold text-[#0077B6]">{a.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-bold mb-10 text-center text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Common Questions
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-[#1A1A2E] mb-2 text-sm" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upsell */}
        {upsell && (
          <section className="py-16" style={{ background: "#F8F9FA" }}>
            <div className="container mx-auto px-6 max-w-4xl text-center">
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-3">Customers also book</p>
              <h3 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{upsell.title}</h3>
              <p className="text-[#0077B6] font-bold text-lg mb-5">{upsell.price}</p>
              <Link href={upsell.href} className="btn btn-outline">View Service <ArrowRight size={14} /></Link>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-16" style={{ background: "linear-gradient(135deg, #1A1A2E, #0077B6)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-center text-white">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Ready to Book?</h2>
            <p className="text-white/75 mb-7">Get your fixed price in 60 seconds — no calls required.</p>
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">Get My Instant Quote <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
