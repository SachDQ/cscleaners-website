import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle, Phone, MapPin } from "lucide-react";
import { SUBURBS } from "@/lib/suburbs";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return SUBURBS.map((s) => ({ suburb: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
  const { suburb } = await params;
  const data = SUBURBS.find((s) => s.slug === suburb);
  if (!data) return {};
  return {
    title: `Cleaning Services ${data.name}`,
    description: `Professional residential, bond and commercial cleaning in ${data.name}, Melbourne. Police-checked cleaners, eco products, fixed pricing. Get an instant quote.`,
  };
}

export default async function SuburbPage({ params }: { params: Promise<{ suburb: string }> }) {
  const { suburb } = await params;
  const data = SUBURBS.find((s) => s.slug === suburb);
  if (!data) notFound();

  const nearby = SUBURBS.filter((s) => s.slug !== suburb).slice(0, 5);

  const services = [
    { emoji: "🏠", label: "Residential Cleaning", href: "/services/residential-cleaning", price: "From $210" },
    { emoji: "🔑", label: "End-of-Lease Cleaning", href: "/services/end-of-lease-cleaning", price: "From $320" },
    { emoji: "🏢", label: "Commercial Cleaning", href: "/services/commercial-cleaning", price: "From $180" },
    { emoji: "✨", label: "Specialist Cleaning", href: "/services/specialist-cleaning", price: "From $45" },
  ];

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://cscleaners.com.au/locations/${suburb}/#business`,
    name: "Central Sea Cleaning",
    url: `https://cscleaners.com.au/locations/${suburb}/`,
    telephone: "+61404378911",
    email: "info@cscleaners.com.au",
    address: {
      "@type": "PostalAddress",
      addressLocality: data.name,
      postalCode: data.postcode,
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "City",
      name: data.name,
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #1A1A2E 0%, #0077B6 70%, #00B4D8 100%)" }}>
          <div className="container mx-auto px-6 max-w-6xl text-white">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background: "rgba(255,209,102,0.25)", color: "#FFD166" }}>
                <MapPin size={12} /> {data.region} · {data.postcode}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Cleaning Services in {data.name}
              </h1>
              <p className="text-lg text-white/80 mb-7 leading-relaxed">
                Melbourne&apos;s friendliest cleaning company now serving {data.name} and surrounding {data.region} suburbs. Police-checked cleaners, eco products, fixed pricing — no surprises.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="btn btn-primary">Get a {data.name} Quote <ArrowRight size={14} /></Link>
                <a href="tel:0404378911" className="btn btn-secondary"><Phone size={14} /> 0404 378 911</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-bold mb-10 text-[#1A1A2E]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Services in {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {services.map((s) => (
                <Link key={s.href} href={s.href} className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="text-2xl mb-3">{s.emoji}</div>
                  <div className="font-bold text-[#1A1A2E] mb-1 group-hover:text-[#0077B6] transition-colors" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{s.label}</div>
                  <div className="text-sm font-bold text-[#0077B6]">{s.price}</div>
                </Link>
              ))}
            </div>

            {/* Local copy */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A2E] mb-5" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                  Why {data.name} Residents Choose Central Sea
                </h2>
                <div className="space-y-4 text-gray-500 text-sm leading-relaxed mb-7">
                  <p>Whether you&apos;re a homeowner in {data.name} looking for a reliable regular clean, or a renter needing an end-of-lease clean before your final inspection — Central Sea Cleaning has you covered.</p>
                  <p>We operate across all of {data.region}, with cleaners familiar with the properties, agents and standards in your area. Same-day and next-day availability in most {data.name} postcodes.</p>
                  <p>Every clean comes with our written guarantee: if you&apos;re not satisfied, we come back within 48 hours — free. No arguments, no hassle.</p>
                </div>
                <ul className="space-y-2 mb-8">
                  {[
                    `Available throughout ${data.name} and nearby suburbs`,
                    "Fixed pricing — get your quote online in 60 seconds",
                    "Police-checked, insured cleaners",
                    "7-day free re-clean guarantee",
                    "Eco-friendly products throughout",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle size={15} className="text-[#0077B6] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/quote" className="btn btn-primary">Get a {data.name} Quote <ArrowRight size={14} /></Link>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-sm">
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video">
                  <Image src="/images/05_residential_clean.png" alt={`Cleaning services in ${data.name}`} fill className="object-cover" />
                </div>
                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                <p className="text-sm text-gray-500 italic mb-3">&ldquo;We had Central Sea clean our apartment in {data.name} before handing back the keys. Got our full bond back and the agent actually complimented how clean it was.&rdquo;</p>
                <div className="text-xs text-gray-400">— Verified {data.name} Customer</div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby suburbs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-5" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              We also serve nearby suburbs
            </h3>
            <div className="flex flex-wrap gap-3">
              {nearby.map((s) => (
                <Link key={s.slug} href={`/locations/${s.slug}`}
                  className="px-4 py-2 rounded-xl text-sm font-medium border-2 border-gray-200 hover:border-[#0077B6] hover:text-[#0077B6] transition-all text-[#1A1A2E]">
                  {s.name}
                </Link>
              ))}
              <Link href="/locations" className="px-4 py-2 rounded-xl text-sm font-medium text-[#0077B6] hover:underline">
                View all suburbs →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14" style={{ background: "linear-gradient(135deg, #1A1A2E, #0077B6)" }}>
          <div className="container mx-auto px-6 max-w-4xl text-center text-white">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Ready to book in {data.name}?</h2>
            <p className="text-white/75 mb-7">Fixed price in 60 seconds. Same-day and next-day availability.</p>
            <Link href="/quote" className="btn btn-primary text-base px-8 py-4">Get My {data.name} Quote <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
