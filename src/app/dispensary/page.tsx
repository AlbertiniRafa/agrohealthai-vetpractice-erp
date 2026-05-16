"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type Product = {
  id: number;
  name: string;
  category: "POM-V" | "POM-VPS" | "AVM-GSL";
  rumaCategory: "D" | "C" | "B" | "A" | "—";
  stockLevel: number;
  reorderPoint: number;
  batchNumber: string;
  expiry: string;
  unitPrice: number;
  supplier: string;
};

const inventory: Product[] = [
  { id: 1, name: "Metacam 1.5mg/ml Oral Suspension (Dog) 32ml", category: "POM-V", rumaCategory: "—", stockLevel: 24, reorderPoint: 10, batchNumber: "MC-2026-0441", expiry: "2027-09-30", unitPrice: 18.50, supplier: "Boehringer Ingelheim" },
  { id: 2, name: "Synulox 250mg Palatable Tablets", category: "POM-V", rumaCategory: "D", stockLevel: 3, reorderPoint: 15, batchNumber: "SY-2026-1187", expiry: "2027-03-15", unitPrice: 22.80, supplier: "Zoetis" },
  { id: 3, name: "Advocate Spot-On Dog 10-25kg (3 pipettes)", category: "POM-V", rumaCategory: "—", stockLevel: 18, reorderPoint: 8, batchNumber: "AD-2025-7823", expiry: "2027-06-01", unitPrice: 28.95, supplier: "Elanco" },
  { id: 4, name: "Frontline Plus Spot-On Dog 20-40kg (3 pipettes)", category: "AVM-GSL", rumaCategory: "—", stockLevel: 32, reorderPoint: 10, batchNumber: "FL-2026-3392", expiry: "2028-01-31", unitPrice: 19.99, supplier: "Boehringer Ingelheim" },
  { id: 5, name: "Nobivac DHP Vaccine (10 doses)", category: "POM-V", rumaCategory: "—", stockLevel: 6, reorderPoint: 5, batchNumber: "NB-2026-0098", expiry: "2026-12-15", unitPrice: 42.00, supplier: "MSD Animal Health" },
  { id: 6, name: "Nobivac Lepto4 Vaccine (10 doses)", category: "POM-V", rumaCategory: "—", stockLevel: 4, reorderPoint: 5, batchNumber: "NL-2026-0211", expiry: "2026-11-30", unitPrice: 48.50, supplier: "MSD Animal Health" },
  { id: 7, name: "Drontal Plus Flavour Bone Tablets (Dog)", category: "POM-VPS", rumaCategory: "—", stockLevel: 42, reorderPoint: 15, batchNumber: "DR-2026-5567", expiry: "2028-04-30", unitPrice: 7.20, supplier: "Elanco" },
  { id: 8, name: "Amoxicillin/Clavulanate 500mg Injection", category: "POM-V", rumaCategory: "D", stockLevel: 12, reorderPoint: 8, batchNumber: "AX-2026-2209", expiry: "2027-02-28", unitPrice: 14.60, supplier: "Zoetis" },
  { id: 9, name: "Cefalexin 250mg Capsules (100)", category: "POM-V", rumaCategory: "C", stockLevel: 2, reorderPoint: 5, batchNumber: "CX-2025-8844", expiry: "2026-08-31", unitPrice: 35.40, supplier: "Dechra" },
  { id: 10, name: "Enrofloxacin 50mg Tablets (100)", category: "POM-V", rumaCategory: "B", stockLevel: 8, reorderPoint: 3, batchNumber: "EN-2026-1105", expiry: "2027-07-15", unitPrice: 52.00, supplier: "Chanelle Pharma" },
  { id: 11, name: "Meloxicam 20mg/ml Injection (Cattle) 100ml", category: "POM-V", rumaCategory: "—", stockLevel: 7, reorderPoint: 4, batchNumber: "MX-2026-0772", expiry: "2027-05-31", unitPrice: 38.90, supplier: "Norbrook" },
  { id: 12, name: "Pen & Strep Injection 100ml", category: "POM-V", rumaCategory: "D", stockLevel: 15, reorderPoint: 6, batchNumber: "PS-2026-3301", expiry: "2027-01-31", unitPrice: 16.75, supplier: "Norbrook" },
  { id: 13, name: "Oxytetracycline 200 LA Injection 100ml", category: "POM-V", rumaCategory: "D", stockLevel: 1, reorderPoint: 4, batchNumber: "OT-2025-9912", expiry: "2026-09-30", unitPrice: 22.50, supplier: "Norbrook" },
  { id: 14, name: "Marbofloxacin 80mg Tablets (20)", category: "POM-V", rumaCategory: "B", stockLevel: 5, reorderPoint: 3, batchNumber: "MB-2026-4456", expiry: "2027-11-30", unitPrice: 44.20, supplier: "Vetoquinol" },
  { id: 15, name: "Finadyne Transdermal 50mg/ml 250ml", category: "POM-V", rumaCategory: "—", stockLevel: 3, reorderPoint: 2, batchNumber: "FD-2026-0088", expiry: "2027-04-30", unitPrice: 62.00, supplier: "MSD Animal Health" },
  { id: 16, name: "Milprazon Chewable Tablets (Dog >5kg) 48 pack", category: "POM-VPS", rumaCategory: "—", stockLevel: 22, reorderPoint: 10, batchNumber: "MP-2026-1178", expiry: "2028-02-28", unitPrice: 4.80, supplier: "KRKA" },
];

