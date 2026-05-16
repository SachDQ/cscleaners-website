"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { trackLeadConversion } from "@/lib/tracking";

type Step = 1 | 2 | 3;

const SUBURBS = [
  "Thomastown", "Reservoir", "Preston", "Coburg", "Brunswick",
  "Fitzroy", "Collingwood", "Northcote", "Bundoora", "Epping",
  "Lalor", "Mill Park", "South Morang", "Heidelberg", "Ivanhoe",
  "Carlton", "Richmond", "Footscray", "Essendon",
];

const PREMISES = [
  "Office",
  "Medical / clinic",
  "Childcare / school",
  "Gym / fitness",
  "Retail",
  "Industrial / warehouse",
  "End-of-lease / bond",
  "Builders / post-construction",
  "Body corporate / strata",
];

const YES_NO_WILL = [
  { key: "yes", label: "Yes — current" },
  { key: "no", label: "No" },
  { key: "will_obtain", label: "Will obtain if engaged" },
];

const RATE_RANGES = [
  { key: "under_30", label: "Under $30/hr" },
  { key: "30_35", label: "$30–$35/hr" },
  { key: "35_40", label: "$35–$40/hr" },
  { key: "40_45", label: "$40–$45/hr" },
  { key: "45_plus", label: "$45/hr+" },
  { key: "negotiable", label: "Negotiable / per-job" },
];

const HOURS_RANGES = [
  { key: "under_10", label: "Under 10 hrs/week" },
  { key: "10_20", label: "10–20 hrs/week" },
  { key: "20_30", label: "20–30 hrs/week" },
  { key: "30_40", label: "30–40 hrs/week" },
  { key: "full_time", label: "Full-time / 40+ hrs" },
  { key: "flexible", label: "Flexible / on-call" },
];

