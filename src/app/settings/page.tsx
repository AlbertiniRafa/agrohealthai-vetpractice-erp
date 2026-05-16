"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const users = [
  { name: "Dr Emma Coe", role: "Vet", permissions: "Admin", lastLogin: "08 May 2026 08:47", active: true },
  { name: "Dr Tom Ashworth", role: "Vet", permissions: "Vet", lastLogin: "08 May 2026 09:02", active: true },
  { name: "Dr Priya Sharma", role: "Vet", permissions: "Vet", lastLogin: "07 May 2026 17:15", active: true },
  { name: "Sarah Mitchell", role: "Head Nurse", permissions: "Nurse", lastLogin: "08 May 2026 08:30", active: true },
  { name: "James Thornton", role: "Nurse", permissions: "Nurse", lastLogin: "07 May 2026 16:50", active: true },
  { name: "Katie Dunn", role: "Receptionist", permissions: "Reception", lastLogin: "08 May 2026 08:55", active: true },
  { name: "Laura Byrne", role: "Practice Manager", permissions: "Admin", lastLogin: "08 May 2026 07:45", active: true },
  { name: "Mark Fellows", role: "Accounts", permissions: "View Only", lastLogin: "06 May 2026 14:20", active: false },
];

const modules = ["Dashboard", "Patients", "Clinical", "Appointments", "Dispensary", "Billing", "Procurement", "Accounting", "Farm & Herd", "Quality", "HR", "CRM", "Reports", "Settings"];
const roles = ["Admin", "Vet", "Nurse", "Reception", "View Only"];

const permissionsMatrix: Record<string, Record<string, { read: boolean; write: boolean; del: boolean }>> = {
  Admin: Object.fromEntries(modules.map((m) => [m, { read: true, write: true, del: true }])),
  Vet: Object.fromEntries(modules.map((m) => [m, { read: true, write: !["HR", "Accounting", "Settings"].includes(m), del: false }])),
  Nurse: Object.fromEntries(modules.map((m) => [m, { read: !["Accounting", "HR", "Settings"].includes(m), write: ["Patients", "Clinical", "Appointments", "Dispensary"].includes(m), del: false }])),
  Reception: Object.fromEntries(modules.map((m) => [m, { read: ["Dashboard", "Patients", "Appointments", "Billing", "CRM"].includes(m), write: ["Appointments", "Billing", "CRM"].includes(m), del: false }])),
  "View Only": Object.fromEntries(modules.map((m) => [m, { read: ["Dashboard", "Reports"].includes(m), write: false, del: false }])),
};

const integrations = [
  { name: "HealthAgroAI", status: "Connected", detail: "39,917 evidence sources", connected: true },
  { name: "IDEXX Lab", status: "Connected", detail: "Results synced automatically", connected: true },
  { name: "Stripe Payments", status: "Connected", detail: "Card payments & Direct Debit", connected: true },
  { name: "Xero Accounting", status: "Not Connected", detail: "Sync invoices and expenses", connected: false },
  { name: "smaXtec Biosensors", status: "Not Connected", detail: "Real-time cattle monitoring", connected: false },
  { name: "WhatsApp Business", status: "Not Connected", detail: "Client messaging channel", connected: false },
];

