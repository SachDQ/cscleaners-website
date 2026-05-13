import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteCalculator from "@/components/QuoteCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get an Instant Quote",
  description: "Get a fixed-price cleaning quote in under 60 seconds. No phone calls, no hidden fees. Residential, bond, commercial and specialist cleaning across Melbourne.",
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-8" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-3xl text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Get Your Instant Quote
            </h1>
            <p className="text-lg text-white/80">Fixed price. No surprises. Under 60 seconds.</p>
          </div>
        </section>
        <section className="py-12" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-3xl">
            <QuoteCalculator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
