"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type Invoice = {
  id: string;
  client: string;
  patient: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  method: string;
};

const invoices: Invoice[] = [
  { id: "INV-2026-0341", client: "J. Henderson", patient: "Bella (Labrador)", amount: 145.60, status: "Paid", date: "08 May 2026", method: "Card" },
  { id: "INV-2026-0340", client: "S. Wright", patient: "Max (Terrier)", amount: 287.50, status: "Pending", date: "07 May 2026", method: "—" },
  { id: "INV-2026-0339", client: "Fram Farmers Ltd", patient: "Herd TB Test (42 head)", amount: 1_260.00, status: "Pending", date: "06 May 2026", method: "—" },
  { id: "INV-2026-0338", client: "M. Clarke", patient: "Luna (Cat)", amount: 320.00, status: "Paid", date: "05 May 2026", method: "Direct Debit" },
  { id: "INV-2026-0337", client: "T. Palmer", patient: "Cow #UK-347", amount: 89.40, status: "Overdue", date: "28 Apr 2026", method: "—" },
  { id: "INV-2026-0336", client: "Greenfields Farm", patient: "Herd Visit — Lameness", amount: 475.00, status: "Overdue", date: "25 Apr 2026", method: "—" },
  { id: "INV-2026-0335", client: "P. Richardson", patient: "Duke (GSD)", amount: 198.75, status: "Paid", date: "24 Apr 2026", method: "Card" },
  { id: "INV-2026-0334", client: "A. Whitfield", patient: "Rosie (Thoroughbred)", amount: 540.00, status: "Paid", date: "22 Apr 2026", method: "Insurance" },
  { id: "INV-2026-0333", client: "L. Beecham", patient: "Milo (Cockapoo)", amount: 67.20, status: "Paid", date: "21 Apr 2026", method: "Cash" },
  { id: "INV-2026-0332", client: "Hillside Dairy", patient: "Herd Fertility Visit", amount: 890.00, status: "Paid", date: "18 Apr 2026", method: "Direct Debit" },
];

const insuranceClaims = [
  { ref: "CLM-4521", client: "A. Whitfield", insurer: "Petplan", amount: 540.00, status: "Approved", date: "01 May 2026" },
  { ref: "CLM-4518", client: "J. Henderson", insurer: "Animal Friends", amount: 287.50, status: "Submitted", date: "28 Apr 2026" },
  { ref: "CLM-4515", client: "S. Wright", insurer: "Bought By Many", amount: 198.75, status: "Submitted", date: "25 Apr 2026" },
  { ref: "CLM-4510", client: "P. Richardson", insurer: "Petplan", amount: 320.00, status: "Rejected", date: "20 Apr 2026" },
];

type POSItem = {
  name: string;
  price: number;
};

const posProducts: POSItem[] = [
  { name: "Consultation", price: 45 },
  { name: "Vaccination", price: 35 },
  { name: "Neutering", price: 180 },
  { name: "Dental Scale", price: 120 },
  { name: "Blood Test", price: 65 },
  { name: "X-Ray", price: 85 },
  { name: "Flea Treatment", price: 12 },
  { name: "Wormer", price: 8 },
];

