"use client";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const projects = [
  {
    name: "Fram Farmers TB Testing Programme",
    lead: "Dr Aidan Coe",
    progress: 60,
    status: "In Progress",
    start: "01 Mar 2026",
    end: "30 Jun 2026",
    budget: 18000,
    spent: 11200,
    detail: "14 farms scheduled",
    colour: "bg-emerald-500",
    tasks: [
      { task: "Farm list confirmation", status: "Done", assignee: "Kate Miller", due: "10 Mar 2026" },
      { task: "Equipment calibration", status: "Done", assignee: "Dave Cooper", due: "14 Mar 2026" },
      { task: "Batch 1 testing (5 farms)", status: "Done", assignee: "Dr Coe", due: "15 Apr 2026" },
      { task: "Batch 2 testing (5 farms)", status: "In Progress", assignee: "Dr Coe", due: "20 May 2026" },
      { task: "Batch 3 testing (4 farms)", status: "To Do", assignee: "Dr Wilson", due: "15 Jun 2026" },
      { task: "Final APHA reporting", status: "To Do", assignee: "Kate Miller", due: "30 Jun 2026" },
    ],
  },
  {
    name: "Practice IT Upgrade",
    lead: "Kate Miller",
    progress: 30,
    status: "In Progress",
    start: "15 Apr 2026",
    end: "31 Jul 2026",
    budget: 12000,
    spent: 3600,
    detail: "New PMS, network, hardware",
    colour: "bg-blue-500",
    tasks: [
      { task: "Vendor shortlist", status: "Done", assignee: "Kate Miller", due: "25 Apr 2026" },
      { task: "Network survey", status: "In Progress", assignee: "External IT", due: "15 May 2026" },
      { task: "Hardware procurement", status: "To Do", assignee: "Kate Miller", due: "01 Jun 2026" },
      { task: "Data migration", status: "To Do", assignee: "External IT", due: "15 Jul 2026" },
      { task: "Staff training", status: "To Do", assignee: "Kate Miller", due: "28 Jul 2026" },
    ],
  },
  {
    name: "Clinical Audit Q2",
    lead: "Dr Sarah Smith",
    progress: 80,
    status: "In Progress",
    start: "01 Apr 2026",
    end: "30 May 2026",
    budget: 2000,
    spent: 1600,
    detail: "Antibiotic prescribing review",
    colour: "bg-purple-500",
    tasks: [
      { task: "Case sample selection (100 cases)", status: "Done", assignee: "Dr Smith", due: "07 Apr 2026" },
      { task: "Data extraction & analysis", status: "Done", assignee: "Dr Smith", due: "21 Apr 2026" },
      { task: "Peer review meeting", status: "Done", assignee: "All vets", due: "05 May 2026" },
      { task: "Report write-up", status: "In Progress", assignee: "Dr Smith", due: "20 May 2026" },
      { task: "Submit to RCVS PSS", status: "To Do", assignee: "Kate Miller", due: "30 May 2026" },
    ],
  },
  {
    name: "HealthAgroAI Pilot",
    lead: "All Vets",
    progress: 45,
    status: "In Progress",
    start: "01 Feb 2026",
    end: "31 Aug 2026",
    budget: 5000,
    spent: 2250,
    detail: "AI diagnostic decision support trial",
    colour: "bg-amber-500",
    tasks: [
      { task: "System installation & config", status: "Done", assignee: "Dr Coe", due: "14 Feb 2026" },
      { task: "Staff onboarding & training", status: "Done", assignee: "Kate Miller", due: "28 Feb 2026" },
      { task: "Phase 1 evaluation (50 cases)", status: "Done", assignee: "All vets", due: "15 Apr 2026" },
      { task: "Phase 2 evaluation (100 cases)", status: "In Progress", assignee: "All vets", due: "30 Jun 2026" },
      { task: "ROI analysis & report", status: "To Do", assignee: "Kate Miller", due: "15 Aug 2026" },
      { task: "Board decision — go/no-go", status: "To Do", assignee: "Dr Coe", due: "31 Aug 2026" },
    ],
  },
];

const timesheets = [
  { staff: "Dr Aidan Coe", hours: 42, projects: "TB Testing (28), HealthAgroAI (14)" },
  { staff: "Dr Sarah Smith", hours: 38, projects: "Clinical Audit (22), HealthAgroAI (16)" },
  { staff: "Dr James Wilson", hours: 0, projects: "On leave" },
  { staff: "Kate Miller", hours: 36, projects: "IT Upgrade (18), TB Testing (10), Admin (8)" },
  { staff: "Dave Cooper", hours: 0, projects: "Off sick" },
];

const taskStatus: Record<string, string> = {
  Done: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  "To Do": "bg-slate-100 text-slate-500 ring-slate-200",
};

