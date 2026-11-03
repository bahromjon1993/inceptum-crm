import React, { useState, useRef, useEffect } from "react";
import {
  Wallet,
  Plus,
  Receipt,
  Download,
  CreditCard,
  Banknote,
  TrendingUp,
  GraduationCap,
  Users,
  ChevronDown,
  Calendar,
  X,
  Menu,
  ChevronRight,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";
import { formatUzbekMoney } from "../lib/utils";

interface FinancePageProps {
  onOpenPaymentModal: () => void;
}

export function FinancePage({ onOpenPaymentModal }: FinancePageProps) {
  // Filters
  const [selectedBranch, setSelectedBranch] = useState("INCEPTUM Filliali");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("Oktabr");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("Barchasi");
  const [dateRange, setDateRange] = useState("2026-10-01 ~ 2026-10-31");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar popup on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick range helper
  const handleQuickDateSelect = (type: "today" | "yesterday" | "last_week") => {
    if (type === "today") setDateRange("2026-10-28 ~ 2026-10-28");
    if (type === "yesterday") setDateRange("2026-10-27 ~ 2026-10-27");
    if (type === "last_week") setDateRange("2026-10-21 ~ 2026-10-28");
    setIsCalendarOpen(false);
  };

  // Payroll selected row for detail preview
  const [selectedSalaryMonth, setSelectedSalaryMonth] = useState<string | null>(null);

  const salaryRows: any[] = [];

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Oy,Xodimlar,Doimiy,Foiz,Avans,Jami\n" +
      salaryRows
        .map(
          (r) =>
            `"${r.month}",${r.staffCount},${r.baseSalary},${r.percent},${r.advance},${r.total}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Ish_haqi_hisoboti_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-20 select-none animate-in fade-in duration-150">
      {/* 1. TOP FILTERS ROW (1:1 with frame_052.jpg) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filialni tanlang floating field */}
        <div className="relative min-w-[200px]">
          <span className="absolute -top-2 left-3 bg-[#f4f6fc] dark:bg-[#0b0f19] px-1 text-[11px] font-medium text-slate-500 z-10">
            Filialni tanlang
          </span>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full h-10 px-3 bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 outline-hidden focus:border-[#5d5fef] transition-colors cursor-pointer"
          >
            <option value="INCEPTUM Filliali">INCEPTUM Filliali</option>
            <option value="Chilonzor filiali">Chilonzor filiali</option>
            <option value="Yunusobod filiali">Yunusobod filiali</option>
            <option value="Barcha filiallar">Barcha filiallar</option>
          </select>
        </div>

        {/* Yilni tanlang floating field */}
        <div className="relative w-28">
          <span className="absolute -top-2 left-3 bg-[#f4f6fc] dark:bg-[#0b0f19] px-1 text-[11px] font-medium text-slate-500 z-10">
            Yilni tanlang
          </span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full h-10 px-3 bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 outline-hidden focus:border-[#5d5fef] transition-colors cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Oyni tanlang floating field */}
        <div className="relative w-36">
          <span className="absolute -top-2 left-3 bg-[#f4f6fc] dark:bg-[#0b0f19] px-1 text-[11px] font-medium text-slate-500 z-10">
            Oyni tanlang
          </span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full h-10 px-3 bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 outline-hidden focus:border-[#5d5fef] transition-colors cursor-pointer"
          >
            {[
              "Yanvar",
              "Fevral",
              "Mart",
              "Aprel",
              "May",
              "Iyun",
              "Iyul",
              "Avgust",
              "Sentabr",
              "Oktabr",
              "Noyabr",
              "Dekabr",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Date range picker with interactive modal */}
        <div className="relative" ref={calendarRef}>
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="h-10 px-3.5 bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:border-[#5d5fef] transition-colors cursor-pointer"
          >
            <span>{dateRange}</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </button>

          {/* Realistic Calendar Popup matching frame_052.jpg */}
          {isCalendarOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-in fade-in zoom-in-95 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  Oktabr 2026
                </span>
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Days header */}
              <div className="grid grid-cols-7 gap-1 text-center py-2 text-[11px] font-semibold text-slate-400">
                <span>Yak</span>
                <span>Du</span>
                <span>Se</span>
                <span>Chor</span>
                <span>Pa</span>
                <span>Ju</span>
                <span>Sha</span>
              </div>

              {/* Day numbers matrix */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {[
                  27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
                ].map((d, idx) => {
                  const isCurrentMonth = idx >= 4;
                  const isToday = d === 28 && isCurrentMonth;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setDateRange(`2026-10-01 ~ 2026-10-${d < 10 ? "0" + d : d}`);
                      }}
                      className={`h-7 w-7 mx-auto flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                        isToday
                          ? "bg-[#5d5fef] text-white font-bold"
                          : isCurrentMonth
                          ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              {/* Quick links & Saqlash */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuickDateSelect("today")}
                    className="text-[#5d5fef] hover:underline font-medium cursor-pointer"
                  >
                    Bugun
                  </button>
                  <button
                    onClick={() => handleQuickDateSelect("yesterday")}
                    className="text-slate-500 hover:underline cursor-pointer"
                  >
                    Kecha
                  </button>
                  <button
                    onClick={() => handleQuickDateSelect("last_week")}
                    className="text-slate-500 hover:underline cursor-pointer"
                  >
                    Oxirgi hafta
                  </button>
                </div>
                <button
                  onClick={() => setIsCalendarOpen(false)}
                  className="px-3 py-1 bg-[#5d5fef] text-white font-bold rounded-lg text-xs hover:bg-[#4f51e0] cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </div>
          )}
        </div>

        {/* To'lov turi select */}
        <div className="relative w-36">
          <select
            value={paymentTypeFilter}
            onChange={(e) => setPaymentTypeFilter(e.target.value)}
            className="w-full h-10 px-3 bg-white dark:bg-[#1e293b] border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100 outline-hidden focus:border-[#5d5fef] transition-colors cursor-pointer"
          >
            <option value="Barchasi">To'lov turi: Barchasi</option>
            <option value="Naqt">Naqt</option>
            <option value="Click">Click</option>
            <option value="Payme">Payme</option>
          </select>
        </div>
      </div>

      {/* 2. UMUMIY RAQAMLAR (1:1 with frame_052.jpg) */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Umumiy raqamlar
        </h2>

        {/* 7 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Tushumlar */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">Tushumlar</div>
            </div>
          </div>

          {/* Card 2: Chiqimlar */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">Chiqimlar</div>
            </div>
          </div>

          {/* Card 3: Foyda */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">Foyda</div>
            </div>
          </div>

          {/* Card 4: Aktiv balans with Plus button */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  0 UZS
                </div>
                <div className="text-xs text-slate-500 font-medium">Aktiv balans</div>
              </div>
            </div>
            <button
              onClick={onOpenPaymentModal}
              title="Kassaga pul kiritish / To'lov"
              className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#5d5fef] hover:text-white text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Card 5: LTV */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">LTV</div>
            </div>
          </div>

          {/* Card 6: CAC */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">CAC</div>
            </div>
          </div>

          {/* Card 7: O'rtacha to'lov */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex items-center gap-3.5 sm:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">O'rtacha to'lov</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CHARTS SECTION (1:1 with frame_052.jpg) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Donut Chart - To'lov turlari bo'yicha taqsimot */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              To'lov turlari bo'yicha taqsimot
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              To'lov usullari bo'yicha tushumlar
            </p>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative py-6 flex items-center justify-center">
            <svg className="w-56 h-56 -rotate-90" viewBox="0 0 100 100">
              {/* Naqt Slice: 80.54% = strokeDasharray 202.4 251.3 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#deb89b"
                strokeWidth="16"
                strokeDasharray="0 251.3"
                strokeDashoffset="0"
                className="transition-all duration-700 ease-out"
              />
              {/* Click Slice: 19.46% = strokeDasharray 48.9 251.3 */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#e06a5b"
                strokeWidth="16"
                strokeDasharray="0 251.3"
                strokeDashoffset="-202.4"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold text-slate-400">Jami</span>
              <span className="text-base font-black text-slate-800 dark:text-slate-100">
                0 UZS
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#deb89b]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Naqt: <strong>0%</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#e06a5b]" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Click: <strong>0%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Multi-line Chart - Aylanmalar */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Aylanmalar
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Daromad va xarajatlar dinamikasi
              </p>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Line Chart */}
          <div className="relative py-4 w-full h-64">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 600 220"
              preserveAspectRatio="none"
            >
              {/* Horizontal grid lines */}
              {[20, 60, 100, 140, 180].map((y, idx) => (
                <line
                  key={idx}
                  x1="50"
                  y1={y}
                  x2="590"
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              <text x="5" y="24" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                50 000 000
              </text>
              <text x="5" y="64" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                40 000 000
              </text>
              <text x="5" y="104" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                30 000 000
              </text>
              <text x="5" y="144" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                20 000 000
              </text>
              <text x="5" y="184" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                10 000 000
              </text>

              {/* Tushumlar Line (Yellow/Amber curve) */}
              <path
                d="M 60 200 L 570 200"
                fill="none"
                stroke="#eab308"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Points */}
              
              
              

              {/* Foyda Line (Green curve) */}
              <path
                d="M 60 200 L 570 200"
                fill="none"
                stroke="#22c55e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Chiqimlar Line (Rose curve) */}
              <path
                d="M 60 200 L 570 200"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Bottom Series Legend */}
          <div className="flex items-center justify-end gap-5 text-xs text-slate-500 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
              <span>Tushumlar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span>Foyda</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
              <span>Chiqimlar</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BONUS VA JARIMALAR (1:1 with frame_054.jpg) */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Xodimlarga bonus va jarimalar
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-6 shadow-2xs text-center space-y-1">
            <div className="text-xs font-semibold text-slate-400">Bonus</div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              0 UZS
            </div>
          </div>
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-6 shadow-2xs text-center space-y-1">
            <div className="text-xs font-semibold text-slate-400">Jarima</div>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
              0 UZS
            </div>
          </div>
        </div>
      </div>

      {/* 5. ISH HAQI HISOBOTLARI (1:1 with frame_054.jpg) */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              Ish haqi hisobotlari
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Oylik ish haqi tarixi. Tafsilotlarni ko'rish uchun istalgan oyni tanlang.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="h-9 px-4 bg-white dark:bg-[#1e293b] border border-emerald-500/60 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Eksport</span>
          </button>
        </div>

        {/* Calculation Modes */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="uppercase text-[11px] text-slate-400">HISOBLASH TURLARI</span>
          <span className="text-slate-700 dark:text-slate-300">
            Foiz hisoblash: <strong className="text-slate-900 dark:text-white">To'lov</strong>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 dark:text-slate-300">
            To'lov hisoblash: <strong className="text-slate-900 dark:text-white">Kelgan sana</strong>
          </span>
        </div>

        {/* Payroll Table */}
        <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[950px]">
              <thead>
                <tr className="bg-[#f8fafc] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-3 w-10 text-center">№</th>
                  <th className="py-3.5 px-4 flex items-center gap-1">
                    <span>OY</span>
                    <ChevronDown className="w-3 h-3" />
                  </th>
                  <th className="py-3.5 px-3 text-center">XODIMLAR ⇅</th>
                  <th className="py-3.5 px-3 text-right">DOIMIY ⇅</th>
                  <th className="py-3.5 px-3 text-right">FOIZ ⇅</th>
                  <th className="py-3.5 px-3 text-center">DARS ⇅</th>
                  <th className="py-3.5 px-3 text-center">O'QUVCHI ⇅</th>
                  <th className="py-3.5 px-3 text-center">BONUS ⇅</th>
                  <th className="py-3.5 px-3 text-center">JARIMA ⇅</th>
                  <th className="py-3.5 px-3 text-right">AVANS ⇅</th>
                  <th className="py-3.5 px-4 text-right">JAMI ⇅</th>
                  <th className="py-3.5 px-3 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {salaryRows.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-12 text-center text-slate-400 font-medium">
                      Ish haqi hisobotlari mavjud emas
                    </td>
                  </tr>
                ) : (
                  salaryRows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() =>
                      setSelectedSalaryMonth(
                        selectedSalaryMonth === row.month ? null : row.month
                      )
                    }
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-3 text-center text-slate-400">{row.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                      {row.month}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-600 dark:text-slate-300">
                      {row.staffCount}
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-700 dark:text-slate-200 font-mono">
                      {formatUzbekMoney(row.baseSalary)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-700 dark:text-slate-200 font-mono">
                      {formatUzbekMoney(row.percent)}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-400">
                      {row.lessonHours}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-400">
                      {row.studentCount}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-400">{row.bonus}</td>
                    <td className="py-3.5 px-3 text-center text-slate-400">{row.penalty}</td>
                    <td className="py-3.5 px-3 text-right font-bold font-mono text-rose-600">
                      {formatUzbekMoney(row.advance)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black font-mono text-[#5d5fef]">
                      {formatUzbekMoney(row.total)}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-400">
                      <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
