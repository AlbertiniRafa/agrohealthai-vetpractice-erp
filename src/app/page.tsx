"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold">
          <span className="text-emerald-400">Cura</span>Vet
        </h1>
        <p className="text-lg text-slate-300 mt-2">Veterinary Practice ERP</p>
        <p className="text-slate-400 mt-6 max-w-md leading-relaxed">
          The only veterinary practice management system with AI-powered clinical diagnostics,
          antimicrobial stewardship, and 39,917 peer-reviewed evidence sources.
        </p>

        <div className="mt-12 space-y-4">
          {[
            { icon: "🧠", color: "bg-emerald-600", title: "AI Clinical Diagnostics", desc: "Differential diagnosis with treatment protocols" },
            { icon: "💊", color: "bg-blue-600", title: "AMR Stewardship", desc: "RUMA-compliant prescribing with withdrawal periods" },
            { icon: "📅", color: "bg-indigo-600", title: "Smart Scheduling", desc: "AI-suggested appointment durations, online booking" },
            { icon: "📚", color: "bg-purple-600", title: "Evidence-Based", desc: "PubMed, OpenAlex, PMC — 39,917 sources" },
            { icon: "💷", color: "bg-pink-600", title: "Billing & Insurance", desc: "Auto-charge from records, direct insurance claims" },
            { icon: "🐄", color: "bg-amber-600", title: "All Species", desc: "Farm, equine, small animal, and exotic" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${f.color} flex items-center justify-center text-sm`}>{f.icon}</div>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-slate-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3">
          <img src="/agroinsights-logo.png" alt="Agroinsights Technologies" className="h-8 w-auto opacity-60" />
          <p className="text-xs text-slate-500">Stowmarket, Suffolk, UK</p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              <span className="text-emerald-600">AgroHealth</span>AI VetPractice
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your practice</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                placeholder="vet@practice.co.uk"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                placeholder=""
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-slate-400">
            Powered by CuraVet + AgroHealthAI
          </p>
        </div>
      </div>
    </div>
  );
}
