import React from "react";
import {
  LayoutDashboard,
  Users2,
  GraduationCap,
  FileCheck2,
  Wallet,
  BarChart3,
  ShieldCheck,
  Settings,
  History,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuditLogs: () => void;
}

export function Sidebar({ currentTab, onTabChange, onOpenAuditLogs }: SidebarProps) {
  const { user, role, switchRoleDemo } = useAuth();

  const navItems = [
    { id: "dashboard", label: "Boshqaruv", icon: LayoutDashboard },
    { id: "groups", label: "Guruhlar", icon: Users2 },
    { id: "students", label: "O'quvchilar", icon: GraduationCap },
    { id: "exams", label: "Imtihonlar", icon: FileCheck2 },
    { id: "finance", label: "Moliya", icon: Wallet, restricted: !user?.permissions?.can_view_finance && role !== "CEO" && role !== "ADMIN" },
    { id: "reports", label: "Hisobotlar", icon: BarChart3 },
    {
      id: "roles",
      label: "Rollarni boshqarish",
      icon: ShieldCheck,
      badge: "BETA",
      restricted: role !== "CEO"
    },
    { id: "settings", label: "Sozlamalar", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl flex flex-col z-30 transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-glow">
            <span className="text-white font-bold text-sm tracking-wider">IN</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-wider text-zinc-100 uppercase">INCEPTUM</h1>
            <p className="text-[10px] text-zinc-500 tracking-tight font-mono">CRM & LMS v2.0</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-zinc-500 font-mono">
          Asosiy bo'limlar
        </div>

        {navItems.map((item) => {
          if (item.restricted) return null;
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 font-semibold shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-100"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant="beta" className="text-[9px] px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full bg-indigo-500" />
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-zinc-500 font-mono">
          Tizim monitoringi
        </div>

        <button
          onClick={onOpenAuditLogs}
          className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-100 transition-all"
        >
          <div className="flex items-center gap-3">
            <History className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300" />
            <span>Harakatlar tarixi</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Audit</span>
        </button>
      </div>

      {/* Role Switcher Demo Box */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-900/40">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Faol rol:</span>
          </div>
          <Badge variant="linear" className="text-[10px] font-mono font-semibold text-indigo-300">
            {role}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {(['CEO', 'ADMIN', 'TEACHER', 'OPERATOR', 'STUDENT'] as const).map((r) => (
            <button
              key={r}
              onClick={() => switchRoleDemo(r)}
              className={cn(
                "rounded px-1.5 py-1 text-[10px] font-mono transition-all text-center",
                role === r
                  ? "bg-indigo-600 text-white font-bold shadow-sm"
                  : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
