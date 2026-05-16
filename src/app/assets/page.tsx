"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const assets = [
  { name: "X-Ray Machine", purchased: "14 Mar 2023", value: 12000, bookValue: 8000, depreciation: "Straight Line", location: "Main Surgery", maintenance: "12 Jun 2026" },
  { name: "Ultrasound Scanner", purchased: "22 Sep 2025", value: 8500, bookValue: 7200, depreciation: "Straight Line", location: "Main Surgery", maintenance: "22 Sep 2026" },
  { name: "Dental Unit", purchased: "05 Jan 2021", value: 4200, bookValue: 1400, depreciation: "Straight Line", location: "Main Surgery", maintenance: "05 Jul 2026" },
  { name: "Autoclave", purchased: "18 Jun 2024", value: 3800, bookValue: 2500, depreciation: "Straight Line", location: "Main Surgery", maintenance: "18 Jun 2026" },
  { name: "Lab Analyser — IDEXX Catalyst", purchased: "03 Nov 2025", value: 15000, bookValue: 12500, depreciation: "Straight Line", location: "Lab", maintenance: "03 Nov 2026" },
  { name: "Farm Vehicle — Land Rover Defender", purchased: "29 Jul 2024", value: 35000, bookValue: 28000, depreciation: "Straight Line", location: "Farm Unit", maintenance: "29 May 2026" },
  { name: "Surgery Table (Unit 1)", purchased: "12 Feb 2022", value: 2400, bookValue: 1200, depreciation: "Straight Line", location: "Main Surgery", maintenance: "12 Aug 2026" },
  { name: "Surgery Table (Unit 2)", purchased: "12 Feb 2022", value: 2400, bookValue: 1200, depreciation: "Straight Line", location: "Main Surgery", maintenance: "12 Aug 2026" },
];

const maintenanceTasks = [
  { asset: "Farm Vehicle — Land Rover Defender", task: "Full service & MOT", due: "29 May 2026", assignee: "Dave Cooper" },
  { asset: "Autoclave", task: "Annual validation & calibration", due: "18 Jun 2026", assignee: "Emma Jones" },
  { asset: "X-Ray Machine", task: "Radiation safety inspection", due: "12 Jun 2026", assignee: "External engineer" },
  { asset: "Dental Unit", task: "Compressor service & handpiece replacement", due: "05 Jul 2026", assignee: "External engineer" },
];

const totalValue = assets.reduce((sum, a) => sum + a.bookValue, 0);
const totalPurchased = assets.reduce((sum, a) => sum + a.value, 0);

const locationColour: Record<string, string> = {
  "Main Surgery": "bg-blue-50 text-blue-700",
  "Farm Unit": "bg-emerald-50 text-emerald-700",
  Lab: "bg-purple-50 text-purple-700",
};

export default function AssetsPage() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Asset Management" subtitle="Equipment register, depreciation and maintenance scheduling" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Total Assets</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{assets.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">Across 3 locations</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Current Book Value</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">£{totalValue.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 mt-1">Original cost: £{totalPurchased.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Depreciation This Year</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">£12,600</p>
              <p className="text-[11px] text-slate-400 mt-1">Straight line method</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Maintenance Due</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{maintenanceTasks.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">Next 90 days</p>
            </div>
          </div>

          {/* Register button */}
          <div className="flex gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">+ Register Asset</button>
          </div>

          {/* Asset Register Table */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Asset Register</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Asset</th>
                    <th className="text-left px-6 py-3 font-medium">Purchased</th>
                    <th className="text-right px-6 py-3 font-medium">Cost</th>
                    <th className="text-right px-6 py-3 font-medium">Book Value</th>
                    <th className="text-left px-6 py-3 font-medium">Method</th>
                    <th className="text-left px-6 py-3 font-medium">Location</th>
                    <th className="text-left px-6 py-3 font-medium">Next Maint.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assets.map((a) => (
                    <tr key={a.name} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3 font-medium text-slate-900">{a.name}</td>
                      <td className="px-6 py-3 text-slate-500">{a.purchased}</td>
                      <td className="px-6 py-3 text-right text-slate-600">£{a.value.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right font-medium text-slate-900">£{a.bookValue.toLocaleString()}</td>
                      <td className="px-6 py-3 text-slate-500 text-xs">{a.depreciation}</td>
                      <td className="px-6 py-3">
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${locationColour[a.location] ?? "bg-slate-100 text-slate-600"}`}>
                          {a.location}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-500">{a.maintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Upcoming Maintenance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Asset</th>
                    <th className="text-left px-6 py-3 font-medium">Task</th>
                    <th className="text-left px-6 py-3 font-medium">Due Date</th>
                    <th className="text-left px-6 py-3 font-medium">Assignee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {maintenanceTasks.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3 font-medium text-slate-900">{m.asset}</td>
                      <td className="px-6 py-3 text-slate-600">{m.task}</td>
                      <td className="px-6 py-3 text-slate-500">{m.due}</td>
                      <td className="px-6 py-3 text-slate-500">{m.assignee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
