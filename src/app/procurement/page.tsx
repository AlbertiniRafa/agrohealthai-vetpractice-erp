"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type Supplier = {
  name: string;
  contact: string;
  email: string;
  lastOrder: string;
  paymentTerms: string;
  rating: number;
  spend: number;
};

const suppliers: Supplier[] = [
  { name: "NVS (National Veterinary Services)", contact: "Sarah Mitchell", email: "orders@nvs.co.uk", lastOrder: "06 May 2026", paymentTerms: "Net 30", rating: 5, spend: 14_200 },
  { name: "MWI Animal Health", contact: "James Thornton", email: "uk.orders@mwiah.com", lastOrder: "02 May 2026", paymentTerms: "Net 30", rating: 4, spend: 9_800 },
  { name: "Centaur Services", contact: "Rebecca Hall", email: "sales@centaurservices.co.uk", lastOrder: "28 Apr 2026", paymentTerms: "Net 45", rating: 4, spend: 6_400 },
  { name: "Dechra Veterinary Products", contact: "Mark Evans", email: "vetorders@dechra.com", lastOrder: "25 Apr 2026", paymentTerms: "Net 30", rating: 5, spend: 8_100 },
  { name: "Norbrook Laboratories", contact: "Claire Watson", email: "uksales@norbrook.com", lastOrder: "20 Apr 2026", paymentTerms: "Net 60", rating: 3, spend: 4_500 },
];

type PurchaseOrder = {
  po: string;
  supplier: string;
  items: string;
  total: number;
  status: "Draft" | "Ordered" | "Received" | "Invoiced";
  date: string;
};

const purchaseOrders: PurchaseOrder[] = [
  { po: "PO-2026-0187", supplier: "NVS", items: "Metacam 20mg x50, Synulox 250mg x100", total: 2_180.0, status: "Ordered", date: "06 May 2026" },
  { po: "PO-2026-0186", supplier: "Dechra", items: "Vetoryl 30mg x60, Felimazole 5mg x100", total: 1_420.0, status: "Received", date: "03 May 2026" },
  { po: "PO-2026-0185", supplier: "MWI Animal Health", items: "Surgical gloves x20 boxes, Suture kits x50", total: 845.0, status: "Invoiced", date: "29 Apr 2026" },
  { po: "PO-2026-0184", supplier: "Centaur Services", items: "Autoclave maintenance kit, Dental scaler tips", total: 1_260.0, status: "Ordered", date: "28 Apr 2026" },
  { po: "PO-2026-0183", supplier: "Norbrook", items: "Pen & Strep 100ml x20, Alamycin LA x10", total: 680.0, status: "Draft", date: "27 Apr 2026" },
  { po: "PO-2026-0182", supplier: "NVS", items: "Bravecto chewable tabs x200, Nexgard x150", total: 3_200.0, status: "Received", date: "22 Apr 2026" },
];

const pendingDeliveries = [
  { po: "PO-2026-0187", supplier: "NVS", expectedDate: "10 May 2026", items: "Metacam, Synulox", tracking: "NVS-TRK-88421" },
  { po: "PO-2026-0184", supplier: "Centaur Services", expectedDate: "12 May 2026", items: "Autoclave kit, Dental tips", tracking: "CS-TRK-5503" },
];

const goodsReceivedNotes = [
  { grn: "GRN-0412", po: "PO-2026-0186", supplier: "Dechra", date: "05 May 2026", items: 2, status: "Complete" },
  { grn: "GRN-0411", po: "PO-2026-0182", supplier: "NVS", date: "24 Apr 2026", items: 2, status: "Complete" },
  { grn: "GRN-0410", po: "PO-2026-0185", supplier: "MWI Animal Health", date: "01 May 2026", items: 2, status: "Partial — 1 back-ordered" },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= count ? "text-amber-400" : "text-slate-200"}>&#9733;</span>
      ))}
    </span>
  );
}

