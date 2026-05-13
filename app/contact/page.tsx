"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, track: "contact", submittedAt: new Date().toISOString() }),
        });
      }
    } catch {}
    setSending(false);
    router.push("/thank-you");
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative pt-32 pb-16" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-6xl text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Get in Touch</h1>
            <p className="text-lg text-white/80">We typically respond within 2 hours during business hours.</p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-8" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Contact Details</h2>
                <div className="space-y-5 mb-10">
                  {[
                    { icon: Phone, label: "Phone", value: "0404 378 911", href: "tel:0404378911" },
                    { icon: Mail, label: "Email", value: "info@cscleaners.com.au", href: "mailto:info@cscleaners.com.au" },
                    { icon: MapPin, label: "Service Area", value: "All Melbourne suburbs & surrounds", href: null },
                    { icon: Clock, label: "Hours", value: "Monday – Sunday, 7am – 7pm", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}>
                        <item.icon size={18} className="text-[#0077B6]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="font-semibold text-[#1A1A2E] hover:text-[#0077B6] transition-colors">{item.value}</a>
                        ) : (
                          <span className="font-semibold text-[#1A1A2E]">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                  <p className="font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Need a quote quickly?</p>
                  <p className="text-gray-500 text-sm mb-4">Our interactive quote tool gives you a fixed price in under 60 seconds — no waiting.</p>
                  <Link href="/quote" className="btn btn-primary w-full justify-center">Get an Instant Quote <ArrowRight size={14} /></Link>
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #0077B6, #00B4D8)" }}>
                      <CheckCircle size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Message Sent!</h3>
                    <p className="text-gray-500 text-sm">We&apos;ll be in touch within 2 hours. Thank you!</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        { key: "name", label: "Full name", type: "text", placeholder: "Jane Smith" },
                        { key: "email", label: "Email address", type: "email", placeholder: "jane@email.com" },
                        { key: "phone", label: "Phone number", type: "tel", placeholder: "0404 378 911" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="block text-sm font-bold text-gray-700 mb-1">{f.label}</label>
                          <input type={f.type} placeholder={f.placeholder} required
                            value={form[f.key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                        <textarea rows={4} placeholder="Tell us about your cleaning needs..." required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none" />
                      </div>
                      <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center disabled:opacity-50">
                        {sending ? "Sending..." : "Send Message"} {!sending && <ArrowRight size={14} />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
