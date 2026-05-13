import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, ArrowRight, Phone } from "lucide-react";
import { SUBURBS } from "@/lib/suburbs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cleaning Services — All Melbourne Suburbs",
  description: "Central Sea Cleaning serves all Melbourne suburbs and surrounding areas. Same-day availability in most areas. Find your suburb for local pricing and instant quotes.",
  alternates: { canonical: "https://cscleaners.com.au/locations" },
};

const grouped = SUBURBS.reduce((acc, s) => {
  if (!acc[s.region]) acc[s.region] = [];
  acc[s.region].push(s);
  return acc;
}, {} as Record<string, typeof SUBURBS>);

const regionOrder = [
  "Inner North", "Inner East", "Inner South", "Inner West",
  "Northern Suburbs", "Northern Growth Corridor", "North-East",
  "Eastern Suburbs", "South-East", "Bayside",
  "Western Suburbs", "Western Growth Corridor", "Mornington Peninsula",
];

const sortedRegions = regionOrder.filter((r) => grouped[r]);

export default function LocationsPage() {
  const totalSuburbs = SUBURBS.length;
  const totalRegions = Object.keys(grouped).length;

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="pt-32 pb-16"
          style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 100%)" }}
        >
          <div className="container mx-auto px-6 max-w-6xl text-white text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#90E0EF] mb-3">
              Service Areas
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Melbourne-Wide Coverage
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              {totalSuburbs} suburbs across {totalRegions} regions. Same-day availability in most areas — select your suburb for local pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/quote" className="btn btn-primary">
                Get an Instant Quote <ArrowRight size={14} />
              </Link>
              <a href="tel:0404378911" className="btn btn-secondary">
                <Phone size={14} /> 0404 378 911
              </a>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section style={{ background: "#0077B6" }} className="py-6">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
              {[
                { value: `${totalSuburbs}+`, label: "Suburbs served" },
                { value: `${totalRegions}`, label: "Melbourne regions" },
                { value: "Same-day", label: "Availability in most areas" },
                { value: "7 days", label: "Mon–Sun service" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-2xl font-bold mb-0.5"
                    style={{ fontFamily: "var(--font-syne), sans-serif", color: "#FFD166" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-white/75">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suburb grid */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            {sortedRegions.map((region) => (
              <div key={region} className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}
                  >
                    <MapPin size={14} className="text-[#0077B6]" />
                  </div>
                  <h2
                    className="text-lg font-bold text-[#1A1A2E]"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {region}
                  </h2>
                  <span className="text-xs font-semibold text-[#0077B6] bg-blue-50 px-2.5 py-1 rounded-full">
                    {grouped[region].length} suburbs
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {grouped[region].map((s) => (
                    <Link
                      key={s.slug}
                      href={`/locations/${s.slug}`}
                      className="group bg-white rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:border-[#0077B6] border-2 border-transparent transition-all"
                    >
                      <div className="font-semibold text-sm text-[#1A1A2E] group-hover:text-[#0077B6] transition-colors leading-tight">
                        {s.name}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.postcode}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Not listed CTA */}
            <div
              className="rounded-3xl p-10 text-center mt-8"
              style={{ background: "linear-gradient(135deg, #023E8A 0%, #0077B6 100%)" }}
            >
              <h2
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                Don&apos;t see your suburb?
              </h2>
              <p className="text-white/80 mb-6">
                We likely cover it. Call or message us and we&apos;ll confirm availability in minutes.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="tel:0404378911"
                  className="inline-flex items-center gap-2 bg-[#FFD166] text-[#1A1A2E] font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
                >
                  <Phone size={16} /> 0404 378 911
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Send a message <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
