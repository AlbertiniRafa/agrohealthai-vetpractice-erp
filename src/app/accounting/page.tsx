"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type Account = {
  code: string;
  name: string;
  balance: number;
  children?: Account[];
};

const chartOfAccounts: Account[] = [
  {
    code: "1000",
    name: "Assets",
    balance: 124_850.0,
    children: [
      { code: "1100", name: "Bank — Current Account", balance: 42_310.0 },
      { code: "1110", name: "Bank — Deposit Account", balance: 25_000.0 },
      { code: "1200", name: "Accounts Receivable", balance: 18_540.0 },
      { code: "1300", name: "Inventory — Pharmaceuticals", balance: 22_400.0 },
      { code: "1400", name: "Prepayments", balance: 3_200.0 },
      { code: "1500", name: "Equipment & Instruments", balance: 13_400.0 },
    ],
  },
  {
    code: "2000",
    name: "Liabilities",
    balance: 31_640.0,
    children: [
      { code: "2100", name: "Accounts Payable", balance: 14_200.0 },
      { code: "2200", name: "VAT Payable", balance: 3_440.0 },
      { code: "2300", name: "PAYE & NI Payable", balance: 4_800.0 },
      { code: "2400", name: "Equipment Loan", balance: 9_200.0 },
    ],
  },
  {
    code: "3000",
    name: "Income",
    balance: 48_320.0,
    children: [
      { code: "3100", name: "Consultation Fees", balance: 18_400.0 },
      { code: "3200", name: "Surgical Procedures", balance: 12_800.0 },
      { code: "3300", name: "Pharmacy Sales", balance: 8_600.0 },
      { code: "3400", name: "Farm Visit Fees", balance: 5_200.0 },
      { code: "3500", name: "Laboratory & Diagnostics", balance: 3_320.0 },
    ],
  },
  {
    code: "4000",
    name: "Expenses",
    balance: 31_200.0,
    children: [
      { code: "4100", name: "Staff Wages & Salaries", balance: 16_200.0 },
      { code: "4200", name: "Pharmaceuticals & Supplies", balance: 6_400.0 },
      { code: "4300", name: "Rent & Utilities", balance: 3_800.0 },
      { code: "4400", name: "Insurance", balance: 1_600.0 },
      { code: "4500", name: "Vehicle & Travel", balance: 1_900.0 },
      { code: "4600", name: "Professional Fees", balance: 1_300.0 },
    ],
  },
];

const journalEntries = [
  { date: "08 May 2026", ref: "JE-0284", desc: "Consultation fees — week 19", debit: 3_420.0, credit: 0 },
  { date: "07 May 2026", ref: "JE-0283", desc: "NVS pharmaceutical order payment", debit: 0, credit: 2_180.0 },
  { date: "06 May 2026", ref: "JE-0282", desc: "Staff payroll — April 2026", debit: 0, credit: 16_200.0 },
  { date: "05 May 2026", ref: "JE-0281", desc: "Insurance claim received — Petplan", debit: 540.0, credit: 0 },
  { date: "04 May 2026", ref: "JE-0280", desc: "Equipment lease payment — X-ray unit", debit: 0, credit: 480.0 },
  { date: "03 May 2026", ref: "JE-0279", desc: "Farm visit revenue — Greenfields", debit: 475.0, credit: 0 },
  { date: "01 May 2026", ref: "JE-0278", desc: "Rent & utilities — May", debit: 0, credit: 1_900.0 },
];

const bankTransactions = [
  { date: "08 May 2026", desc: "Card Payment — J. Henderson", amount: 145.60, matched: true },
  { date: "07 May 2026", desc: "BACS — Fram Farmers Ltd", amount: 1_260.0, matched: false },
  { date: "06 May 2026", desc: "Direct Debit — NVS Supplies", amount: -2_180.0, matched: true },
  { date: "05 May 2026", desc: "Card Payment — M. Clarke", amount: 320.0, matched: true },
  { date: "04 May 2026", desc: "Standing Order — Equipment Lease", amount: -480.0, matched: true },
  { date: "03 May 2026", desc: "Unknown Deposit", amount: 250.0, matched: false },
];

