import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for Central Sea Cleaning services in Melbourne.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Terms of Service</h1>
            <p className="text-white/80">Last updated: May 2025</p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed">

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>1. Acceptance of Terms</h2>
                <p>By booking a service or using the Central Sea Cleaning website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services or website.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>2. Services</h2>
                <p>Central Sea Cleaning provides professional cleaning services including residential cleaning, end-of-lease cleaning, deep cleaning, commercial cleaning, builders cleaning, and specialist cleaning across Melbourne, Victoria.</p>
                <p className="mt-3">All services are performed by trained, police-checked staff using eco-friendly products. The specific scope of each service is as described on our website or as agreed in writing at the time of booking.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>3. Bookings & Quotes</h2>
                <p>Quotes provided via our online calculator are indicative fixed prices based on the information you supply. Final pricing may vary if the actual condition or size of the property differs materially from what was described.</p>
                <p className="mt-3">A booking is confirmed only when you receive written confirmation from us. We reserve the right to decline bookings at our discretion.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>4. Cancellations & Rescheduling</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancellations with more than 48 hours notice: No charge.</li>
                  <li>Cancellations with 24–48 hours notice: 50% cancellation fee applies.</li>
                  <li>Cancellations with less than 24 hours notice: Full service fee applies.</li>
                  <li>If we cannot access the property at the agreed time through no fault of ours, the full service fee applies.</li>
                </ul>
                <p className="mt-3">To cancel or reschedule, contact us at <a href="mailto:info@cscleaners.com.au" className="text-[#0077B6] hover:underline">info@cscleaners.com.au</a> or call us directly.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>5. Bond-Back Guarantee</h2>
                <p>Our end-of-lease cleaning service includes a bond-back guarantee. If your real estate agent or property manager identifies any cleaning deficiency related to our work, we will return within 72 hours to rectify it at no additional charge, provided:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>You notify us within 24 hours of the inspection</li>
                  <li>The deficiency relates specifically to cleaning (not damage, maintenance, or pre-existing issues)</li>
                  <li>The property has not been occupied or used since our clean</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>6. Access to Property</h2>
                <p>You are responsible for ensuring our team has safe, unobstructed access to the property at the agreed time. Please ensure pets are secured and children are supervised during the service. Running water and electricity must be available.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>7. Liability</h2>
                <p>We take great care in every service. In the unlikely event of accidental damage caused by our team, please notify us within 24 hours with photographic evidence. Our liability is limited to the cost of reasonable repair or replacement of the damaged item, up to a maximum of the service fee paid.</p>
                <p className="mt-3">We are not liable for pre-existing damage, damage caused by faulty fixtures or fittings, or loss of income resulting from delayed cleaning.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>8. Payment</h2>
                <p>Payment is due on completion of the service unless otherwise agreed in writing. We accept bank transfer and major credit/debit cards. Invoices not paid within 7 days may incur a late payment fee.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>9. Governing Law</h2>
                <p>These terms are governed by the laws of Victoria, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Victoria.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>10. Contact</h2>
                <p>Questions about these terms? Contact us at <a href="mailto:info@cscleaners.com.au" className="text-[#0077B6] hover:underline">info@cscleaners.com.au</a>.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
