"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

type Lead = {
  name: string;
  contact: string;
  value: number;
  source: string;
  stage: string;
};

const leads: Lead[] = [
  { name: "Henderson Farm — 200 dairy cows", contact: "John Henderson", value: 8400, source: "Referral", stage: "Meeting Booked" },
  { name: "Palmer Equine — 15 horses", contact: "Claire Palmer", value: 5200, source: "Website", stage: "Contacted" },
  { name: "New housing estate — 50+ pet registrations", contact: "Sarah Thornton (developer)", value: 6000, source: "Event", stage: "New Lead" },
  { name: "Local cattery — monthly health checks", contact: "Mike Peters", value: 2400, source: "Walk-in", stage: "Proposal Sent" },
  { name: "Sheep farmer referral — 400 ewes", contact: "Robert Davies", value: 2800, source: "Referral", stage: "New Lead" },
];

const stages = ["New Lead", "Contacted", "Meeting Booked", "Proposal Sent"];
const stageColours: Record<string, string> = {
  "New Lead": "border-t-blue-400",
  Contacted: "border-t-amber-400",
  "Meeting Booked": "border-t-emerald-400",
  "Proposal Sent": "border-t-purple-400",
};

const sourceBadge: Record<string, string> = {
  Referral: "bg-emerald-50 text-emerald-700",
  Website: "bg-blue-50 text-blue-700",
  "Walk-in": "bg-amber-50 text-amber-700",
  Event: "bg-purple-50 text-purple-700",
};

const campaigns = [
  { name: "Spring Vaccination Drive", channel: "SMS", sent: 245, opened: "67%", booked: 34 },
  { name: "Puppy Pack Launch", channel: "Email", sent: 120, opened: "45%", booked: 12 },
];

export default function CRMPage() {
  const pipelineValue = leads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="CRM & Leads" subtitle="Pipeline management, campaigns and client retention" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Pipeline Value</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">£{pipelineValue.toLocaleString()}/yr</p>
              <p className="text-[11px] text-slate-400 mt-1">{leads.length} active leads</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Client Retention</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">94%</p>
              <p className="text-[11px] text-slate-400 mt-1">12-month rolling average</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">At-Risk Clients</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">23</p>
              <p className="text-[11px] text-slate-400 mt-1">No visit in 6+ months</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Recently Lapsed</p>
              <p className="text-2xl font-bold text-red-600 mt-1">8</p>
              <p className="text-[11px] text-slate-400 mt-1">No visit in 12+ months</p>
            </div>
          </div>

          {/* Add Lead button */}
          <div className="flex gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">+ Add Lead</button>
          </div>

          {/* Kanban Board */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Sales Pipeline</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              {stages.map((stage) => {
                const stageLeads = leads.filter((l) => l.stage === stage);
                return (
                  <div key={stage} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{stage}</h4>
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full px-2 py-0.5">{stageLeads.length}</span>
                    </div>
                    <div className="space-y-3 min-h-[120px]">
                      {stageLeads.map((lead) => (
                        <div key={lead.name} className={`bg-white rounded-lg p-4 ring-1 ring-slate-200 shadow-sm border-t-2 ${stageColours[stage]}`}>
                          <p className="text-sm font-medium text-slate-900 mb-1">{lead.name}</p>
                          <p className="text-xs text-slate-500 mb-2">{lead.contact}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-700">£{lead.value.toLocaleString()}/yr</span>
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sourceBadge[lead.source]}`}>{lead.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Marketing Campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-6 py-3 font-medium">Campaign</th>
                    <th className="text-left px-6 py-3 font-medium">Channel</th>
                    <th className="text-left px-6 py-3 font-medium">Sent</th>
                    <th className="text-left px-6 py-3 font-medium">Opened</th>
                    <th className="text-left px-6 py-3 font-medium">Booked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-3 font-medium text-slate-900">{c.name}</td>
                      <td className="px-6 py-3 text-slate-600">{c.channel}</td>
                      <td className="px-6 py-3 text-slate-600">{c.sent}</td>
                      <td className="px-6 py-3 text-slate-600">{c.opened}</td>
                      <td className="px-6 py-3 text-slate-600">{c.booked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Forecast */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Revenue Forecast from Pipeline</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((stage) => {
                const val = leads.filter((l) => l.stage === stage).reduce((s, l) => s + l.value, 0);
                const pctChance: Record<string, number> = { "New Lead": 10, Contacted: 25, "Meeting Booked": 50, "Proposal Sent": 75 };
                const weighted = Math.round(val * (pctChance[stage] / 100));
                return (
                  <div key={stage} className="text-center">
                    <p className="text-xs text-slate-500 mb-1">{stage}</p>
                    <p className="text-lg font-bold text-slate-900">£{val.toLocaleString()}</p>
                    <p className="text-[11px] text-emerald-600">Weighted: £{weighted.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