export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState<"suppliers" | "orders" | "rfq" | "grn">("suppliers");
  const maxSpend = Math.max(...suppliers.map((s) => s.spend));

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Procurement" subtitle="Supplier management and purchase orders" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Active Suppliers</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">{suppliers.length}</p>
              <p className="text-xs text-slate-400 mt-0.5">All verified</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Open Orders</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">{purchaseOrders.filter((po) => po.status === "Ordered" || po.status === "Draft").length}</p>
              <p className="text-xs text-slate-400 mt-0.5">{purchaseOrders.filter((po) => po.status === "Draft").length} in draft</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Pending Deliveries</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{pendingDeliveries.length}</p>
              <p className="text-xs text-slate-400 mt-0.5">Next: {pendingDeliveries[0]?.expectedDate}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Total Spend (QTD)</p>
              <p className="text-2xl font-bold mt-1 text-slate-900">£{suppliers.reduce((s, sup) => s + sup.spend, 0).toLocaleString("en-GB")}</p>
              <p className="text-xs text-slate-400 mt-0.5">Across {suppliers.length} suppliers</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-slate-100 rounded-lg p-1 w-fit">
            {(["suppliers", "orders", "rfq", "grn"] as const).map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                  activeTab === tab ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "suppliers" ? "Suppliers" : tab === "orders" ? "Purchase Orders" : tab === "rfq" ? "RFQ" : "Goods Received"}
              </button>
            ))}
          </div>

          {/* Suppliers Tab */}
          {activeTab === "suppliers" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Supplier Directory</h3>
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                    + Add Supplier
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Supplier</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Contact</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Last Order</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Terms</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Rating</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Spend (QTD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {suppliers.map((sup) => (
                        <tr key={sup.name} className="hover:bg-slate-50 transition cursor-pointer">
                          <td className="px-5 py-3">
                            <p className="font-medium text-slate-900">{sup.name}</p>
                            <p className="text-xs text-slate-400">{sup.email}</p>
                          </td>
                          <td className="px-3 py-3 text-slate-700">{sup.contact}</td>
                          <td className="px-3 py-3 text-xs text-slate-500">{sup.lastOrder}</td>
                          <td className="px-3 py-3 text-xs text-slate-500">{sup.paymentTerms}</td>
                          <td className="px-3 py-3"><Stars count={sup.rating} /></td>
                          <td className="px-3 py-3 text-right font-bold text-slate-900">£{sup.spend.toLocaleString("en-GB")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Supplier Spend Analysis */}
              <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Supplier Spend Analysis (QTD)</h3>
                <div className="space-y-3">
                  {suppliers.map((sup) => (
                    <div key={sup.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-600 truncate max-w-[200px]">{sup.name}</span>
                        <span className="text-xs font-semibold text-slate-700">£{sup.spend.toLocaleString("en-GB")}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div
                          className="bg-emerald-500 h-2.5 rounded-full transition-all"
                          style={{ width: `${(sup.spend / maxSpend) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Purchase Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">Active Purchase Orders</h3>
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                    Create Purchase Order
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">PO #</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Supplier</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Items</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Total</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Status</th>
                        <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {purchaseOrders.map((po) => (
                        <tr key={po.po} className="hover:bg-slate-50 transition cursor-pointer">
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">{po.po}</td>
                          <td className="px-3 py-3 text-slate-800 font-medium">{po.supplier}</td>
                          <td className="px-3 py-3 text-xs text-slate-500 max-w-[280px] truncate">{po.items}</td>
                          <td className="px-3 py-3 text-right font-bold text-slate-900">£{po.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</td>
                          <td className="px-3 py-3">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                              po.status === "Draft" ? "bg-slate-100 text-slate-600" :
                              po.status === "Ordered" ? "bg-blue-100 text-blue-700" :
                              po.status === "Received" ? "bg-emerald-100 text-emerald-700" :
                              "bg-purple-100 text-purple-700"
                            }`}>
                              {po.status}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-xs text-slate-500">{po.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Deliveries */}
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">Pending Deliveries</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {pendingDeliveries.map((d) => (
                    <div key={d.po} className="px-5 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{d.supplier} — {d.items}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          <span className="font-mono">{d.po}</span> &middot; Tracking: {d.tracking}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-amber-600">Expected {d.expectedDate}</p>
                        <button className="text-xs text-emerald-600 font-semibold hover:text-emerald-800 transition mt-0.5">
                          Mark Received
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RFQ Tab */}
          {activeTab === "rfq" && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Request for Quotation</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                  + New RFQ
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">RFQ #</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Items Requested</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Suppliers Contacted</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Responses</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Deadline</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition cursor-pointer">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">RFQ-0054</td>
                      <td className="px-3 py-3 text-slate-800">Digital X-ray unit replacement</td>
                      <td className="px-3 py-3 text-xs text-slate-500">NVS, Centaur, MWI</td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-700">2 / 3</td>
                      <td className="px-3 py-3 text-xs text-slate-500">15 May 2026</td>
                      <td className="px-3 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Open</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition cursor-pointer">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">RFQ-0053</td>
                      <td className="px-3 py-3 text-slate-800">Bulk anaesthetics supply (Q3)</td>
                      <td className="px-3 py-3 text-xs text-slate-500">Dechra, Norbrook</td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-700">2 / 2</td>
                      <td className="px-3 py-3 text-xs text-slate-500">30 Apr 2026</td>
                      <td className="px-3 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Awarded</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition cursor-pointer">
                      <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">RFQ-0052</td>
                      <td className="px-3 py-3 text-slate-800">Lab consumables — blood tubes, slides</td>
                      <td className="px-3 py-3 text-xs text-slate-500">NVS, MWI</td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-700">1 / 2</td>
                      <td className="px-3 py-3 text-xs text-slate-500">20 May 2026</td>
                      <td className="px-3 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GRN Tab */}
          {activeTab === "grn" && (
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Goods Received Notes</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                  + New GRN
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">GRN #</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">PO Ref</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Supplier</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Date Received</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Items</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {goodsReceivedNotes.map((grn) => (
                      <tr key={grn.grn} className="hover:bg-slate-50 transition cursor-pointer">
                        <td className="px-5 py-3 font-mono text-xs font-semibold text-emerald-700">{grn.grn}</td>
                        <td className="px-3 py-3 font-mono text-xs text-slate-500">{grn.po}</td>
                        <td className="px-3 py-3 text-slate-800 font-medium">{grn.supplier}</td>
                        <td className="px-3 py-3 text-xs text-slate-500">{grn.date}</td>
                        <td className="px-3 py-3 text-sm text-slate-700">{grn.items} line items</td>
                        <td className="px-3 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            grn.status === "Complete" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          }`}>
                            {grn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
