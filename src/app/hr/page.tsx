"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const staff = [
  { name: "Dr Aidan Coe", role: "Head Vet", rcvs: "RC-7842931", start: "12 Mar 2018", status: "Active", contact: "aidan.coe@greenvalleyvets.co.uk", phone: "07700 900112" },
  { name: "Dr Sarah Smith", role: "Vet", rcvs: "RC-6129384", start: "04 Sep 2020", status: "Active", contact: "sarah.smith@greenvalleyvets.co.uk", phone: "07700 900234" },
  { name: "Dr James Wilson", role: "Vet", rcvs: "RC-5583017", start: "15 Jan 2022", status: "On Leave", contact: "james.wilson@greenvalleyvets.co.uk", phone: "07700 900345" },
  { name: "Emma Jones", role: "Head Nurse RVN", rcvs: "RN-4421876", start: "22 Jun 2019", status: "Active", contact: "emma.jones@greenvalleyvets.co.uk", phone: "07700 900456" },
  { name: "Lucy Brown", role: "Nurse RVN", rcvs: "RN-3318294", start: "08 Nov 2021", status: "Active", contact: "lucy.brown@greenvalleyvets.co.uk", phone: "07700 900567" },
  { name: "Tom Harris", role: "Receptionist", rcvs: null, start: "03 Feb 2023", status: "Active", contact: "tom.harris@greenvalleyvets.co.uk", phone: "07700 900678" },
  { name: "Kate Miller", role: "Practice Manager", rcvs: null, start: "17 Aug 2017", status: "Active", contact: "kate.miller@greenvalleyvets.co.uk", phone: "07700 900789" },
  { name: "Dave Cooper", role: "Farm Tech", rcvs: null, start: "29 Apr 2022", status: "Off Sick", contact: "dave.cooper@greenvalleyvets.co.uk", phone: "07700 900890" },
];

const leaveRequests = [
  { who: "Dr James Wilson", from: "05 May 2026", to: "16 May 2026", type: "Annual", status: "Approved" },
  { who: "Lucy Brown", from: "19 May 2026", to: "20 May 2026", type: "CPD", status: "Approved" },
  { who: "Emma Jones", from: "02 Jun 2026", to: "06 Jun 2026", type: "Annual", status: "Pending" },
  { who: "Tom Harris", from: "09 Jun 2026", to: "09 Jun 2026", type: "Sick", status: "Pending" },
  { who: "Dr Sarah Smith", from: "23 Jun 2026", to: "04 Jul 2026", type: "Annual", status: "Pending" },
];

const rota: Record<string, string[]> = {
  Mon: ["Dr Coe", "Dr Smith", "Emma", "Lucy", "Tom", "Kate"],
  Tue: ["Dr Coe", "Dr Wilson", "Emma", "Lucy", "Tom", "Dave"],
  Wed: ["Dr Smith", "Dr Wilson", "Emma", "Tom", "Kate"],
  Thu: ["Dr Coe", "Dr Smith", "Lucy", "Tom", "Dave"],
  Fri: ["Dr Coe", "Dr Wilson", "Emma", "Lucy", "Tom", "Kate"],
  Sat: ["Dr Smith", "Emma", "Tom"],
};

const cpdTracking = [
  { name: "Dr Aidan Coe", completed: 28, required: 35 },
  { name: "Dr Sarah Smith", completed: 32, required: 35 },
  { name: "Dr James Wilson", completed: 18, required: 35 },
  { name: "Emma Jones", completed: 22, required: 35 },
  { name: "Lucy Brown", completed: 12, required: 35 },
];

function StatusBadge({ status }: { status: string }) {
  const colours: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "On Leave": "bg-amber-50 text-amber-700 ring-amber-200",
    "Off Sick": "bg-red-50 text-red-700 ring-red-200",
    Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  };
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ring-1 ${colours[status] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
      {status}
    </span>
  );
}

function LeaveBadge({ type }: { type: string }) {
  const colours: Record<string, string> = {
    Annual: "bg-blue-50 text-blue-700",
    Sick: "bg-red-50 text-red-700",
    CPD: "bg-purple-50 text-purple-700",
  };
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${colours[type] ?? "bg-slate-100 text-slate-600"}`}>
      {type}
    </span>
  );
}

export default function HRPage() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="HR & Payroll" subtitle="Staff management, rota, leave and CPD tracking" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Total Staff</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">8</p>
              <p className="text-[11px] text-slate-400 mt-1">3 vets, 2 nurses, 3 support</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Monthly Payroll</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">£28,400</p>
              <p className="text-[11px] text-slate-400 mt-1">Next run: 28 May 2026</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Last Payroll Run</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">28 Apr</p>
              <p className="text-[11px] text-slate-400 mt-1">All processed successfully</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Currently Off</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">2</p>
              <p className="text-[11px] text-slate-400 mt-1">1 leave, 1 sick</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">+ Add Employee</button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition">Run Payroll</button>
          </div>

          {/* Staff directory */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Staff Directory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Name</th>
                    <th className="text-left px-6 py-3 font-medium">Role</th>
                    <th className="text-left px-6 py-3 font-medium">RCVS No.</th>
                    <th className="text-left px-6 py-3 font-medium">Start Date</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {staff.map((s) => (
                    <tr key={s.name} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3 font-medium text-slate-900">{s.name}</td>
                      <td className="px-6 py-3 text-slate-600">{s.role}</td>
                      <td className="px-6 py-3 text-slate-500 font-mono text-xs">{s.rcvs ?? "—"}</td>
                      <td className="px-6 py-3 text-slate-500">{s.start}</td>
                      <td className="px-6 py-3"><StatusBadge status={s.status} /></td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{s.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two-column: Leave + Rota */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Leave Requests */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Leave Requests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">Staff</th>
                      <th className="text-left px-6 py-3 font-medium">Dates</th>
                      <th className="text-left px-6 py-3 font-medium">Type</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaveRequests.map((l, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-3 font-medium text-slate-900 text-xs">{l.who}</td>
                        <td className="px-6 py-3 text-slate-500 text-xs">{l.from} — {l.to}</td>
                        <td className="px-6 py-3"><LeaveBadge type={l.type} /></td>
                        <td className="px-6 py-3"><StatusBadge status={l.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rota / Shift View */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Weekly Rota — w/c 11 May 2026</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
                    <tr>
                      {Object.keys(rota).map((d) => (
                        <th key={d} className="text-left px-4 py-3 font-medium">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(rota).map((people, i) => (
                        <td key={i} className="px-4 py-3 align-top">
                          <div className="space-y-1">
                            {people.map((p) => (
                              <div key={p} className="bg-emerald-50 text-emerald-700 rounded px-2 py-1 text-[11px] font-medium">{p}</div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CPD Tracking */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">CPD Tracking — RCVS Requirement: 35 hours/year</h3>
            </div>
            <div className="p-6 space-y-4">
              {cpdTracking.map((c) => {
                const pct = Math.round((c.completed / c.required) * 100);
                const isLow = pct < 60;
                return (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{c.name}</span>
                      <span className={`text-xs font-medium ${isLow ? "text-amber-600" : "text-emerald-600"}`}>{c.completed}/{c.required} hrs ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${isLow ? "bg-amber-400" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
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