const EQUIPMENT = [
  "Backpack / commercial vacuum",
  "Mop / bucket system",
  "Floor scrubber",
  "Carpet extractor",
  "Window kit",
  "Vehicle for transport",
  "Ladder (2m+)",
  "Eco / commercial chemicals",
];

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
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function MultiSelectDisclosure({
  label,
  selected,
  options,
  onToggle,
  required,
  placeholder,
  cols = 2,
}: {
  label: string;
  selected: string[];
  options: string[];
  onToggle: (v: string) => void;
  required?: boolean;
  placeholder: string;
  cols?: number;
}) {
  const [open, setOpen] = useState(false);
  const summary = selected.length === 0 ? placeholder : `${selected.length} selected · ${selected.slice(0, 2).join(", ")}${selected.length > 2 ? "…" : ""}`;
  const gridClass = cols === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {label} {required && "*"}
      </label>
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
          <div className={`grid ${gridClass} gap-2`}>
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

export default function ContractorApplicationForm() {
  const [step, setStep] = useState<Step>(1);

  const [name, setName] = useState("");
  const [abn, setAbn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearsExp, setYearsExp] = useState("");

  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [otherSuburbs, setOtherSuburbs] = useState("");
  const [premisesExp, setPremisesExp] = useState<string[]>([]);
  const [hoursAvailable, setHoursAvailable] = useState("");
  const [rateExpectation, setRateExpectation] = useState("");

  const [publicLiability, setPublicLiability] = useState("");
  const [policeCheck, setPoliceCheck] = useState("");
  const [wwcc, setWwcc] = useState("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [references, setReferences] = useState("");
  const [currentCommitments, setCurrentCommitments] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (val: string, arr: string[], setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const canAdvance1 = name && email && phone;
  const canAdvance2 = (suburbs.length > 0 || otherSuburbs.trim().length > 0) && premisesExp.length > 0;
  const canSubmit = publicLiability && policeCheck;

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      formType: "contractor_application",
      submittedAt: new Date().toISOString(),
      source: "cscleaners.com.au/contractor",
      name,
      abn,
      email,
      phone,
      yearsExperience: yearsExp,
      suburbs,
      otherSuburbs,
      premisesExperience: premisesExp,
      hoursAvailable,
      rateExpectation,
      publicLiability,
      policeCheck,
      workingWithChildrenCheck: wwcc,
      equipment,
      references,
      currentCommitments,
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
    trackLeadConversion("contractor_application", { suburbs: suburbs.join(",") });
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
          Thanks — you&apos;re on our panel list
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We&apos;ll review your details and add you to our subcontractor panel. When a contract comes up that matches your coverage and capacity, we&apos;ll reach out directly. No pressure, no obligation.
        </p>
        <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn btn-outline">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      <div className="flex" style={{ background: "#F8F9FA" }}>
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 h-1.5" style={{ background: step >= s ? "#0077B6" : "#e5e7eb", transition: "background 0.3s" }} />
        ))}
      </div>

      <div className="p-8">
        {/* Step 1 — About you */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Tell us about you
              </h2>
              <p className="text-gray-400 text-sm">3 minutes. We&apos;re building a panel for contracts we&apos;re pursuing across northern Melbourne.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full name *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Alex Singh"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  ABN <span className="font-normal text-gray-400">(or applied for)</span>
                </label>
                <input
                  value={abn}
                  onChange={(e) => setAbn(e.target.value)}
                  type="text"
                  placeholder="11 digits"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone *</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="04xx xxx xxx"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Years cleaning experience <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                type="text"
                placeholder="e.g. 3 years residential + 1 year commercial"
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
              />
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

        {/* Step 2 — Coverage */}
        {step === 2 && (
          <div className="space-y-5">
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-[#0077B6]">
              ← Back
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Where and what do you cover?
              </h2>
              <p className="text-gray-400 text-sm">We match contracts to your fit.</p>
            </div>

            <MultiSelectDisclosure
              label="Suburbs you can service"
              required
              selected={suburbs}
              options={SUBURBS}
              onToggle={(v) => toggle(v, suburbs, setSuburbs)}
              placeholder="Pick the suburbs you can reach"
              cols={3}
            />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Other suburbs / notes <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                value={otherSuburbs}
                onChange={(e) => setOtherSuburbs(e.target.value)}
                type="text"
                placeholder="e.g. Pascoe Vale, Glenroy"
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
              />
            </div>

            <MultiSelectDisclosure
              label="Premises types you've cleaned"
              required
              selected={premisesExp}
              options={PREMISES}
              onToggle={(v) => toggle(v, premisesExp, setPremisesExp)}
              placeholder="Pick all that apply"
            />

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Hours available"
                value={hoursAvailable}
                onChange={setHoursAvailable}
                options={HOURS_RANGES}
              />
              <SelectField
                label="Rate expectation"
                value={rateExpectation}
                onChange={setRateExpectation}
                options={RATE_RANGES}
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!canAdvance2}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Step 3 — Compliance */}
        {step === 3 && (
          <div className="space-y-5">
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-[#0077B6]">
              ← Back
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] mb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                Compliance and kit
              </h2>
              <p className="text-gray-400 text-sm">
                &quot;Will obtain&quot; is fine for now — we&apos;ll help you sort them.
              </p>
            </div>

            <SelectField
              label="Public liability insurance"
              required
              value={publicLiability}
              onChange={setPublicLiability}
              options={YES_NO_WILL}
            />
            <SelectField
              label="National police check"
              required
              value={policeCheck}
              onChange={setPoliceCheck}
              options={YES_NO_WILL}
            />
            <SelectField
              label="Working with Children Check"
              hint="needed for childcare/school work"
              value={wwcc}
              onChange={setWwcc}
              options={YES_NO_WILL}
            />

            <MultiSelectDisclosure
              label="Equipment owned"
              selected={equipment}
              options={EQUIPMENT}
              onToggle={(v) => toggle(v, equipment, setEquipment)}
              placeholder="What kit do you bring?"
            />

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                References <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                value={references}
                onChange={(e) => setReferences(e.target.value)}
                rows={2}
                placeholder="Name, company, phone or email of past clients/employers"
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Current commitments <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                value={currentCommitments}
                onChange={(e) => setCurrentCommitments(e.target.value)}
                type="text"
                placeholder="e.g. 2 weekly clients, available weekends"
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Anything else? <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Specialisations, language skills, preferred work types..."
                className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Submit application"} {!submitting && <ArrowRight size={14} />}
            </button>
            <p className="text-xs text-gray-400 text-center">
              By applying you agree to be contacted about subcontracting opportunities. We do not sell or share your details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
