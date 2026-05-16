"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";

type Step = 1 | 2 | 3;

const SUBURBS = [
  "Thomastown", "Reservoir", "Preston", "Coburg", "Brunswick",
  "Fitzroy", "Collingwood", "Northcote", "Bundoora", "Epping",
  "Lalor", "Mill Park", "South Morang", "Heidelberg", "Ivanhoe",
  "Carlton", "Richmond", "Footscray", "Essendon", "Other (specify)",
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
  "Under $30/hr",
  "$30–$35/hr",
  "$35–$40/hr",
  "$40–$45/hr",
  "$45/hr+",
  "Negotiable / per-job",
];

const HOURS_RANGES = [
  "Under 10 hrs/week",
  "10–20 hrs/week",
  "20–30 hrs/week",
  "30–40 hrs/week",
  "Full-time / 40+ hrs",
  "Flexible / on-call",
];

export default function ContractorApplicationForm() {
  const [step, setStep] = useState<Step>(1);

  // About you
  const [name, setName] = useState("");
  const [abn, setAbn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearsExp, setYearsExp] = useState("");

  // Coverage + experience
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [otherSuburb, setOtherSuburb] = useState("");
  const [premisesExp, setPremisesExp] = useState<string[]>([]);
  const [hoursAvailable, setHoursAvailable] = useState("");
  const [rateExpectation, setRateExpectation] = useState("");

  // Compliance
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
  const canAdvance2 = suburbs.length > 0 && premisesExp.length > 0;
  const canSubmit = publicLiability && policeCheck;

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      formType: "contractor_application",
      submittedAt: new Date().toISOString(),
      source: "cscleaners.com.au/contractor",
      // About
      name,
      abn,
      email,
      phone,
      yearsExperience: yearsExp,
      // Coverage
      suburbs,
      otherSuburb,
      premisesExperience: premisesExp,
      hoursAvailable,
      rateExpectation,
      // Compliance
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
          Thanks — you&apos;re on our panel list
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We&apos;ll review your details and add you to our subcontractor panel. When a contract comes up that matches your coverage and capacity, we&apos;ll reach out directly. No pressure, no obligation.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          We engage subcontractors at standard market rates above the Cleaning Services Award 2020 minimums, on signed sub-contractor agreements with clear scope and payment terms.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="btn btn-outline"
        >
          Submit another application
        </button>
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
        {/* Step 1 — About you */}
        {step === 1 && (
          <div>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Tell us about you
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We&apos;re building a panel of vetted cleaners for contracts we&apos;re pursuing across northern Melbourne. This takes 3 minutes.
            </p>

            <div className="space-y-4 mb-6">
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

        {/* Step 2 — Coverage + Experience */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Where and what do you cover?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We match contracts based on suburb fit and premises experience.
            </p>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Suburbs you can service *</label>
              <div className="grid grid-cols-3 gap-2">
                {SUBURBS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s, suburbs, setSuburbs)}
                    className="p-2 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] transition-all"
                    style={{
                      borderColor: suburbs.includes(s) ? "#0077B6" : "#e5e7eb",
                      background: suburbs.includes(s) ? "#e8f4fd" : "white",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {suburbs.includes("Other (specify)") && (
                <input
                  value={otherSuburb}
                  onChange={(e) => setOtherSuburb(e.target.value)}
                  type="text"
                  placeholder="Specify other suburbs (comma-separated)"
                  className="w-full mt-3 rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
                />
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-bold text-gray-700 mb-2">Premises types you&apos;ve cleaned *</label>
              <div className="grid grid-cols-2 gap-2">
                {PREMISES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggle(p, premisesExp, setPremisesExp)}
                    className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                    style={{
                      borderColor: premisesExp.includes(p) ? "#0077B6" : "#e5e7eb",
                      background: premisesExp.includes(p) ? "#e8f4fd" : "white",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-7">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Hours available</label>
                <div className="space-y-2">
                  {HOURS_RANGES.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHoursAvailable(h)}
                      className="w-full p-2 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                      style={{
                        borderColor: hoursAvailable === h ? "#0077B6" : "#e5e7eb",
                        background: hoursAvailable === h ? "#e8f4fd" : "white",
                      }}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rate expectation</label>
                <div className="space-y-2">
                  {RATE_RANGES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRateExpectation(r)}
                      className="w-full p-2 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                      style={{
                        borderColor: rateExpectation === r ? "#0077B6" : "#e5e7eb",
                        background: rateExpectation === r ? "#e8f4fd" : "white",
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={!canAdvance2}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* Step 3 — Compliance */}
        {step === 3 && (
          <div>
            <button onClick={() => setStep(2)} className="text-xs text-gray-400 mb-5 hover:text-[#0077B6]">
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1A1A2E] mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Compliance and kit
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              We can&apos;t engage subcontractors without these basics. &quot;Will obtain&quot; is fine for now — we&apos;ll help you sort them.
            </p>

            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Public liability insurance *</label>
                <div className="grid grid-cols-3 gap-2">
                  {YES_NO_WILL.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setPublicLiability(o.key)}
                      className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] transition-all"
                      style={{
                        borderColor: publicLiability === o.key ? "#0077B6" : "#e5e7eb",
                        background: publicLiability === o.key ? "#e8f4fd" : "white",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">National police check *</label>
                <div className="grid grid-cols-3 gap-2">
                  {YES_NO_WILL.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setPoliceCheck(o.key)}
                      className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] transition-all"
                      style={{
                        borderColor: policeCheck === o.key ? "#0077B6" : "#e5e7eb",
                        background: policeCheck === o.key ? "#e8f4fd" : "white",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Working with Children Check <span className="font-normal text-gray-400">(needed for childcare/school)</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {YES_NO_WILL.map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setWwcc(o.key)}
                      className="p-2.5 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] transition-all"
                      style={{
                        borderColor: wwcc === o.key ? "#0077B6" : "#e5e7eb",
                        background: wwcc === o.key ? "#e8f4fd" : "white",
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Equipment owned</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Backpack / commercial vacuum",
                    "Mop / bucket system",
                    "Floor scrubber",
                    "Carpet extractor",
                    "Window kit",
                    "Vehicle for transport",
                    "Ladder (2m+)",
                    "Eco / commercial chemicals",
                  ].map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => toggle(e, equipment, setEquipment)}
                      className="p-2 rounded-xl border-2 text-xs font-semibold text-[#1A1A2E] text-left transition-all"
                      style={{
                        borderColor: equipment.includes(e) ? "#0077B6" : "#e5e7eb",
                        background: equipment.includes(e) ? "#e8f4fd" : "white",
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  References <span className="font-normal text-gray-400">(optional but helps)</span>
                </label>
                <textarea
                  value={references}
                  onChange={(e) => setReferences(e.target.value)}
                  rows={2}
                  placeholder="Name, company, phone or email of past clients or employers"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Current commitments <span className="font-normal text-gray-400">(other work / availability constraints)</span>
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
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="btn btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Submit application"} {!submitting && <ArrowRight size={14} />}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              By applying you agree to be contacted about subcontracting opportunities. We do not sell or share your details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
