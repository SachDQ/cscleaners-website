"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Phone, ChevronRight } from "lucide-react";

type Step = 1 | 2 | 3;

const PREMISES_TYPES = [
  { key: "office", label: "Office", emoji: "🏢" },
  { key: "medical", label: "Medical / Clinic", emoji: "🩺" },
  { key: "childcare", label: "Childcare / Education", emoji: "🎒" },
  { key: "gym", label: "Gym / Fitness", emoji: "💪" },
  { key: "retail", label: "Retail", emoji: "🛍️" },
  { key: "industrial", label: "Industrial / Warehouse", emoji: "🏭" },
  { key: "body_corporate", label: "Body Corporate / Strata", emoji: "🏘️" },
  { key: "other", label: "Other", emoji: "📋" },
];

const CURRENT_ARRANGEMENT = [
  { key: "none", label: "No current cleaner" },
  { key: "in_house", label: "Cleaned in-house" },
  { key: "contracted", label: "Currently contracted out" },
  { key: "trialling", label: "Trialling a provider" },
];

const FREQUENCIES = [
  { key: "daily", label: "Daily (Mon–Fri)" },
  { key: "3x_week", label: "3× per week" },
  { key: "weekly", label: "Weekly" },
  { key: "fortnightly", label: "Fortnightly" },
  { key: "monthly", label: "Monthly" },
  { key: "one_off", label: "One-off / not sure yet" },
];

const PAIN_POINTS = [
  "Inconsistent quality",
  "Missed cleans",
  "Slow communication",
  "Price keeps rising",
  "Want eco-friendly products",
  "Need flexible scheduling",
  "Compliance / reporting required",
  "Just exploring options",
];

const CONTACT_TIMES = ["Anytime (9–5)", "Morning (9–12)", "Lunchtime (12–2)", "Afternoon (2–5)", "After hours / evening"];

export default function BusinessLeadForm() {
  const [step, setStep] = useState<Step>(1);

  // Premises details
  const [businessName, setBusinessName] = useState("");
  const [premisesType, setPremisesType] = useState("");
  const [suburb, setSuburb] = useState("");
  const [sqm, setSqm] = useState("");
  const [arrangement, setArrangement] = useState("");
  const [frequency, setFrequency] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);

  // Contact
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const togglePain = (p: string) => {
    setPainPoints((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const canAdvanceStep1 = premisesType && suburb;
  const canSubmit = name && email && (phone || email);

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      formType: "business_lead",
      submittedAt: new Date().toISOString(),
      source: "cscleaners.com.au/business",
      // Premises
      businessName,
      premisesType,
      suburb,
      approxSqm: sqm,
      currentArrangement: arrangement,
      requestedFrequency: frequency,
      painPoints,
      // Contact
      contactName: name,
      contactRole: role,
      email,
      phone,
      bestContactTime: bestTime,
      notes,
    };
    // Always POST to Cloudflare Pages Function (/api/lead) — handles email + webhook + D1
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
    // Optional: also fire to a legacy webhook (Make/Zapier) if configured
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-10 shadow-md text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: "linear-gradient(135deg, #0077B6, #00B4D8)" }}
        >
          <CheckCircle size={32} className="text-white" />
        </div>
        <h2
          className="text-2xl font-bold text-[#1A1A2E] mb-3"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          Got it — we&apos;ll be in touch within 2 hours
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We&apos;ll review your details and come back with a transparent fixed-price proposal. Most of our quotes include a brief 10-minute site walk-through to get the scope exactly right.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:0404378911" className="btn btn-primary"><Phone size={14} /> Call us now</a>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setBusinessName("");
              setPremisesType("");
              setSuburb("");
              setSqm("");
              setArrangement("");
              setFrequency("");
              setPainPoints([]);
              setName("");
              setRole("");
              setEmail("");
              setPhone("");
              setBestTime("");
              setNotes("");
            }}
            className="btn btn-outline"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      {/* Progress */}
      <div className="flex" style={{ background: "#F8F9FA" }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="flex-1 h-1.5"
            style={{ background: step >= s ? "#0077B6" : "#e5e7eb", transition: "background 0.3s" }}
          />
        ))}
      </div>

      <div className="p-8">
        {/* Step 1 — Premises */}
        {step === 1 && (
          <div>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Tell us about the premises
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Two minutes. The more detail you give, the tighter our quote.
            </p>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Business / organisation name <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                type="text"
                placeholder="e.g. Northcote Family Medical"
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Premises type *</label>
              <div className="grid grid-cols-2 gap-2">
                {PREMISES_TYPES.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPremisesType(p.key)}
                    className="flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-semibold text-[#1A1A2E] transition-all"
                    style={{
                      borderColor: premisesType === p.key ? "#0077B6" : "#e5e7eb",
                      background: premisesType === p.key ? "#e8f4fd" : "white",
                    }}
                  >
                    <span className="text-base">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Suburb *</label>
                <input
                  value={suburb}
                  onChange={(e) => setSuburb(e.target.value)}
                  type="text"
                  placeholder="e.g. Thomastown"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Approx. size (sqm) <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  value={sqm}
                  onChange={(e) => setSqm(e.target.value)}
                  type="text"
                  placeholder="e.g. 350"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canAdvanceStep1}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2 — Current arrangement + needs */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              What are you working with today?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Optional but useful — helps us suggest the right scope and price.
            </p>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Current cleaning arrangement</label>
              <div className="grid grid-cols-2 gap-2">
                {CURRENT_ARRANGEMENT.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setArrangement(c.key)}
                    className="p-3 rounded-xl border-2 text-sm font-semibold text-[#1A1A2E] transition-all"
                    style={{
                      borderColor: arrangement === c.key ? "#0077B6" : "#e5e7eb",
                      background: arrangement === c.key ? "#e8f4fd" : "white",
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">How often do you need cleans?</label>
              <div className="grid grid-cols-2 gap-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFrequency(f.key)}
                    className="p-3 rounded-xl border-2 text-sm font-semibold text-[#1A1A2E] transition-all"
                    style={{
                      borderColor: frequency === f.key ? "#0077B6" : "#e5e7eb",
                      background: frequency === f.key ? "#e8f4fd" : "white",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                What&apos;s on your mind? <span className="font-normal text-gray-400">(select any that apply)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PAIN_POINTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePain(p)}
                    className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                    style={{
                      borderColor: painPoints.includes(p) ? "#0077B6" : "#e5e7eb",
                      background: painPoints.includes(p) ? "#e8f4fd" : "white",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn btn-primary w-full justify-center"
            >
              Continue to your details <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Step 3 — Contact */}
        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              How can we reach you?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We respond within 2 business hours, often sooner.
            </p>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Jane Smith"
                    className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Role <span className="font-normal text-gray-400">(optional)</span>
                  </label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    placeholder="e.g. Practice manager"
                    className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="jane@business.com.au"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="0404 378 911"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Best time to call</label>
                <div className="grid grid-cols-2 gap-2">
                  {CONTACT_TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBestTime(t)}
                      className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] transition-all"
                      style={{
                        borderColor: bestTime === t ? "#0077B6" : "#e5e7eb",
                        background: bestTime === t ? "#e8f4fd" : "white",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Anything else? <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Access details, compliance requirements, contract renewal date, anything we should know..."
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send my enquiry"} {!submitting && <ArrowRight size={14} />}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              We&apos;ll reply within 2 business hours · No obligation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
