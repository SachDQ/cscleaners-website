"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Phone, ChevronDown } from "lucide-react";
import { trackLeadConversion } from "@/lib/tracking";

type Step = 1 | 2 | 3;

const PREMISES_TYPES = [
  { key: "office", label: "Office" },
  { key: "medical", label: "Medical / clinic / allied health" },
  { key: "childcare", label: "Childcare / school" },
  { key: "gym", label: "Gym / fitness studio" },
  { key: "retail", label: "Retail / shopfront" },
  { key: "industrial", label: "Industrial / warehouse" },
  { key: "body_corporate", label: "Body corporate / strata" },
  { key: "hospitality", label: "Cafe / restaurant / venue" },
  { key: "other", label: "Other (we'll ask)" },
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

// Shared select styling — matches the form's rounded-2xl input look
const SELECT_CLASS =
  "w-full appearance-none rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#0077B6] cursor-pointer";

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; label: string }[];
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label} {required && "*"}
        {hint && <span className="font-normal text-gray-400 ml-1">({hint})</span>}
      </label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className={SELECT_CLASS}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function MultiSelectDisclosure({
  label,
  selected,
  options,
  onToggle,
  placeholder,
}: {
  label: string;
  selected: string[];
  options: string[];
  onToggle: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const summary = selected.length === 0 ? placeholder : `${selected.length} selected`;
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm text-left text-[#1A1A2E] hover:border-gray-300 transition-colors"
      >
        <span className={selected.length === 0 ? "text-gray-400" : ""}>{summary}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-2 p-3 rounded-2xl border border-gray-100 bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => onToggle(o)}
                className="p-2 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                style={{
                  borderColor: selected.includes(o) ? "#0077B6" : "#e5e7eb",
                  background: selected.includes(o) ? "#e8f4fd" : "white",
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessLeadForm() {
  const [step, setStep] = useState<Step>(1);

  const [businessName, setBusinessName] = useState("");
  const [premisesType, setPremisesType] = useState("");
  const [suburb, setSuburb] = useState("");
  const [sqm, setSqm] = useState("");
  const [arrangement, setArrangement] = useState("");
  const [frequency, setFrequency] = useState("");
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const togglePain = (p: string) =>
    setPainPoints((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const canAdvance1 = premisesType && suburb;
  const canSubmit = name && email;

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      formType: "business_lead",
      submittedAt: new Date().toISOString(),
      source: "cscleaners.com.au/business",
      businessName,
      premisesType,
      suburb,
      approxSqm: sqm,
      currentArrangement: arrangement,
      requestedFrequency: frequency,
      painPoints,
      contactName: name,
      contactRole: role,
      email,
      phone,
      bestContactTime: bestTime,
      notes,
    };
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}
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
    trackLeadConversion("business_lead", { suburb, premisesType });
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
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-3" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
          Got it — we&apos;ll be in touch within 2 hours
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We&apos;ll review your details and come back with a transparent fixed-price proposal. Most of our quotes include a brief 10-minute site walk-through to get the scope exactly right.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:0404378911" className="btn btn-primary">
            <Phone size={14} /> Call us now
          </a>
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
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Tell us about the premises
              </h2>
              <p className="text-gray-400 text-sm">Two minutes. The more detail, the tighter our quote.</p>
            </div>

            <div>
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

            <SelectField
              label="Premises type"
              required
              value={premisesType}
              onChange={setPremisesType}
              options={PREMISES_TYPES}
            />

            <div className="grid grid-cols-2 gap-4">
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
              disabled={!canAdvance1}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 2 — Needs */}
        {step === 2 && (
          <div className="space-y-5">
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-[#0077B6]">
              ← Back
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                What are you working with today?
              </h2>
              <p className="text-gray-400 text-sm">Optional but useful — helps us scope and price.</p>
            </div>

            <SelectField
              label="Current cleaning arrangement"
              value={arrangement}
              onChange={setArrangement}
              options={CURRENT_ARRANGEMENT}
            />

            <SelectField
              label="How often do you need cleans?"
              value={frequency}
              onChange={setFrequency}
              options={FREQUENCIES}
            />

            <MultiSelectDisclosure
              label="What's on your mind?"
              selected={painPoints}
              options={PAIN_POINTS}
              onToggle={togglePain}
              placeholder="Select any that apply (optional)"
            />

            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn btn-primary w-full justify-center"
            >
              Continue to your details <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 3 — Contact */}
        {step === 3 && (
          <div className="space-y-5">
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-[#0077B6]">
              ← Back
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                How can we reach you?
              </h2>
              <p className="text-gray-400 text-sm">We respond within 2 business hours.</p>
            </div>

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
            <SelectField
              label="Best time to call"
              value={bestTime}
              onChange={setBestTime}
              options={CONTACT_TIMES.map((t) => ({ key: t, label: t }))}
            />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Anything else? <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Access, compliance needs, contract renewal date..."
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Send my enquiry"} {!submitting && <ArrowRight size={14} />}
            </button>
            <p className="text-xs text-gray-400 text-center">
              We&apos;ll reply within 2 business hours · No obligation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
