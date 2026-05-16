"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const reportCards = [
  {
    title: "Revenue Report",
    description: "Monthly and quarterly revenue breakdown by service type, species, and client segment.",
    stat: "£25,200",
    statLabel: "May 2026 revenue",
    trend: "+8% vs Apr",
    trendPositive: true,
    icon: "Revenue",
  },
  {
    title: "Clinical Activity",
    description: "Consultations, surgeries, farm visits, and emergency callouts — with vet utilisation rates.",
    stat: "147",
    statLabel: "Consultations this month",
    trend: "+12 vs last month",
    trendPositive: true,
    icon: "Clinical",
  },
  {
    title: "AMR Usage (eMB)",
    description: "Antimicrobial usage by RUMA category, species, and mg/kg metrics for eMB reporting.",
    stat: "14.2 mg/kg",
    statLabel: "Cattle eMB score",
    trend: "Below national median",
    trendPositive: true,
    icon: "AMR",
  },
  {
    title: "Stock Value",
    description: "Current dispensary stock value, turnover rate, expired/near-expiry items, and reorder forecasts.",
    stat: "£4,891",
    statLabel: "Total stock value",
    trend: "5 items low stock",
    trendPositive: false,
    icon: "Stock",
  },
  {
    title: "Client Retention",
    description: "Active client counts, new registrations, lapsed clients, and net promoter score estimates.",
    stat: "94.2%",
    statLabel: "12-month retention rate",
    trend: "+1.4% vs prior year",
    trendPositive: true,
    icon: "Clients",
  },
  {
    title: "Species Breakdown",
    description: "Revenue, consultation volume, and clinical outcomes segmented by species and breed.",
    stat: "6 species",
    statLabel: "Active in practice",
    trend: "Bovine 42% of revenue",
    trendPositive: true,
    icon: "Species",
  },
];

