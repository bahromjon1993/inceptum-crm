import React, { useState } from "react";
import {
  UserCheck,
  Layers,
  AlertTriangle,
  Clock,
  GraduationCap,
  Users,
  Calendar,
  ArrowRightLeft,
  Tv,
  CheckSquare,
  Eye,
  EyeOff,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useMasking } from "../context/MaskingContext";

interface DashboardPageProps {
  onNavigate: (tab: string, subView?: string) => void;
  onOpenPaymentModal: () => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { isMasked, toggleMasking, maskValue } = useMasking();
  const [activeDay, setActiveDay] = useState("CHORSHANBA");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const days = [
    "DUSHANBA",
    "SESHANBA",
    "CHORSHANBA",
    "PAYSHANBA",
    "JUMA",
    "SHANBA",
    "YAKSHANBA",
  ];

  // 12 Stat Cards matching frame_001.jpg exactly
  const statCards = [
    {
      id: "active_leads",
      title: "Faol lidlar",
      value: "0",
      icon: UserCheck,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      tab: "leads",
    },
    {
      id: "groups",
      title: "Guruhlar",
      value: "0",
      icon: Layers,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      tab: "groups",
    },
    {
      id: "debts",
      title: "Qolgan qarzlar",
      value: "0 so'm",
      icon: AlertTriangle,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      tooltip:
        "Umumiy o'quvchilar qarzdorligi : 3 652 782 so'm, Arxivdagi o'quvchilar qarzdorligi : 2 607 783 so'm",
      tab: "finance",
    },
    {
      id: "debtors",
      title: "Qarzdorlar",
      value: "0",
      icon: AlertTriangle,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      tab: "students",
    },
    {
      id: "upcoming_payments",
      title: "To'lovi yaqin",
      value: "0",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      tab: "students",
    },
    {
      id: "active_students",
      title: "Faol talabalar",
      value: "0",
      icon: GraduationCap,
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-50",
      tab: "students",
    },
    {
      id: "total_in_groups",
      title: "Jami guruhdagi o'quvchilar",
      value: "0",
      icon: Users,
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-50",
      tab: "students",
    },
    {
      id: "trial_lesson",
      title: "Sinov darsida",
      value: "0",
      icon: Calendar,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      tab: "leads",
    },
    {
      id: "attended_left",
      title: "Kelib ketganlar",
      value: "0",
      icon: ArrowRightLeft,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      tooltip: "Sinov darsiga kelib ketgan o'quvchilar soni",
      tab: "students",
    },
    {
      id: "teachers",
      title: "O'qituvchilar",
      value: "0",
      icon: Tv,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      tab: "mentors",
    },
    {
      id: "exams",
      title: "Imtihonlar",
      value: "0",
      icon: CheckSquare,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      tab: "exams",
    },
    {
      id: "new_enrollment",
      title: "Yangi guruhga qabul",
      value: "0",
      icon: Users,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      badge: "NEW",
      tab: "groups",
    },
  ];

