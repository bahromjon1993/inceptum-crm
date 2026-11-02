import React, { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Award,
  HardDrive,
  Users,
  GraduationCap,
  Calendar,
  Briefcase,
  BookOpen,
  Printer,
  X,
  Clock,
  Coins,
  Settings,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  FileText,
  Percent,
  Smartphone,
  Phone,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
  Gift,
} from "lucide-react";
import { formatUzbekMoney } from "../lib/utils";

interface ReportsPageProps {
  initialSubView?: string;
}

export function ReportsPage({ initialSubView = "payment" }: ReportsPageProps) {
  const [subView, setSubView] = useState<string>(initialSubView);

  useEffect(() => {
    if (initialSubView) {
      setSubView(initialSubView);
    }
  }, [initialSubView]);

  // ================= 1. TO'LOVLAR HISOBOTI (frame_055) =================
  const [activeTeacherTab, setActiveTeacherTab] = useState<"TEACHERS" | "STAFF">("TEACHERS");
  const [paymentSearch, setPaymentSearch] = useState("");

  const teachersPaymentList = [
    {
      id: 1,
      name: "Feruzbek teacher",
      groups: 4,
      courses: ["CEFR", "Elementary", "Pre-IELTS 1"],
      students: 122,
      paid: "13 380 000 so'm",
      debt: "-585 347 so'm",
    },
    {
      id: 2,
      name: "Marjona teacher",
      groups: 6,
      courses: ["KIDS 1", "KIDS 2"],
      students: 98,
      paid: "8 000 000 so'm",
      debt: "-1 222 308 so'm",
    },
    {
      id: 3,
      name: "Axmadjon teacher",
      groups: 5,
      courses: ["IELTS Graduation", "KIDS 4", "Beginner", "Pre-IELTS 2", "Pre-IELTS 1"],
      students: 155,
      paid: "20 090 000 so'm",
      debt: "-1 100 383 so'm",
    },
    {
      id: 4,
      name: "Gulasal teacher",
      groups: 4,
      courses: ["IELTS Graduation", "Beginner", "Pre-IELTS 2"],
      students: 77,
      paid: "8 975 000 so'm",
      debt: "-394 744 so'm",
    },
  ];

  // ================= 2. O'QUVCHILAR TO'LOVI (frame_056 & frame_057) =================
  const [studentPaymentSearch, setStudentPaymentSearch] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  const studentPayments = [
    {
      id: 1,
      studentId: "2392",
      studentName: "Abduhalilov Sardorbek",
      group: "Feruzbek O 4-6",
      teacher: "Feruzbek teacher",
      amount: "300 000 so'm",
      bonus: "—",
      date: "2026-10-28 17:54",
      period: "Oktyabr 2026",
      comment: "chek boyni...",
      officer: "Imron Erkinov",
      method: "Click",
    },
    {
      id: 2,
      studentId: "2388",
      studentName: "Sayfiddinova Diora",
      group: "Ahmadjon E 4-6",
      teacher: "Axmadjon teacher",
      amount: "300 000 so'm",
      bonus: "—",
      date: "2026-10-27 16:08",
      period: "Oktyabr 2026",
      comment: "noyabr uch...",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 3,
      studentId: "2385",
      studentName: "Abdurahmananova Maftuna",
      group: "Feruzbek E 4-6",
      teacher: "Feruzbek teacher",
      amount: "250 000 so'm",
      bonus: "—",
      date: "2026-10-27 16:05",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 4,
      studentId: "2379",
      studentName: "Abdullajanova Ra'no",
      group: "Gulasal E 2-4",
      teacher: "Gulasal teacher",
      amount: "225 000 so'm",
      bonus: "—",
      date: "2026-10-27 13:54",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 5,
      studentId: "2371",
      studentName: "Isroilov Ilyosbek",
      group: "Ahmadjon E 2-4",
      teacher: "Axmadjon teacher",
      amount: "400 000 so'm",
      bonus: "—",
      date: "2026-10-26 17:29",
      period: "Oktyabr 2026",
      comment: ".",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 6,
      studentId: "2364",
      studentName: "Raxmonjanova Durdona",
      group: "Gulasal E 4-6",
      teacher: "Gulasal teacher",
      amount: "250 000 so'm",
      bonus: "—",
      date: "2026-10-25 19:00",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 7,
      studentId: "2358",
      studentName: "Yusufjanov Javohir",
      group: "Ahmadjon E 4-6",
      teacher: "Axmadjon teacher",
      amount: "300 000 so'm",
      bonus: "—",
      date: "2026-10-24 18:09",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Click",
    },
    {
      id: 8,
      studentId: "2352",
      studentName: "Abdurashidov Shoxrux",
      group: "Ahmadjon E 4-6",
      teacher: "Axmadjon teacher",
      amount: "300 000 so'm",
      bonus: "—",
      date: "2026-10-24 17:44",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Click",
    },
    {
      id: 9,
      studentId: "2349",
      studentName: "Ahmadjanov Abbosbek",
      group: "Feruzbek E 6-8",
      teacher: "Feruzbek teacher",
      amount: "300 000 so'm",
      bonus: "—",
      date: "2026-10-24 14:49",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
    {
      id: 10,
      studentId: "2345",
      studentName: "Qodirjanov Boburbek",
      group: "Feruzbek E 6-8",
      teacher: "Feruzbek teacher",
      amount: "130 000 so'm",
      bonus: "—",
      date: "2026-10-24 13:12",
      period: "Oktyabr 2026",
      comment: "—",
      officer: "Imron Erkinov",
      method: "Naqt",
    },
  ];

  // ================= 3. KETISH VA GURUH O'ZGARISHI TAHLILI (frame_058) =================
  const [isReasonsModalOpen, setIsReasonsModalOpen] = useState(false);

  // ================= 5. HODIMLAR DAVOMATI (frame_062) =================
  const [attendanceViewType, setAttendanceViewType] = useState<"daily" | "weekly" | "monthly">("daily");

  const attendanceList = [
    {
      id: 1,
      name: "Adminoy Adminovna",
      branch: "INCEPTUM Filliali",
      expectedIn: "08:00",
      actualIn: "—",
      expectedOut: "20:00",
      actualOut: "—",
      late: "—",
      earlyLeave: "—",
      worked: "—",
      status: "Kelmedi",
    },
    {
      id: 2,
      name: "Axmadjon teacher",
      branch: "INCEPTUM Filliali",
      expectedIn: "16:00",
      actualIn: "—",
      expectedOut: "20:00",
      actualOut: "—",
      late: "—",
      earlyLeave: "—",
      worked: "—",
      status: "Kelmedi",
    },
    {
      id: 3,
      name: "Feruzbek teacher",
      branch: "INCEPTUM Filliali",
      expectedIn: "16:00",
      actualIn: "—",
      expectedOut: "18:00",
      actualOut: "—",
      late: "—",
      earlyLeave: "—",
      worked: "—",
      status: "Kelmedi",
    },
    {
      id: 4,
      name: "Gulasal teacher",
      branch: "INCEPTUM Filliali",
      expectedIn: "14:00",
      actualIn: "—",
      expectedOut: "18:00",
      actualOut: "—",
      late: "—",
      earlyLeave: "—",
      worked: "—",
      status: "Kelmedi",
    },
    {
      id: 5,
      name: "Marjona teacher",
      branch: "INCEPTUM Filliali",
      expectedIn: "09:00",
      actualIn: "—",
      expectedOut: "13:00",
      actualOut: "—",
      late: "—",
      earlyLeave: "—",
      worked: "—",
      status: "Kelmedi",
    },
  ];

  // ================= COINLAR SUBTABS =================
  const [coinsSubTab, setCoinsSubTab] = useState<"REYTING" | "MARKETPLACE" | "REQUESTS">("REYTING");

  // ================= LIDLAR HISOBOTI (frame_064 & sec_0193-0195) =================
  const [leadRepSearch, setLeadRepSearch] = useState("");
  const [leadRepYear, setLeadRepYear] = useState("2026");
  const [leadRepMonth, setLeadRepMonth] = useState("Oktyabr");
  const [leadRepBranch, setLeadRepBranch] = useState("INCEPTUM Filliali");
  const [leadRepStatus, setLeadRepStatus] = useState("Barcha holatlar");
  const [leadRepAdmin, setLeadRepAdmin] = useState("Barcha adminlar");
  const [leadRepTemp, setLeadRepTemp] = useState("Barcha haroratlar");

  // ================= O'QUVCHILAR HISOBOTI (sec_0200-0202) =================
  const [studRepTab, setStudRepTab] = useState<"DAVOMAT" | "OZLASHTIRISH">("DAVOMAT");
  const [studRepYear, setStudRepYear] = useState("2026");
  const [studRepMonth, setStudRepMonth] = useState("Oktyabr");
  const [studRepGroup, setStudRepGroup] = useState("Guruhlar");
  const [studRepTeacher, setStudRepTeacher] = useState("Barcha o'qituvchilar");
  const [studRepStatus, setStudRepStatus] = useState("Barcha holatlar");

  return (
    <div className="space-y-6 pb-20 select-none animate-in fade-in duration-150">
      {/* ================= 1. TO'LOVLAR HISOBOTI (1:1 with frame_055) ================= */}
      {subView === "payment" && (
        <div className="space-y-5">
          {/* Title and Top Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              To'lovlar hisoboti
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                <span>INCEPTUM Filiali</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                <span>2026</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                <span>Oktyabr</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <input
                type="text"
                defaultValue="2026-10-01 ~ 2026-10-31"
                className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          {/* 6 Metric Cards matching frame_055 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">💳</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center">
                  ↓ -2.8%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                50 445 000
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Jami to'lov summasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">%</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center">
                  ↓ -31.37%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                22%
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Vaqtida to'lovlar statistikasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">🕒</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center">
                  ↑ 100%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                8 kun
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Kechikkan to'lovlar statistikasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">💲</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center">
                  ↑ 100%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                99 990
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Jami chegirmalar summasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">🎁</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center">
                  ↓ 0%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Jami bonus summasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">🔄</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-50 text-rose-600 text-[10px] font-bold flex items-center">
                  ↓ -100%
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
                0
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Qaytarilgan to'lovlar</div>
            </div>
          </div>

          {/* Subtabs: O'QITUVCHILAR / XODIMLAR */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTeacherTab("TEACHERS")}
              className={`pb-2.5 text-xs font-bold tracking-wider relative cursor-pointer ${
                activeTeacherTab === "TEACHERS"
                  ? "text-[#5d5fef]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              O'QITUVCHILAR
              {activeTeacherTab === "TEACHERS" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#5d5fef]" />
              )}
            </button>
            <button
              onClick={() => setActiveTeacherTab("STAFF")}
              className={`pb-2.5 text-xs font-bold tracking-wider relative cursor-pointer ${
                activeTeacherTab === "STAFF"
                  ? "text-[#5d5fef]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              XODIMLAR
              {activeTeacherTab === "STAFF" && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#5d5fef]" />
              )}
            </button>
          </div>

          {/* Teachers Revenue & Debt Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                O'qituvchilar ro'yxati
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Qidirish"
                    value={paymentSearch}
                    onChange={(e) => setPaymentSearch(e.target.value)}
                    className="h-8 pl-3 pr-8 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-xs rounded-lg outline-hidden text-slate-800 dark:text-slate-200"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-emerald-500/50 text-emerald-600 font-bold text-xs rounded-lg flex items-center gap-1 cursor-pointer">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>EXCEL</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-3 w-10">№</th>
                    <th className="py-3 px-4">TO'LIQ ISM</th>
                    <th className="py-3 px-4">GURUHLAR SONI</th>
                    <th className="py-3 px-4">KURSLAR</th>
                    <th className="py-3 px-4">TALABALAR SONI</th>
                    <th className="py-3 px-4">JAMI TO'LOV</th>
                    <th className="py-3 px-4">QARZ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {teachersPaymentList.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 text-slate-400 font-medium">{row.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300">
                        {row.groups}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {row.courses.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-indigo-200 text-[#5d5fef] bg-indigo-50/40 dark:bg-indigo-950/40"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-200">
                        {row.students}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100 font-mono">
                        {row.paid}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-rose-600 font-mono">
                        {row.debt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. O'QUVCHILAR TO'LOVI (1:1 with frame_056 & frame_057) ================= */}
      {subView === "student_payment" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              O'quvchilar to'lovi
            </h1>
            <div className="text-xs text-slate-400">
              Jami {studentPayments.length} ta to'lov operatsiyasi
            </div>
          </div>

          {/* Filter Toolbar matching frame_056.jpg */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="Qidirish..."
                value={studentPaymentSearch}
                onChange={(e) => setStudentPaymentSearch(e.target.value)}
                className="w-full h-9 pl-3 pr-8 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden text-slate-800 dark:text-slate-200 text-xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>Guruhlar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>To'lov turi</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>O'qituvchilar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>Kurslar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>dd/MM/yyyy ~ 📅</span>
            </div>

            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200 cursor-pointer">
              <span>Qabul qilgan xo...</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          {/* Student Payments Table */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[1050px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                    <th className="py-3 px-3 w-10">ID</th>
                    <th className="py-3 px-3">O'quvchi</th>
                    <th className="py-3 px-3">Guruhi</th>
                    <th className="py-3 px-3">O'qituvchi</th>
                    <th className="py-3 px-3">To'lov miqdori</th>
                    <th className="py-3 px-3 text-center">O'quvchi bonuslari</th>
                    <th className="py-3 px-3">To'lov sanasi</th>
                    <th className="py-3 px-3">Ta'sir vaqti</th>
                    <th className="py-3 px-3">Izoh</th>
                    <th className="py-3 px-3">Qabul qilgan xodim</th>
                    <th className="py-3 px-3">To'lov turi</th>
                    <th className="py-3 px-3 text-center">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {studentPayments.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 text-slate-400">{row.id}</td>
                      <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100">
                        {row.studentName}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                        {row.group}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                        {row.teacher}
                      </td>
                      <td className="py-3.5 px-3 font-black text-slate-900 dark:text-slate-100 font-mono">
                        {row.amount}
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-400">
                        <span className="w-5 h-5 mx-auto rounded-full border border-amber-300 text-amber-500 text-[10px] flex items-center justify-center">
                          -
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px]">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                        {row.period}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 max-w-[100px] truncate">
                        {row.comment}
                      </td>
                      <td className="py-3.5 px-3 text-slate-700 dark:text-slate-200">
                        {row.officer}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            row.method === "Click"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {row.method}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => setSelectedReceipt(row)}
                          title="Chekni ko'rish / Chiqarish"
                          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-[#5d5fef] transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Thermal Receipt Print Modal (1:1 with frame_057.jpg) */}
          {selectedReceipt && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden animate-in fade-in zoom-in-95">
                {/* Left: Thermal Receipt Print Preview (matching 58mm format) */}
                <div className="md:col-span-6 bg-slate-100 p-8 flex items-center justify-center">
                  <div className="w-[300px] bg-white p-6 shadow-xl border border-slate-200 rounded-sm font-mono text-[11px] text-slate-800 space-y-3">
                    <div className="text-center space-y-1">
                      <div className="text-xs font-bold tracking-wider">
                        TO'LOV KVITANSIYASI
                      </div>
                      <div className="text-[10px] text-slate-500">A.Temur, 218-uy</div>
                      <div className="text-[10px] text-slate-500">(99) 324-02-23</div>
                    </div>

                    <div className="border-t border-dashed border-slate-300 pt-2 flex justify-between text-[10px] text-slate-500">
                      <span>{selectedReceipt.date.split(" ")[0]}</span>
                      <span>{selectedReceipt.date.split(" ")[1]}</span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">ID</span>
                        <span className="font-bold">{selectedReceipt.studentId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">O'quvchi</span>
                        <span className="font-bold">{selectedReceipt.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Guruh</span>
                        <span>{selectedReceipt.group}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Kurs narxi</span>
                        <span>{selectedReceipt.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">To'lov turi</span>
                        <span>{selectedReceipt.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ta'sir oyi</span>
                        <span>{selectedReceipt.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">O'qituvchi</span>
                        <span>{selectedReceipt.teacher}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-slate-900 pt-3 text-center space-y-1">
                      <div className="text-[10px] text-slate-500">To'lov miqdori</div>
                      <div className="text-base font-black tracking-tight text-slate-900">
                        {selectedReceipt.amount} UZS
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-300 pt-3 text-center text-[9px] text-slate-400">
                      TO'LOVINGIZ UCHUN RAHMAT :)
                    </div>
                  </div>
                </div>

                {/* Right: Print Dialog Settings (XP-58 Printer) */}
                <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">Печать</h3>
                        <div className="text-[11px] text-slate-400">1 лист бумаги</div>
                      </div>
                      <button
                        onClick={() => setSelectedReceipt(null)}
                        className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-500 mb-1">Принтер</label>
                        <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold outline-hidden">
                          <option>XP-58 (Термопринтер 58мм)</option>
                          <option>XP-80 (Термопринтер 80мм)</option>
                          <option>Сохранить как PDF</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-500 mb-1">Страницы</label>
                        <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-hidden">
                          <option>Все</option>
                          <option>Текущая</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-500 mb-1">Размер бумаги</label>
                        <select className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-hidden">
                          <option>58(48) x 210 mm</option>
                          <option>80 x 297 mm</option>
                          <option>A4</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-500 mb-1">Масштаб</label>
                        <input
                          type="text"
                          defaultValue="82%"
                          className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedReceipt(null)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => {
                        window.print();
                        setSelectedReceipt(null);
                      }}
                      className="px-5 py-2 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                    >
                      Печать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 3. KETISH VA GURUH O'ZGARISHI TAHLILI (1:1 with frame_058) ================= */}
      {subView === "churn" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Ketish va guruh o'zgarishi tahlili
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Saqlab qolishni tahlil qilish, xavflarni aniqlash va LTVni oshirishga yordam beradi
              </div>
            </div>
            <button
              onClick={() => setIsReasonsModalOpen(true)}
              className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>SABABLARNI SOZLASH</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
              <span>Joriy oy</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
              <span>10/01/2026 ~ 10/28/2026</span>
              <X className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
              <span>Barcha filiallar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
              <span>Barcha kurslar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
              <span>Barcha o'qituvchilar</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          {/* 4 KPI Cards matching frame_058 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Ketish koeffitsienti</span>
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                15%
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Ketganlar soni</span>
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                30
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Yo'qotilgan daromad</span>
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                8 925 000.00
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>O'rtacha umr</span>
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                2.3 oy
              </div>
            </div>
          </div>

          {/* 2 Charts matching frame_058 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Ketish dinamikasi */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Ketish dinamikasi
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Oxirgi 30 kun ichida ketgan talabalar soni
                </p>
              </div>

              <div className="relative h-60 w-full pt-4">
                <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                  {/* Grid */}
                  {[0, 45, 90, 135, 180].map((y, i) => (
                    <line key={i} x1="30" y1={y} x2="490" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                  ))}
                  {/* Axis */}
                  <text x="10" y="10" fill="#94a3b8" fontSize="10">8</text>
                  <text x="10" y="55" fill="#94a3b8" fontSize="10">6</text>
                  <text x="10" y="100" fill="#94a3b8" fontSize="10">4</text>
                  <text x="10" y="145" fill="#94a3b8" fontSize="10">2</text>
                  <text x="10" y="180" fill="#94a3b8" fontSize="10">0</text>

                  {/* Dynamic spline curve */}
                  <path
                    d="M 40 180 Q 55 70, 70 80 T 130 180 T 190 180 T 230 40 T 260 100 T 290 50 T 350 180 T 420 180 T 480 180"
                    fill="rgba(93, 95, 239, 0.08)"
                    stroke="#5d5fef"
                    strokeWidth="2.5"
                  />
                  {/* Nodes */}
                  <circle cx="70" cy="80" r="3.5" fill="#5d5fef" />
                  <circle cx="230" cy="40" r="3.5" fill="#5d5fef" />
                  <circle cx="290" cy="50" r="3.5" fill="#5d5fef" />
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>01/10</span>
                <span>06/10</span>
                <span>11/10</span>
                <span>16/10</span>
                <span>21/10</span>
                <span>28/10</span>
              </div>
            </div>

            {/* Right: Asosiy ketish sabablari */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    Asosiy ketish sabablari
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Nima uchun talabalar ketmoqda?</p>
                </div>
                <span className="text-xs font-bold text-slate-500">Jami: 30</span>
              </div>

              {/* Horizontal Bar Chart */}
              <div className="space-y-5 pt-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">QARZI BORLAR</div>
                  <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex items-center">
                    <div className="w-[8%] h-full bg-slate-400 flex items-center px-2 text-[10px] text-white font-bold">
                      1
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">BONUS</div>
                  <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex items-center">
                    <div className="w-[8%] h-full bg-[#ec4899] flex items-center px-2 text-[10px] text-white font-bold">
                      1
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">QORA RO'YXAT</div>
                  <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden flex items-center">
                    <div className="w-[85%] h-full bg-[#f97316] flex items-center px-4 text-xs text-white font-bold justify-between">
                      <span>28</span>
                      <span>93.3%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. BITIRUVCHILAR HISOBOTI (1:1 with frame_060) ================= */}
      {subView === "graduates" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Bitiruvchilar hisoboti
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Bitiruvchilar natijalari va ustozlar samaradorligi tahlili
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>Barcha filiallar</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>2026</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>Barcha oylar</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* 6 Metric Cards matching frame_060 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">NATIJADORLIK</div>
                  <div className="text-[10px] text-slate-400">Bitiruvchilar ko'rsatkichi</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  191 <span className="text-xs font-normal text-slate-400">nafar</span>
                  <span className="text-xs font-bold text-blue-600 ml-2">1.6%</span>
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold">Jami bitiruvchilar</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold text-slate-400 uppercase">ENG YAXSHI USTOZ</div>
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                  ⭐
                </div>
              </div>
              <div className="pt-1">
                <div className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                  Axmadjon teacher
                  <span className="text-[11px] font-bold text-amber-500 ml-1">5.2%</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Eng yuqori natija</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold text-slate-400 uppercase">O'RTACHA IELTS</div>
                <span className="text-emerald-500 text-xs">↗</span>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">6</div>
                <div className="text-[10px] text-blue-600 font-semibold">Batafsil ko'rish</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold text-slate-400 uppercase">O'RTACHA CEFR</div>
                <span className="text-pink-500 text-xs">📖</span>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">0</div>
                <div className="text-[10px] text-blue-600 font-semibold">Batafsil ko'rish</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold text-slate-400 uppercase">OTMGA KIRISH</div>
                <span className="text-amber-500 text-xs">🎓</span>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">0%</div>
                <div className="text-[10px] text-slate-400 font-medium">OTMga kirish darajasi</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-[10px] font-bold text-slate-400 uppercase">ISHGA JOYLAHSHISH</div>
                <span className="text-slate-400 text-xs">💼</span>
              </div>
              <div className="pt-2">
                <div className="text-2xl font-black text-slate-800 dark:text-slate-100">0%</div>
                <div className="text-[10px] text-slate-400 font-medium">Bandlik darajasi</div>
              </div>
            </div>
          </div>

          {/* Detailed Graduates Table matching frame_060 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Batafsil bitiruvchilar ro'yxati
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  191 TALABA
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  ✓ 10 NATIJA
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700">
                  ⚡ 1.6% MUVAFFAQIYAT
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs min-w-[850px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-3 w-10">#</th>
                    <th className="py-3 px-4">F.I.SH</th>
                    <th className="py-3 px-4">GURUH / FILIAL</th>
                    <th className="py-3 px-4">USTOZ</th>
                    <th className="py-3 px-4">BITIRUV SANASI</th>
                    <th className="py-3 px-4">NATIJALAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {[
                    {
                      id: 1,
                      name: "Ne'matjanova Dilafruz",
                      group: "Feruzbek O 4-6",
                      branch: "INCEPTUM FILLIALI",
                      teacher: "Feruzbek teacher",
                      date: "27-10-2026",
                      result: "IELTS 6.5 (CEFR B2)",
                    },
                    {
                      id: 2,
                      name: "Yaxyojonova Imona",
                      group: "Feruzbek E 6-8",
                      branch: "INCEPTUM FILLIALI",
                      teacher: "Feruzbek teacher",
                      date: "23-10-2026",
                      result: "IELTS 7.0 (CEFR C1)",
                    },
                    {
                      id: 3,
                      name: "Sayfiddinova Diora",
                      group: "Ahmadjon E 4-6",
                      branch: "INCEPTUM FILLIALI",
                      teacher: "Axmadjon teacher",
                      date: "20-10-2026",
                      result: "IELTS 7.5 (CEFR C1)",
                    },
                    {
                      id: 4,
                      name: "Qodirjanov Boburbek",
                      group: "Feruzbek E 6-8",
                      branch: "INCEPTUM FILLIALI",
                      teacher: "Feruzbek teacher",
                      date: "15-10-2026",
                      result: "IELTS 6.0",
                    },
                  ].map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 text-slate-400">{row.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {row.group}
                        </div>
                        <div className="text-[10px] text-slate-400">{row.branch}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {row.teacher}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {row.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= 5. HODIMLAR DAVOMATI (1:1 with frame_062) ================= */}
      {subView === "attendance" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Hodimlar davomati boshqaruv paneli
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Xodimlar davomat hisoboti va statistikasi
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>Oktyabr</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>2026</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-8 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-200">
                <span>Barcha filiallar</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* 4 KPI Cards matching frame_062 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Jami hodimlar</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                7
              </div>
              <div className="text-xs text-slate-400">Faol xodimlar soni</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Bugun kelganlar(2026-10-28)</span>
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-3xl font-black text-emerald-600">0</div>
              <div className="text-xs text-slate-400">0% davomat</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Bugun kechikkanlar(2026-10-28)</span>
                <TrendingUp className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-black text-amber-500">0</div>
              <div className="text-xs text-slate-400">0% kechikish</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Bugun kelmaganlar(2026-10-28)</span>
                <AlertCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-3xl font-black text-rose-600">7</div>
              <div className="text-xs text-slate-400">100% yo'qlik</div>
            </div>
          </div>

          {/* Filter subrow & Period tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span>Kun bo'yicha filter</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                <span>28/10/2026</span>
                <X className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 p-1 rounded-xl">
              {[
                { id: "daily", label: "Kunlik" },
                { id: "weekly", label: "Haftalik" },
                { id: "monthly", label: "Oylik" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setAttendanceViewType(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    attendanceViewType === p.id
                      ? "bg-[#5d5fef] text-white"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Attendance Log Table matching frame_062 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5d5fef]" />
              <span>2026-10-28 - Kunlik hisobot (Tanlangan kun uchun davomat ma'lumotlari)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[950px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[11px] uppercase">
                    <th className="py-3 px-3 w-10">T/R</th>
                    <th className="py-3 px-3">HODIM</th>
                    <th className="py-3 px-3">FILIAL</th>
                    <th className="py-3 px-3">KUTILAYOTGAN KIRISH</th>
                    <th className="py-3 px-3">KIRISH VAQTI</th>
                    <th className="py-3 px-3">KUTILAYOTGAN CHIQISH</th>
                    <th className="py-3 px-3">CHIQISH VAQTI</th>
                    <th className="py-3 px-3 text-center">KECHIKISH</th>
                    <th className="py-3 px-3 text-center">ERTA KETISH</th>
                    <th className="py-3 px-3 text-center">ISHLANGAN VAQT</th>
                    <th className="py-3 px-3 text-center">HOLAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {attendanceList.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 text-slate-400">{row.id}</td>
                      <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300">
                        {row.branch}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300">
                        {row.expectedIn}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-400">{row.actualIn}</td>
                      <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-300">
                        {row.expectedOut}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-slate-400">{row.actualOut}</td>
                      <td className="py-3.5 px-3 text-center text-slate-400">{row.late}</td>
                      <td className="py-3.5 px-3 text-center text-slate-400">{row.earlyLeave}</td>
                      <td className="py-3.5 px-3 text-center text-slate-400">{row.worked}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= 6. MARKAZ FAOLIYATI STATISTIKASI (1:1 with frame_066) ================= */}
      {subView === "statistics" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Markaz faoliyati statistikasi
            </h1>
            <button className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer uppercase tracking-wider">
              <Settings className="w-3.5 h-3.5" />
              <span>XONA SIG'IMLARINI YANGILASH</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span>INCEPTUM Filiali</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span>2026</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="h-9 px-3 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                <span>Oktabr</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            <div className="h-9 px-3.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-[#5d5fef]" />
              <span className="font-semibold">Oktabr 2026 (2026-10-01 - 2026-10-31)</span>
            </div>
          </div>

          {/* 6 KPI Cards matching frame_066 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                12.21%
              </div>
              <div className="text-xs text-slate-500 font-medium">Markaz foydaliligi</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                1032 soat
              </div>
              <div className="text-xs text-slate-500 font-medium">Bo'sh vaqtlar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                170
              </div>
              <div className="text-xs text-slate-500 font-medium">Amaldagi o'quvchilar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-lg font-black text-slate-900 dark:text-slate-100">
                49 950 000 UZS
              </div>
              <div className="text-xs text-slate-500 font-medium">Potensial qo'shimcha</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                242
              </div>
              <div className="text-xs text-slate-500 font-medium">Bo'sh o'rinlar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                19 747
              </div>
              <div className="text-xs text-slate-500 font-medium">Yana o'qishi mumkin</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1">To'liqroq ma'lumot</div>
            </div>
          </div>

          {/* Room Capacity Matrix Table matching frame_066 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[1100px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[11px] uppercase">
                    <th className="py-3 px-3">XONALAR ⇅</th>
                    <th className="py-3 px-3">SIG'IM ⇅</th>
                    <th className="py-3 px-3">ISH VAQTI ⇅</th>
                    <th className="py-3 px-3">GURUHLAR ⇅</th>
                    <th className="py-3 px-3 text-center">O'QUVCHILAR ⇅</th>
                    <th className="py-3 px-3 text-center">BO'SH O'RIN ⇅</th>
                    <th className="py-3 px-3 text-center">DARS SOATI ⇅</th>
                    <th className="py-3 px-3">KURS NARXI ⇅</th>
                    <th className="py-3 px-3">JAMI SUMMA ⇅</th>
                    <th className="py-3 px-3">BO'SH VAQT ⇅</th>
                    <th className="py-3 px-3">O'RINSOAT ⇅</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                  {/* Feruz 1-xona */}
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100" rowSpan={3}>
                      FERUZ 1-xona
                    </td>
                    <td className="py-3.5 px-3" rowSpan={3}>24</td>
                    <td className="py-3.5 px-3 font-mono" rowSpan={3}>288.00</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-100">
                      Feruzbek E 4-6
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-600 bg-amber-50/50 dark:bg-amber-950/20">
                      15
                    </td>
                    <td className="py-3.5 px-3 text-center">9</td>
                    <td className="py-3.5 px-3 text-center font-mono">24.00</td>
                    <td className="py-3.5 px-3 font-mono">250 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono font-bold">3 750 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono">216.00</td>
                    <td className="py-3.5 px-3 font-mono">360</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-100">
                      Feruzbek E 6-8
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-600 bg-amber-50/50 dark:bg-amber-950/20">
                      11
                    </td>
                    <td className="py-3.5 px-3 text-center">13</td>
                    <td className="py-3.5 px-3 text-center font-mono">24.00</td>
                    <td className="py-3.5 px-3 font-mono">300 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono font-bold">3 300 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono">—</td>
                    <td className="py-3.5 px-3 font-mono">264</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-100">
                      Feruzbek O 4-6
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-600 bg-amber-50/50 dark:bg-amber-950/20">
                      18
                    </td>
                    <td className="py-3.5 px-3 text-center">6</td>
                    <td className="py-3.5 px-3 text-center font-mono">24.00</td>
                    <td className="py-3.5 px-3 font-mono">300 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono font-bold">5 400 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono">—</td>
                    <td className="py-3.5 px-3 font-mono">432</td>
                  </tr>

                  {/* Gulasal 2-xona */}
                  <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 border-t-2 border-slate-200 dark:border-slate-700">
                    <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-100">
                      GULASAL 2-xona
                    </td>
                    <td className="py-3.5 px-3">20</td>
                    <td className="py-3.5 px-3 font-mono">288.00</td>
                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-100">
                      Gulasal E 2-4
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-amber-600 bg-amber-50/50 dark:bg-amber-950/20">
                      10
                    </td>
                    <td className="py-3.5 px-3 text-center">10</td>
                    <td className="py-3.5 px-3 text-center font-mono">24.00</td>
                    <td className="py-3.5 px-3 font-mono">350 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono font-bold">3 500 000 UZS</td>
                    <td className="py-3.5 px-3 font-mono">192.00</td>
                    <td className="py-3.5 px-3 font-mono">240</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= 7. COINLAR HISOBOTI (1:1 with sec_0190) ================= */}
      {subView === "coins" && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Coinlar hisoboti
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Coin tizimi reytingi va boshqaruvi
              </div>
            </div>
          </div>

          {/* 4 KPI Cards matching sec_0190 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">0</span>
                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Gift className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">Jami berilgan coinlar</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">0</span>
                <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <ShoppingBag className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">Jami ishlatilgan coinlar</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">0</span>
                <span className="p-2 rounded-lg bg-sky-50 text-sky-600">
                  <Coins className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">Marketplace xaridlari</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-slate-100">0</span>
                <span className="p-2 rounded-lg bg-purple-50 text-purple-600">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">Coinli faol o'quvchilar</div>
            </div>
          </div>

          {/* Subtabs matching sec_0190 */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setCoinsSubTab("REYTING")}
              className={`pb-3 cursor-pointer transition-colors relative ${
                coinsSubTab === "REYTING"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              REYTING
            </button>
            <button
              onClick={() => setCoinsSubTab("MARKETPLACE")}
              className={`pb-3 cursor-pointer transition-colors relative ${
                coinsSubTab === "MARKETPLACE"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              MARKETPLACE
            </button>
            <button
              onClick={() => setCoinsSubTab("REQUESTS")}
              className={`pb-3 cursor-pointer transition-colors relative ${
                coinsSubTab === "REQUESTS"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              XARID SO'ROVLARI
            </button>
          </div>

          {/* Content based on subtab */}
          {coinsSubTab === "REYTING" && (
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">O'QUVCHI</th>
                    <th className="py-3 px-4">GURUHI</th>
                    <th className="py-3 px-4">TOPLANGAN COINLAR</th>
                    <th className="py-3 px-4">DARAJASI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {[
                    { id: 1, name: "Abduhalilov Sardorbek", group: "Feruzbek O 4-6", coins: 850, level: "Gold" },
                    { id: 2, name: "Sayfiddinova Diora", group: "Ahmadjon E 4-6", coins: 720, level: "Silver" },
                    { id: 3, name: "Yusufjanov Javohir", group: "Ahmadjon E 4-6", coins: 640, level: "Silver" },
                    { id: 4, name: "Abdurashidov Shoxrux", group: "Ahmadjon E 4-6", coins: 510, level: "Bronze" },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-slate-400">{row.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">{row.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{row.group}</td>
                      <td className="py-3 px-4 font-black text-amber-500 font-mono">+{row.coins} coin</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                          {row.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {coinsSubTab === "MARKETPLACE" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Kitob: English Grammar in Use", cost: 150, left: 12, cat: "Kitoblar" },
                { title: "Inceptum Brend Bloknot & Ruchka", cost: 80, left: 25, cat: "Merch" },
                { title: "Inceptum Hoodie (Svitshot)", cost: 450, left: 5, cat: "Kiyim" },
                { title: "Bepul 1 haftalik speaking klub", cost: 200, left: 50, cat: "Kupon" },
              ].map((p, i) => (
                <div key={i} className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3">
                  <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-4xl">
                    🎁
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600">{p.cat}</span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-1">{p.title}</h4>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-black text-amber-500 text-base">{p.cost} coin</span>
                    <span className="text-[11px] text-slate-400">{p.left} ta qoldi</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {coinsSubTab === "REQUESTS" && (
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <div className="text-sm font-semibold">Hozircha xarid so'rovlari mavjud emas</div>
            </div>
          )}
        </div>
      )}

      {/* ================= 8. LIDLAR HISOBOTI (1:1 with frame_064 & sec_0193-0195) ================= */}
      {subView === "leads" && (
        <div className="space-y-6">
          {/* Header Title + Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Lidlar hisoboti
              </h1>
              <span className="p-1 rounded-md bg-[#5d5fef]/10 text-[#5d5fef]">
                <Calendar className="w-4 h-4" />
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={leadRepYear}
                onChange={(e) => setLeadRepYear(e.target.value)}
                className="h-8 px-2.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>

              <select
                value={leadRepMonth}
                onChange={(e) => setLeadRepMonth(e.target.value)}
                className="h-8 px-2.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="Oktyabr">Oktyabr</option>
                <option value="Sentyabr">Sentyabr</option>
                <option value="Avgust">Avgust</option>
              </select>

              <input
                type="date"
                defaultValue="2026-10-28"
                className="h-8 px-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-xs outline-hidden"
              />

              <select
                value={leadRepBranch}
                onChange={(e) => setLeadRepBranch(e.target.value)}
                className="h-8 px-2.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="INCEPTUM Filliali">INCEPTUM Filliali</option>
                <option value="Chilonzor filiali">Chilonzor filiali</option>
              </select>

              <select className="h-8 px-2.5 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer">
                <option value="">Manba</option>
                <option value="telegram">Telegram</option>
                <option value="instagram">Instagram</option>
                <option value="banner">Banner</option>
              </select>
            </div>
          </div>

          {/* 5 KPI Cards matching sec_0193 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                  ↓ -72%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">7</div>
              <div className="text-xs text-slate-400">Yangi lidlar</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                  ↓ -68%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">14 %</div>
              <div className="text-xs text-slate-400">Konversiya stavkasi</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs flex flex-col justify-center items-center text-center">
              <span className="px-2.5 py-1 rounded-lg bg-[#5d5fef] text-white text-[11px] font-bold shadow-xs">
                Ma'lumot yetarli emas
              </span>
              <div className="text-xs text-slate-400 mt-2">O'rtacha bitim vaqti</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                  ↓ -61%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">o'zi: 7</div>
              <div className="text-xs text-slate-400">To'lov qilganlar</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  ↑ -91%
                </span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                Imron Erkinov: 1
              </div>
              <div className="text-xs text-slate-400">Eng faol sotuvchi</div>
            </div>
          </div>

          {/* 2 Charts Side-by-side matching sec_0193 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sotuv voronkasi */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Sotuv voronkasi
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { stage: "Yangi lidlar", count: 7, pct: 100, color: "bg-[#5d5fef]" },
                  { stage: "Bog'lanildi", count: 4, pct: 57, color: "bg-indigo-400" },
                  { stage: "Sinov darsiga yozildi", count: 2, pct: 28, color: "bg-amber-400" },
                  { stage: "To'lov qildi", count: 1, pct: 14, color: "bg-emerald-500" },
                ].map((s) => (
                  <div key={s.stage} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{s.stage}</span>
                      <span className="text-slate-500">{s.count} ta ({s.pct}%)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${s.color} rounded-full transition-all duration-500`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Yil kesimida lidlar soni */}
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Yil kesimida lidlar soni
              </div>
              <div className="h-48 flex items-end justify-between gap-1 pt-6 px-2">
                {[
                  { m: "Yan", c: 0 },
                  { m: "Fev", c: 0 },
                  { m: "Mar", c: 0 },
                  { m: "Apr", c: 0 },
                  { m: "May", c: 0 },
                  { m: "Iyun", c: 0 },
                  { m: "Iyul", c: 0 },
                  { m: "Avg", c: 0 },
                  { m: "Sen", c: 0 },
                  { m: "Okt", c: 8 },
                  { m: "Noy", c: 0 },
                  { m: "Dek", c: 0 },
                ].map((bar) => {
                  const height = bar.c > 0 ? (bar.c / 8) * 120 : 6;
                  return (
                    <div key={bar.m} className="flex-1 flex flex-col items-center gap-1.5">
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        {bar.c > 0 ? bar.c : ""}
                      </span>
                      <div
                        style={{ height: `${height}px` }}
                        className={`w-full max-w-[24px] rounded-t-md transition-all ${
                          bar.c > 0 ? "bg-[#5d5fef]" : "bg-slate-100 dark:bg-slate-800"
                        }`}
                      />
                      <span className="text-[10px] text-slate-400">{bar.m}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Table 1: Sotuvchilar ro'yxati matching sec_0194 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 font-bold text-sm text-slate-800 dark:text-slate-100">
              Sotuvchilar ro'yxati
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">ISM</th>
                  <th className="py-3 px-4">TELEFON RAQAM</th>
                  <th className="py-3 px-4 text-center">LIDLAR SONI</th>
                  <th className="py-3 px-4 text-center">SOTUVLAR SONI</th>
                  <th className="py-3 px-4 text-center">TO'LOV QILGANLAR SONI</th>
                  <th className="py-3 px-4 text-center">YO'QOTILGAN LIDLAR SONI</th>
                  <th className="py-3 px-4">KONVERSIYA STAVKASI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-slate-400">1</td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">Imron Erkinov</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">+998993240223</td>
                  <td className="py-3 px-4 text-center font-bold">8</td>
                  <td className="py-3 px-4 text-center font-bold">1</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-400">0</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-400">1</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-500">12%</span>
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="w-[12%] h-full bg-rose-500 rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Lidlar ro'yxati matching sec_0195 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-2xs overflow-hidden space-y-3 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                Lidlar ro'yxati
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg">
                  Barcha lidlar - 8 ta
                </span>
                <button className="h-8 px-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>EXCEL</span>
                </button>
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Lidlarni qidiring..."
                  value={leadRepSearch}
                  onChange={(e) => setLeadRepSearch(e.target.value)}
                  className="w-full h-8 pl-8 pr-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden text-slate-800 dark:text-slate-200 text-xs"
                />
              </div>

              <select
                value={leadRepStatus}
                onChange={(e) => setLeadRepStatus(e.target.value)}
                className="h-8 px-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="Barcha holatlar">Barcha holatlar</option>
                <option value="Yangi">Yangi</option>
                <option value="Bog'lanildi">Bog'lanildi</option>
              </select>

              <select
                value={leadRepAdmin}
                onChange={(e) => setLeadRepAdmin(e.target.value)}
                className="h-8 px-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="Barcha adminlar">Barcha adminlar</option>
                <option value="Imron Erkinov">Imron Erkinov</option>
              </select>

              <select
                value={leadRepTemp}
                onChange={(e) => setLeadRepTemp(e.target.value)}
                className="h-8 px-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
              >
                <option value="Barcha haroratlar">Barcha haroratlar</option>
                <option value="Issiq">Issiq</option>
                <option value="Iliq">Iliq</option>
                <option value="Muz">Muz</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">ISM</th>
                    <th className="py-2.5 px-3">TELEFON RAQAM</th>
                    <th className="py-2.5 px-3">ADMIN</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3">HARORAT</th>
                    <th className="py-2.5 px-3">KURS</th>
                    <th className="py-2.5 px-3">RO'YXATDAN O'TGAN YO'NALISH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {[
                    { id: 1, name: "Sobirov Oybek", phone: "+998500050512", admin: "Imron Erkinov", status: "Yangi", temp: "Issiq", course: "—", source: "—" },
                    { id: 2, name: "Rustamov Firdavs", phone: "+998951547262", admin: "Imron Erkinov", status: "Yangi", temp: "Issiq", course: "—", source: "—" },
                    { id: 3, name: "Najmiddinova Dilnoza", phone: "+998941503736", admin: "Imron Erkinov", status: "Yangi", temp: "Issiq", course: "—", source: "—" },
                    { id: 4, name: "Karimova Rayhona", phone: "+998901234567", admin: "Imron Erkinov", status: "Yangi", temp: "Iliq", course: "IELTS", source: "Telegram" },
                    { id: 5, name: "Toshmatov Bobur", phone: "+998937654321", admin: "Imron Erkinov", status: "Bog'lanildi", temp: "Issiq", course: "General English", source: "Instagram" },
                  ].map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 px-3 text-slate-400">{lead.id}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-100">{lead.name}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-300">{lead.phone}</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{lead.admin}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5d5fef]/10 text-[#5d5fef]">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.temp === "Issiq"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}>
                          {lead.temp}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{lead.course}</td>
                      <td className="py-2.5 px-3 text-slate-500">{lead.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= 9. O'QUVCHILAR HISOBOTI (1:1 with sec_0200-0202) ================= */}
      {subView === "students_report" && (
        <div className="space-y-6">
          {/* 6 KPI Cards matching sec_0200 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Users className="w-4 h-4 text-[#5d5fef]" />
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  ↑ 16%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">170</div>
              <div className="text-xs text-slate-400">Jami o'quvchilar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">20</div>
              <div className="text-xs text-slate-400">Yangi qo'shilgan o'quvchilar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  ↓ 0%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">0</div>
              <div className="text-xs text-slate-400">2 va undan ortiq kursda o'qiyotganlar</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  ↑ 7%
                </span>
              </div>
              <div className="text-2xl font-black text-emerald-600">76.8%</div>
              <div className="text-xs text-slate-400">Umumiy davomat</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  ↓ 0%
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">0</div>
              <div className="text-xs text-slate-400">O'rtacha baho</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <Smartphone className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                  ↑ 0%
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">0 ta (0.0%)</div>
              <div className="text-xs text-slate-400">Ilovadan foydalanish</div>
              <div className="text-[10px] text-[#5d5fef] font-semibold pt-1 cursor-pointer">
                To'liqroq ma'lumot
              </div>
            </div>
          </div>

          {/* Subtabs matching sec_0200 */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setStudRepTab("DAVOMAT")}
              className={`pb-3 cursor-pointer transition-colors relative ${
                studRepTab === "DAVOMAT"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              DAVOMATLAR HISOBOTI
            </button>
            <button
              onClick={() => setStudRepTab("OZLASHTIRISH")}
              className={`pb-3 cursor-pointer transition-colors relative ${
                studRepTab === "OZLASHTIRISH"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              O'ZLASHTIRISH DARAJASI
            </button>
          </div>

          {/* Davomatlar hisoboti Card */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Davomatlar hisoboti
              </h2>
              <div className="text-xs text-slate-400 mt-0.5">
                Guruhlar bo'yicha davomatlar ma'lumotlari
              </div>
            </div>

            {/* Filter row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Yil</label>
                <select
                  value={studRepYear}
                  onChange={(e) => setStudRepYear(e.target.value)}
                  className="w-full h-8 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Oy</label>
                <select
                  value={studRepMonth}
                  onChange={(e) => setStudRepMonth(e.target.value)}
                  className="w-full h-8 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden"
                >
                  <option value="Oktyabr">Oktyabr</option>
                  <option value="Sentyabr">Sentyabr</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-[10px] text-slate-400 block mb-0.5">Sana oralig'i</label>
                <div className="h-8 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between text-slate-700 dark:text-slate-200">
                  <span>2026-10-27 ~ 2026-10-28</span>
                  <X className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Guruhlar</label>
                <select
                  value={studRepGroup}
                  onChange={(e) => setStudRepGroup(e.target.value)}
                  className="w-full h-8 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden"
                >
                  <option value="Guruhlar">Guruhlar</option>
                  <option value="Feruzbek O 4-6">Feruzbek O 4-6</option>
                  <option value="Ahmadjon E 4-6">Ahmadjon E 4-6</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">O'qituvchilar</label>
                <select
                  value={studRepTeacher}
                  onChange={(e) => setStudRepTeacher(e.target.value)}
                  className="w-full h-8 px-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden"
                >
                  <option value="Barcha o'qituvchilar">Barcha o'qituvchilar</option>
                  <option value="Feruzbek teacher">Feruzbek teacher</option>
                  <option value="Ahmadjon teacher">Ahmadjon teacher</option>
                </select>
              </div>
            </div>

            {/* 4 Summary boxes matching sec_0200 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Jami davomat qilinishi kerak edi
                </div>
                <div className="text-2xl font-black text-[#5d5fef] mt-1">170</div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3.5 text-center">
                <div className="text-xs text-emerald-600">Kelgan</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">145</div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3.5 text-center">
                <div className="text-xs text-rose-500">Kelmagan</div>
                <div className="text-2xl font-black text-rose-500 mt-1">25</div>
              </div>

              <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-xl p-3.5 text-center">
                <div className="text-xs text-slate-500">Davomat qilinmagan</div>
                <div className="text-2xl font-black text-slate-700 dark:text-slate-300 mt-1">0</div>
              </div>
            </div>

            {/* Attendance Table matching sec_0201 - sec_0202 */}
            <div className="overflow-x-auto pt-3">
              <table className="w-full text-left text-xs min-w-[750px]">
                <thead>
                  <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px]">
                    <th className="py-3 px-3 w-12">№</th>
                    <th className="py-3 px-3">Guruh nomi</th>
                    <th className="py-3 px-3">O'qituvchi F.I.O</th>
                    <th className="py-3 px-3 text-center">Talabalar soni</th>
                    <th className="py-3 px-3 text-center">Qilinmagan davomatlar</th>
                    <th className="py-3 px-3 text-center">Darsga kelmaganlar</th>
                    <th className="py-3 px-3 text-center">Darsga kelganlar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 font-medium text-xs">
                      Ma'lumot mavjud emas
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-amber-50/70 dark:bg-amber-950/20 font-bold text-slate-700 dark:text-slate-200 border-t border-amber-200/80">
                    <td className="py-2.5 px-3">Jami</td>
                    <td className="py-2.5 px-3">0</td>
                    <td className="py-2.5 px-3">0.00</td>
                    <td className="py-2.5 px-3 text-center">0</td>
                    <td className="py-2.5 px-3 text-center">0</td>
                    <td className="py-2.5 px-3 text-center">0</td>
                    <td className="py-2.5 px-3 text-center">0.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
