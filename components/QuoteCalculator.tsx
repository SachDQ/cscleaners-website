"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Phone, ChevronRight, TrendingDown } from "lucide-react";

type Track = "residential" | "bond" | "commercial" | "builders" | "switch" | "custom" | null;
type Step = 1 | 2 | 3 | 4;

const ADDON_PRICES: Record<string, number> = {
  oven: 89, fridge: 45, windows_inside: 79, carpet: 45,
  balcony: 55, garage: 55, carpet_steam: 45, blinds: 40,
  exterior_windows: 119,
};

const BASE_RESIDENTIAL: Record<number, Record<number, number>> = {
  1: { 1: 190, 2: 220 },
  2: { 1: 210, 2: 245 },
  3: { 1: 255, 2: 295 },
  4: { 1: 295, 2: 345 },
  5: { 1: 340, 2: 395 },
  6: { 1: 390, 2: 450 },
};

const BASE_BOND: Record<number, Record<number, number>> = {
  1: { 1: 280, 2: 310 },
  2: { 1: 320, 2: 360 },
  3: { 1: 395, 2: 445 },
  4: { 1: 470, 2: 530 },
  5: { 1: 545, 2: 610 },
  6: { 1: 620, 2: 690 },
};

const FREQ_DISCOUNT: Record<string, number> = {
  once: 1, weekly: 0.82, fortnightly: 0.88, monthly: 0.94,
};

