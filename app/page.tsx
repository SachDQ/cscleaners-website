import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FadeIn, StaggerChildren, StaggerItem, ScaleIn } from "@/components/Motion";
import { Shield, Leaf, Star, Clock, CheckCircle, ArrowRight, Phone, Users, Award, Zap } from "lucide-react";

const services = [
  { icon: "🏠", title: "Residential Cleaning", desc: "Regular weekly or fortnightly cleans tailored to your home. Same cleaner every visit.", href: "/services/residential-cleaning", price: "From $210" },
  { icon: "🔬", title: "Deep Cleaning", desc: "Top-to-bottom intensive clean for homes that need a thorough reset.", href: "/services/deep-cleaning", price: "From $280" },
  { icon: "🔑", title: "End-of-Lease Cleaning", desc: "Bond-back guaranteed. REIV checklist. Free re-clean within 7 days if needed.", href: "/services/end-of-lease-cleaning", price: "From $320", badge: "Most Popular" },
  { icon: "🏢", title: "Commercial Cleaning", desc: "Reliable office & retail cleaning on your schedule. No lock-in contracts.", href: "/services/commercial-cleaning", price: "From $180/visit" },
  { icon: "🏗️", title: "Builders Clean", desc: "Post-construction dust removal and final handover cleans for new builds.", href: "/services/builders-cleaning", price: "Custom quote" },
  { icon: "✨", title: "Specialist Cleaning", desc: "Oven, carpet steam, windows, fridge & more. Book as stand-alone or add-on.", href: "/services/specialist-cleaning", price: "From $45" },
];

const trustSignals = [
  { icon: Shield, title: "Police Checked", desc: "Every cleaner is background-verified before their first job." },
  { icon: Leaf, title: "Eco-Friendly", desc: "Non-toxic, biodegradable products safe for kids, pets & the planet." },
  { icon: Star, title: "5-Star Rated", desc: "Hundreds of verified Google reviews from happy Melbourne customers." },
  { icon: Clock, title: "7 Days a Week", desc: "Including public holidays. Book online anytime, 24/7." },
  { icon: Users, title: "Same Cleaner", desc: "We match you with a dedicated cleaner who learns your preferences." },
  { icon: Award, title: "Bond-Back Guarantee", desc: "Free re-clean within 7 days if your agent isn't fully satisfied." },
];

const testimonials = [
  { name: "Sarah M.", suburb: "Brunswick", stars: 5, text: "Honestly the best clean my apartment has ever had. The team were on time, thorough, and so friendly. Got my full bond back — worth every cent.", service: "End-of-Lease Clean" },
  { name: "James T.", suburb: "Richmond", stars: 5, text: "We use Central Sea for our fortnightly home clean and it's been life-changing. Same cleaner every time, always spotless. Highly recommend.", service: "Residential Clean" },
  { name: "Priya K.", suburb: "Doncaster", stars: 5, text: "Booked a commercial clean for our office and the result was incredible. Professional, fast and very reasonably priced. Will be booking monthly.", service: "Commercial Clean" },
  { name: "Tom & Lily B.", suburb: "St Kilda", stars: 5, text: "We'd tried three other cleaning companies before Central Sea. Night and day difference. The oven, windows, skirting boards — spotless. We'll never switch again.", service: "Deep Clean" },
  { name: "Angela R.", suburb: "Thomastown", stars: 5, text: "Easy online booking, fixed price, no surprises. The cleaner arrived on time and left our place looking brand new. Highly recommend for anyone in Melbourne.", service: "Residential Clean" },
];

