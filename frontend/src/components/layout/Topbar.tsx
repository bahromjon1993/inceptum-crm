import React from "react";
import {
  Building2,
  Search,
  Plus,
  Bell,
  LogOut,
  ChevronDown,
  History,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface TopbarProps {
  onOpenPaymentModal: () => void;
  onOpenAuditLogs: () => void;
  onOpenSearch: () => void;
  selectedBranch: string;
  onBranchChange: (b: string) => void;
}

export function Topbar({
  onOpenPaymentModal,
  onOpenAuditLogs,
  onOpenSearch,
  selectedBranch,
  onBranchChange,
}: TopbarProps) {
  const { user, role, logout } = useAuth();
  const [showBranchMenu, setShowBranchMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const branches = ["Barcha filiallar", "Chilonzor filiali", "Yunusobod filiali"];

  return (
    <header className="fixed top-0 right-0 left-64 h-16 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl px-6 flex items-center justify-between z-20">
      {/* Left side: Branch selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowBranchMenu(!showBranchMenu)}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Building2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>{selectedBranch}</span>
            <ChevronDown className="h-3 w-3 text-zinc-500" />
          </button>

          {showBranchMenu && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-zinc-900/95 p-1 text-xs shadow-xl backdrop-blur-xl z-50 animate-in fade-in-50">
              {branches.map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    onBranchChange(b);
                    setShowBranchMenu(false);
                  }}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left transition-colors ${
                    selectedBranch === b
                      ? "bg-indigo-600/15 text-indigo-400 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search trigger (Linear style) */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-3 w-64 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all shadow-subtle"
        >
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="flex-1 text-left">Qidirish...</span>
          <kbd className="flex h-4 items-center gap-0.5 rounded border border-zinc-700/60 bg-zinc-800/80 px-1.5 font-mono text-[10px] text-zinc-400">
            <span>⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right side: Actions & User profile */}
      <div className="flex items-center gap-3">
        {/* Quick + TO'LOV action */}
        <Button
          onClick={onOpenPaymentModal}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 px-3.5"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>+ TO'LOV</span>
        </Button>

        {/* Audit log trigger */}
        <button
          onClick={onOpenAuditLogs}
          title="Harakatlar tarixi"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
        >
          <History className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          title="Xabarlar"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        {/* User profile dropdown */}
        <div className="relative pl-2 border-l border-zinc-800/80">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-zinc-900/80 transition-colors"
          >
            <img
              src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"}
              alt={user?.full_name}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-zinc-700"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-zinc-200 leading-none">{user?.full_name}</p>
              <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">{user?.role_display || role}</p>
            </div>
            <ChevronDown className="h-3 w-3 text-zinc-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-800 bg-zinc-900/95 p-1.5 text-xs shadow-xl backdrop-blur-xl z-50 animate-in fade-in-50">
              <div className="px-3 py-2 border-b border-zinc-800/80 mb-1">
                <p className="font-semibold text-zinc-100">{user?.full_name}</p>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">{user?.phone_number}</p>
                <Badge variant="linear" className="mt-1.5 text-[9px]">
                  {role}
                </Badge>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Tizimdan chiqish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
