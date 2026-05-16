"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const complianceCards = [
  { title: "RCVS Practice Standards", status: "Accredited", color: "emerald", detail: "Core Standards — renewed March 2026" },
  { title: "Controlled Drugs Register", status: "Up to date", color: "emerald", detail: "Last audit: 15 Apr 2026" },
  { title: "Cyber Essentials Plus", status: "In Progress", color: "amber", detail: "Assessment booked 22 May 2026" },
  { title: "AMR / RUMA Compliance", status: "Target Met", color: "emerald", detail: "Category D usage: 78% of target" },
  { title: "Clinical Audit", status: "Q2 Due", color: "amber", detail: "Next review: 30 Jun 2026" },
  { title: "Insurance", status: "Professional Indemnity £5M — Active", color: "emerald", detail: "Renewal: 01 Jan 2027" },
];

const inspections = [
  { description: "Vaccine fridge temperature check", date: "06 May 2026", result: "Pass", inspector: "Sarah Mitchell RVN", nextDue: "07 May 2026" },
  { description: "Autoclave validation cycle", date: "05 May 2026", result: "Pass", inspector: "Sarah Mitchell RVN", nextDue: "12 May 2026" },
  { description: "Drug expiry check — dispensary", date: "01 May 2026", result: "Action Required", inspector: "James Thornton RVN", nextDue: "01 Jun 2026" },
  { description: "Controlled drug count — Schedule 2", date: "30 Apr 2026", result: "Pass", inspector: "Dr Emma Coe MRCVS", nextDue: "07 May 2026" },
];

const nonConformances = [
  { id: "NC-2026-009", title: "Expired Metacam 1.5mg/ml found in stock", raised: "01 May 2026", status: "Resolved", resolution: "Item removed and destroyed. Re-training completed for dispensary staff." },
  { id: "NC-2026-010", title: "Vaccine fridge temperature deviation — 9.2°C recorded", raised: "04 May 2026", status: "Under Review", resolution: "Fridge serviced. Awaiting 48hr temperature log confirmation." },
];

const auditTrail = [
  { time: "08:47", date: "08 May 2026", user: "Dr Emma Coe", action: "Logged in", module: "System" },
  { time: "08:52", date: "08 May 2026", user: "Dr Emma Coe", action: "Viewed clinical record — Bella (PAT-1042)", module: "Clinical" },
  { time: "09:10", date: "08 May 2026", user: "Dr Tom Ashworth", action: "Prescribed Amoxicillin 250mg — Max (PAT-1087)", module: "Dispensary" },
  { time: "09:15", date: "08 May 2026", user: "Sarah Mitchell", action: "Accessed controlled drug register", module: "Controlled Drugs" },
  { time: "09:31", date: "08 May 2026", user: "Katie Dunn", action: "Updated client record — Mrs Henderson", module: "CRM" },
  { time: "10:05", date: "08 May 2026", user: "Dr Priya Sharma", action: "Completed vaccination — Milo (PAT-1103)", module: "Clinical" },
];

const cpdCompliance = [
  { name: "Dr Emma Coe MRCVS", hours: 32, target: 35 },
  { name: "Dr Tom Ashworth MRCVS", hours: 35, target: 35 },
  { name: "Dr Priya Sharma MRCVS", hours: 28, target: 35 },
  { name: "Sarah Mitchell RVN", hours: 20, target: 35 },
  { name: "James Thornton RVN", hours: 18, target: 35 },
];

export default function QualityPage() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Quality & Compliance" subtitle="Practice accreditation, audits, and regulatory compliance" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Compliance Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-900">{card.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      card.color === "emerald"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    }`}
                  >
                    {card.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{card.detail}</p>
              </div>
            ))}
          </div>

          {/* Quality Inspections */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Quality Inspections</h3>
              <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                Schedule Inspection
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Result</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Inspector</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Due</th>
                  </tr>
                </thead>
                <tbody>
                  {inspections.map((row) => (
                    <tr key={row.description} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 text-slate-700">{row.description}</td>
                      <td className="py-3 text-slate-500">{row.date}</td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            row.result === "Pass"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {row.result}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{row.inspector}</td>
                      <td className="py-3 text-slate-500">{row.nextDue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Non-Conformance Log */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Non-Conformance Log</h3>
              <button className="text-xs font-medium bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition ring-1 ring-slate-200">
                Log Non-Conformance
              </button>
            </div>
            <div className="space-y-4">
              {nonConformances.map((nc) => (
                <div key={nc.id} className="border border-slate-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">{nc.id}</span>
                      <h4 className="text-sm font-medium text-slate-900">{nc.title}</h4>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        nc.status === "Resolved"
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                      }`}
                    >
                      {nc.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Raised: {nc.raised}</p>
                  <p className="text-xs text-slate-600 mt-2">{nc.resolution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Audit Trail — Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Module</th>
                  </tr>
                </thead>
                <tbody>
                  {auditTrail.map((entry, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-2.5 text-slate-500 font-mono text-xs">{entry.time} &middot; {entry.date}</td>
                      <td className="py-2.5 text-slate-700">{entry.user}</td>
                      <td className="py-2.5 text-slate-700">{entry.action}</td>
                      <td className="py-2.5">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{entry.module}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RCVS CPD Compliance */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">RCVS CPD Compliance — Annual Hours</h3>
            <div className="space-y-4">
              {cpdCompliance.map((vet) => {
                const pct = Math.min(100, Math.round((vet.hours / vet.target) * 100));
                const complete = vet.hours >= vet.target;
                return (
                  <div key={vet.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{vet.name}</span>
                      <span className="text-xs text-slate-500">{vet.hours}/{vet.target} hrs ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all ${complete ? "bg-emerald-500" : "bg-amber-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