const rumaBreakdown = {
  D: { label: "Category D — First Line", prescribed: 142, pct: 72, color: "emerald" },
  C: { label: "Category C — Caution", prescribed: 38, pct: 19, color: "amber" },
  B: { label: "Category B — Restrict", prescribed: 14, pct: 7, color: "red" },
  A: { label: "Category A — Avoid", prescribed: 3, pct: 2, color: "red" },
};

export default function DispensaryPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filtered = inventory.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter((p) => p.stockLevel <= p.reorderPoint).length;

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Dispensary" subtitle="Stock Management & AMR Stewardship" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Total Products</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{inventory.length}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Stock Value</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">
                £{inventory.reduce((sum, p) => sum + p.stockLevel * p.unitPrice, 0).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Low Stock Alerts</p>
              <p className="text-2xl font-bold mt-1 text-red-600">{lowStockCount}</p>
              <p className="text-xs text-red-500 mt-0.5">Requires attention</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Expiring &lt;90 Days</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">2</p>
              <p className="text-xs text-amber-500 mt-0.5">Review needed</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inventory Table */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              {/* Search & Filter Bar */}
              <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder="Search products or suppliers..."
                  className="flex-1 min-w-[200px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="POM-V">POM-V</option>
                  <option value="POM-VPS">POM-VPS</option>
                  <option value="AVM-GSL">AVM-GSL</option>
                </select>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                  + Add Product
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Product</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Category</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Stock</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Batch</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Expiry</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Price</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((p) => {
                      const isLow = p.stockLevel <= p.reorderPoint;
                      return (
                        <tr key={p.id} className={`hover:bg-slate-50 transition ${isLow ? "bg-red-50" : ""}`}>
                          <td className="px-5 py-3">
                            <p className={`font-medium ${isLow ? "text-red-800" : "text-slate-900"}`}>{p.name}</p>
                            <p className="text-xs text-slate-400">{p.supplier}</p>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              p.category === "POM-V" ? "bg-purple-100 text-purple-700" :
                              p.category === "POM-VPS" ? "bg-blue-100 text-blue-700" :
                              "bg-slate-100 text-slate-600"
                            }`}>
                              {p.category}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`font-bold ${isLow ? "text-red-600" : "text-slate-900"}`}>{p.stockLevel}</span>
                            {isLow && <span className="text-xs text-red-500 ml-1">LOW</span>}
                          </td>
                          <td className="px-3 py-3 text-xs text-slate-500 font-mono">{p.batchNumber}</td>
                          <td className="px-3 py-3 text-xs text-slate-500">{p.expiry}</td>
                          <td className="px-3 py-3 font-medium text-slate-900">£{p.unitPrice.toFixed(2)}</td>
                          <td className="px-3 py-3">
                            {isLow ? (
                              <button className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition">
                                Reorder
                              </button>
                            ) : (
                              <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AMR Stewardship Panel */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">AMR Stewardship</h3>
                <p className="text-xs text-slate-500 mb-4">RUMA Category Breakdown — Last 90 Days</p>

                <div className="space-y-4">
                  {Object.entries(rumaBreakdown).map(([key, data]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-600">{data.label}</span>
                        <span className={`text-sm font-bold ${
                          data.color === "emerald" ? "text-emerald-600" :
                          data.color === "amber" ? "text-amber-600" :
                          "text-red-600"
                        }`}>{data.pct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            data.color === "emerald" ? "bg-emerald-500" :
                            data.color === "amber" ? "bg-amber-500" :
                            "bg-red-500"
                          }`}
                          style={{ width: `${data.pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{data.prescribed} prescriptions</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                  <p className="text-xs font-semibold text-emerald-700">RUMA Target: MET</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Category D usage above 70% threshold. Good antimicrobial stewardship.</p>
                </div>
              </div>

              {/* eMB Score */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">eMB Score (mg/kg)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Cattle</span>
                    <span className="text-sm font-bold text-emerald-600">14.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Sheep</span>
                    <span className="text-sm font-bold text-emerald-600">8.7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-slate-600">Pigs</span>
                    <span className="text-sm font-bold text-amber-600">22.1</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">National median cattle: 18.3 mg/kg</p>
                </div>
              </div>

              {/* Recent Dispensing */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Dispensing</h3>
                <div className="space-y-2">
                  {[
                    { drug: "Metacam 1.5mg/ml", patient: "Bella (Dog)", qty: 1, time: "Today 10:45" },
                    { drug: "Synulox 250mg x14", patient: "Max (Dog)", qty: 14, time: "Today 09:20" },
                    { drug: "Pen & Strep 100ml", patient: "Cow #UK-347", qty: 1, time: "Yesterday 15:30" },
                  ].map((d, i) => (
                    <div key={i} className="p-2 rounded bg-slate-50 text-xs">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">{d.drug}</span>
                        <span className="text-slate-400">{d.time}</span>
                      </div>
                      <p className="text-slate-500">{d.patient} — Qty: {d.qty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
