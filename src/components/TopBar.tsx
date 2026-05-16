"use client";

import { useRouter } from "next/navigation";

interface Props {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: Props) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700">AI Online</span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("vetpractice_token");
            router.push("/");
          }}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
