import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Phone, ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch",
  description: "Your quote request has been received. Central Sea Cleaning will confirm your booking within 2 hours.",
  robots: { index: false, follow: false },
};

const nextSteps = [
  { step: "1", title: "We review your request", desc: "Our team reviews your details and confirms availability for your preferred date." },
  { step: "2", title: "You'll get a confirmation", desc: "We'll send a booking confirmation with your cleaner's name and arrival window." },
  { step: "3", title: "Your cleaner arrives", desc: "Sit back — your cleaner arrives on time, equipped and ready to go." },
];

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "#F8F9FA" }}>
        {/* Hero */}
        <section
          className="relative pt-32 pb-16 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 70%, #00B4D8 100%)" }}
        >
          <div className="container mx-auto px-6 max-w-2xl text-white text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <CheckCircle size={40} className="text-white" />
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Request received!
            </h1>
            <p className="text-xl text-white/80">
              We&apos;ll confirm your booking within 2 hours. Check your inbox for a quote summary.
            </p>
          </div>
        </section>

        {/* What happens next */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2
              className="text-2xl font-bold text-[#1A1A2E] text-center mb-10"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              What happens next
            </h2>
            <div className="space-y-5">
              {nextSteps.map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm flex gap-5 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                    style={{ background: "linear-gradient(135deg, #023E8A, #0077B6)" }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Need to talk now */}
            <div
              className="mt-10 rounded-2xl p-8 text-center"
              style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 100%)" }}
            >
              <p className="text-white/80 mb-2 text-sm">Need to speak with us sooner?</p>
              <a
                href="tel:0404378911"
                className="inline-flex items-center gap-2 text-2xl font-bold text-white hover:text-[#FFD166] transition-colors"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                <Phone size={22} />
                0404 378 911
              </a>
              <p className="text-white/60 text-xs mt-2">Available Mon–Sun, 7am–7pm</p>
            </div>

            {/* Review nudge */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[1,2,3,4,5].map((i) => <Star key={i} size={18} className="text-[#FFD166]" fill="#FFD166" />)}
              </div>
              <p className="text-sm text-gray-600 mb-1 font-medium">Joining 127 happy clients</p>
              <p className="text-xs text-gray-400">We&apos;ll ask for your review after your first clean — it really helps us grow.</p>
            </div>

            {/* Back to site */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0077B6] hover:underline"
              >
                Back to homepage <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