const presets = [
  { label: "This Month", value: "month" },
  { label: "This Quarter", value: "quarter" },
  { label: "Year to Date", value: "ytd" },
  { label: "Last 12 Months", value: "12m" },
  { label: "Custom", value: "custom" },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("month");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Reports" subtitle="Practice analytics and regulatory exports" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Date Range Selector */}
          <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700">Date Range:</span>
                {presets.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => setDateRange(p.value)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                      dateRange === p.value
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {dateRange === "custom" && (
                  <>
                    <input type="date" className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" defaultValue="2026-05-01" />
                    <span className="text-xs text-slate-400">to</span>
                    <input type="date" className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" defaultValue="2026-05-08" />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Report Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {reportCards.map((report) => (
              <div
                key={report.title}
                onClick={() => setSelectedReport(selectedReport === report.title ? null : report.title)}
                className={`bg-white rounded-xl p-5 shadow-sm ring-1 cursor-pointer transition hover:shadow-md ${
                  selectedReport === report.title ? "ring-2 ring-emerald-500" : "ring-slate-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900">{report.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    report.trendPositive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {report.trend}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">{report.description}</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-2xl font-bold text-emerald-600">{report.stat}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{report.statLabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Report Detail */}
          {selectedReport && (
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{selectedReport}</h3>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                    Download PDF
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Report Preview Content */}
              {selectedReport === "Revenue Report" && (
                <div>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-xs text-emerald-600 font-semibold">Small Animal</p>
                      <p className="text-lg font-bold text-emerald-700">£10,584</p>
                      <p className="text-xs text-emerald-500">42% of total</p>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <p className="text-xs text-blue-600 font-semibold">Farm / Large Animal</p>
                      <p className="text-lg font-bold text-blue-700">£11,340</p>
                      <p className="text-xs text-blue-500">45% of total</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                      <p className="text-xs text-purple-600 font-semibold">Equine</p>
                      <p className="text-lg font-bold text-purple-700">£2,520</p>
                      <p className="text-xs text-purple-500">10% of total</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                      <p className="text-xs text-slate-600 font-semibold">Dispensary Sales</p>
                      <p className="text-lg font-bold text-slate-700">£756</p>
                      <p className="text-xs text-slate-500">3% of total</p>
                    </div>
                  </div>
                  <div className="h-48 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                    <p className="text-sm text-slate-400">Revenue trend chart would render here</p>
                  </div>
                </div>
              )}

              {selectedReport === "Clinical Activity" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Consultations</p>
                    <p className="text-xl font-bold text-slate-900">147</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Surgeries</p>
                    <p className="text-xl font-bold text-slate-900">23</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Farm Visits</p>
                    <p className="text-xl font-bold text-slate-900">18</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Emergency Callouts</p>
                    <p className="text-xl font-bold text-slate-900">7</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">AI Diagnoses Used</p>
                    <p className="text-xl font-bold text-emerald-600">34</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Vet Utilisation</p>
                    <p className="text-xl font-bold text-slate-900">87%</p>
                  </div>
                </div>
              )}

              {selectedReport === "AMR Usage (eMB)" && (
                <div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                      <p className="text-xs text-emerald-600 font-semibold">Cat D (First Line)</p>
                      <p className="text-xl font-bold text-emerald-700">72%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="text-xs text-amber-600 font-semibold">Cat C (Caution)</p>
                      <p className="text-xl font-bold text-amber-700">19%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xs text-red-600 font-semibold">Cat B (Restrict)</p>
                      <p className="text-xl font-bold text-red-700">7%</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-xs text-red-600 font-semibold">Cat A (Avoid)</p>
                      <p className="text-xl font-bold text-red-700">2%</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-700">RUMA Targets: MET</p>
                    <p className="text-xs text-emerald-600 mt-1">Practice is below national median for CIAs. Category D usage well above 70% threshold.</p>
                  </div>
                </div>
              )}

              {selectedReport === "Stock Value" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Total Stock Value</p>
                    <p className="text-xl font-bold text-slate-900">£4,891.24</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Products</p>
                    <p className="text-xl font-bold text-slate-900">16</p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-xs text-red-500 font-semibold">Low Stock Items</p>
                    <p className="text-xl font-bold text-red-600">5</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs text-amber-500 font-semibold">Expiring &lt;90 Days</p>
                    <p className="text-xl font-bold text-amber-600">2</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Avg Turnover Rate</p>
                    <p className="text-xl font-bold text-slate-900">4.2x/yr</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Reorder Pending</p>
                    <p className="text-xl font-bold text-amber-600">3</p>
                  </div>
                </div>
              )}

              {selectedReport === "Client Retention" && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="text-xs text-emerald-600 font-semibold">Retention Rate</p>
                    <p className="text-xl font-bold text-emerald-700">94.2%</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Active Clients</p>
                    <p className="text-xl font-bold text-slate-900">342</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-xs text-blue-600 font-semibold">New This Month</p>
                    <p className="text-xl font-bold text-blue-700">8</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="text-xs text-amber-600 font-semibold">Lapsed (6+ months)</p>
                    <p className="text-xl font-bold text-amber-700">14</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Avg Client Value</p>
                    <p className="text-xl font-bold text-slate-900">£487/yr</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <p className="text-xs text-slate-500 font-semibold">Health Plan Members</p>
                    <p className="text-xl font-bold text-emerald-600">89</p>
                  </div>
                </div>
              )}

              {selectedReport === "Species Breakdown" && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Species</th>
                          <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Patients</th>
                          <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Consults</th>
                          <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase">Revenue</th>
                          <th className="px-4 py-3 font-semibold text-slate-600 text-xs uppercase">% of Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { species: "Canine", patients: 186, consults: 68, revenue: "£7,245", pct: "29%" },
                          { species: "Feline", patients: 124, consults: 42, revenue: "£3,339", pct: "13%" },
                          { species: "Bovine", patients: 184, consults: 18, revenue: "£10,584", pct: "42%" },
                          { species: "Ovine", patients: 68, consults: 8, revenue: "£1,764", pct: "7%" },
                          { species: "Equine", patients: 12, consults: 6, revenue: "£2,520", pct: "10%" },
                          { species: "Porcine", patients: 35, consults: 5, revenue: "£748", pct: "3%" },
                        ].map((row) => (
                          <tr key={row.species} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium text-slate-900">{row.species}</td>
                            <td className="px-4 py-3 text-slate-700">{row.patients}</td>
                            <td className="px-4 py-3 text-slate-700">{row.consults}</td>
                            <td className="px-4 py-3 font-semibold text-emerald-600">{row.revenue}</td>
                            <td className="px-4 py-3 text-slate-500">{row.pct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Export Bar */}
          <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Regulatory Exports</h3>
                <p className="text-xs text-slate-500 mt-0.5">Generate compliance reports for RCVS, APHA, and eMB submissions</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">
                  eMB Annual Return
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                  RCVS Practice Report
                </button>
                <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                  APHA TB Summary
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
