import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { Badge } from "../ui/badge";
import { apiClient } from "../../api/client";
import { History, Shield, Filter, RefreshCw } from "lucide-react";

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditLogModal({ isOpen, onClose }: AuditLogModalProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const url = selectedAction === "ALL" ? "/audit-logs/" : `/audit-logs/?action=${selectedAction}`;
      const res = await apiClient.get(url);
      setLogs(res.data.results || res.data || []);
    } catch {
      // Mock fallback
      setLogs([
        {
          id: 1,
          action: "LOGIN",
          action_display: "Tizimga kirish",
          title: "Tizimga muvaffaqiyatli kirish",
          user_name: "Sherzodbek Qodirov",
          description: "Rol: CEO | IP: 127.0.0.1",
          formatted_time: "27.10.2026 17:52",
        },
        {
          id: 2,
          action: "ATTENDANCE",
          action_display: "Davomat belgilash",
          title: "Davomat belgilandi",
          user_name: "Abduqodir Ziyodov",
          description: "Guruh: IELTS-701 | 6 nafar o'quvchi saqlandi",
          formatted_time: "27.10.2026 17:46",
        },
        {
          id: 3,
          action: "PAYMENT",
          action_display: "To'lov amali",
          title: "Yangi to'lov qabul qilindi",
          user_name: "Madina Karimova",
          description: "Javohir Toshpo'latov | Summa: 750 000 so'm | Click",
          formatted_time: "27.10.2026 17:45",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, selectedAction]);

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case "LOGIN":
        return "secondary";
      case "PAYMENT":
        return "success";
      case "ATTENDANCE":
        return "default";
      case "GRADE":
        return "warning";
      case "COIN":
        return "linear";
      default:
        return "outline";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-3xl"
      title={
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-indigo-400" />
          <span>Harakatlar tarixi (Audit Logs)</span>
        </div>
      }
      description="Tizimda foydalanuvchilar tomonidan amalga oshirilgan barcha xavfsizlik va ma'lumotlar o'zgarishi qaydnomasi"
    >
      <div className="space-y-4">
        {/* Filters bar */}
        <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-500" />
            <div className="flex flex-wrap gap-1">
              {[
                { id: "ALL", label: "Barchasi" },
                { id: "LOGIN", label: "Kirish" },
                { id: "PAYMENT", label: "To'lov" },
                { id: "ATTENDANCE", label: "Davomat" },
                { id: "GRADE", label: "Baho" },
                { id: "COIN", label: "Coin" },
                { id: "SETTINGS", label: "Sozlamalar" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedAction(f.id)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    selectedAction === f.id
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={fetchLogs}
            disabled={isLoading}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[11px] text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            <span>Yangilash</span>
          </button>
        </div>

        {/* Logs Table */}
        <div className="max-h-96 overflow-y-auto rounded-xl border border-zinc-800/80 bg-zinc-900/30">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 text-[11px] font-semibold text-zinc-400 uppercase font-mono">
              <tr>
                <th className="py-2.5 px-4">Vaqt</th>
                <th className="py-2.5 px-4">Foydalanuvchi</th>
                <th className="py-2.5 px-4">Amal turi</th>
                <th className="py-2.5 px-4">Tafsilot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-sans">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500 text-xs">
                    Qaydlar mavjud emas
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-2.5 px-4 font-mono text-zinc-400 whitespace-nowrap text-[11px]">
                      {log.formatted_time || log.created_at?.slice(0, 16)}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-zinc-200 whitespace-nowrap">
                      {log.user_name || "Tizim"}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <Badge variant={getActionBadgeVariant(log.action)} className="text-[10px]">
                        {log.action_display || log.action}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-4 text-zinc-300">
                      <p className="font-semibold text-zinc-100 text-xs">{log.title}</p>
                      <p className="text-[11px] text-zinc-400">{log.description}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
