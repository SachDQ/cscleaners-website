import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Central Sea Cleaning collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-white text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Privacy Policy</h1>
            <p className="text-white/80">Last updated: May 2025</p>
          </div>
        </section>

        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-gray-700 leading-relaxed">

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>1. Who We Are</h2>
                <p>Central Sea Cleaning ABN [to be added] operates as a professional cleaning service across Melbourne, Victoria, Australia. We are committed to protecting the privacy of our customers and website visitors in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs).</p>
                <p className="mt-3">Contact: <a href="mailto:info@cscleaners.com.au" className="text-[#0077B6] hover:underline">info@cscleaners.com.au</a></p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>2. Information We Collect</h2>
                <p>We collect personal information only when you voluntarily provide it to us, such as when you:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Submit a quote request or booking through our website</li>
                  <li>Contact us via email or phone</li>
                  <li>Subscribe to our communications</li>
                </ul>
                <p className="mt-3">The information we may collect includes your name, email address, phone number, service address, and details about the cleaning service you require.</p>
                <p className="mt-3">We do not collect sensitive information such as financial account details, government identifiers, or health information.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>3. How We Use Your Information</h2>
                <p>We use your personal information solely to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Respond to your enquiries and provide quotes</li>
                  <li>Schedule and deliver cleaning services</li>
                  <li>Send booking confirmations and service reminders</li>
                  <li>Improve our services based on feedback</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="mt-3">We will not use your information for direct marketing without your explicit consent, and you may opt out at any time.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>4. Disclosure of Information</h2>
                <p>We do not sell, rent, or trade your personal information to third parties. We may share your information with:</p>
                <ul className="list-disc pl-6 mt-3 space-y-1">
                  <li>Our cleaning staff, solely for the purpose of delivering your booked service</li>
                  <li>Third-party service providers who assist with our operations (e.g. booking software, email delivery) — these providers are bound by confidentiality obligations</li>
                  <li>Law enforcement or regulatory authorities where required by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>5. Data Security</h2>
                <p>We take reasonable steps to protect your personal information from misuse, loss, and unauthorised access. Our website uses HTTPS encryption. Quote form submissions are transmitted securely to our internal systems.</p>
                <p className="mt-3">No method of electronic transmission or storage is 100% secure. If you have concerns about the security of your information, please contact us.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>6. Cookies & Analytics</h2>
                <p>Our website may use cookies to improve your browsing experience. We may use analytics tools (such as Google Analytics) to understand how visitors use our site. This data is aggregated and does not personally identify you.</p>
                <p className="mt-3">You can disable cookies in your browser settings, though some features of the site may not function as intended.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>7. Access & Correction</h2>
                <p>You have the right to access the personal information we hold about you and to request corrections. To do so, contact us at <a href="mailto:info@cscleaners.com.au" className="text-[#0077B6] hover:underline">info@cscleaners.com.au</a>. We will respond within 30 days.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>8. Complaints</h2>
                <p>If you believe we have breached the Australian Privacy Principles, please contact us in writing. We will investigate and respond within 30 days. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner (OAIC) at <a href="https://www.oaic.gov.au" className="text-[#0077B6] hover:underline" target="_blank" rel="noopener noreferrer">www.oaic.gov.au</a>.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>9. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. The current version will always be available on this page with the date of last update noted at the top.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
