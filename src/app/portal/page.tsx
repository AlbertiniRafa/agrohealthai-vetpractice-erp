"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const pets = [
  { name: "Bella", breed: "Labrador Retriever", age: "4 yrs", colour: "bg-amber-200", initial: "B" },
  { name: "Milo", breed: "Cocker Spaniel", age: "1 yr", colour: "bg-blue-200", initial: "M" },
];

const invoices = [
  { id: "INV-4821", date: "28 Apr 2026", description: "Bella — Consultation + bloods", amount: "£187.50", status: "Unpaid" },
  { id: "INV-4790", date: "14 Apr 2026", description: "Milo — Neutering", amount: "£285.00", status: "Unpaid" },
];

const portalFeatures = [
  { label: "Online Booking", key: "booking" },
  { label: "Prescription Requests", key: "prescriptions" },
  { label: "Online Payments", key: "payments" },
  { label: "Client Messaging", key: "messaging" },
];

const notificationToggles = [
  { label: "SMS appointment reminders", key: "smsAppt" },
  { label: "Email vaccination reminders", key: "emailVax" },
  { label: "SMS payment receipts", key: "smsPay" },
  { label: "Email invoice notifications", key: "emailInvoice" },
];

export default function PortalPage() {
  const [features, setFeatures] = useState<Record<string, boolean>>({
    booking: true,
    prescriptions: true,
    payments: true,
    messaging: false,
  });
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    smsAppt: true,
    emailVax: true,
    smsPay: false,
    emailInvoice: true,
  });
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Client Portal" subtitle="Preview and manage the client-facing portal" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-8">
          {/* Mock Browser Frame */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200">
                https://portal.oakfieldvets.co.uk
              </div>
            </div>

            {/* Portal Content */}
            <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
              {/* Welcome */}
              <div>
                <h2 className="text-lg font-bold text-slate-900">Welcome, Mrs Henderson</h2>
                <p className="text-sm text-slate-500 mt-0.5">Oakfield Veterinary Practice — Client Portal</p>
              </div>

              {/* My Pets */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">My Pets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pets.map((pet) => (
                    <div key={pet.name} className="flex items-center gap-3 border border-slate-100 rounded-lg p-3">
                      <div className={`w-10 h-10 rounded-full ${pet.colour} flex items-center justify-center text-sm font-bold text-slate-700`}>
                        {pet.initial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{pet.name}</p>
                        <p className="text-xs text-slate-500">{pet.breed} &middot; {pet.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Upcoming Appointments</h3>
                <div className="border border-slate-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Bella — Vaccination</p>
                      <p className="text-xs text-slate-500">20 May 2026 at 10:30 with Dr Emma Coe</p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full ring-1 ring-emerald-200">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="text-sm font-medium bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition">
                  Book Appointment
                </button>
                <button className="text-sm font-medium bg-white text-slate-700 px-5 py-2.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition">
                  Request Prescription
                </button>
              </div>

              {/* Vaccination Reminders */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Vaccination Reminders</h3>
                <div className="border border-amber-100 bg-amber-50 rounded-lg p-4">
                  <p className="text-sm text-amber-800 font-medium">Milo — Annual booster due June 2026</p>
                  <p className="text-xs text-amber-600 mt-1">Please book an appointment to keep Milo&apos;s vaccinations up to date.</p>
                </div>
              </div>

              {/* Recent Invoices */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Recent Invoices</h3>
                <div className="space-y-2">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between border border-slate-100 rounded-lg p-3">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{inv.description}</p>
                        <p className="text-xs text-slate-500">{inv.id} &middot; {inv.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-900">{inv.amount}</span>
                        <button className="text-xs font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Your Vet */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Message Your Vet</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message to the practice..."
                    className="flex-1 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button className="text-sm font-medium bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portal Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Portal Features</h3>
              <div className="space-y-3">
                {portalFeatures.map((f) => (
                  <label key={f.key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{f.label}</span>
                    <button
                      onClick={() => setFeatures((prev) => ({ ...prev, [f.key]: !prev[f.key] }))}
                      className={`relative w-10 h-5 rounded-full transition ${features[f.key] ? "bg-emerald-500" : "bg-slate-300"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${features[f.key] ? "translate-x-5" : ""}`} />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Branding</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Practice Logo</label>
                  <div className="w-16 h-16 bg-slate-100 rounded-lg ring-1 ring-slate-200 flex items-center justify-center text-xs text-slate-400">Logo</div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Primary Colour</label>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 ring-1 ring-slate-200" />
                    <span className="text-xs text-slate-500 font-mono">#059669</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Welcome Message</label>
                  <input
                    type="text"
                    defaultValue="Welcome to Oakfield Veterinary Practice"
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">SMS / Email Notifications</h3>
              <div className="space-y-3">
                {notificationToggles.map((n) => (
                  <label key={n.key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">{n.label}</span>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                      className={`relative w-10 h-5 rounded-full transition ${notifications[n.key] ? "bg-emerald-500" : "bg-slate-300"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications[n.key] ? "translate-x-5" : ""}`} />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-slate-200 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Publish</h3>
                <p className="text-xs text-slate-500 mb-6">Preview changes before pushing live to the client portal.</p>
              </div>
              <div className="flex gap-3">
                <button className="text-sm font-medium bg-white text-slate-700 px-5 py-2.5 rounded-lg ring-1 ring-slate-200 hover:bg-slate-50 transition">
                  Preview Portal
                </button>
                <button className="text-sm font-medium bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition">
                  Publish Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
