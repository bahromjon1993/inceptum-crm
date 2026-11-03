import React, { useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Calendar,
  User,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

export function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [leads, setLeads] = useState<any[]>([]);

  const stages = [
    { id: "NEW", title: "Yangi lidlar", count: leads.filter((l: any) => l.stage === "NEW").length, color: "border-t-blue-500" },
    { id: "CONTACTED", title: "Bog'lanildi", count: leads.filter((l: any) => l.stage === "CONTACTED").length, color: "border-t-amber-500" },
    { id: "TRIAL", title: "Sinov darsida", count: leads.filter((l: any) => l.stage === "TRIAL").length, color: "border-t-purple-500" },
    { id: "ENROLLED", title: "Qabul qilindi", count: leads.filter((l: any) => l.stage === "ENROLLED").length, color: "border-t-emerald-500" },
  ];

  return (
    <div className="space-y-6 pb-16 select-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800">Lidlar (Qabul bo'limi)</h1>
          <span className="w-6 h-6 rounded-full border border-[#5d5fef] text-[#5d5fef] text-xs font-bold flex items-center justify-center">
            {leads.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            YANGI LID QO'SHISH
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage.id);
          return (
            <div
              key={stage.id}
              className={`bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3.5 space-y-3 border-t-4 ${stage.color}`}
            >
              <div className="flex justify-between items-center px-1">
                <span className="font-bold text-xs text-slate-800">{stage.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-white text-slate-600 font-bold text-[10px] shadow-2xs">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 bg-white border border-slate-200/80 rounded-xl shadow-2xs space-y-2 hover:shadow-xs transition-shadow"
                  >
                    <div className="font-bold text-xs text-slate-800 flex justify-between">
                      <span>{lead.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{lead.source}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {lead.phone}
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-[#5d5fef] font-semibold">
                        {lead.course}
                      </span>
                      <span className="text-slate-400">{lead.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