  // Schedule times 08:00 to 20:00 (30-min increments)
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Rooms list
  const rooms: any[] = [];

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top action row: Masking Toggle */}
      <div className="flex justify-between sm:justify-end items-center gap-3">
        <h2 className="sm:hidden text-sm font-bold text-slate-800 dark:text-slate-200">Statistika</h2>
        <button
          onClick={toggleMasking}
          className="h-8 sm:h-9 px-3 sm:px-4 bg-white hover:bg-slate-50 border border-[#5d5fef]/40 text-[#5d5fef] font-semibold text-xs rounded-lg shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
        >
          {isMasked ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>Raqamlarni ko'rish</span>
        </button>
      </div>

      {/* 12 Stat Cards Grid (Responsive 2 cols on mobile, 3 on tablet, 6 on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isCardHovered = hoveredCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => onNavigate(card.tab)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative bg-white border border-[#e8ecf4] hover:border-[#5d5fef]/50 rounded-xl p-2.5 sm:p-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
                card.id === "debts" ? "hover:border-rose-300" : ""
              }`}
            >
              {/* Optional NEW badge */}
              {card.badge && (
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#5d5fef] text-[9px] font-bold text-white uppercase tracking-wider">
                  {card.badge}
                </span>
              )}

              {/* Tooltip on hover */}
              {card.tooltip && isCardHovered && (
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-50 w-72 bg-[#1e293b] text-white text-[11px] font-medium p-2.5 rounded-lg shadow-xl pointer-events-none animate-in fade-in zoom-in-95">
                  {card.tooltip}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1e293b] rotate-45" />
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg ${card.bgColor} flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.iconColor}`} />
              </div>

              {/* Title */}
              <div className="text-[11px] sm:text-[12px] font-medium text-slate-500 line-clamp-1 mb-0.5 sm:mb-1">
                {card.title}
              </div>

              {/* Value (Masked or Unmasked) */}
              <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight">
                {maskValue(card.value)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Profitability Pill Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onNavigate("reports", "payment")}
          className="w-full sm:w-auto h-9 px-5 bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          MARKAZ FOYDALILIGI 0%
        </button>
      </div>

      {/* Room Schedule Card (Jadval) */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
        {/* Day Tabs and Interval Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-3.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none touch-scroll pb-1 w-full sm:w-auto">
            {days.map((day) => {
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`text-xs font-bold tracking-wider pb-1 transition-all relative shrink-0 cursor-pointer ${
                    isActive
                      ? "text-[#5d5fef]"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {day}
                  {isActive && (
                    <span className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-500">
            <span>Vaqt oralig'i:</span>
            <div className="relative inline-flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 cursor-pointer">
              <span>30 Daqiqa</span>
              <ChevronDown className="h-3 w-3 ml-1 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Timetable Matrix */}
        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-left text-xs border-collapse min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-100 bg-[#fafafa]">
                <th className="py-3 px-4 font-semibold text-slate-500 w-44 sticky left-0 bg-[#fafafa] z-10 border-r border-slate-100">
                  Xonalar / soat
                </th>
                {timeSlots.map((time) => (
                  <th
                    key={time}
                    className="py-3 px-2 font-medium text-slate-400 text-center min-w-[56px] border-r border-slate-100/60"
                  >
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td
                    colSpan={timeSlots.length + 1}
                    className="py-12 text-center text-slate-400 font-medium"
                  >
                    Hozircha dars jadvali va xonalar mavjud emas
                  </td>
                </tr>
              ) : (
                rooms.map((room) => {
                return (
                  <tr
                    key={room.id}
                    className="border-b border-slate-100/80 hover:bg-slate-50/40 transition-colors h-20"
                  >
                    {/* Room Name */}
                    <td className="py-2 px-4 font-bold text-slate-700 text-xs sticky left-0 bg-white z-10 border-r border-slate-100 shadow-[2px_0_4px_-2px_rgba(0,0,0,0.05)]">
                      {room.name}
                    </td>

                    {/* Timeline slots */}
                    {timeSlots.map((time, idx) => {
                      const lesson = room.lessons.find((l: any) => l.start === time);

                      if (lesson) {
                        return (
                          <td
                            key={time}
                            colSpan={lesson.span}
                            className="p-1 border-r border-slate-100/60 relative"
                          >
                            <div
                              onClick={() => onNavigate("groups")}
                              className={`h-full w-full rounded-md p-2 flex flex-col justify-center shadow-2xs cursor-pointer hover:shadow-xs transition-shadow ${lesson.color}`}
                            >
                              <div className="font-bold text-[11px] leading-tight line-clamp-1">
                                {lesson.title}
                              </div>
                              <div className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                                {lesson.teacher}
                              </div>
                            </div>
                          </td>
                        );
                      }

                      // Check if current slot is covered by a spanning previous lesson
                      const isCovered = room.lessons.some((l: any) => {
                        const startIdx = timeSlots.indexOf(l.start);
                        const currentIdx = idx;
                        return currentIdx > startIdx && currentIdx < startIdx + l.span;
                      });

                      if (isCovered) {
                        return null; // Don't render td since colSpan covers it
                      }

                      return (
                        <td
                          key={time}
                          className="py-2 px-1 border-r border-slate-100/60 text-center hover:bg-slate-100/40 transition-colors"
                        />
                      );
                    })}
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Purple Sparkle Action Button (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => onNavigate("groups")}
          title="Tezkor amallar"
          className="w-12 h-12 rounded-full bg-[#5d5fef] hover:bg-[#4f51e0] active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
