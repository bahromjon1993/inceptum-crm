import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Plus,
  MoreVertical,
  User,
  X,
  Phone,
  Calendar,
  Camera,
  RefreshCw,
  HelpCircle,
  Building,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Check,
  Search,
} from "lucide-react";
import { useMasking } from "../context/MaskingContext";
import { apiClient } from "../api/client";

interface TeacherItem {
  id: number;
  name: string;
  phone: string;
  baseSalary: string;
  sharePercent: string;
  lessonRate: string;
  birthDate: string;
  hiredDate: string;
  gender?: "Erkak" | "Ayol";
  salaryType?: "Foiz" | "Oylik" | "Dars haqi" | "Talaba ulushi";
  salaryValue?: string;
  groupsCount?: number;
  studentsCount?: number;
}

export function MentorsPage() {
  const { isMasked } = useMasking();
  const [activeTab, setActiveTab] = useState<"TEACHERS" | "SUPPORT">("TEACHERS");
  const [showArchive, setShowArchive] = useState(false);

  // Exact 1:1 teachers list matching video frame_005
  const [teachers, setTeachers] = useState<TeacherItem[]>([
    {
      id: 1,
      name: "Gulasal teacher",
      phone: "+998940167500",
      baseSalary: "*****",
      sharePercent: "- %",
      lessonRate: "- so'm",
      birthDate: "2026-06-03",
      hiredDate: "2026-06-01",
      gender: "Ayol",
      groupsCount: 4,
      studentsCount: 29,
    },
    {
      id: 2,
      name: "Axmadjon teacher",
      phone: "+998931790214",
      baseSalary: "*****",
      sharePercent: "- %",
      lessonRate: "- so'm",
      birthDate: "2026-06-03",
      hiredDate: "2026-06-01",
      gender: "Erkak",
      groupsCount: 3,
      studentsCount: 22,
    },
    {
      id: 3,
      name: "Marjona teacher",
      phone: "+998946663537",
      baseSalary: "*****",
      sharePercent: "- %",
      lessonRate: "- so'm",
      birthDate: "2026-06-03",
      hiredDate: "2026-06-01",
      gender: "Ayol",
      groupsCount: 3,
      studentsCount: 18,
    },
    {
      id: 4,
      name: "Feruzbek teacher",
      phone: "+998938141440",
      baseSalary: "*****",
      sharePercent: "- %",
      lessonRate: "- so'm",
      birthDate: "1999-11-08",
      hiredDate: "2026-06-01",
      gender: "Erkak",
      groupsCount: 4,
      studentsCount: 25,
    },
  ]);

  // Selected teacher for profile view matching video frame_006
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);

  // Slide-over drawer state matching video frame_004
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [smsMessage, setSmsMessage] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states matching video frame_004 exactly
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("+998 ");
  const [formBirthDate, setFormBirthDate] = useState("2026-10-28");
  const [formHiredDate, setFormHiredDate] = useState("2026-10-28");
  const [salaryMethod, setSalaryMethod] = useState<"Foiz" | "Oylik" | "Dars haqi" | "Talaba ulushi">("Foiz");
  const [salaryValue, setSalaryValue] = useState("0");
  const [gender, setGender] = useState<"Erkak" | "Ayol">("Erkak");
  const [password, setPassword] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pass = "";
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const handleOpenDrawer = () => {
    setFormName("");
    setFormPhone("+998 ");
    setFormBirthDate("2026-10-28");
    setFormHiredDate("2026-10-28");
    setSalaryMethod("Foiz");
    setSalaryValue("0");
    setGender("Erkak");
    generatePassword();
    setIsDrawerOpen(true);
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newTeacher: TeacherItem = {
      id: teachers.length + 1,
      name: formName.trim(),
      phone: formPhone.trim(),
      baseSalary: salaryMethod === "Oylik" ? `${Number(salaryValue).toLocaleString()} so'm` : "*****",
      sharePercent: salaryMethod === "Foiz" ? `${salaryValue} %` : "- %",
      lessonRate: salaryMethod === "Dars haqi" ? `${Number(salaryValue).toLocaleString()} so'm` : "- so'm",
      birthDate: formBirthDate,
      hiredDate: formHiredDate,
      gender: gender,
      salaryType: salaryMethod,
      salaryValue: salaryValue,
      groupsCount: 0,
      studentsCount: 0,
    };

    setTeachers([...teachers, newTeacher]);
    setIsDrawerOpen(false);
    showToast("Yangi o'qituvchi muvaffaqiyatli saqlandi!");

    // Also sync to backend API in background
    try {
      await apiClient.post("/teachers/", {
        name: formName.trim(),
        phone: formPhone.trim(),
        subject: "General English",
        branch: 1,
        salary_type: salaryMethod === "Foiz" ? "PERCENTAGE" : salaryMethod === "Oylik" ? "FIXED" : "HOURLY",
        salary_rate: parseFloat(salaryValue) || 0,
        is_active: true,
      });
    } catch {
      // offline fallback
    }
  };

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    setSmsSent(true);
    setTimeout(() => {
      setSmsSent(false);
      setIsSmsModalOpen(false);
      setSmsMessage("");
      showToast("SMS barcha o'qituvchilarga yuborildi!");
    }, 1200);
  };

  // ================= VIEW: TEACHER PROFILE DETAILS (Video frame_006) =================
  if (selectedTeacher) {
    return (
      <div className="space-y-6 pb-12 select-none animate-in fade-in duration-150">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedTeacher(null)}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orqaga</span>
          </button>
          <div className="text-xs text-slate-400">
            Mentorlar / <span className="text-slate-800 font-semibold">{selectedTeacher.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left card: Teacher profile details (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-6">
            <h2 className="font-bold text-slate-800 text-sm">O'qituvchi ma'lumotlari</h2>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-[#5d5fef] text-white flex items-center justify-center font-bold text-2xl shadow-md">
                {selectedTeacher.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold text-slate-900">{selectedTeacher.name}</h3>
            </div>

            <div className="space-y-3.5 text-xs border-t border-slate-100 pt-4 text-slate-600">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Ro'yxatdan o'tgan sana:</span>
                <span className="font-semibold text-slate-800 ml-auto">01 Iyun 2026</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Filial:</span>
                <span className="font-semibold text-slate-800 ml-auto">INCEPTUM Filliali</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                <span>O'qitayotgan kurslar soni:</span>
                <span className="font-semibold text-slate-800 ml-auto">3</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Faol guruhlar soni:</span>
                <span className="font-semibold text-slate-800 ml-auto">{selectedTeacher.groupsCount || 4}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Faol o'quvchilar soni:</span>
                <span className="font-semibold text-slate-800 ml-auto">{selectedTeacher.studentsCount || 29}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Reyting:</span>
                <span className="text-slate-400 ml-auto italic">Hali baholar yo'q</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="text-slate-400 font-semibold">Kontakt</div>
              <div className="flex items-center gap-2 text-slate-800 font-mono font-medium">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{selectedTeacher.phone}</span>
              </div>
            </div>
          </div>

          {/* Right card: Groups list (8 cols) matching video frame_006 */}
          <div className="lg:col-span-8 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-bold text-slate-800 text-sm">Guruhlar</h2>
              <div className="flex items-center gap-2">
                <div className="w-9 h-5 rounded-full p-0.5 bg-slate-300 transition-colors cursor-pointer">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
                <span className="text-xs text-slate-500 font-medium">Arxiv</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-500">Barcha guruhlar</div>

            {/* Exact group cards from frame_006 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Gulasal E 4-6",
                  level: "Beginner",
                  dates: "23 Iyul 2026 - 16:00 / 18:00",
                  room: "GULASAL 2-xona-xona",
                  days: "Seshanba, Payshanba, Shanba",
                  total: 10,
                  active: 10,
                  trial: 0,
                  dur: "3 oy",
                },
                {
                  name: "Gulasal O 6-8",
                  level: "Pre-IELTS 2",
                  dates: "01 Iyul 2026 - 18:00 / 20:00",
                  room: "GULASAL 2-xona-xona",
                  days: "Dushanba, Chorshanba, Juma",
                  total: 3,
                  active: 3,
                  trial: 0,
                  dur: "4 oy",
                },
                {
                  name: "Gulasal O 4-6",
                  level: "IELTS Graduation",
                  dates: "01 Iyul 2026 - 16:00 / 18:00",
                  room: "GULASAL 2-xona-xona",
                  days: "Dushanba, Chorshanba, Juma",
                  total: 6,
                  active: 6,
                  trial: 0,
                  dur: "6 oy",
                },
                {
                  name: "Gulasal E 2-4",
                  level: "Pre-IELTS 2",
                  dates: "11 Oktabr 2026 - 14:00 / 16:00",
                  room: "GULASAL 2-xona-xona",
                  days: "Seshanba, Payshanba, Shanba",
                  total: 10,
                  active: 10,
                  trial: 0,
                  dur: "4 oy",
                },
              ].map((g) => (
                <div
                  key={g.name}
                  className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-[#5d5fef]/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-800">{g.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                      {g.level}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{g.dates}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{g.room}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{g.days}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] font-semibold">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Jami: {g.total}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200">
                      Faol: {g.active}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      Sinov: {g.trial}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 ml-auto">
                      {g.dur}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN VIEW: TEACHERS LIST (Video frame_005) =================
  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 text-xs font-semibold">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Row matching video frame_005 */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800">Mentorlar</h1>
            <span className="w-6 h-6 rounded-full border border-[#5d5fef] text-[#5d5fef] text-xs font-bold flex items-center justify-center">
              {teachers.length}
            </span>
          </div>

          {/* Arxiv switch */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setShowArchive(!showArchive)}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                showArchive ? "bg-[#5d5fef]" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  showArchive ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-xs text-slate-600 font-medium">Arxiv</span>
          </div>
        </div>

        {/* Buttons matching video frame_005 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSmsModalOpen(true)}
            className="h-9 px-4 bg-white hover:bg-amber-50/50 border border-amber-500/60 text-amber-600 text-xs font-bold tracking-wider rounded-lg shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
            SMS YUBORISH
          </button>

          <button
            onClick={handleOpenDrawer}
            className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold tracking-wider rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            YANGI QO'SHISH
          </button>
        </div>
      </div>

      {/* Sub Tabs matching video frame_005: O'QITUVCHILAR / SUPPORT O'QITUVCHILAR */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("TEACHERS")}
          className={`pb-3 text-xs font-bold tracking-wider relative cursor-pointer ${
            activeTab === "TEACHERS"
              ? "text-[#5d5fef]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          O'QITUVCHILAR
          {activeTab === "TEACHERS" && (
            <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#5d5fef]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("SUPPORT")}
          className={`pb-3 text-xs font-bold tracking-wider relative cursor-pointer ${
            activeTab === "SUPPORT"
              ? "text-[#5d5fef]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          SUPPORT O'QITUVCHILAR
          {activeTab === "SUPPORT" && (
            <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#5d5fef]" />
          )}
        </button>
      </div>

      {/* Teachers Table Card 1:1 with video frame_005 */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-600 font-semibold bg-[#fafafa]">
                <th className="py-3.5 px-4 w-12">ID</th>
                <th className="py-3.5 px-3 w-16">Rasm</th>
                <th className="py-3.5 px-4">Ism familiya</th>
                <th className="py-3.5 px-4">Telefon raqam</th>
                <th className="py-3.5 px-4">Doimiy oylik</th>
                <th className="py-3.5 px-4">Foiz ulush (%)</th>
                <th className="py-3.5 px-4">Dars haqi</th>
                <th className="py-3.5 px-4">Tug'ilgan sana</th>
                <th className="py-3.5 px-4">Ishga olingan sana</th>
                <th className="py-3.5 px-4 text-center w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {teacher.id}.
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-500">
                      <User className="w-4 h-4" />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 hover:text-[#5d5fef]">
                    {teacher.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono font-medium">
                    {teacher.phone}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {isMasked ? "*****" : teacher.baseSalary}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {teacher.sharePercent}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {teacher.lessonRate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {teacher.birthDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {teacher.hiredDate}
                  </td>
                  <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= 1:1 SLIDE-OVER DRAWER: O'QITUVCHI QO'SHISH (Video frame_004) ================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[430px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-800">O'qituvchi qo'shish</h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Exact fields from frame_004 */}
              <form onSubmit={handleSaveTeacher} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
                {/* 1. Rasm yuklash bloki matching frame_004 */}
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-[#e6f8fa] border-2 border-dashed border-[#84d9e5] rounded-2xl flex flex-col items-center justify-center text-[#1ba4b8] hover:bg-[#d8f4f7] transition-colors cursor-pointer group">
                    <Camera className="w-7 h-7 text-[#1ba4b8] group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* 2. Ism familiya input */}
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Ism familiya</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ism familiya"
                    className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>

                {/* 3. Telefon raqam input */}
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Telefon raqam</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+998 XX XXX XX XX"
                    className="w-full p-2.5 font-mono border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>

                {/* 4. Tug'ilgan sana */}
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Tug'ilgan sana</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formBirthDate}
                      onChange={(e) => setFormBirthDate(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    />
                  </div>
                </div>

                {/* 5. Ishga olingan sana */}
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Ishga olingan sana</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formHiredDate}
                      onChange={(e) => setFormHiredDate(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    />
                  </div>
                </div>

                {/* 6. Maosh hisoblash usuli (?) matching frame_004 */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <span>Maosh hisoblash usuli</span>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  {/* 4 Tabs switcher */}
                  <div className="grid grid-cols-4 p-1 bg-slate-100 rounded-lg text-center text-[11px] font-semibold text-slate-600">
                    {(["Foiz", "Oylik", "Dars haqi", "Talaba ulushi"] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setSalaryMethod(method)}
                        className={`py-1.5 rounded-md transition-all cursor-pointer ${
                          salaryMethod === method
                            ? "bg-[#ede9fe] text-[#5d5fef] font-bold shadow-2xs"
                            : "hover:text-slate-900"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {/* Dinamik input matching frame_004 */}
                  <div className="pt-1">
                    <div className="flex items-center gap-1 text-slate-500 mb-1">
                      <HelpCircle className="w-3 h-3 text-slate-400" />
                      <span>
                        {salaryMethod === "Foiz"
                          ? "Foiz ulushi"
                          : salaryMethod === "Oylik"
                          ? "Oylik maosh"
                          : salaryMethod === "Dars haqi"
                          ? "Dars haqi"
                          : "Har bir talabadan ulush"}
                      </span>
                    </div>
                    <input
                      type="number"
                      value={salaryValue}
                      onChange={(e) => setSalaryValue(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef] font-semibold text-slate-800"
                      required
                    />
                  </div>
                </div>

                {/* 7. Jinsini tanlang matching frame_004 */}
                <div className="space-y-2 pt-1">
                  <label className="block text-slate-600 font-medium">Jinsini tanlang</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                      <input
                        type="radio"
                        name="gender"
                        value="Erkak"
                        checked={gender === "Erkak"}
                        onChange={() => setGender("Erkak")}
                        className="text-[#5d5fef] focus:ring-[#5d5fef]"
                      />
                      <span>Erkak</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                      <input
                        type="radio"
                        name="gender"
                        value="Ayol"
                        checked={gender === "Ayol"}
                        onChange={() => setGender("Ayol")}
                        className="text-[#5d5fef] focus:ring-[#5d5fef]"
                      />
                      <span>Ayol</span>
                    </label>
                  </div>
                </div>

                {/* 8. Parol matching frame_004 */}
                <div className="space-y-1 pt-1">
                  <label className="block text-slate-500 font-medium">Parol</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Parol"
                      className="w-full p-2.5 pr-10 border border-slate-300 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono"
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      title="Tasodifiy parol generatsiya qilish"
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-[#5d5fef] p-0.5 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 9. Pastki Saqlash tugmasi matching frame_004 */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    SAQLASH
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ================= SMS MODAL ================= */}
      {isSmsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">O'qituvchilarga SMS yuborish</h3>
              <button
                onClick={() => setIsSmsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSendSms} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Qabul qiluvchilar</label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                  Barcha faol o'qituvchilar ({teachers.length} nafar)
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Xabar matni</label>
                <textarea
                  rows={4}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="Hurmatli ustozlar..."
                  className="w-full p-3 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>
              {smsSent ? (
                <div className="p-3 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-center">
                  SMS muvaffaqiyatli jo'natildi!
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSmsModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold rounded-lg shadow-sm"
                  >
                    Yuborish
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
