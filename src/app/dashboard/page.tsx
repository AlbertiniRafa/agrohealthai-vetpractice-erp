"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { getMe, getDashboard, getKnowledgeStats } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [dashboard, setDashboard] = useState<Record<string, unknown> | null>(null);
  const [kb, setKb] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("vetpractice_token")) { router.push("/"); return; }
    getMe().then(setUser).catch(() => router.push("/"));
    getDashboard().then(setDashboard).catch(() => {});
    getKnowledgeStats().then(setKb).catch(() => {});
  }, [router]);

  const herd = (dashboard as Record<string, Record<string, unknown>>)?.herd;
  const alerts = (dashboard as Record<string, Record<string, unknown>>)?.alerts;

  // Demo data for the ERP-specific metrics
  const todayAppts = 12;
  const completedAppts = 7;
  const revenue = 2847;
  const outstandingInvoices = 4;

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Practice Dashboard" subtitle={user ? `Welcome back, ${user.full_name}` : ""} />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Row 1: Practice Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Today's Appointments" value={`${completedAppts}/${todayAppts}`} sub="7 completed, 5 remaining" color="indigo" />
            <StatCard label="Revenue Today" value={`£${revenue.toLocaleString()}`} sub="+12% vs last week" color="emerald" />
            <StatCard label="Outstanding Invoices" value={outstandingInvoices} sub="£1,240 total" color="amber" />
            <StatCard label="Active Patients" value={herd?.total_active ?? 0} sub="Registered animals" color="blue" />
          </div>

          {/* Row 2: AI Intelligence */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Knowledge Base" value={kb?.total_chunks?.toLocaleString() ?? "—"} sub="Peer-reviewed sources" color="purple" />
            <StatCard label="AI Diagnoses Today" value={3} sub="100% feedback rate" color="emerald" />
            <StatCard label="Vet Agreement Rate" value="92%" sub="AI accuracy this month" color="green" />
            <StatCard label="Active Alerts" value={alerts?.active_unacknowledged ?? 0} sub="Biosensor anomalies" color="red" />
          </div>

          {/* Row 3: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Upcoming Appointments</h3>
              <div className="space-y-3">
                {[
                  { time: "09:30", client: "J. Henderson", patient: "Bella (Labrador)", type: "Vaccination", vet: "Dr Coe" },
                  { time: "10:00", client: "Fram Farmers", patient: "Herd TB Test", type: "Farm Visit", vet: "Dr Coe" },
                  { time: "10:45", client: "S. Wright", patient: "Max (Terrier)", type: "Dental Check", vet: "Dr Smith" },
                  { time: "11:15", client: "T. Palmer", patient: "Cow #UK-347", type: "Lameness", vet: "Dr Coe" },
                  { time: "14:00", client: "M. Clarke", patient: "Luna (Cat)", type: "Neutering", vet: "Dr Smith" },
                ].map((appt, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                    <span className="text-sm font-mono font-bold text-indigo-600 w-12">{appt.time}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{appt.patient}</p>
                      <p className="text-xs text-slate-500">{appt.client} — {appt.type}</p>
                    </div>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">{appt.vet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent AI Diagnoses */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent AI Assessments</h3>
              <div className="space-y-3">
                {[
                  { patient: "Cow #UK-001", diagnosis: "Acute Intestinal Obstruction", confidence: 85, agreed: true, time: "Today 10:29" },
                  { patient: "Ewe #FF-012", diagnosis: "Ovine Pulmonary Adenocarcinoma", confidence: 72, agreed: false, time: "Yesterday 16:45" },
                  { patient: "Bella (Labrador)", diagnosis: "Otitis Externa — bacterial", confidence: 91, agreed: true, time: "Yesterday 11:20" },
                ].map((dx, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">{dx.patient}</p>
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        dx.agreed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}>
                        {dx.agreed ? "AGREED" : "DISAGREED"}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1">{dx.diagnosis}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-400">{dx.time}</span>
                      <span className="text-xs font-semibold text-emerald-600">{dx.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: Quick Actions + Comms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "New Appointment", href: "/appointments", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
                  { label: "Register Patient", href: "/patients", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                  { label: "AI Diagnosis", href: "/ai", color: "bg-purple-50 text-purple-700 border-purple-200" },
                  { label: "New Invoice", href: "/billing", color: "bg-pink-50 text-pink-700 border-pink-200" },
                  { label: "Check Stock", href: "/dispensary", color: "bg-amber-50 text-amber-700 border-amber-200" },
                  { label: "Farm Visit", href: "/farm", color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-semibold text-center hover:opacity-80 transition ${action.color}`}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Client Communications */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Client Messages</h3>
              <div className="space-y-3">
                {[
                  { client: "J. Henderson", msg: "Can I get a repeat flea prescription?", time: "2h ago", unread: true },
                  { client: "Fram Farmers", msg: "Confirmed for TB testing Thursday", time: "5h ago", unread: false },
                  { client: "S. Wright", msg: "Max seems better after the antibiotics", time: "Yesterday", unread: false },
                ].map((m, i) => (
                  <div key={i} className={`p-3 rounded-lg ${m.unread ? "bg-blue-50 border border-blue-200" : "bg-slate-50"}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">{m.client}</p>
                      <span className="text-xs text-slate-400">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{m.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AMR Stewardship Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">AMR Stewardship</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Category D (First Line)</span>
                  <span className="text-sm font-bold text-emerald-600">78%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "78%" }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Category C (Caution)</span>
                  <span className="text-sm font-bold text-amber-600">18%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "18%" }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Category B (Restrict)</span>
                  <span className="text-sm font-bold text-red-600">4%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: "4%" }} />
                </div>
                <p className="text-xs text-emerald-600 font-medium mt-2">RUMA target: met</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub: string; color: string }) {
  const colors: Record<string, string> = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    indigo: "text-indigo-600",
    amber: "text-amber-600",
    red: "text-red-600",
    green: "text-emerald-600",
    pink: "text-pink-600",
  };
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${colors[color] || "text-slate-900"}`}>{value}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}
