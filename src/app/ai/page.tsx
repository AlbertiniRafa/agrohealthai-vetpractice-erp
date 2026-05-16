"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { runDiagnosis, submitFeedback } from "@/lib/api";

export default function AIDiagnosticsPage() {
  const [animalId, setAnimalId] = useState("1");
  const [species, setSpecies] = useState("cattle");
  const [symptoms, setSymptoms] = useState("");
  const [temperature, setTemperature] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    setFeedbackSent(false);
    try {
      const data = await runDiagnosis({
        animal_id: parseInt(animalId),
        species,
        symptoms,
        temperature_celsius: temperature ? parseFloat(temperature) : undefined,
        additional_context: context || undefined,
        language: "en",
      });
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message || "Diagnosis failed");
    } finally {
      setLoading(false);
    }
  }

  const tp = result?.treatment_plan as Record<string, unknown> | undefined;

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="AI Clinical Diagnostics" subtitle="Powered by AgroHealthAI — 39,917 evidence sources" />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Input Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200 mb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Species</label>
                    <select value={species} onChange={(e) => setSpecies(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none">
                      <optgroup label="Farm">
                        <option value="cattle">Cattle</option>
                        <option value="sheep">Sheep</option>
                        <option value="swine">Swine</option>
                        <option value="goat">Goat</option>
                        <option value="poultry">Poultry</option>
                      </optgroup>
                      <optgroup label="Equine">
                        <option value="equine">Equine</option>
                      </optgroup>
                      <optgroup label="Small Animal">
                        <option value="canine">Canine</option>
                        <option value="feline">Feline</option>
                        <option value="rabbit">Rabbit</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Temperature (C)</label>
                    <input type="number" step="0.1" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="40.2" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Additional Context</label>
                    <input type="text" value={context} onChange={(e) => setContext(e.target.value)} placeholder="Age, history, recent events..." className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Clinical Symptoms</label>
                  <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required rows={3} placeholder="Describe observed symptoms: fever, coughing, lameness, discharge, behaviour changes..." className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none" />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50 transition">
                  {loading ? "Analysing clinical data..." : "Run AI Assessment"}
                </button>
              </form>
            </div>

            {/* Results */}
            {result && (
              <div className="space-y-4">
                {/* Diagnosis + Urgency */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase text-emerald-600">Primary Diagnosis</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{result.diagnosis as string}</p>
                    <p className="text-sm text-slate-500 mt-1">Confidence: {((result.confidence as number) * 100).toFixed(0)}%</p>
                    <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                      <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(result.confidence as number) * 100}%` }} />
                    </div>
                  </div>
                  <div className={`bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200 ${(result.urgency_level as number) >= 4 ? "border-l-4 border-red-500" : (result.urgency_level as number) >= 3 ? "border-l-4 border-amber-500" : "border-l-4 border-emerald-500"}`}>
                    <p className="text-xs font-semibold uppercase text-slate-600">Urgency</p>
                    <p className="text-4xl font-bold mt-1">{result.urgency_level as number}<span className="text-lg text-slate-400">/5</span></p>
                    <p className="text-xs text-slate-500 mt-1">{result.urgency_label as string}</p>
                  </div>
                </div>

                {/* Differentials */}
                {((result.differential_diagnoses as Array<Record<string, unknown>>)?.length ?? 0) > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase text-slate-600 mb-3">Differential Diagnoses</p>
                    <div className="space-y-2">
                      {(result.differential_diagnoses as Array<Record<string, unknown>>).map((d, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{d.condition as string}</p>
                            {d.description && <p className="text-xs text-slate-500 mt-0.5">{d.description as string}</p>}
                          </div>
                          <span className="text-sm font-bold text-emerald-600">{((d.probability as number) * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Treatment Plan */}
                {tp && (
                  <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-purple-200 border-l-4 border-purple-500">
                    <p className="text-xs font-semibold uppercase text-purple-700 mb-4">Treatment Plan</p>

                    {(tp.medications as Array<Record<string, unknown>>)?.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Medications</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          {(tp.medications as Array<Record<string, unknown>>).map((med, i) => (
                            <div key={i} className="rounded-lg bg-purple-50 p-3 text-xs">
                              <p className="font-semibold text-slate-900">{med.drug as string}</p>
                              <p className="text-slate-600 mt-1">
                                {med.dose && `${med.dose}`}{med.route && ` | ${med.route}`}{med.frequency && ` | ${med.frequency}`}{med.duration && ` | ${med.duration}`}
                              </p>
                              {(med.withdrawal_meat_days || med.withdrawal_milk_days) && (
                                <p className="text-amber-700 font-medium mt-1">
                                  Withdrawal: {med.withdrawal_meat_days as number}d meat{(med.withdrawal_milk_days as number) > 0 ? `, ${med.withdrawal_milk_days}d milk` : ""}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(tp.supportive_care as string[])?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-slate-700 mb-1">Supportive Care</p>
                        <ul className="space-y-1">{(tp.supportive_care as string[]).map((s, i) => <li key={i} className="text-xs text-slate-600">• {s}</li>)}</ul>
                      </div>
                    )}

                    {(tp.monitoring as string[])?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-slate-700 mb-1">Monitoring</p>
                        <ul className="space-y-1">{(tp.monitoring as string[]).map((m, i) => <li key={i} className="text-xs text-slate-600">• {m}</li>)}</ul>
                      </div>
                    )}

                    {tp.follow_up && <p className="text-xs text-purple-700 font-medium">Follow-up: {tp.follow_up as string}</p>}
                  </div>
                )}

                {/* AMR Stewardship */}
                {result.stewardship_note && (
                  <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-blue-200 border-l-4 border-blue-500">
                    <p className="text-xs font-semibold uppercase text-blue-700 mb-2">Antimicrobial Stewardship</p>
                    <p className="text-sm text-blue-700">{result.stewardship_note as string}</p>
                  </div>
                )}

                {/* Feedback */}
                <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
                  {feedbackSent ? (
                    <p className="text-sm text-emerald-600 font-semibold text-center">Thank you for your feedback — it helps train the AI.</p>
                  ) : (
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-slate-700 font-medium">Do you agree with this assessment?</p>
                      <button onClick={async () => { await submitFeedback({ health_event_id: result.health_event_id, vet_agrees: true }); setFeedbackSent(true); }} className="px-6 py-2 rounded-lg bg-emerald-100 border border-emerald-300 text-sm font-semibold text-emerald-700 hover:bg-emerald-200">Agree</button>
                      <button onClick={async () => { await submitFeedback({ health_event_id: result.health_event_id, vet_agrees: false }); setFeedbackSent(true); }} className="px-6 py-2 rounded-lg bg-red-100 border border-red-300 text-sm font-semibold text-red-700 hover:bg-red-200">Disagree</button>
                    </div>
                  )}
                </div>

                {/* Clinical Reasoning */}
                {result.clinical_reasoning && (
                  <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500">
                    <span className="font-semibold">Clinical Reasoning:</span> {result.clinical_reasoning as string}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
