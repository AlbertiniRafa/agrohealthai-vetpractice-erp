"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const hours = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

const appointments: Record<string, { time: string; duration: number; patient: string; type: string; color: string }[]> = {
  "Dr Coe": [
    { time: "09:30", duration: 1, patient: "Bella (Lab) — Vaccination", type: "routine", color: "bg-emerald-100 border-emerald-300 text-emerald-800" },
    { time: "10:00", duration: 3, patient: "Fram Farmers — Herd TB Test", type: "farm", color: "bg-amber-100 border-amber-300 text-amber-800" },
    { time: "11:30", duration: 2, patient: "UK-347 — Lameness Exam", type: "farm", color: "bg-amber-100 border-amber-300 text-amber-800" },
    { time: "14:00", duration: 2, patient: "Charlie (TB) — Dental Float", type: "equine", color: "bg-cyan-100 border-cyan-300 text-cyan-800" },
    { time: "15:30", duration: 1, patient: "Milo (Spaniel) — Booster", type: "routine", color: "bg-emerald-100 border-emerald-300 text-emerald-800" },
  ],
  "Dr Smith": [
    { time: "09:00", duration: 2, patient: "Max (JRT) — Post-op Check", type: "followup", color: "bg-blue-100 border-blue-300 text-blue-800" },
    { time: "10:30", duration: 1, patient: "Luna (BSH) — Pre-op Bloods", type: "surgery", color: "bg-red-100 border-red-300 text-red-800" },
    { time: "11:00", duration: 2, patient: "Rex (GSD) — Skin Consult", type: "consult", color: "bg-purple-100 border-purple-300 text-purple-800" },
    { time: "14:00", duration: 4, patient: "Luna (BSH) — Neutering", type: "surgery", color: "bg-red-100 border-red-300 text-red-800" },
    { time: "16:30", duration: 1, patient: "Walk-in Slot", type: "walkin", color: "bg-slate-100 border-slate-300 text-slate-600" },
  ],
  "Nurse Jones": [
    { time: "08:30", duration: 1, patient: "Bella — Nail Clip", type: "nurse", color: "bg-pink-100 border-pink-300 text-pink-800" },
    { time: "09:00", duration: 2, patient: "Puppy Class (4 dogs)", type: "nurse", color: "bg-pink-100 border-pink-300 text-pink-800" },
    { time: "10:30", duration: 1, patient: "Milo — Weight Check", type: "nurse", color: "bg-pink-100 border-pink-300 text-pink-800" },
    { time: "14:00", duration: 2, patient: "Post-Op Checks (3 animals)", type: "nurse", color: "bg-pink-100 border-pink-300 text-pink-800" },
  ],
};

const vets = Object.keys(appointments);

export default function AppointmentsPage() {
  const getSlotIndex = (time: string) => hours.indexOf(time);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Appointments" subtitle="Thursday 15 May 2026" />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50">&lt; Prev</button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold">Today</button>
              <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Next &gt;</button>
            </div>
            <div className="flex gap-2">
              {["Day", "Week", "Month"].map((v) => (
                <button key={v} className={`px-3 py-1.5 text-xs rounded-lg font-medium ${v === "Day" ? "bg-slate-900 text-white" : "bg-white border border-slate-300 text-slate-600"}`}>{v}</button>
              ))}
            </div>
            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition">
              + New Appointment
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            {/* Header */}
            <div className="grid border-b border-slate-200" style={{ gridTemplateColumns: "60px repeat(3, 1fr)" }}>
              <div className="px-2 py-3 bg-slate-50" />
              {vets.map((vet) => (
                <div key={vet} className="px-4 py-3 bg-slate-50 border-l border-slate-200 text-center">
                  <p className="text-sm font-semibold text-slate-900">{vet}</p>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="relative">
              {hours.map((hour, idx) => (
                <div key={hour} className="grid border-b border-slate-100" style={{ gridTemplateColumns: "60px repeat(3, 1fr)", height: "36px" }}>
                  <div className="px-2 flex items-center">
                    <span className="text-[10px] text-slate-400 font-mono">{hour}</span>
                  </div>
                  {vets.map((vet) => {
                    const appt = appointments[vet]?.find((a) => a.time === hour);
                    return (
                      <div key={vet} className="border-l border-slate-100 relative px-1">
                        {appt && (
                          <div
                            className={`absolute left-1 right-1 top-0 rounded border px-2 py-1 text-[10px] font-medium cursor-pointer hover:opacity-90 z-10 overflow-hidden ${appt.color}`}
                            style={{ height: `${appt.duration * 36}px` }}
                          >
                            {appt.patient}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4">
            {[
              { label: "Routine", color: "bg-emerald-200" },
              { label: "Farm Visit", color: "bg-amber-200" },
              { label: "Surgery", color: "bg-red-200" },
              { label: "Consult", color: "bg-purple-200" },
              { label: "Equine", color: "bg-cyan-200" },
              { label: "Nurse", color: "bg-pink-200" },
              { label: "Follow-up", color: "bg-blue-200" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${l.color}`} />
                <span className="text-xs text-slate-500">{l.label}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
