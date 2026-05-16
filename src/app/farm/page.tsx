"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const herdData = {
  cph: "32/125/0048",
  totalAnimals: 287,
  species: [
    { name: "Cattle", count: 184, icon: "Bovine", healthy: 176, atRisk: 5, sick: 3 },
    { name: "Sheep", count: 68, icon: "Ovine", healthy: 64, atRisk: 3, sick: 1 },
    { name: "Pigs", count: 35, icon: "Porcine", healthy: 33, atRisk: 2, sick: 0 },
  ],
};

const tbSchedule = [
  { date: "15 May 2026", farm: "Fram Farmers Ltd", herdSize: 184, type: "Routine Annual", status: "Scheduled", vet: "Dr Coe" },
  { date: "22 May 2026", farm: "Greenfields Farm", herdSize: 96, type: "Pre-Movement", status: "Scheduled", vet: "Dr Coe" },
  { date: "06 May 2026", farm: "Hillside Dairy", herdSize: 142, type: "Routine Annual", status: "Completed", vet: "Dr Coe" },
  { date: "18 Apr 2026", farm: "Manor Farm", herdSize: 78, type: "Contiguous Herd", status: "Completed", vet: "Dr Smith" },
];

const biosensorAlerts = [
  { tag: "UK-347", species: "Bovine", metric: "Rumination", value: "22 min/day", normal: "450-550 min/day", severity: "Critical", time: "Today 06:15", sensor: "smaXtec bolus" },
  { tag: "UK-112", species: "Bovine", metric: "Body Temperature", value: "40.1°C", normal: "38.0-39.5°C", severity: "Warning", time: "Today 08:42", sensor: "smaXtec bolus" },
  { tag: "UK-089", species: "Bovine", metric: "Activity Index", value: "3.2 (low)", normal: "6.0-9.0", severity: "Warning", time: "Yesterday 22:10", sensor: "smaXtec bolus" },
];

const farmVisits = [
  { date: "15 May 2026", time: "08:00", farm: "Fram Farmers Ltd", purpose: "TB Testing — 184 head", vet: "Dr Coe", status: "Confirmed" },
  { date: "16 May 2026", time: "09:30", farm: "Hillside Dairy", purpose: "Fertility Visit — 12 PDs", vet: "Dr Coe", status: "Confirmed" },
  { date: "19 May 2026", time: "08:00", farm: "Greenfields Farm", purpose: "Routine Herd Health — Q2", vet: "Dr Smith", status: "Tentative" },
  { date: "22 May 2026", time: "07:30", farm: "Greenfields Farm", purpose: "Pre-Movement TB Test", vet: "Dr Coe", status: "Confirmed" },
  { date: "28 May 2026", time: "10:00", farm: "Manor Farm", purpose: "Vaccination — clostridial", vet: "Dr Smith", status: "Tentative" },
];

const movements = [
  { date: "05 May 2026", type: "ON", count: 6, species: "Bovine", from: "Ashford Market", to: "Fram Farmers Ltd", ref: "MOV-2026-0881" },
  { date: "02 May 2026", type: "OFF", count: 12, species: "Bovine", from: "Hillside Dairy", to: "ABP Shrewsbury", ref: "MOV-2026-0874" },
  { date: "28 Apr 2026", type: "ON", count: 3, species: "Bovine", from: "Greenfields Farm", to: "Fram Farmers Ltd", ref: "MOV-2026-0862" },
  { date: "22 Apr 2026", type: "OFF", count: 24, species: "Ovine", from: "Manor Farm", to: "Welshpool Market", ref: "MOV-2026-0845" },
];

export default function FarmPage() {
  const [aiRunning, setAiRunning] = useState(false);

  const handleAiAssessment = () => {
    setAiRunning(true);
    setTimeout(() => setAiRunning(false), 2000);
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Farm & Herd Management" subtitle={`CPH: ${herdData.cph}`} />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Herd Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Total Animals</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{herdData.totalAnimals}</p>
              <p className="text-xs text-slate-400 mt-0.5">Across all species</p>
            </div>
            {herdData.species.map((sp) => (
              <div key={sp.name} className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase text-slate-500">{sp.name}</p>
                <p className="text-2xl font-bold mt-1 text-emerald-600">{sp.count}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-emerald-600">{sp.healthy} healthy</span>
                  <span className="text-xs text-amber-600">{sp.atRisk} at risk</span>
                  <span className="text-xs text-red-600">{sp.sick} sick</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Assessment Button */}
          <div className="mb-6">
            <button
              onClick={handleAiAssessment}
              disabled={aiRunning}
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              {aiRunning ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Running AI Herd Assessment...
                </>
              ) : (
                "Run AI Herd Assessment"
              )}
            </button>
            {!aiRunning && (
              <p className="text-xs text-slate-400 mt-1">Analyses biosensor data, clinical records, and seasonal risk factors</p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Biosensor Alerts */}
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Biosensor Alerts</h3>
              <div className="space-y-3">
                {biosensorAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      alert.severity === "Critical" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">Tag: {alert.tag}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        alert.severity === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{alert.metric}: <strong>{alert.value}</strong></p>
                    <p className="text-xs text-slate-500">Normal range: {alert.normal}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-400">{alert.time}</span>
                      <span className="text-xs text-slate-400">{alert.sensor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TB Testing Schedule */}
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">TB Testing Schedule</h3>
              <div className="space-y-3">
                {tbSchedule.map((test, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700">{test.date}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        test.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-900">{test.farm}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-slate-500">{test.type} — {test.herdSize} head</span>
                      <span className="text-xs text-slate-400">{test.vet}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Farm Visit Calendar */}
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Upcoming Farm Visits</h3>
                <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700">+ Schedule Visit</button>
              </div>
              <div className="space-y-2">
                {farmVisits.map((visit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                    <div className="text-center min-w-[48px]">
                      <p className="text-xs font-bold text-emerald-600">{visit.date.split(" ")[0]}</p>
                      <p className="text-xs text-slate-500">{visit.date.split(" ")[1]}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{visit.farm}</p>
                      <p className="text-xs text-slate-500">{visit.time} — {visit.purpose}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold ${visit.status === "Confirmed" ? "text-emerald-600" : "text-amber-600"}`}>
                        {visit.status}
                      </span>
                      <p className="text-xs text-slate-400">{visit.vet}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Movement Records */}
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Movement Records</h3>
                <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-700">+ Record Movement</button>
              </div>
              <div className="space-y-2">
                {movements.map((mov, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          mov.type === "ON" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                        }`}>
                          {mov.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{mov.ref}</span>
                      </div>
                      <span className="text-xs text-slate-500">{mov.date}</span>
                    </div>
                    <p className="text-sm text-slate-800">
                      {mov.count} {mov.species} — {mov.from} → {mov.to}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <p className="text-xs text-slate-500">All movements reported to BCMS/APHA</p>
                <p className="text-xs text-slate-400">CPH: {herdData.cph}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