export default function BillingPage() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [posMode, setPosMode] = useState(false);
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"Card" | "Cash" | "Account">("Card");

  const filteredInvoices = invoices.filter((inv) => statusFilter === "All" || inv.status === statusFilter);

  const totalOutstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);
  const revenueThisMonth = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const paymentMethods = [
    { method: "Card", count: 12, total: 2_841.10, pct: 42 },
    { method: "Direct Debit", count: 8, total: 1_890.00, pct: 28 },
    { method: "Insurance", count: 5, total: 1_245.00, pct: 18 },
    { method: "Cash", count: 4, total: 812.40, pct: 12 },
  ];

  const addToCart = (product: POSItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing && existing.qty > 1) {
        return prev.map((item) =>
          item.name === name ? { ...item, qty: item.qty - 1 } : item
        );
      }
      return prev.filter((item) => item.name !== name);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Billing & Invoicing" subtitle="Revenue management and payments" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* POS Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPosMode(!posMode)}
                className={`relative inline-flex h-8 w-[140px] items-center rounded-lg transition ${
                  posMode ? "bg-emerald-600" : "bg-slate-200"
                }`}
              >
                <span className={`absolute left-2 text-xs font-semibold transition ${posMode ? "text-white" : "text-slate-500"}`}>
                  POS Mode
                </span>
                <span
                  className={`inline-block h-6 w-6 transform rounded-md bg-white shadow-sm transition ${
                    posMode ? "translate-x-[108px]" : "translate-x-1"
                  }`}
                />
              </button>
              {posMode && (
                <span className="text-xs text-emerald-600 font-semibold">Touch-friendly point of sale active</span>
              )}
            </div>
          </div>

          {posMode ? (
            /* POS View */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Grid */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4">Services & Products</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {posProducts.map((product) => (
                      <button
                        key={product.name}
                        onClick={() => addToCart(product)}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition active:scale-95 min-h-[100px]"
                      >
                        <span className="text-sm font-semibold text-slate-800">{product.name}</span>
                        <span className="text-lg font-bold text-emerald-600 mt-1">£{product.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart / Running Total */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 flex flex-col">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Current Sale
                    {cartItemCount > 0 && (
                      <span className="ml-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {cartItemCount} item{cartItemCount !== 1 ? "s" : ""}
                      </span>
                    )}
                  </h3>
                </div>

                <div className="flex-1 px-5 py-3 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-8">Tap a product to add it</p>
                  ) : (
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.name} className="flex items-center justify-between py-2 border-b border-slate-100">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{item.name}</p>
                            <p className="text-xs text-slate-400">£{item.price.toFixed(2)} x {item.qty}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">£{(item.price * item.qty).toFixed(2)}</span>
                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-red-50 text-red-500 text-xs font-bold hover:bg-red-100 transition"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 border-t border-slate-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-700">Total</span>
                    <span className="text-2xl font-bold text-slate-900">£{cartTotal.toFixed(2)}</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex gap-2">
                    {(["Card", "Cash", "Account"] as const).map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                          paymentMethod === method
                            ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={cart.length === 0}
                    onClick={() => { setCart([]); }}
                    className={`w-full py-3 text-sm font-bold rounded-lg transition ${
                      cart.length > 0
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Charge £{cartTotal.toFixed(2)} — {paymentMethod}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Invoice View */
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase text-slate-500">Revenue This Month</p>
                  <p className="text-2xl font-bold mt-1 text-emerald-600">£{revenueThisMonth.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-emerald-500 mt-0.5">+8% vs last month</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase text-slate-500">Outstanding</p>
                  <p className="text-2xl font-bold mt-1 text-amber-600">£{totalOutstanding.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{invoices.filter((i) => i.status === "Pending").length} pending invoices</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase text-slate-500">Overdue</p>
                  <p className="text-2xl font-bold mt-1 text-red-600">£{totalOverdue.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
                  <p className="text-xs text-red-500 mt-0.5">{invoices.filter((i) => i.status === "Overdue").length} invoices overdue</p>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase text-slate-500">Avg. Invoice Value</p>
                  <p className="text-2xl font-bold mt-1 text-slate-900">£{(invoices.reduce((s, i) => s + i.amount, 0) / invoices.length).toFixed(2)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Across {invoices.length} invoices</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoices Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-slate-900">Recent Invoices</h3>
                      <select
                        className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                      + Create Invoice
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-left">
                          <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Invoice #</th>
                          <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Client / Patient</th>
                          <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Amount</th>
                          <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Status</th>
                          <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Date</th>
                          <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredInvoices.map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50 transition cursor-pointer">
                            <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">{inv.id}</td>
                            <td className="px-3 py-3">
                              <p className="font-medium text-slate-900">{inv.client}</p>
                              <p className="text-xs text-slate-400">{inv.patient}</p>
                            </td>
                            <td className="px-3 py-3 font-bold text-slate-900">£{inv.amount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</td>
                            <td className="px-3 py-3">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                                inv.status === "Pending" ? "bg-amber-100 text-amber-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {inv.status}
                              </span>
                            </td>
                            <td className="px-3 py-3 text-xs text-slate-500">{inv.date}</td>
                            <td className="px-3 py-3 text-xs text-slate-500">{inv.method}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                  {/* Payment Method Breakdown */}
                  <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Payment Methods — This Month</h3>
                    <div className="space-y-3">
                      {paymentMethods.map((pm) => (
                        <div key={pm.method}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-600">{pm.method}</span>
                            <span className="text-xs font-semibold text-slate-700">£{pm.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })} ({pm.pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${pm.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Chart Placeholder */}
                  <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Revenue — Last 6 Months</h3>
                    <div className="flex items-end gap-2 h-32">
                      {[
                        { month: "Dec", value: 18200, pct: 72 },
                        { month: "Jan", value: 15800, pct: 63 },
                        { month: "Feb", value: 19400, pct: 77 },
                        { month: "Mar", value: 22100, pct: 88 },
                        { month: "Apr", value: 21500, pct: 85 },
                        { month: "May", value: 25200, pct: 100 },
                      ].map((m) => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-slate-700">£{(m.value / 1000).toFixed(1)}k</span>
                          <div className="w-full bg-emerald-500 rounded-t" style={{ height: `${m.pct}%` }} />
                          <span className="text-xs text-slate-500">{m.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Insurance Claims */}
                  <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Insurance Claims</h3>
                    <div className="space-y-2">
                      {insuranceClaims.map((claim) => (
                        <div key={claim.ref} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-semibold text-slate-700">{claim.ref}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              claim.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                              claim.status === "Submitted" ? "bg-blue-100 text-blue-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {claim.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-800">{claim.client} — {claim.insurer}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-slate-400">{claim.date}</span>
                            <span className="text-xs font-bold text-slate-700">£{claim.amount.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