function formatPrice(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

const SWITCH_REASONS = [
  "Quality issues",
  "Unreliable / missed cleans",
  "Price too high",
  "Poor communication",
  "Want eco-friendly products",
  "Other",
];

export default function QuoteCalculator() {
  const [track, setTrack] = useState<Track>(null);
  const [step, setStep] = useState<Step>(1);

  // Residential/Bond fields
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [addons, setAddons] = useState<string[]>([]);
  const [furnished, setFurnished] = useState(false);
  const [soiled, setSoiled] = useState(false);
  const [cleanType, setCleanType] = useState<"regular" | "deep">("regular");

  // Commercial fields (simplified)
  const [spaceType, setSpaceType] = useState("office");
  const [freq, setFreq] = useState("weekly");

  // Switch & Save fields
  const [currentProvider, setCurrentProvider] = useState("");
  const [switchPropertyType, setSwitchPropertyType] = useState("office");
  const [switchFreq, setSwitchFreq] = useState("weekly");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [contractExpiry, setContractExpiry] = useState("");
  const [switchReason, setSwitchReason] = useState("");

  // Contact fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Custom quote
  const [customMessage, setCustomMessage] = useState("");
  const [builderNotes, setBuilderNotes] = useState("");

  const toggleAddon = (key: string) => {
    setAddons((prev) => prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]);
  };

  const calcResidential = () => {
    const base = BASE_RESIDENTIAL[Math.min(bedrooms, 6)]?.[Math.min(bathrooms, 2)] ?? 390;
    const multiplier = cleanType === "deep" ? 1.35 : 1;
    const addonTotal = addons.reduce((sum, key) => sum + (ADDON_PRICES[key] ?? 0), 0);
    return Math.round(base * multiplier + addonTotal);
  };

  const calcBond = () => {
    const base = BASE_BOND[Math.min(bedrooms, 6)]?.[Math.min(bathrooms, 2)] ?? 620;
    const furnishedExtra = furnished ? 100 : 0;
    const soiledExtra = soiled ? Math.round(base * 0.2) : 0;
    const addonTotal = addons.reduce((sum, key) => sum + (ADDON_PRICES[key] ?? 0), 0);
    return Math.round(base + furnishedExtra + soiledExtra + addonTotal);
  };

  const calcSwitchSavings = () => {
    const spend = parseFloat(monthlySpend.replace(/[^0-9.]/g, ""));
    if (!spend || isNaN(spend)) return null;
    return { monthly: Math.round(spend * 0.25), annual: Math.round(spend * 0.25 * 12), ourPrice: Math.round(spend * 0.75) };
  };

  const getPrice = () => {
    if (track === "residential") return calcResidential();
    if (track === "bond") return calcBond();
    return 0;
  };

  const getIncludes = () => {
    if (track === "residential") return cleanType === "deep"
      ? ["All surfaces, floors, bathrooms & kitchen", "Inside cupboards & drawers", "Appliance exteriors", "Skirting boards, window tracks", "Grout lines & wall marks", "All products & equipment supplied"]
      : ["All surfaces, floors, bathrooms & kitchen", "Skirting boards & light switches", "Dusting throughout", "Internal windows", "All products & equipment supplied"];
    if (track === "bond") return ["REIV-standard full checklist", "Kitchen, bathrooms, all rooms", "Inside cupboards & wardrobes", "Wall marks, skirting, light fittings", "7-day free re-clean guarantee", "Bond-back written guarantee"];
    if (track === "commercial") return ["All desks, surfaces & floors", "Kitchen/breakroom & bathrooms", "Bins emptied & relined", "Reception & common areas", "Glass & entry doors", "No lock-in contract"];
    return [];
  };

  const getUpsell = () => {
    if (track === "residential") return { text: "💡 Most customers add an oven clean (+$89) — it's our most popular add-on.", key: "oven" };
    if (track === "bond") return { text: "💡 90% of agents flag carpets. Add steam cleaning (+$45/room) to protect your bond.", key: "carpet_steam" };
    return null;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      track, name, phone, email, date,
      notes: track === "builders" ? builderNotes : notes,
      ...(track === "residential" || track === "bond" ? { bedrooms, bathrooms, addons, furnished, soiled, cleanType } : {}),
      ...(track === "commercial" ? { spaceType, freq } : {}),
      ...(track === "switch" ? { currentProvider, switchPropertyType, switchFreq, monthlySpend, contractExpiry, switchReason } : {}),
      ...(track === "custom" ? { customMessage } : {}),
      price: (track === "residential" || track === "bond") ? getPrice() : null,
      submittedAt: new Date().toISOString(),
    };
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    const savings = track === "switch" ? calcSwitchSavings() : null;
    return (
      <div className="bg-white rounded-3xl p-10 shadow-md text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, #0077B6, #00B4D8)" }}>
          <CheckCircle size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
          {track === "switch" ? "We'll Be in Touch Within 2 Hours!" : "Quote Request Received!"}
        </h2>
        <p className="text-gray-500 mb-6">
          {track === "switch"
            ? "Our team will review your current arrangement and prepare a personalised savings proposal."
            : "We'll confirm your booking within 2 hours. Check your email for your quote summary."}
        </p>
        {(track === "residential" || track === "bond") && (
          <div className="inline-block bg-blue-50 rounded-2xl px-8 py-4 mb-6">
            <div className="text-sm text-gray-400 mb-1">Your estimated price</div>
            <div className="text-4xl font-bold text-[#0077B6]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{formatPrice(getPrice())}</div>
          </div>
        )}
        {savings && (
          <div className="inline-block rounded-2xl px-8 py-4 mb-6" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
            <div className="text-sm text-gray-400 mb-1">Your estimated annual saving</div>
            <div className="text-4xl font-bold text-[#0077B6]" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{formatPrice(savings.annual)}</div>
          </div>
        )}
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:0404378911" className="btn btn-primary"><Phone size={14} /> Call Us to Confirm</a>
          <button onClick={() => { setSubmitted(false); setStep(1); setTrack(null); }} className="btn btn-outline">Start New Quote</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Progress */}
      {track && track !== "custom" && track !== "builders" && track !== "switch" && (
        <div className="flex" style={{ background: "#F8F9FA" }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 h-1.5" style={{ background: step >= s ? "#0077B6" : "#e5e7eb", transition: "background 0.3s" }} />
          ))}
        </div>
      )}
      {track === "switch" && (
        <div className="flex" style={{ background: "#F8F9FA" }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 h-1.5" style={{ background: step >= s ? "#FFD166" : "#e5e7eb", transition: "background 0.3s" }} />
          ))}
        </div>
      )}

      <div className="p-8">
        {/* Step 1 — select track */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>What are you looking for?</h2>
            <p className="text-gray-400 text-sm mb-7">Select the service that best matches your needs.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "residential", emoji: "🏠", label: "Home Clean", sub: "Regular or one-off deep clean" },
                { key: "bond", emoji: "🔑", label: "End-of-Lease / Bond", sub: "Move-out, inspection-ready" },
                { key: "commercial", emoji: "🏢", label: "Commercial / Office", sub: "Business & retail spaces" },
                { key: "builders", emoji: "🏗️", label: "Builders Clean", sub: "Post-construction handover" },
                { key: "switch", emoji: "💰", label: "Already Have a Cleaner?", sub: "Save up to 25% — we'll beat your price" },
                { key: "custom", emoji: "💬", label: "Something Else", sub: "Describe your needs" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setTrack(t.key as Track); setStep(2); }}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:border-[#0077B6] hover:bg-blue-50 relative"
                  style={{ borderColor: t.key === "switch" ? "#FFD166" : "#e5e7eb", background: t.key === "switch" ? "rgba(255,209,102,0.07)" : "white" }}
                >
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <div className="font-bold text-[#1A1A2E] text-sm" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{t.label}</div>
                    <div className="text-xs text-gray-400">{t.sub}</div>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-gray-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Residential details */}
        {step === 2 && track === "residential" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Tell us about your home</h2>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Type of clean</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ key: "regular", label: "Regular Clean", sub: "Weekly / fortnightly maintenance" }, { key: "deep", label: "Deep Clean", sub: "Intensive one-off (+35%)" }].map((c) => (
                  <button key={c.key} onClick={() => setCleanType(c.key as "regular" | "deep")}
                    className="p-4 rounded-2xl border-2 text-left transition-all"
                    style={{ borderColor: cleanType === c.key ? "#0077B6" : "#e5e7eb", background: cleanType === c.key ? "#e8f4fd" : "white" }}>
                    <div className="font-bold text-sm text-[#1A1A2E]">{c.label}</div>
                    <div className="text-xs text-gray-400">{c.sub}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Bedrooms</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button key={n} onClick={() => setBedrooms(n)}
                    className="w-11 h-11 rounded-xl font-bold text-sm transition-all"
                    style={{ background: bedrooms === n ? "#0077B6" : "#F8F9FA", color: bedrooms === n ? "white" : "#1A1A2E" }}>
                    {n === 6 ? "6+" : n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Bathrooms</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} onClick={() => setBathrooms(n)}
                    className="w-11 h-11 rounded-xl font-bold text-sm transition-all"
                    style={{ background: bathrooms === n ? "#0077B6" : "#F8F9FA", color: bathrooms === n ? "white" : "#1A1A2E" }}>
                    {n === 4 ? "4+" : n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Add-ons <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="grid grid-cols-2 gap-2">
                {[{ key: "oven", label: "Oven clean", price: "+$89" }, { key: "fridge", label: "Fridge (inside)", price: "+$45" }, { key: "windows_inside", label: "Inside windows", price: "+$79" }, { key: "carpet", label: "Carpet steam/room", price: "+$45" }, { key: "balcony", label: "Balcony", price: "+$55" }, { key: "garage", label: "Garage", price: "+$55" }].map((a) => (
                  <button key={a.key} onClick={() => toggleAddon(a.key)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left text-sm transition-all"
                    style={{ borderColor: addons.includes(a.key) ? "#0077B6" : "#e5e7eb", background: addons.includes(a.key) ? "#e8f4fd" : "white" }}>
                    <span className="font-medium text-[#1A1A2E]">{a.label}</span>
                    <span className="text-[#0077B6] font-bold text-xs">{a.price}</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(3)} className="btn btn-primary w-full justify-center">See My Price <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 2 — Bond details */}
        {step === 2 && track === "bond" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Tell us about the property</h2>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Bedrooms</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button key={n} onClick={() => setBedrooms(n)} className="w-11 h-11 rounded-xl font-bold text-sm transition-all"
                    style={{ background: bedrooms === n ? "#0077B6" : "#F8F9FA", color: bedrooms === n ? "white" : "#1A1A2E" }}>
                    {n === 6 ? "6+" : n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Bathrooms</label>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} onClick={() => setBathrooms(n)} className="w-11 h-11 rounded-xl font-bold text-sm transition-all"
                    style={{ background: bathrooms === n ? "#0077B6" : "#F8F9FA", color: bathrooms === n ? "white" : "#1A1A2E" }}>
                    {n === 4 ? "4+" : n}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Property condition</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ key: false, label: "Standard", sub: "Normal wear and use" }, { key: true, label: "Heavily Soiled", sub: "Significant build-up (+20%)" }].map((c) => (
                  <button key={String(c.key)} onClick={() => setSoiled(c.key)}
                    className="p-4 rounded-2xl border-2 text-left transition-all"
                    style={{ borderColor: soiled === c.key ? "#0077B6" : "#e5e7eb", background: soiled === c.key ? "#e8f4fd" : "white" }}>
                    <div className="font-bold text-sm text-[#1A1A2E]">{c.label}</div>
                    <div className="text-xs text-gray-400">{c.sub}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">Furnished?</label>
              <div className="grid grid-cols-2 gap-3">
                {[{ key: false, label: "Unfurnished" }, { key: true, label: "Furnished (+$100)" }].map((c) => (
                  <button key={String(c.key)} onClick={() => setFurnished(c.key)}
                    className="p-4 rounded-2xl border-2 text-left transition-all"
                    style={{ borderColor: furnished === c.key ? "#0077B6" : "#e5e7eb", background: furnished === c.key ? "#e8f4fd" : "white" }}>
                    <div className="font-bold text-sm text-[#1A1A2E]">{c.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Add-ons</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ key: "carpet_steam", label: "Carpet steam/room", price: "+$45" }, { key: "exterior_windows", label: "Exterior windows", price: "+$119" }, { key: "blinds", label: "Blind cleaning", price: "+$40" }, { key: "garage", label: "Garage", price: "+$55" }].map((a) => (
                  <button key={a.key} onClick={() => toggleAddon(a.key)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left text-sm transition-all"
                    style={{ borderColor: addons.includes(a.key) ? "#0077B6" : "#e5e7eb", background: addons.includes(a.key) ? "#e8f4fd" : "white" }}>
                    <span className="font-medium text-[#1A1A2E]">{a.label}</span>
                    <span className="text-[#0077B6] font-bold text-xs">{a.price}</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(3)} className="btn btn-primary w-full justify-center">See My Bond Clean Price <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 2 — Commercial (simplified) */}
        {step === 2 && track === "commercial" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Tell us about your space</h2>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Space type</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ key: "office", label: "Office" }, { key: "retail", label: "Retail" }, { key: "warehouse", label: "Warehouse" }, { key: "medical", label: "Medical / Clinic" }].map((s) => (
                  <button key={s.key} onClick={() => setSpaceType(s.key)}
                    className="p-3 rounded-xl border-2 font-bold text-sm transition-all text-[#1A1A2E]"
                    style={{ borderColor: spaceType === s.key ? "#0077B6" : "#e5e7eb", background: spaceType === s.key ? "#e8f4fd" : "white" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">How often?</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ key: "daily", label: "Daily" }, { key: "weekly", label: "Weekly" }, { key: "fortnightly", label: "Fortnightly" }, { key: "once", label: "One-off" }].map((f) => (
                  <button key={f.key} onClick={() => setFreq(f.key)}
                    className="p-3 rounded-xl border-2 font-bold text-sm transition-all text-[#1A1A2E]"
                    style={{ borderColor: freq === f.key ? "#0077B6" : "#e5e7eb", background: freq === f.key ? "#e8f4fd" : "white" }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setStep(4)} className="btn btn-primary w-full justify-center">Get My Custom Quote <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 2 — Builders */}
        {step === 2 && track === "builders" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Builders Clean Quote</h2>
            <p className="text-gray-500 text-sm mb-6">Builders cleans are priced individually based on the size, stage and condition of your project. Fill in your details and we&apos;ll get back to you with a quote within 2 hours.</p>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Describe your project</label>
              <textarea value={builderNotes} onChange={(e) => setBuilderNotes(e.target.value)} rows={4}
                placeholder="e.g. 3-bedroom new build, final handover clean, approximately 180sqm, Melbourne suburb..."
                className="w-full rounded-2xl border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-[#0077B6] resize-none" />
            </div>
            <button onClick={() => setStep(4)} className="btn btn-primary w-full justify-center">Continue to Booking <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 2 — Switch & Save */}
        {step === 2 && track === "switch" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <div className="rounded-2xl px-5 py-4 mb-6 flex items-start gap-3" style={{ background: "rgba(255,209,102,0.12)", border: "1.5px solid #FFD166" }}>
              <TrendingDown size={18} className="text-[#0077B6] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#1A1A2E] text-sm">We&apos;ll beat your current price by 25%.</p>
                <p className="text-xs text-gray-500 mt-0.5">Tell us about your current arrangement and we&apos;ll prepare a personalised savings proposal — no lock-in, no obligation.</p>
              </div>
            </div>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-5" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Your Current Arrangement</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What type of property?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ key: "office", label: "Office / Commercial" }, { key: "home", label: "Home / Residential" }, { key: "retail", label: "Retail" }, { key: "strata", label: "Strata / Building" }].map((p) => (
                    <button key={p.key} onClick={() => setSwitchPropertyType(p.key)}
                      className="p-3 rounded-xl border-2 font-bold text-sm transition-all text-[#1A1A2E]"
                      style={{ borderColor: switchPropertyType === p.key ? "#0077B6" : "#e5e7eb", background: switchPropertyType === p.key ? "#e8f4fd" : "white" }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How often are they cleaning?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ key: "daily", label: "Daily" }, { key: "weekly", label: "Weekly" }, { key: "fortnightly", label: "Fortnightly" }, { key: "monthly", label: "Monthly" }].map((f) => (
                    <button key={f.key} onClick={() => setSwitchFreq(f.key)}
                      className="p-3 rounded-xl border-2 font-bold text-sm transition-all text-[#1A1A2E]"
                      style={{ borderColor: switchFreq === f.key ? "#0077B6" : "#e5e7eb", background: switchFreq === f.key ? "#e8f4fd" : "white" }}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Approximate monthly spend <span className="font-normal text-gray-400">(helps us calculate your savings)</span></label>
                <input value={monthlySpend} onChange={(e) => setMonthlySpend(e.target.value)} type="text"
                  placeholder="e.g. $800"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Current provider <span className="font-normal text-gray-400">(optional)</span></label>
                <input value={currentProvider} onChange={(e) => setCurrentProvider(e.target.value)} type="text"
                  placeholder="e.g. ABC Cleaning Co."
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Contract expiry / next renewal <span className="font-normal text-gray-400">(optional)</span></label>
                <input value={contractExpiry} onChange={(e) => setContractExpiry(e.target.value)} type="text"
                  placeholder="e.g. June 2025 or rolling month-to-month"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Main reason for considering a switch?</label>
                <div className="grid grid-cols-2 gap-2">
                  {SWITCH_REASONS.map((r) => (
                    <button key={r} onClick={() => setSwitchReason(r)}
                      className="p-2.5 rounded-xl border-2 text-xs font-semibold transition-all text-[#1A1A2E] text-left"
                      style={{ borderColor: switchReason === r ? "#0077B6" : "#e5e7eb", background: switchReason === r ? "#e8f4fd" : "white" }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setStep(3)} className="btn btn-primary w-full justify-center mt-7">
              See My Savings <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2 — Custom */}
        {step === 2 && track === "custom" && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Tell us what you need</h2>
            <p className="text-gray-500 text-sm mb-6">Not sure which service fits? Describe your situation and we&apos;ll work it out together.</p>
            <div className="mb-6">
              <textarea value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} rows={5}
                placeholder="e.g. I need a cleaner for a shared house after a party, about 4 bedrooms, kitchen is a mess, need it done by Friday..."
                className="w-full rounded-2xl border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-[#0077B6] resize-none" />
            </div>
            <button onClick={() => setStep(4)} className="btn btn-primary w-full justify-center">Continue <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 3 — Price reveal (residential/bond) */}
        {step === 3 && (track === "residential" || track === "bond") && (
          <div>
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Your Fixed Price</h2>
            <p className="text-gray-400 text-sm mb-6">Based on your selections — no hidden charges.</p>
            <div className="rounded-3xl p-7 mb-6 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
              <div className="text-sm text-gray-500 mb-1">Your price</div>
              <div className="text-5xl font-bold text-[#0077B6] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{formatPrice(getPrice())}</div>
              <div className="text-xs text-gray-400">Fixed price · All products & equipment included</div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What&apos;s included</p>
              <div className="space-y-2">
                {getIncludes().map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-[#0077B6] shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
            {getUpsell() && !addons.includes(getUpsell()!.key) && (
              <div className="rounded-2xl p-4 mb-6 border-2 cursor-pointer transition-all hover:border-[#0077B6]"
                style={{ borderColor: "#FFD166", background: "rgba(255,209,102,0.1)" }}
                onClick={() => toggleAddon(getUpsell()!.key)}>
                <p className="text-sm font-medium text-[#1A1A2E]">{getUpsell()!.text}</p>
                <p className="text-xs text-[#0077B6] mt-1 font-bold">Tap to add →</p>
              </div>
            )}
            <button onClick={() => setStep(4)} className="btn btn-primary w-full justify-center">Book This Clean <ArrowRight size={14} /></button>
          </div>
        )}

        {/* Step 3 — Switch savings reveal */}
        {step === 3 && track === "switch" && (() => {
          const savings = calcSwitchSavings();
          return (
            <div>
              <button onClick={() => setStep(2)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>Your Savings Estimate</h2>
              <p className="text-gray-400 text-sm mb-6">Based on our 25% price-beat guarantee.</p>

              {savings ? (
                <div className="rounded-3xl p-7 mb-6 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
                  <div className="text-sm text-gray-500 mb-1">Your estimated monthly saving</div>
                  <div className="text-5xl font-bold text-[#0077B6] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>{formatPrice(savings.monthly)}<span className="text-2xl">/mo</span></div>
                  <div className="text-sm font-semibold text-[#0077B6] mb-3">{formatPrice(savings.annual)} saved per year</div>
                  <div className="text-xs text-gray-400">Our price: {formatPrice(savings.ourPrice)}/month · 25% below your current spend</div>
                </div>
              ) : (
                <div className="rounded-3xl p-7 mb-6 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #d5f0f7)" }}>
                  <div className="text-4xl font-bold text-[#0077B6] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>25% Off</div>
                  <div className="text-sm text-gray-500">We guarantee to beat your current provider&apos;s price by 25%.</div>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {[
                  "Free first clean — no commitment",
                  "Month-to-month for your first 90 days",
                  "Same quality guarantee as long-term clients",
                  "We handle the transition — zero disruption",
                  "Police-checked, eco-friendly, fully insured",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-[#0077B6] shrink-0" /> {item}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-4 mb-6" style={{ background: "rgba(255,209,102,0.1)", border: "1.5px solid #FFD166" }}>
                <p className="text-sm font-bold text-[#1A1A2E]">📋 We&apos;ll also review your current quote</p>
                <p className="text-xs text-gray-500 mt-1">If you can share your current invoice or quote, we&apos;ll beat the exact figure — not just our estimate.</p>
              </div>

              <button onClick={() => setStep(4)} className="btn btn-primary w-full justify-center">Claim My Savings <ArrowRight size={14} /></button>
            </div>
          );
        })()}

        {/* Step 4 — Contact details */}
        {step === 4 && (
          <div>
            <button onClick={() => setStep(track === "builders" || track === "custom" || track === "commercial" ? 2 : 3)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">← Back</button>
            <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              {track === "switch" ? "Claim Your Savings" : "Your Details"}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {track === "switch" ? "We'll prepare your personalised proposal within 2 hours." : "We'll confirm your booking within 2 hours."}
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Jane Smith"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone number *</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="0404 378 911"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email address *</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="jane@email.com"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
              </div>
              {track !== "switch" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Preferred date</label>
                  <input value={date} onChange={(e) => setDate(e.target.value)} type="date"
                    className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]" />
                </div>
              )}
              {track === "switch" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Can you share your current quote? <span className="font-normal text-gray-400">(optional)</span></label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                    placeholder="Paste the amount or describe your current arrangement — we'll beat it by 25%"
                    className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none" />
                </div>
              )}
              {track !== "switch" && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Anything else we should know? <span className="text-gray-400 font-normal">(optional)</span></label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                    placeholder="Parking info, pets, access instructions, anything specific..."
                    className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none" />
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!name || !phone || !email || submitting}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : track === "switch" ? "Get My Savings Proposal" : "Submit My Quote Request"} {!submitting && <ArrowRight size={14} />}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              {track === "switch" ? "No lock-in. Free first clean. Proposal within 2 hours." : "We'll confirm within 2 hours · No payment required yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
