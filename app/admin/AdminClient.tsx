"use client";

import { useEffect, useState, useCallback } from "react";

type Lead = {
  id: number;
  received_at: string;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  suburb: string | null;
  status: string | null;
  notes: string | null;
  payload: Record<string, unknown>;
};

const STATUSES = ["new", "contacted", "quoted", "won", "lost", "rejected"];
const STATUS_COLOR: Record<string, string> = {
  new: "#0077B6",
  contacted: "#FFB627",
  quoted: "#9333ea",
  won: "#10b981",
  lost: "#ef4444",
  rejected: "#6b7280",
};

const FORM_TYPE_LABEL: Record<string, string> = {
  business_lead: "🏢 Business",
  contractor_application: "🧹 Contractor",
  residential_quote: "🏠 Residential",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return formatDate(iso);
}

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [filterType, setFilterType] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  // Restore session from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("cs_admin_pw");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setErr("");
    try {
      const params = new URLSearchParams();
      if (filterType) params.set("type", filterType);
      params.set("limit", "300");
      const res = await fetch(`/api/leads?${params}`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) {
        setAuthed(false);
        sessionStorage.removeItem("cs_admin_pw");
        setErr("Wrong password.");
        return;
      }
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErr((j as { error?: string }).error || `HTTP ${res.status}`);
        return;
      }
      const data = (await res.json()) as { leads: Lead[] };
      setLeads(data.leads);
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }, [password, filterType]);

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed, fetchLeads]);

  async function tryLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/leads?limit=1", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) {
        setErr("Wrong password.");
      } else if (res.ok) {
        sessionStorage.setItem("cs_admin_pw", password);
        setAuthed(true);
      } else {
        const j = await res.json().catch(() => ({}));
        setErr((j as { error?: string }).error || `HTTP ${res.status}`);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    await fetch("/api/lead-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ id, status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  async function updateNotes(id: number, notes: string) {
    await fetch("/api/lead-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ id, notes }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
  }

  function logout() {
    sessionStorage.removeItem("cs_admin_pw");
    setAuthed(false);
    setPassword("");
    setLeads([]);
  }

  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6" style={{ background: "#0d1117" }}>
        <form onSubmit={tryLogin} className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Leads admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the admin password.</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#0077B6]"
          />
          {err && <p className="text-red-600 text-sm mt-2">{err}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="mt-4 w-full bg-[#0077B6] hover:bg-[#005f8a] text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Checking..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.form_type] = (acc[l.form_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen" style={{ background: "#f4f5f7" }}>
      <header className="bg-[#0d1117] text-white px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">CS Cleaners — Leads</h1>
          <p className="text-xs text-white/50 mt-1">
            {leads.length} loaded ·{" "}
            {Object.entries(counts)
              .map(([k, v]) => `${FORM_TYPE_LABEL[k] ?? k} ${v}`)
              .join(" · ")}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchLeads} className="text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
          <button onClick={logout} className="text-sm px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">
            Sign out
          </button>
        </div>
      </header>

      <div className="px-6 py-4 flex flex-wrap gap-2 border-b border-gray-200 bg-white">
        <button
          onClick={() => setFilterType("")}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: !filterType ? "#0077B6" : "#e5e7eb", color: !filterType ? "white" : "#1a1a2e" }}
        >
          All
        </button>
        {Object.entries(FORM_TYPE_LABEL).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setFilterType(k)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: filterType === k ? "#0077B6" : "#e5e7eb",
              color: filterType === k ? "white" : "#1a1a2e",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {err && (
        <div className="px-6 py-3 bg-red-100 text-red-700 text-sm">{err}</div>
      )}

      <div className="p-6">
        {leads.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No leads yet.</p>
            <p className="text-sm">Submit a test on /business or /contractor to verify the pipeline.</p>
          </div>
        )}

        <div className="space-y-3">
          {leads.map((l) => {
            const isOpen = expanded === l.id;
            const status = l.status || "new";
            return (
              <div key={l.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div
                  className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(isOpen ? null : l.id)}
                >
                  <div
                    className="w-2 h-12 rounded-full shrink-0"
                    style={{ background: STATUS_COLOR[status] ?? "#999" }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-gray-400">
                        {FORM_TYPE_LABEL[l.form_type] ?? l.form_type}
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{relativeTime(l.received_at)}</span>
                    </div>
                    <div className="font-semibold text-[#1a1a2e] truncate">
                      {l.name || (l.payload.businessName as string) || "Unknown"}
                      {l.suburb && <span className="text-gray-400 font-normal"> · {l.suburb}</span>}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {l.email}
                      {l.phone && <span className="text-gray-300"> · {l.phone}</span>}
                    </div>
                  </div>
                  <select
                    value={status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-semibold rounded-lg border border-gray-200 px-2 py-1.5"
                    style={{ color: STATUS_COLOR[status] }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span className="text-gray-300 text-lg shrink-0">{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                  <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      {Object.entries(l.payload).map(([k, v]) => {
                        if (k === "formType") return null;
                        const val = Array.isArray(v)
                          ? v.join(", ")
                          : v == null || v === ""
                          ? "—"
                          : String(v);
                        return (
                          <div key={k} className="flex gap-3">
                            <span className="text-gray-400 w-40 shrink-0 capitalize">
                              {k.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-gray-800 break-words flex-1">{val}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
                      <textarea
                        defaultValue={l.notes ?? ""}
                        onBlur={(e) => updateNotes(l.id, e.target.value)}
                        rows={2}
                        placeholder="Internal notes (saved on blur)..."
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0077B6]"
                      />
                    </div>
                    <div className="mt-3 flex gap-3 text-xs">
                      {l.email && (
                        <a
                          href={`mailto:${l.email}?subject=Re: your cleaning enquiry`}
                          className="text-[#0077B6] hover:underline"
                        >
                          ✉ Email reply
                        </a>
                      )}
                      {l.phone && (
                        <a href={`tel:${l.phone}`} className="text-[#0077B6] hover:underline">
                          ☎ Call
                        </a>
                      )}
                      <span className="text-gray-300">·</span>
                      <span className="text-gray-400">ID #{l.id} · {formatDate(l.received_at)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
