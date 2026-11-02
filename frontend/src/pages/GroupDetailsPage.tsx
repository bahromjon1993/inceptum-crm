import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  BookOpen,
  LineChart,
  Calendar,
  Building,
  DollarSign,
  Edit2,
  Trash2,
  MessageSquare,
  UserPlus,
  Monitor,
  QrCode,
  UserCheck,
  ArrowRightLeft,
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  MoreVertical,
  Check,
  X,
  Lock,
  Plus,
  FileSpreadsheet,
  Clock,
  Sparkles,
  Award,
  Coins,
  FileText,
  UserMinus,
  RotateCcw,
} from "lucide-react";

interface GroupDetailsPageProps {
  group: any;
  onBack: () => void;
  onOpenPaymentModal: () => void;
  onSelectStudentProfile: (studentId: number) => void;
}

export function GroupDetailsPage({
  group,
  onBack,
  onOpenPaymentModal,
  onSelectStudentProfile,
}: GroupDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<
    | "DAVOMAT"
    | "BAHO"
    | "TEST"
    | "BILIM TAHLILI"
    | "ESLATMALAR"
    | "IMTIHON"
    | "CHEGIRMALAR"
    | "COINLAR"
    | "O'QUVCHIGA IZOH"
    | "GURUH TARIXI"
  >("DAVOMAT");

  const [activeMonth, setActiveMonth] = useState("Oktabr 2026");
  const [isBalancesHidden, setIsBalancesHidden] = useState(false);
  const [showJoinDate, setShowJoinDate] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [activeDropdownStudentId, setActiveDropdownStudentId] = useState<number | null>(null);

  // Quick Action Modal states
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [selectedStudentForAction, setSelectedStudentForAction] = useState<any>(null);

  // Exact 15 students from video frame 10-14
  const [students, setStudents] = useState<any[]>([
    { id: 1, name: "Abdurahmananova Maftuna", phone: "+998942663383", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 2, name: "Axmadaliyeva Shaxlo", phone: "+998938034994", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 3, name: "Hoshimjanova Kumush", phone: "+998971501707", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 4, name: "Meliboyeva Shaxnoza", phone: "+998990170801", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 5, name: "Muhammadjanov Muhammadzohid", phone: "+998505735536", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 6, name: "Muhammadsoliyeva Zunnura", phone: "+998937783908", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 7, name: "Nosirjanov Ozodbek", phone: "+998773121412", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 8, name: "Qirgizboyeva Dilnavoz", phone: "+998771120078", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 9, name: "Rustamjanov Azamat", phone: "+998941234567", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 10, name: "Shuxratjonova Mushtariy", phone: "+998912345678", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 11, name: "To'ramirzayeva Oyjamol", phone: "+998901112233", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
    { id: 12, name: "Uraimova Umida", phone: "+998933334455", status: "Faol", balance: "0 so'm", joinedDate: "03/09/2026" },
  ]);

  // Attendance dates from video frame 10
  const attendanceDates = ["01", "03", "06", "08", "10", "13", "15", "17", "20", "22"];

  // Attendance status mapping (studentId -> date -> 'present' | 'absent' | 'empty' | 'locked')
  const [attendanceRecords, setAttendanceRecords] = useState<Record<number, Record<string, string>>>({
    1: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "absent", "15": "present", "17": "empty", "20": "absent", "22": "absent" },
    2: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    3: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "absent", "22": "present" },
    4: { "01": "locked", "03": "present", "06": "absent", "08": "present", "10": "present", "13": "absent", "15": "present", "17": "empty", "20": "present", "22": "present" },
    5: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    6: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    7: { "01": "present", "03": "present", "06": "absent", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    8: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    9: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    10: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
    11: { "01": "absent", "03": "absent", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "absent", "22": "present" },
    12: { "01": "present", "03": "present", "06": "present", "08": "present", "10": "present", "13": "present", "15": "present", "17": "empty", "20": "present", "22": "present" },
  });

  const toggleAttendance = (studentId: number, date: string) => {
    const current = attendanceRecords[studentId]?.[date] || "empty";
    let next = "present";
    if (current === "present") next = "absent";
    else if (current === "absent") next = "empty";
    else if (current === "empty") next = "present";

    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [date]: next,
      },
    }));
  };

  const tabs = [
    "DAVOMAT",
    "BAHO",
    "TEST",
    "BILIM TAHLILI",
    "ESLATMALAR",
    "IMTIHON",
    "CHEGIRMALAR",
    "COINLAR",
    "O'QUVCHIGA IZOH",
    "GURUH TARIXI",
  ];

  return (
    <div className="space-y-4 pb-16 select-none">
      {/* Top back navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#5d5fef] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Guruhlar ro'yxatiga qaytish
      </button>

      {/* Main Grid: Left Group Card + Right Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT CARD (4 cols) ================= */}
        <div className="lg:col-span-4 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#5d5fef]" />
              <h2 className="text-base font-bold text-slate-800">
                {group?.name || "Feruzbek E 4-6"}
              </h2>
            </div>
            <button className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Group Details items matching frame_010 */}
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Faol o'quvchilar soni:</span>
              <span className="font-bold text-slate-800">{students.length} ta</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Kurs:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {group?.course || "Elementary"}
              </span>
            </div>

            <div className="flex items-start gap-2">
              <LineChart className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span>Baholash tizimi:</span>
                <span className="ml-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100 text-amber-900 inline-block">
                  Standart 100 Ballik Baholash Tizimi (Default)
                </span>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Dars kunlar:</span>
              </div>
              <div className="pl-6 space-y-1 text-[11px]">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-700">Seshanba</span>
                  <span className="text-slate-500">16:00 - 18:00</span>
                  <span className="text-sky-600 font-semibold">{group?.room || "FERUZ 1-xona"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-700">Payshanba</span>
                  <span className="text-slate-500">16:00 - 18:00</span>
                  <span className="text-sky-600 font-semibold">{group?.room || "FERUZ 1-xona"}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-700">Shanba</span>
                  <span className="text-slate-500">16:00 - 18:00</span>
                  <span className="text-sky-600 font-semibold">{group?.room || "FERUZ 1-xona"}</span>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1.5">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                <span>Dars beruvchi o'qituvchilar:</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                    FT
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 text-xs">
                        {group?.teacher || "Feruzbek teacher"}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[9px] font-bold">
                        Asosiy
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>50%</span>
                      <span>📅 09.06.2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Kurs davomiyligi:</span>
              <span className="font-semibold text-slate-700">03.09.2026 - 30.11.2026</span>
            </div>

            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>Filial:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                INCEPTUM Filiali
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-slate-400" />
              <span>Kurs narxi:</span>
              <span className="font-bold text-slate-800">250.000 So'm</span>
            </div>
          </div>

          {/* 9 Action Buttons Row matching frame_010 */}
          <div className="flex items-center justify-between gap-1 pt-2 border-t border-slate-100">
            <button
              title="Tahrirlash"
              className="w-8 h-8 rounded-lg border border-amber-300 text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              title="O'chirish"
              className="w-8 h-8 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSmsModalOpen(true)}
              title="SMS yuborish"
              className="w-8 h-8 rounded-lg border border-amber-300 text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              title="O'quvchi qo'shish"
              className="w-8 h-8 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
            </button>
            <button
              title="Onlayn dars / havola"
              className="w-8 h-8 rounded-lg border border-emerald-300 text-emerald-600 hover:bg-emerald-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              title="QR kod"
              className="w-8 h-8 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
            <button
              title="Assistant biriktirish"
              className="w-8 h-8 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
            </button>
            <button
              title="Boshqa guruhga ko'chirish"
              className="w-8 h-8 rounded-lg border border-purple-300 text-purple-600 hover:bg-purple-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
            <button
              title="Yangilash"
              className="w-8 h-8 rounded-lg border border-cyan-300 text-cyan-600 hover:bg-cyan-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Status dots legend */}
          <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> sinov
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> aktiv
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> arxiv
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> muzlatilgan
            </span>
          </div>

          {/* Search, Sort & Visibility Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Qidirish"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="h-8 px-2.5 text-xs bg-white border border-slate-200 rounded-lg outline-hidden"
              />
              <div className="h-8 px-2.5 text-xs bg-white border border-slate-200 rounded-lg flex items-center justify-between text-slate-600 cursor-pointer">
                <span>Tartiblash</span>
                <span className="text-slate-400">˅</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowJoinDate(!showJoinDate)}
                className="h-7 px-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-semibold text-slate-600 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-3 h-3 text-slate-400" />
                <span>QO'SHILGAN SANANI KO'RSATISH</span>
              </button>

              <button
                onClick={() => setIsBalancesHidden(!isBalancesHidden)}
                className="h-7 px-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-semibold text-slate-600 flex items-center justify-center gap-1 cursor-pointer"
              >
                {isBalancesHidden ? (
                  <EyeOff className="w-3 h-3 text-slate-400" />
                ) : (
                  <Eye className="w-3 h-3 text-slate-400" />
                )}
                <span>BALANSNI YOPISH</span>
              </button>
            </div>

            <button
              onClick={() => alert("O'quvchilar muvaffaqiyatli faollashtirildi!")}
              className="w-full h-8 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors flex items-center justify-center cursor-pointer"
            >
              O'QUVCHILARNI FAOLLASHTIRISH
            </button>
          </div>

          {/* Student list in this group */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Talabalar ({students.length})</span>
              <span>Harakatlar</span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {students
                .filter((s) => s.name.toLowerCase().includes(studentSearch.toLowerCase()))
                .map((student) => (
                  <div
                    key={student.id}
                    className="p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all flex items-center justify-between text-xs relative"
                  >
                    <div
                      onClick={() => onSelectStudentProfile(student.id)}
                      className="cursor-pointer"
                    >
                      <div className="font-semibold text-slate-800 line-clamp-1 hover:text-[#5d5fef]">
                        {student.id}. {student.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {student.phone}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                        Faol ˅
                      </span>

                      {!isBalancesHidden && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-300 text-emerald-600">
                          {student.balance}
                        </span>
                      )}

                      {/* 3-dots action menu */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            setActiveDropdownStudentId(
                              activeDropdownStudentId === student.id ? null : student.id
                            );
                            setSelectedStudentForAction(student);
                          }}
                          className="w-6 h-6 rounded-md hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {/* Dropdown Menu matching frame_013.jpg */}
                        {activeDropdownStudentId === student.id && (
                          <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 text-xs font-medium">
                            <button
                              onClick={() => {
                                alert(`${student.name} guruhni bitirdi deb belgilandi!`);
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                              Bitirdi
                            </button>
                            <button
                              onClick={() => {
                                onOpenPaymentModal();
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                              To'lov
                            </button>
                            <button
                              onClick={() => {
                                alert("Boshqa guruhga ko'chirish oynasi");
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
                              Boshqa guruhga ko'chirish
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`${student.name}ni guruhdan chiqarmoqchimisiz?`)) {
                                  setStudents(students.filter((s) => s.id !== student.id));
                                }
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                            >
                              <UserMinus className="w-3.5 h-3.5" />
                              Guruhdan chiqarish
                            </button>
                            <button
                              onClick={() => {
                                alert(`${student.name} lidlarga qaytarildi!`);
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                              Lidlarga qaytarish
                            </button>
                            <div className="my-1 border-t border-slate-100" />
                            <button
                              onClick={() => {
                                setIsNoteModalOpen(true);
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              Eslatma +
                            </button>
                            <button
                              onClick={() => {
                                setIsSmsModalOpen(true);
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                              Xabar (sms) +
                            </button>
                            <button
                              onClick={() => {
                                onSelectStudentProfile(student.id);
                                setActiveDropdownStudentId(null);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                              Tahrirlash
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL (8 cols) ================= */}
        <div className="lg:col-span-8 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
          {/* Sub-Tabs Row matching frame_010 */}
          <div className="px-5 border-b border-slate-100 flex items-center gap-5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-3.5 text-xs font-bold tracking-wider whitespace-nowrap transition-all relative cursor-pointer ${
                    isActive
                      ? "text-[#5d5fef]"
                      : "text-slate-500 hover:text-slate-800"
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

          {/* TAB CONTENT */}
          <div className="p-5">
            {/* 1. DAVOMAT TAB */}
            {activeTab === "DAVOMAT" && (
              <div className="space-y-4">
                {/* Header row: Month & Action buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    {["Sentabr 2026", "Oktabr 2026", "Noyabr 2026"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setActiveMonth(m)}
                        className={`transition-colors cursor-pointer ${
                          activeMonth === m
                            ? "text-[#5d5fef] font-bold border-b-2 border-[#5d5fef] pb-1"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert("Qo'shimcha dars sanasi ochildi")}
                      className="h-8 px-3 border border-[#5d5fef]/40 text-[#5d5fef] text-xs font-semibold rounded-lg hover:bg-[#5d5fef]/5 flex items-center gap-1 cursor-pointer"
                    >
                      <span>QO'SHIMCHA DARS</span>
                    </button>
                    <button
                      onClick={() => alert("Davomat Excel yuklab olinmoqda...")}
                      className="h-8 px-3 bg-white border border-emerald-500/50 text-emerald-600 font-bold text-xs rounded-lg hover:bg-emerald-50 flex items-center gap-1 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>EXCEL</span>
                    </button>
                  </div>
                </div>

                {/* Attendance Matrix Table */}
                <div className="overflow-x-auto border border-slate-100 rounded-xl">
                  <table className="w-full text-left text-xs min-w-[750px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-100 text-slate-500 font-semibold">
                        <th className="py-2.5 px-3 w-10 text-center">№</th>
                        <th className="py-2.5 px-3 w-52">O'quvchilar</th>
                        {attendanceDates.map((date) => (
                          <th
                            key={date}
                            className="py-2.5 px-2 text-center border-l border-slate-100"
                          >
                            <div className="text-[11px] font-bold text-slate-700">{date}</div>
                            <div className="text-[9px] text-slate-400">📎</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((student, idx) => (
                        <tr
                          key={student.id}
                          className="hover:bg-slate-50/60 transition-colors"
                        >
                          <td className="py-2.5 px-3 text-slate-400 text-center font-medium">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {student.name}
                          </td>
                          {attendanceDates.map((date) => {
                            const status =
                              attendanceRecords[student.id]?.[date] || "empty";

                            return (
                              <td
                                key={date}
                                onClick={() => toggleAttendance(student.id, date)}
                                className="py-2 px-2 text-center border-l border-slate-100 cursor-pointer hover:bg-slate-100/60 transition-colors"
                              >
                                {status === "present" && (
                                  <span className="w-6 h-6 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                    ✓
                                  </span>
                                )}
                                {status === "absent" && (
                                  <span className="w-6 h-6 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                                    ✕
                                  </span>
                                )}
                                {status === "locked" && (
                                  <span className="w-6 h-6 mx-auto text-slate-300 flex items-center justify-center">
                                    🔒
                                  </span>
                                )}
                                {status === "empty" && (
                                  <span className="w-4 h-4 mx-auto rounded border border-slate-300 block" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer link: Arxivdagi o'quvchilarni ko'rish */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => alert("Arxivdagi o'quvchilar ro'yxati")}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Arxivdagi o'quvchilarni ko'rish</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. BAHO TAB */}
            {activeTab === "BAHO" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-sm">
                    Baholash va Reyting (Standart 100 Ballik)
                  </h3>
                  <button className="px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-bold rounded-lg">
                    Baholarni saqlash
                  </button>
                </div>
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 font-semibold">
                        <th className="py-2.5 px-3">O'quvchi</th>
                        <th className="py-2.5 px-3 text-center">Uyga vazifa (30)</th>
                        <th className="py-2.5 px-3 text-center">Darsdagi faollik (30)</th>
                        <th className="py-2.5 px-3 text-center">Imtihon (40)</th>
                        <th className="py-2.5 px-3 text-center">Umumiy Ball</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((s) => (
                        <tr key={s.id}>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              defaultValue={28}
                              className="w-12 text-center p-1 border border-slate-200 rounded"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              defaultValue={26}
                              className="w-12 text-center p-1 border border-slate-200 rounded"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="number"
                              defaultValue={35}
                              className="w-12 text-center p-1 border border-slate-200 rounded"
                            />
                          </td>
                          <td className="py-2.5 px-3 text-center font-bold text-emerald-600">
                            89 ball
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. TEST TAB matching frame_016 */}
            {activeTab === "TEST" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Testlar</h3>
                    <p className="text-xs text-slate-500">
                      Ushbu guruhga berilgan testlarni boshqaring va o'quvchilar natijalarini kuzating.
                    </p>
                  </div>
                  <button
                    onClick={() => alert("Yangi test yaratish oynasi")}
                    className="h-8 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Test yaratish
                  </button>
                </div>

                <div className="bg-[#fafafa] border border-slate-200/80 rounded-xl p-4 space-y-4">
                  <div className="font-bold text-xs text-slate-700">
                    Shu guruhga berilgan testlar
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Test qidirish..."
                        className="w-full h-8 pl-8 pr-3 text-xs bg-white border border-slate-200 rounded-lg outline-hidden"
                      />
                    </div>
                    <div className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs flex items-center justify-between text-slate-600 cursor-pointer min-w-[120px]">
                      <span>Barchasi</span>
                      <span className="text-slate-400">˅</span>
                    </div>
                    <input
                      type="date"
                      className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 outline-hidden"
                    />
                  </div>

                  <div className="py-12 text-center text-xs text-slate-400">
                    Bu guruhga hali test berilmagan
                  </div>
                </div>
              </div>
            )}

            {/* 4. BILIM TAHLILI */}
            {activeTab === "BILIM TAHLILI" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Bilim Tahlili va Progress</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                    <div className="text-2xl font-black text-emerald-600">86%</div>
                    <div className="text-xs font-semibold text-emerald-800 mt-1">O'rtacha o'zlashtirish</div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <div className="text-2xl font-black text-blue-600">92%</div>
                    <div className="text-xs font-semibold text-blue-800 mt-1">Davomat darajasi</div>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl text-center">
                    <div className="text-2xl font-black text-purple-600">12 ta</div>
                    <div className="text-xs font-semibold text-purple-800 mt-1">O'tilgan darslar</div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CHEGIRMALAR TAB matching frame_017 */}
            {activeTab === "CHEGIRMALAR" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Guruh chegirmalari</h3>
                  <button
                    onClick={() => alert("Chegirma qo'shish")}
                    className="h-8 px-3 bg-[#5d5fef] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Chegirma berish
                  </button>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                        <th className="py-2.5 px-3 w-8">#</th>
                        <th className="py-2.5 px-3">Ism familiya</th>
                        <th className="py-2.5 px-3">Qolgan chegirmalar soni</th>
                        <th className="py-2.5 px-3">Berilgan sana</th>
                        <th className="py-2.5 px-3">Yaratgan xodim</th>
                        <th className="py-2.5 px-3">Izoh</th>
                        <th className="py-2.5 px-3">Chegirmadagi kurs narxi</th>
                        <th className="py-2.5 px-3 text-center">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-slate-50/60">
                          <td className="py-2.5 px-3 text-slate-400">{idx + 1}.</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="py-2.5 px-3 text-slate-400">Bo'sh</td>
                          <td className="py-2.5 px-3 text-slate-400">Bo'sh</td>
                          <td className="py-2.5 px-3 text-slate-400">-</td>
                          <td className="py-2.5 px-3 text-slate-400">bo'sh</td>
                          <td className="py-2.5 px-3 text-slate-400">Yo'q</td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => alert(`${s.name}ga chegirma berish`)}
                              className="w-6 h-6 rounded-md hover:bg-slate-100 text-slate-500 font-bold"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. COINLAR TAB */}
            {activeTab === "COINLAR" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Coinlar (Rag'batlantirish)</h3>
                  <button
                    onClick={() => setIsCoinModalOpen(true)}
                    className="h-8 px-3 bg-[#5d5fef] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Coin berish
                  </button>
                </div>

                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                        <th className="py-2.5 px-3">O'quvchi</th>
                        <th className="py-2.5 px-3 text-center">Jami Coinlar</th>
                        <th className="py-2.5 px-3">Oxirgi amal</th>
                        <th className="py-2.5 px-3 text-center">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50/60">
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{s.name}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                              🪙 25 coin
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                            +5 coin (Darsdagi faollik uchun)
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => {
                                setSelectedStudentForAction(s);
                                setIsCoinModalOpen(true);
                              }}
                              className="text-xs font-semibold text-[#5d5fef] hover:underline"
                            >
                              + Berish
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. GURUH TARIXI TAB matching frame_018 */}
            {activeTab === "GURUH TARIXI" && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Guruh o'zgarishlari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1 shadow-2xs">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      Boshlanish sanasi o'zgarishi
                    </div>
                    <div className="text-[11px] text-slate-500">Eski qiymat: 2026-09-01</div>
                    <div className="text-[11px] text-slate-700 font-semibold">Yangi qiymat: 2026-09-03</div>
                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 mt-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        👤 Imron Erkinov
                      </span>
                      <span>05.09.2026, 15:59:04</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1 shadow-2xs">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      Tugash vaqti o'zgarishi
                    </div>
                    <div className="text-[11px] text-slate-500">Eski qiymat: 16:00</div>
                    <div className="text-[11px] text-slate-700 font-semibold">Yangi qiymat: 18:00</div>
                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 mt-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        👤 Imron Erkinov
                      </span>
                      <span>05.09.2026, 15:57:29</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1 shadow-2xs">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      Boshlanish vaqti o'zgarishi
                    </div>
                    <div className="text-[11px] text-slate-500">Eski qiymat: 14:00</div>
                    <div className="text-[11px] text-slate-700 font-semibold">Yangi qiymat: 16:00</div>
                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 mt-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        👤 Imron Erkinov
                      </span>
                      <span>05.09.2026, 15:57:29</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-slate-200/80 rounded-xl space-y-1 shadow-2xs">
                    <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                      Kurs o'zgarishi
                    </div>
                    <div className="text-[11px] text-slate-500">Eski qiymat: Beginner</div>
                    <div className="text-[11px] text-slate-700 font-semibold">Yangi qiymat: Elementary</div>
                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 mt-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                        👤 Imron Erkinov
                      </span>
                      <span>05.09.2026, 15:57:29</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Note modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-slate-800 text-sm mb-3">
              {selectedStudentForAction?.name} uchun eslatma qoldirish
            </h3>
            <textarea
              rows={4}
              placeholder="Eslatma matni..."
              className="w-full text-xs p-3 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-lg text-slate-600"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  alert("Eslatma saqlandi!");
                  setIsNoteModalOpen(false);
                }}
                className="px-5 py-2 bg-[#5d5fef] text-white text-xs font-bold rounded-lg"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Give Coin modal */}
      {isCoinModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-1.5">
              <span>🪙</span> Coin berish
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Coin miqdori</label>
                <input
                  type="number"
                  defaultValue={5}
                  className="w-full p-2 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Sabab</label>
                <input
                  type="text"
                  defaultValue="Darsda faollik uchun"
                  className="w-full p-2 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsCoinModalOpen(false)}
                className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg text-slate-600"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  alert("Coin taqdim etildi!");
                  setIsCoinModalOpen(false);
                }}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Taqdim etish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
