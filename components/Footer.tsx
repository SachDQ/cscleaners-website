import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const services = [
  { label: "Residential Cleaning", href: "/services/residential-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "End-of-Lease Cleaning", href: "/services/end-of-lease-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Builders Clean", href: "/services/builders-cleaning" },
  { label: "Specialist Cleaning", href: "/services/specialist-cleaning" },
];

const suburbs = [
  "Thomastown", "Brunswick", "Richmond", "Carlton", "St Kilda",
  "Doncaster", "Ringwood", "Frankston", "Dandenong", "Footscray",
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A2E" }} className="text-white">
      <div className="container mx-auto px-6 max-w-6xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoMark size={36} />
              <span className="font-bold text-xl" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Central Sea <span style={{ color: "#FFD166" }}>Cleaning</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Melbourne's friendliest cleaning company. Eco-friendly products,
              police-checked staff, and a satisfaction guarantee on every job.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077B6] transition-colors" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077B6] transition-colors" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suburbs */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              We Serve
            </h4>
            <ul className="space-y-2.5">
              {suburbs.map((s) => (
                <li key={s}>
                  <Link
                    href={`/locations/${s.toLowerCase()}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/locations"
              className="inline-block mt-3 text-xs text-[#00B4D8] hover:underline"
            >
              View all suburbs →
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0404378911"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[#00B4D8]" />
                  0404 378 911
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cscleaners.com.au"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#00B4D8]" />
                  info@cscleaners.com.au
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-gray-300">
                  <MapPin size={14} className="text-[#00B4D8] mt-0.5 shrink-0" />
                  Serving all Melbourne suburbs & surrounds
                </span>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-1">Available 7 days</p>
              <p className="text-sm font-semibold text-white">Mon–Sun, 7am–7pm</p>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-white/10 border-b border-white/10 mb-8"
        >
          {[
            { icon: "🛡️", text: "Police Checked" },
            { icon: "🌿", text: "Eco-Friendly Products" },
            { icon: "✅", text: "Bond-Back Guarantee" },
            { icon: "⭐", text: "5-Star Rated" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2">
              <span className="text-lg">{t.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{t.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Central Sea Cleaning. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
