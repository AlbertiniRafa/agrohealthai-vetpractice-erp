"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const patients = [
  { id: 1, name: "Bella", species: "Canine", breed: "Labrador Retriever", owner: "J. Henderson", weight: "28.5 kg", age: "4y 3m" },
  { id: 2, name: "Max", species: "Canine", breed: "Border Terrier", owner: "S. Wright", weight: "6.2 kg", age: "7y 1m" },
  { id: 3, name: "Luna", species: "Feline", breed: "British Shorthair", owner: "M. Clarke", weight: "4.1 kg", age: "2y 8m" },
  { id: 4, name: "Cow #UK-347", species: "Bovine", breed: "Holstein Friesian", owner: "Fram Farmers Ltd", weight: "620 kg", age: "5y" },
  { id: 5, name: "Rosie", species: "Equine", breed: "Thoroughbred", owner: "T. Palmer", weight: "485 kg", age: "9y" },
];

const previousNotes = [
  { date: "02 May 2026", vet: "Dr Coe", chief: "Annual vaccination booster", assessment: "Healthy, no concerns. DHPPi + Lepto4 administered.", status: "Completed" },
  { date: "14 Mar 2026", vet: "Dr Smith", chief: "Itchy ears, head shaking x3 days", assessment: "Otitis externa — bacterial. Swab sent. Prescribed Canaural ear drops.", status: "Completed" },
  { date: "28 Jan 2026", vet: "Dr Coe", chief: "Routine neuter pre-op check", assessment: "Fit for GA. Bloods within normal limits. Surgery booked 02 Feb.", status: "Completed" },
];

const labResults = [
  { date: "14 Mar 2026", test: "Ear Cytology", result: "Cocci +++, rods +, Malassezia —", status: "Final" },
  { date: "28 Jan 2026", test: "Pre-GA Bloods (Biochem + Haem)", result: "All WNL. ALT 42, Creat 89, PCV 0.42", status: "Final" },
  { date: "15 Nov 2025", test: "Faecal Egg Count", result: "Negative — no eggs seen", status: "Final" },
];

export default function ClinicalPage() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [soap, setSoap] = useState({ subjective: "", objective: "", assessment: "", plan: "" });
  const [vitals, setVitals] = useState({ temp: "", hr: "", rr: "", weight: "" });
  const [aiThinking, setAiThinking] = useState(false);

  const handleAskAI = () => {
    setAiThinking(true);
    setTimeout(() => {
      setSoap((prev) => ({
        ...prev,
        assessment: "AI Suggestion: Based on the presenting signs (head shaking, brown discharge, erythematous ear canal), the most likely diagnosis is Otitis Externa — mixed bacterial/yeast infection. Confidence: 89%. Consider ear cytology to confirm. Rule out: ear mites (Otodectes), foreign body, allergic otitis.",
        plan: "AI Suggested Plan:\n1. Ear cytology swab (in-house or external lab)\n2. Canaural ear drops — 5 drops each ear BID x 7 days\n3. If no improvement in 7 days, consider culture & sensitivity\n4. Review diet if recurrent — consider atopic dermatitis workup\n5. Recheck appointment in 10 days",
      }));
      setAiThinking(false);
    }, 1500);
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Clinical Records" subtitle="SOAP Note Editor" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Patient Selector */}
          <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200 mb-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-slate-700">Patient:</label>
              <select
                className="flex-1 max-w-md border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedPatient.id}
                onChange={(e) => setSelectedPatient(patients.find((p) => p.id === Number(e.target.value)) || patients[0])}
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.species} ({p.breed}) — {p.owner}
                  </option>
                ))}
              </select>
              <div className="ml-auto flex items-center gap-6 text-xs text-slate-500">
                <span>Species: <strong className="text-slate-700">{selectedPatient.species}</strong></span>
                <span>Weight: <strong className="text-slate-700">{selectedPatient.weight}</strong></span>
                <span>Age: <strong className="text-slate-700">{selectedPatient.age}</strong></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: SOAP Notes */}
            <div className="lg:col-span-2 space-y-4">
              {/* Vital Signs */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Vital Signs</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Temperature (°C)</label>
                    <input
                      type="text"
                      placeholder="38.5"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={vitals.temp}
                      onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Heart Rate (bpm)</label>
                    <input
                      type="text"
                      placeholder="80"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={vitals.hr}
                      onChange={(e) => setVitals({ ...vitals, hr: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Resp. Rate (brpm)</label>
                    <input
                      type="text"
                      placeholder="18"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={vitals.rr}
                      onChange={(e) => setVitals({ ...vitals, rr: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      placeholder={selectedPatient.weight.replace(" kg", "")}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={vitals.weight}
                      onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* SOAP Sections */}
              {[
                { key: "subjective", label: "S — Subjective", placeholder: "Owner's complaint, history, duration of symptoms..." },
                { key: "objective", label: "O — Objective", placeholder: "Clinical examination findings, vital signs, test results..." },
                { key: "assessment", label: "A — Assessment", placeholder: "Differential diagnosis, most likely condition..." },
                { key: "plan", label: "P — Plan", placeholder: "Treatment plan, medications, follow-up schedule..." },
              ].map((section) => (
                <div key={section.key} className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{section.label}</h3>
                  <textarea
                    rows={4}
                    placeholder={section.placeholder}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                    value={soap[section.key as keyof typeof soap]}
                    onChange={(e) => setSoap({ ...soap, [section.key]: e.target.value })}
                  />
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAskAI}
                  disabled={aiThinking}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {aiThinking ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI Thinking...
                    </>
                  ) : (
                    <>Ask AI for Diagnosis</>
                  )}
                </button>
                <button className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">
                  Save Note
                </button>
                <button className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition">
                  Print
                </button>
              </div>
            </div>

            {/* Right Column: History & Labs */}
            <div className="space-y-4">
              {/* Previous Clinical Notes */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Previous Notes — {selectedPatient.name}</h3>
                <div className="space-y-3">
                  {previousNotes.map((note, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 cursor-pointer hover:bg-slate-100 transition">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-700">{note.date}</span>
                        <span className="text-xs text-emerald-600 font-medium">{note.status}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{note.chief}</p>
                      <p className="text-xs text-slate-500 mt-1">{note.assessment}</p>
                      <p className="text-xs text-slate-400 mt-1">{note.vet}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Results & Imaging */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Lab Results & Imaging</h3>
                <div className="space-y-3">
                  {labResults.map((lab, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-700">{lab.date}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">{lab.status}</span>
                      </div>
                      <p className="text-sm font-medium text-slate-800">{lab.test}</p>
                      <p className="text-xs text-slate-500 mt-1">{lab.result}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg border-2 border-dashed border-slate-200 text-center">
                  <p className="text-xs text-slate-400">Drag & drop imaging files here</p>
                  <p className="text-xs text-slate-300 mt-1">DICOM, JPEG, PNG supported</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
