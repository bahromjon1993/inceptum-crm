import React, { useState } from "react";
import {
  ArrowLeft,
  QrCode,
  Plus,
  CreditCard,
  RotateCcw,
  BadgeAlert,
  Ban,
  MessageSquare,
  Edit2,
  Play,
  FileSpreadsheet,
  Calendar,
  Layers,
  LineChart,
  CheckCircle,
  FileText,
  Phone,
  User,
  Clock,
} from "lucide-react";

interface StudentProfilePageProps {
  studentId: number;
  onBack: () => void;
  onOpenPaymentModal: () => void;
}

export function StudentProfilePage({
  studentId,
  onBack,
  onOpenPaymentModal,
}: StudentProfilePageProps) {
  const [activeTab, setActiveTab] = useState<
    | "GURUHLAR"
    | "O'QUVCHI PROGRESSI"
    | "TEST NATIJALARI"
    | "IZOH VA ESLATMALAR"
    | "SMS"
    | "O'QUVCHI TARIXI"
    | "OTA-ONASI"
    | "QO'NG'IROQLAR"
  >("GURUHLAR");

  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const tabs = [
    "GURUHLAR",
    "O'QUVCHI PROGRESSI",
    "TEST NATIJALARI",
    "IZOH VA ESLATMALAR",
    "SMS",
    "O'QUVCHI TARIXI",
    "OTA-ONASI",
    "QO'NG'IROQLAR",
  ];

  return (
    <div className="space-y-4 pb-16 select-none">
      {/* Top back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#5d5fef] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        O'quvchilar ro'yxatiga qaytish
      </button>

      {/* Main Grid: Left Profile Card + Right Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT PROFILE CARD (4 cols) matching frame_025 ================= */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            {/* Top Purple Banner with Balance */}
            <div className="h-12 bg-[#5d5fef] px-4 flex items-center justify-end">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-emerald-600 shadow-xs">
                0 so'm
              </span>
            </div>

            <div className="p-5 space-y-4">
              {/* Avatar + Name + Badges + QR */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl font-bold text-[#5d5fef]">
                    MS
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-800 leading-tight">
                      Muhammadjanova Shodiya
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-rose-300 text-rose-600">
                        Baho: 0.00
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code square */}
                <div className="w-12 h-12 p-1 border border-slate-200 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <QrCode className="w-9 h-9 text-slate-800" />
                </div>
              </div>

              {/* Info fields */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="font-semibold text-slate-400">ID: {studentId || 413}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Telefon raqam :</span>
                    <span className="font-semibold text-slate-700 font-mono">+998505735536</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Tug'ilgan sanasi :</span>
                    <span className="font-semibold text-slate-700 font-mono">2026-10-22</span>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 block text-[11px] mb-1">Ilova holati :</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                    Ilova ishlatmaydi
                  </span>
                </div>
              </div>

              {/* O'quvchiga qo'shimcha ma'lumot qo'shish */}
              <button
                onClick={() => alert("Qo'shimcha ma'lumot kiritish")}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                O'QUVCHIGA QO'SHIMCHA MA'LUMOT QO'SHISH
              </button>

              {/* Action Buttons Stack */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => alert("Guruh tanlash")}
                  className="w-full py-2.5 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  GURUHGA QO'SHISH
                </button>

                <button
                  onClick={onOpenPaymentModal}
                  className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  TO'LOV QILISH
                </button>

                <button
                  onClick={() => setIsRefundModalOpen(true)}
                  className="w-full py-2.5 bg-white hover:bg-rose-50 border border-rose-300 text-rose-600 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  PUL QAYTARISH
                </button>

                <button
                  onClick={() => alert("Beyjik chop etilmoqda...")}
                  className="w-full py-2.5 bg-white hover:bg-indigo-50 border border-indigo-300 text-[#5d5fef] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BadgeAlert className="w-4 h-4" />
                  BEYJIK CHIQARISH
                </button>

                <button
                  onClick={() => {
                    setIsBlacklisted(!isBlacklisted);
                    alert(
                      isBlacklisted
                        ? "Qora ro'yxatdan chiqarildi"
                        : "Qora ro'yxatga olindi!"
                    );
                  }}
                  className={`w-full py-2.5 border rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                    isBlacklisted
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white hover:bg-rose-50 border-rose-300 text-rose-600"
                  }`}
                >
                  <Ban className="w-4 h-4" />
                  {isBlacklisted ? "QORA RO'YXATDAN CHIQARISH" : "QORA RO'YXATGA OLISH"}
                </button>

                {/* SMS & Edit small buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => alert("SMS yuborish")}
                    className="py-2 border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert("Profilni tahrirlash")}
                    className="py-2 border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center justify-center text-slate-600 cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* To'lov tarixi Card below Left Card matching frame_025 */}
          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-800">To'lov tarixi</h3>
              <button className="h-7 px-2.5 bg-white border border-emerald-500/50 text-emerald-600 font-bold text-[10px] rounded-md flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3" />
                EXCEL
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="h-7 px-2 bg-slate-50 border border-slate-200 rounded text-slate-600 flex items-center justify-between text-[11px]">
                <span>Guruh</span>
                <span className="text-slate-400">˅</span>
              </div>
              <input
                type="date"
                className="h-7 px-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-[11px] outline-hidden"
              />
            </div>

            <div className="py-6 text-center text-xs text-slate-400">
              To'lovlar topilmadi
            </div>
          </div>
        </div>

        {/* ================= RIGHT TABS (8 cols) matching frame_025 ================= */}
        <div className="lg:col-span-8 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
          {/* Top Video Guide Button */}
          <div className="p-4 border-b border-slate-100 flex justify-end">
            <button
              onClick={() => alert("Qo'llanma video darsi")}
              className="h-8 px-3.5 bg-white border border-[#5d5fef]/40 text-[#5d5fef] font-semibold text-xs rounded-lg hover:bg-indigo-50/50 flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#5d5fef]" />
              <span>O'quvchilar sahifasidan qanday foydalaniladi?</span>
            </button>
          </div>

          {/* Subtabs list */}
          <div className="px-5 border-b border-slate-100 flex items-center gap-5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-3 text-xs font-bold tracking-wider whitespace-nowrap transition-all relative cursor-pointer ${
                    isActive ? "text-[#5d5fef]" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "GURUHLAR" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-sm">Biriktirilgan guruhlar</h4>
                  <button className="px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-bold rounded-lg flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    Guruhga biriktirish
                  </button>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Gulasal E 4-6</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Kurs: Elementary • Dars vaqti: 16:00 - 18:00
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      O'qituvchi: Gulasal teacher • Xona: GULASAL 2-xona
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Faol
                    </span>
                    <div className="text-xs font-semibold text-slate-700 mt-1">250.000 so'm / oy</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "O'QUVCHI PROGRESSI" && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 text-sm">O'zlashtirish va Davomat</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 rounded-xl text-center">
                    <div className="text-2xl font-black text-emerald-600">92%</div>
                    <div className="text-xs text-emerald-800 font-semibold mt-1">Davomat</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <div className="text-2xl font-black text-blue-600">88 ball</div>
                    <div className="text-xs text-blue-800 font-semibold mt-1">O'rtacha baho</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "TEST NATIJALARI" && (
              <div className="py-12 text-center text-xs text-slate-400">
                O'quvchi hali test topshirmagan
              </div>
            )}

            {activeTab === "IZOH VA ESLATMALAR" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-sm">Izoh va eslatmalar</h4>
                  <button className="px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-bold rounded-lg">
                    + Eslatma
                  </button>
                </div>
                <div className="py-8 text-center text-xs text-slate-400">
                  Hozircha izohlar mavjud emas
                </div>
              </div>
            )}

            {activeTab === "SMS" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-sm">Yuborilgan SMS xabarlar</h4>
                  <button className="px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-bold rounded-lg">
                    SMS yuborish
                  </button>
                </div>
                <div className="py-8 text-center text-xs text-slate-400">
                  SMS yuborilmagan
                </div>
              </div>
            )}

            {activeTab === "OTA-ONASI" && (
              <div className="space-y-3 text-xs">
                <h4 className="font-bold text-slate-800 text-sm">Ota-ona ma'lumotlari</h4>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ota-onasi F.I.SH:</span>
                    <span className="font-bold text-slate-800">Muhammadjon aka</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Telefon raqami:</span>
                    <span className="font-semibold text-slate-700 font-mono">+998 90 123 45 67</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pul qaytarish modal */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Pul qaytarish</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Summa (so'm)</label>
                <input
                  type="number"
                  placeholder="250 000"
                  className="w-full p-2 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Sabab</label>
                <textarea
                  rows={2}
                  placeholder="Guruh dars vaqti to'g'ri kelmadi..."
                  className="w-full p-2 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg text-slate-600"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  alert("Pul muvaffaqiyatli qaytarildi!");
                  setIsRefundModalOpen(false);
                }}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Qaytarish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