// Simple Gantt bar helpers — positions relative to a Mar-Aug 2026 timeline (6 months)
const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
function monthIndex(dateStr: string) {
  const m = dateStr.split(" ")[1];
  const map: Record<string, number> = { Jan: -1, Feb: 0, Mar: 1, Apr: 2, May: 3, Jun: 4, Jul: 5, Aug: 6, Sep: 7 };
  return map[m] ?? 0;
}

export default function ProjectsPage() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <TopBar title="Projects" subtitle="Project tracking, timesheets and budget management" />

        <main className="flex-1 px-8 py-6 overflow-y-auto space-y-6">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Active Projects</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{projects.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">All in progress</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">£{totalBudget.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 mt-1">Across all projects</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Total Spent</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">£{totalSpent.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 mt-1">{Math.round((totalSpent / totalBudget) * 100)}% of budget</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs text-slate-500">Hours This Week</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{timesheets.reduce((s, t) => s + t.hours, 0)}</p>
              <p className="text-[11px] text-slate-400 mt-1">Logged by {timesheets.filter((t) => t.hours > 0).length} staff</p>
            </div>
          </div>

          {/* New Project button */}
          <div className="flex gap-3">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">+ New Project</button>
          </div>

          {/* Project list with progress */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Active Projects</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {projects.map((p) => (
                <div key={p.name} className="px-6 py-4 hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.lead} &middot; {p.detail}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{p.progress}%</p>
                      <p className="text-[11px] text-slate-400">£{p.spent.toLocaleString()} / £{p.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${p.colour}`} style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gantt Chart */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Project Timeline — 2026</h3>
            </div>
            <div className="p-6 overflow-x-auto">
              {/* Month headers */}
              <div className="flex mb-2">
                <div className="w-52 shrink-0" />
                <div className="flex-1 grid grid-cols-6">
                  {months.map((m) => (
                    <div key={m} className="text-xs font-medium text-slate-400 text-center">{m}</div>
                  ))}
                </div>
              </div>
              {/* Bars */}
              {projects.map((p) => {
                const startCol = Math.max(monthIndex(p.start), 1);
                const endCol = Math.min(monthIndex(p.end), 6);
                const span = endCol - startCol + 1;
                const leftPct = ((startCol - 1) / 6) * 100;
                const widthPct = (span / 6) * 100;
                return (
                  <div key={p.name} className="flex items-center mb-2">
                    <div className="w-52 shrink-0 text-xs font-medium text-slate-700 truncate pr-4">{p.name}</div>
                    <div className="flex-1 relative h-7 bg-slate-50 rounded">
                      <div
                        className={`absolute top-1 h-5 rounded ${p.colour} opacity-80`}
                        style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                      >
                        <span className="text-[10px] text-white font-medium px-2 leading-5 whitespace-nowrap">{p.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Two-column: Tasks + Timesheets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Breakdown — TB Testing as selected */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Tasks — {projects[0].name}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">Task</th>
                      <th className="text-left px-6 py-3 font-medium">Status</th>
                      <th className="text-left px-6 py-3 font-medium">Assignee</th>
                      <th className="text-left px-6 py-3 font-medium">Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects[0].tasks.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-3 font-medium text-slate-900 text-xs">{t.task}</td>
                        <td className="px-6 py-3">
                          <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ring-1 ${taskStatus[t.status]}`}>{t.status}</span>
                        </td>
                        <td className="px-6 py-3 text-slate-500 text-xs">{t.assignee}</td>
                        <td className="px-6 py-3 text-slate-500 text-xs">{t.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timesheets */}
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">Timesheet Summary — w/c 04 May 2026</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-6 py-3 font-medium">Staff</th>
                      <th className="text-right px-6 py-3 font-medium">Hours</th>
                      <th className="text-left px-6 py-3 font-medium">Breakdown</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {timesheets.map((t) => (
                      <tr key={t.staff} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-3 font-medium text-slate-900 text-xs">{t.staff}</td>
                        <td className="px-6 py-3 text-right font-bold text-slate-900">{t.hours}</td>
                        <td className="px-6 py-3 text-slate-500 text-xs">{t.projects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Budget Tracking */}
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">Project Budget Tracking</h3>
            </div>
            <div className="p-6 space-y-4">
              {projects.map((p) => {
                const pct = Math.round((p.spent / p.budget) * 100);
                const isOver = pct > p.progress + 15;
                return (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{p.name}</span>
                      <span className={`text-xs font-medium ${isOver ? "text-red-600" : "text-emerald-600"}`}>
                        £{p.spent.toLocaleString()} / £{p.budget.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 relative">
                      <div
                        className={`h-2 rounded-full ${isOver ? "bg-red-400" : "bg-emerald-500"}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                      {/* Progress marker */}
                      <div
                        className="absolute top-0 w-0.5 h-2 bg-slate-900"
                        style={{ left: `${p.progress}%` }}
                        title={`${p.progress}% complete`}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Progress: {p.progress}% | Budget used: {pct}%</p>
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
