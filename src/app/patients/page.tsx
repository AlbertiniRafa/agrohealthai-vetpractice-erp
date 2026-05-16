"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const demoPatients = [
  { id: 1, name: "Bella", species: "Canine", breed: "Labrador", sex: "F", age: "4y", weight: "28kg", owner: "J. Henderson", status: "Healthy", lastVisit: "2026-05-14", microchip: "985112006789012" },
  { id: 2, name: "Max", species: "Canine", breed: "Jack Russell", sex: "M", age: "7y", weight: "6.5kg", owner: "S. Wright", status: "Treatment", lastVisit: "2026-05-13", microchip: "985112006789034" },
  { id: 3, name: "Luna", species: "Feline", breed: "British Shorthair", sex: "F", age: "2y", weight: "4.2kg", owner: "M. Clarke", status: "Booked", lastVisit: "2026-04-20", microchip: "985112006789056" },
  { id: 4, name: "UK-001 Buttercup", species: "Cattle", breed: "Holstein Friesian", sex: "F", age: "5y", weight: "650kg", owner: "Fram Farmers", status: "Monitoring", lastVisit: "2026-05-14", microchip: "UK347892001" },
  { id: 5, name: "UK-002 Rosie", species: "Cattle", breed: "Hereford", sex: "F", age: "3y", weight: "520kg", owner: "Fram Farmers", status: "Healthy", lastVisit: "2026-05-10", microchip: "UK347892002" },
  { id: 6, name: "FF-003 Clover", species: "Sheep", breed: "Suffolk", sex: "F", age: "2y", weight: "80kg", owner: "Fram Farmers", status: "Healthy", lastVisit: "2026-05-08", microchip: "UK347892003" },
  { id: 7, name: "Charlie", species: "Equine", breed: "Thoroughbred", sex: "M", age: "12y", weight: "500kg", owner: "T. Palmer", status: "Healthy", lastVisit: "2026-05-01", microchip: "826041234567890" },
  { id: 8, name: "Milo", species: "Canine", breed: "Cocker Spaniel", sex: "M", age: "1y", weight: "13kg", owner: "R. Davis", status: "Vaccinations Due", lastVisit: "2026-03-15", microchip: "985112006789078" },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("all");

  const filtered = demoPatients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase()) || p.breed.toLowerCase().includes(search.toLowerCase());
    const matchSpecies = speciesFilter === "all" || p.species.toLowerCase() === speciesFilter;
    return matchSearch && matchSpecies;
  });

  const statusColors: Record<string, string> = {
    "Healthy": "bg-emerald-100 text-emerald-700",
    "Treatment": "bg-red-100 text-red-700",
    "Monitoring": "bg-amber-100 text-amber-700",
    "Booked": "bg-blue-100 text-blue-700",
    "Vaccinations Due": "bg-purple-100 text-purple-700",
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Patients" subtitle={`${demoPatients.length} registered patients`} />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, owner, or breed..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">All Species</option>
              <option value="canine">Canine</option>
              <option value="feline">Feline</option>
              <option value="cattle">Cattle</option>
              <option value="sheep">Sheep</option>
              <option value="equine">Equine</option>
            </select>
            <button className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition">
              + New Patient
            </button>
          </div>

          {/* Patient Table */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Species / Breed</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Last Visit</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Weight</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.sex} | {p.age}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-700">{p.species}</p>
                      <p className="text-xs text-slate-400">{p.breed}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{p.owner}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusColors[p.status] || "bg-slate-100 text-slate-600"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{p.lastVisit}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{p.weight}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded hover:bg-emerald-100">View</button>
                        <button className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 rounded hover:bg-purple-100">AI Dx</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