export default function SettingsPage() {
  const [auditEnabled, setAuditEnabled] = useState(true);
  const [retentionDays, setRetentionDays] = useState("365");
  const [activePermRole, setActivePermRole] = useState("Vet");

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Settings" subtitle="Practice configuration, users, integrations, and system preferences" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Practice Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Practice Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Practice Name", value: "Oakfield Veterinary Practice" },
                { label: "Address", value: "14 High Street, Oakfield, Somerset, TA7 9BQ" },
                { label: "Phone", value: "01278 823 456" },
                { label: "Email", value: "info@oakfieldvets.co.uk" },
                { label: "RCVS Practice Number", value: "7043921" },
                { label: "CPH Number", value: "42/183/0012" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    defaultValue={field.value}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">Save Practice Details</button>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">User Management</h3>
              <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">Add User</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Permissions</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Login</th>
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.name} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="py-3 text-slate-700 font-medium">{u.name}</td>
                      <td className="py-3 text-slate-500">{u.role}</td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          u.permissions === "Admin" ? "bg-purple-50 text-purple-700" :
                          u.permissions === "Vet" ? "bg-emerald-50 text-emerald-700" :
                          u.permissions === "Nurse" ? "bg-blue-50 text-blue-700" :
                          u.permissions === "Reception" ? "bg-amber-50 text-amber-700" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {u.permissions}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 text-xs">{u.lastLogin}</td>
                      <td className="py-3">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${u.active ? "bg-emerald-500" : "bg-slate-300"}`} />
                        <span className="text-xs text-slate-500">{u.active ? "Active" : "Inactive"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles & Permissions Matrix */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Roles & Permissions Matrix</h3>
            <div className="flex gap-2 mb-4">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => setActivePermRole(r)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                    activePermRole === r ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Module</th>
                    <th className="text-center py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Read</th>
                    <th className="text-center py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Write</th>
                    <th className="text-center py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => {
                    const perms = permissionsMatrix[activePermRole]?.[m] ?? { read: false, write: false, del: false };
                    return (
                      <tr key={m} className="border-b border-slate-50">
                        <td className="py-2 text-slate-700">{m}</td>
                        <td className="py-2 text-center">
                          <input type="checkbox" checked={!!perms.read} readOnly className="w-4 h-4 accent-emerald-600 rounded" />
                        </td>
                        <td className="py-2 text-center">
                          <input type="checkbox" checked={!!perms.write} readOnly className="w-4 h-4 accent-emerald-600 rounded" />
                        </td>
                        <td className="py-2 text-center">
                          <input type="checkbox" checked={!!perms.del} readOnly className="w-4 h-4 accent-emerald-600 rounded" />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((int) => (
                <div key={int.name} className="border border-slate-100 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{int.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{int.detail}</p>
                  </div>
                  {int.connected ? (
                    <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full ring-1 ring-emerald-200">Connected</span>
                  ) : (
                    <button className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition ring-1 ring-slate-200">Connect</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Data Management & Workflow Builder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Management */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Data Management</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="text-sm font-medium bg-white text-slate-700 px-4 py-3 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition text-center">
                  Import Data (CSV)
                </button>
                <button className="text-sm font-medium bg-white text-slate-700 px-4 py-3 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition text-center">
                  Export Data
                </button>
                <button className="text-sm font-medium bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition text-center">
                  Backup Now
                </button>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Backup Schedule</label>
                  <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Daily at 02:00</option>
                    <option>Weekly (Sunday 02:00)</option>
                    <option>Monthly (1st 02:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Workflow Builder */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Workflow Builder</h3>
              <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center">
                <p className="text-sm text-slate-500">Configure approval workflows for controlled drugs, refunds, and leave requests.</p>
                <button className="mt-3 text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                  Open Workflow Editor
                </button>
              </div>
            </div>
          </div>

          {/* Custom Fields & Print Formats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Custom Fields</h3>
              <p className="text-xs text-slate-500 mb-4">Add custom fields to any module without code.</p>
              <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center">
                <p className="text-xs text-slate-400">No custom fields configured yet.</p>
                <button className="mt-2 text-xs font-medium text-emerald-600 hover:text-emerald-700">+ Add Custom Field</button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Print Formats</h3>
              <p className="text-xs text-slate-500 mb-4">Customise invoice, prescription, and report layouts.</p>
              <div className="space-y-2">
                {["Invoice Template", "Prescription Template", "Lab Report Template"].map((t) => (
                  <div key={t} className="flex items-center justify-between border border-slate-100 rounded-lg px-4 py-2.5">
                    <span className="text-sm text-slate-700">{t}</span>
                    <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700">Edit</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Log Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Audit Log</h3>
                <p className="text-xs text-slate-500 mt-0.5">Track all user actions and system changes.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500">Retention</label>
                  <select
                    value={retentionDays}
                    onChange={(e) => setRetentionDays(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                    <option value="2555">7 years</option>
                  </select>
                </div>
                <button
                  onClick={() => setAuditEnabled(!auditEnabled)}
                  className={`relative w-10 h-5 rounded-full transition ${auditEnabled ? "bg-emerald-500" : "bg-slate-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${auditEnabled ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
