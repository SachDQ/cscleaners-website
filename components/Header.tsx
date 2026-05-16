"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const services = [
  { label: "Residential Cleaning", href: "/services/residential-cleaning" },
  { label: "Deep Cleaning", href: "/services/deep-cleaning" },
  { label: "End-of-Lease Cleaning", href: "/services/end-of-lease-cleaning" },
  { label: "Commercial Cleaning", href: "/services/commercial-cleaning" },
  { label: "Builders Clean", href: "/services/builders-cleaning" },
  { label: "Specialist Cleaning", href: "/services/specialist-cleaning" },
];

const navItems = [
  { label: "For Business", href: "/business" },
  { label: "For Cleaners", href: "/contractor" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark size={36} />
          <span
            className={`font-bold text-xl transition-colors ${scrolled ? "text-[#1A1A2E]" : "text-white"}`}
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Central Sea <span style={{ color: "#FFD166" }}>Cleaning</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 font-semibold text-sm transition-colors ${
                scrolled ? "text-[#1A1A2E] hover:text-[#0077B6]" : "text-white/90 hover:text-white"
              }`}
            >
              Services <ChevronDown size={14} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2 w-60">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-5 py-3 text-sm text-[#1A1A2E] hover:bg-blue-50 hover:text-[#0077B6] transition-colors font-medium"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-semibold text-sm transition-colors ${
                scrolled ? "text-[#1A1A2E] hover:text-[#0077B6]" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0404378911"
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              scrolled ? "text-[#0077B6]" : "text-white"
            }`}
          >
            <Phone size={14} />
            0404 378 911
          </a>
          <Link href="/quote" className="btn btn-primary text-sm px-5 py-2.5">
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={24} color={scrolled ? "#1A1A2E" : "white"} />
          ) : (
            <Menu size={24} color={scrolled ? "#1A1A2E" : "white"} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="container mx-auto px-6 py-4 max-w-6xl flex flex-col gap-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-2 pb-1">
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:text-[#0077B6] hover:bg-blue-50 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2.5 text-sm font-medium text-[#1A1A2E] hover:text-[#0077B6] hover:bg-blue-50 rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link
              href="/quote"
              className="btn btn-primary w-full justify-center mt-1"
              onClick={() => setMobileOpen(false)}
            >
              Get an Instant Quote
            </Link>
            <a
              href="tel:0404378911"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#0077B6]"
            >
              <Phone size={14} /> 0404 378 911
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
