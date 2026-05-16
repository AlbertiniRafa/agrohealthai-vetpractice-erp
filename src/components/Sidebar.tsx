"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navSections = [
  {
    title: "Clinical",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: "📊" },
      { href: "/patients", label: "Patients", icon: "🐾" },
      { href: "/clinical", label: "Clinical Records", icon: "📋" },
      { href: "/appointments", label: "Appointments", icon: "📅" },
      { href: "/ai", label: "AI Diagnostics", icon: "🧠" },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/dispensary", label: "Dispensary", icon: "💊" },
      { href: "/billing", label: "Billing & POS", icon: "💷" },
      { href: "/procurement", label: "Procurement", icon: "📦" },
      { href: "/accounting", label: "Accounting", icon: "📒" },
    ],
  },
  {
    title: "Farm & Herd",
    items: [
      { href: "/farm", label: "Farm & Herd", icon: "🐄" },
      { href: "/quality", label: "Quality & Compliance", icon: "✅" },
    ],
  },
  {
    title: "Practice Management",
    items: [
      { href: "/hr", label: "HR & Payroll", icon: "👥" },
      { href: "/crm", label: "CRM & Leads", icon: "🎯" },
      { href: "/assets", label: "Assets", icon: "🔧" },
      { href: "/projects", label: "Projects", icon: "📐" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/reports", label: "Reports", icon: "📈" },
      { href: "/portal", label: "Client Portal", icon: "🌐" },
      { href: "/settings", label: "Settings", icon: "⚙️" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-56 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-700">
        <h1 className="text-base font-bold">
          <span className="text-emerald-400">Cura</span>
          <span className="text-white">Vet</span>
        </h1>
        <p className="text-[9px] text-slate-400 tracking-widest uppercase mt-0.5">Veterinary Practice ERP</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-4">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-500">{section.title}</p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700">
        <img src="/agroinsights-logo.png" alt="Agroinsights Technologies" className="h-8 w-auto opacity-80 mb-1" />
        <p className="text-[9px] text-slate-500">Powered by AgroHealthAI</p>
        <p className="text-[9px] text-slate-500">39,917 evidence sources</p>
      </div>
    </aside>
  );
}