function AccountRow({ account, depth = 0 }: { account: Account; depth?: number }) {
  const [open, setOpen] = useState(false);
  const hasChildren = account.children && account.children.length > 0;

  return (
    <>
      <tr
        className="hover:bg-slate-50 transition cursor-pointer"
        onClick={() => hasChildren && setOpen(!open)}
      >
        <td className="px-5 py-2.5 text-xs font-mono text-slate-500" style={{ paddingLeft: `${20 + depth * 24}px` }}>
          {account.code}
        </td>
        <td className="px-3 py-2.5 text-sm text-slate-900 font-medium">
          <span className="flex items-center gap-1.5">
            {hasChildren && (
              <span className={`text-xs text-slate-400 transition-transform ${open ? "rotate-90" : ""}`}>&#9654;</span>
            )}
            {account.name}
          </span>
        </td>
        <td className="px-3 py-2.5 text-sm font-bold text-right text-slate-900">
          £{account.balance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
        </td>
      </tr>
      {open &&
        account.children?.map((child) => (
          <AccountRow key={child.code} account={child} depth={depth + 1} />
        ))}
    </>
  );
}

export default function AccountingPage() {
  const [fiscalYear, setFiscalYear] = useState("2025-2026");

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Accounting" subtitle="General ledger, reconciliation and reporting" />

        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {/* Fiscal Year Selector + Quick Links */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-slate-700">Fiscal Year</label>
              <select
                className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
              >
                <option value="2025-2026">2025–2026</option>
                <option value="2024-2025">2024–2025</option>
                <option value="2023-2024">2023–2024</option>
              </select>
            </div>
            <div className="flex gap-2">
              {["P&L Statement", "Balance Sheet", "Cash Flow", "Tax Return"].map((link) => (
                <button
                  key={link}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Total Revenue</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">£48,320.00</p>
              <p className="text-xs text-emerald-500 mt-0.5">FY {fiscalYear}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Expenses</p>
              <p className="text-2xl font-bold mt-1 text-red-600">£31,200.00</p>
              <p className="text-xs text-slate-400 mt-0.5">64.5% of revenue</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">Net Profit</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">£17,120.00</p>
              <p className="text-xs text-emerald-500 mt-0.5">35.4% margin</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase text-slate-500">VAT Due</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">£3,440.00</p>
              <p className="text-xs text-slate-400 mt-0.5">Next filing: 07 Jul 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Chart of Accounts */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900">Chart of Accounts</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Code</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Account</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {chartOfAccounts.map((acc) => (
                      <AccountRow key={acc.code} account={acc} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Journal Entries */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Recent Journal Entries</h3>
                <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition">
                  + New Entry
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left">
                      <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Date</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Ref</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Description</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Debit</th>
                      <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {journalEntries.map((je) => (
                      <tr key={je.ref} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-2.5 text-xs text-slate-500">{je.date}</td>
                        <td className="px-3 py-2.5 text-xs font-mono font-semibold text-emerald-700">{je.ref}</td>
                        <td className="px-3 py-2.5 text-sm text-slate-800">{je.desc}</td>
                        <td className="px-3 py-2.5 text-sm text-right font-bold text-slate-900">
                          {je.debit > 0 ? `£${je.debit.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "—"}
                        </td>
                        <td className="px-3 py-2.5 text-sm text-right font-bold text-slate-900">
                          {je.credit > 0 ? `£${je.credit.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bank Reconciliation */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Bank Reconciliation — Current Account</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  {bankTransactions.filter((t) => t.matched).length} of {bankTransactions.length} matched
                </span>
                <button className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition">
                  Auto-Match
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="px-5 py-3 font-semibold text-slate-600 text-xs uppercase">Date</th>
                    <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase">Description</th>
                    <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-right">Amount</th>
                    <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-center">Status</th>
                    <th className="px-3 py-3 font-semibold text-slate-600 text-xs uppercase text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bankTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-2.5 text-xs text-slate-500">{tx.date}</td>
                      <td className="px-3 py-2.5 text-sm text-slate-800">{tx.desc}</td>
                      <td className={`px-3 py-2.5 text-sm text-right font-bold ${tx.amount >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {tx.amount >= 0 ? "+" : ""}£{Math.abs(tx.amount).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          tx.matched ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {tx.matched ? "Matched" : "Unmatched"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {!tx.matched && (
                          <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 transition">
                            Match
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