const stats = [
  { value: "4,800+", label: "Cleans Completed" },
  { value: "4.9★", label: "Google Rating" },
  { value: "98%", label: "Bond Return Rate" },
  { value: "7 Days", label: "Available All Week" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <Image src="/images/01_hero_background.png" alt="Beautifully cleaned Melbourne home" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(26,26,46,0.88) 0%, rgba(0,119,182,0.78) 60%, rgba(0,180,216,0.55) 100%)" }} />
          <div className="relative container mx-auto px-6 max-w-6xl pt-28 pb-16">
            <div className="max-w-2xl">
              <FadeIn delay={0.1} direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(255,209,102,0.2)", color: "#FFD166", border: "1px solid rgba(255,209,102,0.4)" }}>
                  <Zap size={14} /> Serving All Melbourne Suburbs
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-syne), sans-serif", lineHeight: "1.05" }}>
                  Melbourne&apos;s <span style={{ color: "#FFD166" }}>Friendliest</span><br />Cleaning Company
                </h1>
              </FadeIn>
              <FadeIn delay={0.35} direction="up">
                <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
                  Transparent prices. Trusted cleaners. A guarantee that actually means something. Residential, bond & commercial cleaning across all Melbourne.
                </p>
              </FadeIn>
              <FadeIn delay={0.45} direction="up">
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/quote" className="btn btn-primary text-base px-7 py-4">Get an Instant Quote <ArrowRight size={16} /></Link>
                  <a href="tel:0404378911" className="btn btn-secondary text-base px-7 py-4"><Phone size={16} /> Call Us Now</a>
                </div>
              </FadeIn>
              <FadeIn delay={0.55} direction="up">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {["✅ Police Checked", "🌿 Eco Products", "⭐ Bond-Back Guarantee", "📅 Book Online 24/7"].map((t) => (
                    <span key={t} className="text-sm text-white/80 font-medium">{t}</span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: "#0077B6" }} className="py-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              {stats.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#FFD166" }}>{s.value}</div>
                  <div className="text-sm text-white/80">{s.label}</div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Services */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeIn className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                Every Clean, <span className="text-gradient">Covered</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">From weekly home cleans to end-of-lease deep cleans — we do it all, and we do it properly.</p>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <StaggerItem key={s.href}>
                  <Link href={s.href} className="group bg-white rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden block h-full">
                    {s.badge && <span className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full" style={{ background: "#FFD166", color: "#1A1A2E" }}>{s.badge}</span>}
                    <div className="text-3xl mb-4">{s.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A2E] group-hover:text-[#0077B6] transition-colors" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0077B6]">{s.price}</span>
                      <ArrowRight size={18} className="text-gray-300 group-hover:text-[#0077B6] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <FadeIn className="text-center mt-10" delay={0.2}>
              <Link href="/quote" className="btn btn-primary px-8 py-4 text-base">Get Your Instant Quote <ArrowRight size={16} /></Link>
            </FadeIn>
          </div>
        </section>

        {/* Before/After */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                  The Difference Is <span className="text-gradient">Obvious</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">We don&apos;t cut corners. Every job is completed to a standard that satisfies real estate agents, body corporates, and homeowners alike. If you&apos;re not 100% happy, we come back — free.</p>
                <ul className="space-y-3 mb-8">
                  {["REIV-standard end-of-lease checklist", "Free 7-day re-clean guarantee", "98% bond return rate on our cleans", "Before & after photos on every job"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <CheckCircle size={18} className="text-[#0077B6] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services/end-of-lease-cleaning" className="btn btn-outline">Learn About Bond Cleans <ArrowRight size={14} /></Link>
              </FadeIn>
              <ScaleIn delay={0.15}>
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <Image src="/images/04_before_after_oven.png" alt="Before and after oven cleaning" width={600} height={400} className="w-full object-cover" />
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeIn className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                Why Melbourne Chooses <span className="text-gradient">Central Sea</span>
              </h2>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trustSignals.map((t) => (
                <StaggerItem key={t.title}>
                  <div className="bg-white rounded-3xl p-7 shadow-sm flex gap-4 h-full">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #e8f4fd, #d0ecf8)" }}>
                      <t.icon size={22} className="text-[#0077B6]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{t.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeIn className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                Booking Takes <span className="text-gradient">60 Seconds</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">No phone tag, no back-and-forth quotes. Pick a time, get a price, done.</p>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { num: "1", icon: "💻", title: "Get your quote", desc: "Use our instant calculator — select service, size, and add-ons. Fixed price in seconds." },
                { num: "2", icon: "📅", title: "Pick a time", desc: "Choose a date and window that works for you — weekday, weekend, early morning." },
                { num: "3", icon: "🔑", title: "We arrive ready", desc: "Your cleaner arrives on time with all equipment and products. No need to be home." },
                { num: "4", icon: "✅", title: "You love it", desc: "If anything isn't right, we come back within 48 hours and fix it free." },
              ].map((step) => (
                <StaggerItem key={step.num}>
                  <div className="bg-[#F8F9FA] rounded-3xl p-7 text-center h-full">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, #023E8A, #0077B6)" }}
                    >
                      {step.num}
                    </div>
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h3 className="font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <FadeIn className="text-center mt-10">
              <Link href="/quote" className="btn btn-primary px-8 py-4 text-base">Book My Clean <ArrowRight size={16} /></Link>
            </FadeIn>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScaleIn className="relative rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
                <Image src="/images/35_team_group_outside.png" alt="Central Sea Cleaning team" width={600} height={450} className="w-full object-cover" />
              </ScaleIn>
              <FadeIn direction="left" className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                  Real People, <span className="text-gradient">Real Results</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">We&apos;re a team of professional cleaners who genuinely care about the work we do. Fully equipped, fully insured, and always friendly. We bring everything — you just open the door.</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[{ num: "$10M+", label: "Public Liability Insurance" }, { num: "100%", label: "Bring All Equipment" }, { num: "48hr", label: "Re-clean Response" }, { num: "All", label: "Melbourne Suburbs" }].map((item) => (
                    <div key={item.label} className="bg-gray-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-[#0077B6] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{item.num}</div>
                      <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="btn btn-outline">Meet the Team <ArrowRight size={14} /></Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20" style={{ background: "#F8F9FA" }}>
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeIn className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif", color: "#1A1A2E" }}>
                Don&apos;t Take Our Word <span className="text-gradient">for It</span>
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="font-semibold">4.9 out of 5</span>
                <span>from 127+ verified reviews</span>
              </div>
            </FadeIn>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="bg-white rounded-3xl p-7 shadow-sm h-full">
                    <div className="flex text-yellow-400 mb-4">{Array.from({ length: t.stars }).map((_, i) => <span key={i}>★</span>)}</div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #0077B6, #00B4D8)" }}>{t.name[0]}</div>
                      <div>
                        <div className="font-bold text-sm text-[#1A1A2E]">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.suburb} · {t.service}</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #0077B6 60%, #00B4D8 100%)" }}>
          <FadeIn className="container mx-auto px-6 max-w-4xl text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Ready for a Spotless Home?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">Get your instant fixed-price quote in under 60 seconds. No phone calls, no hidden fees — just a clean you&apos;ll love.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/quote" className="btn btn-primary text-base px-8 py-4">Get My Instant Quote <ArrowRight size={16} /></Link>
              <a href="tel:0404378911" className="btn btn-secondary text-base px-8 py-4"><Phone size={16} /> 0404 378 911</a>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
