import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  FileSpreadsheet,
  FileText,
  MoreVertical,
  ChevronDown,
  ArrowUpDown,
  User,
  Camera,
  RefreshCw,
  X,
  CreditCard,
  MessageSquare,
  Check,
  RotateCcw,
} from "lucide-react";

interface StudentsPageProps {
  onSelectStudentProfile: (studentId: number) => void;
  onOpenPaymentModal: () => void;
}

export function StudentsPage({
  onSelectStudentProfile,
  onOpenPaymentModal,
}: StudentsPageProps) {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filters state matching video frame_028 exactly
  const [courseFilter, setCourseFilter] = useState("Barchasi");
  const [schoolFilter, setSchoolFilter] = useState("Barchasi");
  const [groupStatusFilter, setGroupStatusFilter] = useState("Faol"); // Default "Faol" as seen in frame_028
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("Barchasi");
  const [groupFilter, setGroupFilter] = useState("Barchasi");
  const [teacherFilter, setTeacherFilter] = useState("Barchasi");

  // Active open dropdown tracker
  const [activeDropdown, setActiveDropdown] = useState<
    "course" | "school" | "groupStatus" | "paymentStatus" | "group" | "teacher" | null
  >(null);

  // Row action menu dropdown tracker
  const [activeRowMenu, setActiveRowMenu] = useState<number | null>(null);

  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setActiveRowMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter option lists
  const coursesList = [
    "Barchasi",
    "Elementary",
    "Beginner",
    "Pre-IELTS 1",
    "Pre-IELTS 2",
    "IELTS Graduation",
    "Kids English",
  ];

  const schoolsList = [
    "Barchasi",
    "1-maktab",
    "2-maktab",
    "21-maktab",
    "Prezident maktabi",
    "Al-Xorazmiy nomidagi IT maktabi",
    "35-maktab",
  ];

  const groupStatusesList = [
    "Faol",
    "Sinov",
    "Arxiv",
    "Ketgan",
    "Barchasi",
  ];

  const paymentStatusesList = [
    "Barchasi",
    "To'langan",
    "Qarzdor",
    "Kutilmoqda",
  ];

  const groupsList = [
    "Barchasi",
    "Gulasal E 4-6",
    "Gulasal O 6-8",
    "Gulasal O 4-6",
    "Ahmadjon E 2-4",
    "Ahmadjon E 12-14",
    "Feruzbek E 4-6",
    "Feruzbek O 4-6",
    "Feruzbek E 6-8",
  ];

  const teachersList = [
    "Barchasi",
    "Gulasal teacher",
    "Axmadjon teacher",
    "Feruzbek teacher",
    "Marjona teacher",
  ];

  // Exact students data from video frame 28 with complete filterable attributes
  const [students, setStudents] = useState<any[]>([]);

  // Drawer Form fields
  const [drawerName, setDrawerName] = useState("");
  const [drawerPhone, setDrawerPhone] = useState("+998 ");
  const [drawerBirthDate, setDrawerBirthDate] = useState("2026-10-28");
  const [drawerPassword, setDrawerPassword] = useState("aB7#k9Zx");
  const [drawerGender, setDrawerGender] = useState("erkak");
  const [drawerGroup, setDrawerGroup] = useState("Feruzbek E 4-6");
  const [drawerSchool, setDrawerSchool] = useState("1-maktab");
  const [isGroupAccordionOpen, setIsGroupAccordionOpen] = useState(false);
  const [isParentAccordionOpen, setIsParentAccordionOpen] = useState(false);
  const [isSchoolAccordionOpen, setIsSchoolAccordionOpen] = useState(false);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
    let pwd = "";
    for (let i = 0; i < 8; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setDrawerPassword(pwd);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drawerName) return;
    const newStudent = {
      id: students.length + 1,
      name: drawerName,
      grade: "Bahosi yo'q",
      nextPayment: "2026-11-01",
      phone: drawerPhone,
      note: "Yangi qo'shilgan",
      group: `16:00-18:00 - ${drawerGroup} - Feruzbek teacher`,
      course: "Elementary",
      school: drawerSchool,
      teacher: "Feruzbek teacher",
      status: "Faol",
      balance: "0 so'm",
      balanceNum: 0,
      badgeVal: "0",
    };
    setStudents([newStudent, ...students]);
    setIsAddDrawerOpen(false);
    setDrawerName("");
    setDrawerPhone("+998 ");
  };

  // Reactive Multi-Filter Logic
  const filteredStudents = students.filter((s) => {
    // 1. Search text filter
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      (s.group && s.group.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.teacher && s.teacher.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Course filter
    const matchesCourse =
      courseFilter === "Barchasi" ||
      (s.course && s.course.toLowerCase() === courseFilter.toLowerCase()) ||
      (s.group && s.group.toLowerCase().includes(courseFilter.toLowerCase()));

    // 3. School filter
    const matchesSchool =
      schoolFilter === "Barchasi" ||
      (s.school && s.school.toLowerCase().includes(schoolFilter.toLowerCase()));

    // 4. Group status filter
    const matchesGroupStatus =
      groupStatusFilter === "Barchasi" ||
      (s.status && s.status.toLowerCase() === groupStatusFilter.toLowerCase());

    // 5. Payment status filter
    const matchesPaymentStatus =
      paymentStatusFilter === "Barchasi" ||
      (paymentStatusFilter === "To'langan" && s.balanceNum >= 0) ||
      (paymentStatusFilter === "Qarzdor" && s.balanceNum < 0) ||
      (paymentStatusFilter === "Kutilmoqda" && s.balanceNum === 0);

    // 6. Group filter
    const matchesGroup =
      groupFilter === "Barchasi" ||
      (s.group && s.group.toLowerCase().includes(groupFilter.toLowerCase()));

    // 7. Teacher filter
    const matchesTeacher =
      teacherFilter === "Barchasi" ||
      (s.teacher && s.teacher.toLowerCase().includes(teacherFilter.toLowerCase())) ||
      (s.group && s.group.toLowerCase().includes(teacherFilter.toLowerCase()));

    return (
      matchesSearch &&
      matchesCourse &&
      matchesSchool &&
      matchesGroupStatus &&
      matchesPaymentStatus &&
      matchesGroup &&
      matchesTeacher
    );
  });

  const resetFilters = () => {
    setSearchTerm("");
    setCourseFilter("Barchasi");
    setSchoolFilter("Barchasi");
    setGroupStatusFilter("Barchasi");
    setPaymentStatusFilter("Barchasi");
    setGroupFilter("Barchasi");
    setTeacherFilter("Barchasi");
    setActiveDropdown(null);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    courseFilter !== "Barchasi" ||
    schoolFilter !== "Barchasi" ||
    groupStatusFilter !== "Faol" ||
    paymentStatusFilter !== "Barchasi" ||
    groupFilter !== "Barchasi" ||
    teacherFilter !== "Barchasi";

  return (
    <div className="space-y-4 pb-12 select-none" ref={dropdownRef}>
      {/* Top Header Row matching frame_028 exactly */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800">O'quvchilar</h1>
          <span className="px-3 py-1 rounded-full border border-[#5d5fef]/40 text-[#5d5fef] text-xs font-semibold bg-indigo-50/20">
            O'quvchilar soni: {filteredStudents.length} ta
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Filtrlarni tozalash"
              className="text-[11px] text-[#5d5fef] hover:underline flex items-center gap-1 ml-2 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Barchasini ko'rsatish</span>
            </button>
          )}
        </div>

        {/* Action Button Rows matching frame_028 */}
        <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => alert("Talabalar ro'yxati Excel formatida yuklab olinmoqda...")}
              className="h-8 px-3 bg-white hover:bg-emerald-50 border border-emerald-500 text-emerald-600 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>EXCEL</span>
            </button>

            <button
              onClick={() => setIsSmsModalOpen(true)}
              className="h-8 px-3 bg-white hover:bg-amber-50 border border-amber-400 text-amber-600 text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              <span>SMS YUBORISH</span>
            </button>

            <button
              onClick={() => {
                setGroupStatusFilter(groupStatusFilter === "Faol" ? "Barchasi" : "Faol");
              }}
              className={`h-8 px-3 bg-white border text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors ${
                groupStatusFilter === "Faol"
                  ? "border-[#5d5fef] text-[#5d5fef] bg-indigo-50/30"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>☑️ Faol</span>
            </button>

            <button
              onClick={() => alert("Barcha tanlangan o'quvchilar faollashtirildi!")}
              className="h-8 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-lg shadow-xs cursor-pointer transition-all active:scale-[0.98]"
            >
              FAOLLASHTIRISH
            </button>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => alert("Excel fayl orqali o'quvchilarni import qilish oynasi")}
              className="h-8 px-3 bg-white hover:bg-indigo-50/50 border border-[#5d5fef]/40 text-[#5d5fef] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>EXCEL ORQALI QO'SHISH</span>
            </button>

            <button
              onClick={() => setIsAddDrawerOpen(true)}
              className="h-8 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>YANGI QO'SHISH</span>
            </button>

            <button
              onClick={() => alert("O'quvchilar uchun beyjiklar chop etilmoqda...")}
              className="h-8 px-3 bg-white hover:bg-indigo-50/50 border border-[#5d5fef]/40 text-[#5d5fef] text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>🆔 BEYJIKLAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row with Fully Interactive Dropdowns matching frame_028 exactly */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 1. Qidirish Input */}
        <div className="relative min-w-[170px] flex-1 sm:flex-initial">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Qidirish"
            className="w-full h-8 pl-3 pr-8 bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 rounded-lg outline-hidden focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef]/20 transition-all shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 2. Kurslar Dropdown */}
        <div className="relative min-w-[110px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "course" ? null : "course")}
            className={`h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "course"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${courseFilter !== "Barchasi" ? "text-[#5d5fef] font-semibold border-[#5d5fef]/40" : "text-slate-600"}`}
          >
            <span className="truncate">{courseFilter === "Barchasi" ? "Kurslar" : courseFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "course" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "course" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {coursesList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCourseFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    courseFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {courseFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Maktab Dropdown */}
        <div className="relative min-w-[110px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "school" ? null : "school")}
            className={`h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "school"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${schoolFilter !== "Barchasi" ? "text-[#5d5fef] font-semibold border-[#5d5fef]/40" : "text-slate-600"}`}
          >
            <span className="truncate">{schoolFilter === "Barchasi" ? "Maktab" : schoolFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "school" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "school" && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {schoolsList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSchoolFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    schoolFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {schoolFilter === item && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Guruhdagi holati Dropdown with floating label matching frame_028 */}
        <div className="relative min-w-[130px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "groupStatus" ? null : "groupStatus")}
            className={`relative h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "groupStatus"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } text-slate-800`}
          >
            <span className="absolute -top-2 left-2 px-1 bg-white text-[9px] text-slate-400 font-normal leading-none pointer-events-none">
              Guruhdagi holati
            </span>
            <span className="truncate">{groupStatusFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "groupStatus" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "groupStatus" && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {groupStatusesList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setGroupStatusFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    groupStatusFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {groupStatusFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. To'lov holati Dropdown */}
        <div className="relative min-w-[120px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "paymentStatus" ? null : "paymentStatus")}
            className={`h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "paymentStatus"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${paymentStatusFilter !== "Barchasi" ? "text-[#5d5fef] font-semibold border-[#5d5fef]/40" : "text-slate-600"}`}
          >
            <span className="truncate">{paymentStatusFilter === "Barchasi" ? "To'lov holati" : paymentStatusFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "paymentStatus" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "paymentStatus" && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {paymentStatusesList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setPaymentStatusFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    paymentStatusFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {paymentStatusFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6. Guruh Dropdown */}
        <div className="relative min-w-[110px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "group" ? null : "group")}
            className={`h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "group"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${groupFilter !== "Barchasi" ? "text-[#5d5fef] font-semibold border-[#5d5fef]/40" : "text-slate-600"}`}
          >
            <span className="truncate max-w-[110px]">{groupFilter === "Barchasi" ? "Guruh" : groupFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "group" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "group" && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95 max-h-60 overflow-y-auto">
              {groupsList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setGroupFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    groupFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span className="truncate">{item}</span>
                  {groupFilter === item && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 7. Ustoz Dropdown */}
        <div className="relative min-w-[110px]">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "teacher" ? null : "teacher")}
            className={`h-8 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between gap-1.5 w-full transition-all cursor-pointer ${
              activeDropdown === "teacher"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${teacherFilter !== "Barchasi" ? "text-[#5d5fef] font-semibold border-[#5d5fef]/40" : "text-slate-600"}`}
          >
            <span className="truncate max-w-[110px]">{teacherFilter === "Barchasi" ? "Ustoz" : teacherFilter}</span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 shrink-0 transition-transform ${
                activeDropdown === "teacher" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "teacher" && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {teachersList.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setTeacherFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    teacherFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {teacherFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Students Table matching frame_028 exactly */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-600 font-semibold bg-[#fafafa]">
                <th className="py-3 px-3 w-10 text-center">ID ↑</th>
                <th className="py-3 px-2 w-12 text-center">Rasm</th>
                <th className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    Ism familiya
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3">Baho ↑↓</th>
                <th className="py-3 px-3">Keyingi to'lov</th>
                <th className="py-3 px-3">Telefon</th>
                <th className="py-3 px-3">Izoh</th>
                <th className="py-3 px-3">Guruhlar</th>
                <th className="py-3 px-3">Balans ↑↓</th>
                <th className="py-3 px-3 text-center">Harakatlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-600">O'quvchilar topilmadi</p>
                    <p className="text-xs mt-1">Tanlangan filtrlar bo'yicha hech qanday o'quvchi mavjud emas</p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 px-3 py-1.5 bg-[#5d5fef] text-white text-xs font-semibold rounded-lg hover:bg-[#4f51e0] transition-colors cursor-pointer"
                    >
                      Barcha filtrlarni tozalash
                    </button>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => onSelectStudentProfile(student.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3 text-slate-400 text-center font-medium">
                      {student.id}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="w-7 h-7 mx-auto rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-500">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 hover:text-[#5d5fef] transition-colors">
                      {student.name}
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {student.grade}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {student.nextPayment}
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                      {student.phone}
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">
                      {student.note}
                    </td>
                    <td className="py-3 px-3 text-slate-700 text-[11px] max-w-[240px]">
                      <div className="line-clamp-1">{student.group}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[9px] font-bold inline-flex items-center gap-1 ${
                            student.status === "Faol"
                              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                              : student.status === "Sinov"
                              ? "bg-amber-50 border-amber-300 text-amber-700"
                              : "bg-slate-100 border-slate-300 text-slate-600"
                          }`}
                        >
                          <span>{student.status}</span>
                          <span>{student.badgeVal || 0}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded border text-[11px] font-bold ${
                          student.balanceNum < 0
                            ? "border-rose-300 bg-rose-50 text-rose-600"
                            : student.balanceNum > 0
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                            : "border-emerald-200 bg-emerald-50/60 text-emerald-700"
                        }`}
                      >
                        {student.balance}
                      </span>
                    </td>
                    <td
                      className="py-3 px-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setActiveRowMenu(activeRowMenu === student.id ? null : student.id)
                          }
                          className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeRowMenu === student.id && (
                          <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40 text-xs animate-in fade-in zoom-in-95 text-left">
                            <button
                              onClick={() => {
                                onSelectStudentProfile(student.id);
                                setActiveRowMenu(null);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                            >
                              <User className="w-3.5 h-3.5 text-[#5d5fef]" />
                              <span>Profilni ochish</span>
                            </button>
                            <button
                              onClick={() => {
                                onOpenPaymentModal();
                                setActiveRowMenu(null);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                              <span>To'lov qilish</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsSmsModalOpen(true);
                                setActiveRowMenu(null);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                              <span>SMS yuborish</span>
                            </button>
                            <button
                              onClick={() => {
                                setStudents(students.filter((s) => s.id !== student.id));
                                setActiveRowMenu(null);
                              }}
                              className="w-full px-3.5 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 border-t border-slate-100 mt-1 cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>O'chirish</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= RIGHT DRAWER: O'quvchi qo'shish matching frame_020 ================= */}
      {isAddDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">O'quvchi qo'shish</h3>
              <button
                onClick={() => setIsAddDrawerOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body Form */}
            <form onSubmit={handleSaveStudent} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Avatar placeholder box */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-cyan-50/70 border-2 border-dashed border-cyan-200 flex flex-col items-center justify-center text-cyan-500 cursor-pointer hover:bg-cyan-100/50 transition-colors">
                  <Camera className="w-6 h-6 mb-1" />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Ism</label>
                <input
                  type="text"
                  value={drawerName}
                  onChange={(e) => setDrawerName(e.target.value)}
                  placeholder="Ism familiyani kiriting"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Telefon raqam</label>
                <input
                  type="text"
                  value={drawerPhone}
                  onChange={(e) => setDrawerPhone(e.target.value)}
                  placeholder="+998 XX XXX XX XX"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tug'ilgan sana</label>
                <input
                  type="date"
                  value={drawerBirthDate}
                  onChange={(e) => setDrawerBirthDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Parol</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={drawerPassword}
                    onChange={(e) => setDrawerPassword(e.target.value)}
                    className="w-full p-2.5 pr-9 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono"
                  />
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    title="Yangi parol yaratish"
                    className="absolute right-2 text-slate-400 hover:text-[#5d5fef] p-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Manba</label>
                <select className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] bg-white">
                  <option>Telegram reklama</option>
                  <option>Instagram</option>
                  <option>Tanishlar orqali</option>
                  <option>Banner</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Jinsini tanlang</label>
                <div className="flex items-center gap-6 mt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={drawerGender === "erkak"}
                      onChange={() => setDrawerGender("erkak")}
                      className="accent-[#5d5fef]"
                    />
                    <span>Erkak</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={drawerGender === "ayol"}
                      onChange={() => setDrawerGender("ayol")}
                      className="accent-[#5d5fef]"
                    />
                    <span>Ayol</span>
                  </label>
                </div>
              </div>

              {/* Accordions matching frame_020 */}
              <div className="border-t border-slate-100 pt-2 space-y-2">
                {/* Guruhga qo'shish */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsGroupAccordionOpen(!isGroupAccordionOpen)}
                    className="w-full p-2.5 text-left font-semibold text-slate-700 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Guruhga qo'shish</span>
                    <span>{isGroupAccordionOpen ? "−" : "+"}</span>
                  </button>
                  {isGroupAccordionOpen && (
                    <div className="p-3 bg-white space-y-2">
                      <label className="block text-slate-500">Guruhni tanlang</label>
                      <select
                        value={drawerGroup}
                        onChange={(e) => setDrawerGroup(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-md bg-white"
                      >
                        <option value="Feruzbek E 4-6">Feruzbek E 4-6</option>
                        <option value="Feruzbek O 4-6">Feruzbek O 4-6</option>
                        <option value="Gulasal E 4-6">Gulasal E 4-6</option>
                        <option value="Ahmadjon E 2-4">Ahmadjon E 2-4</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Ota-ona telefon raqami */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsParentAccordionOpen(!isParentAccordionOpen)}
                    className="w-full p-2.5 text-left font-semibold text-slate-700 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Ota-ona telefon raqamini qo'shish</span>
                    <span>{isParentAccordionOpen ? "−" : "+"}</span>
                  </button>
                  {isParentAccordionOpen && (
                    <div className="p-3 bg-white space-y-2">
                      <input
                        type="text"
                        placeholder="Ota-ona telefon raqami: +998..."
                        className="w-full p-2 border border-slate-200 rounded-md outline-hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Maktab */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsSchoolAccordionOpen(!isSchoolAccordionOpen)}
                    className="w-full p-2.5 text-left font-semibold text-slate-700 bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Maktab qo'shish</span>
                    <span>{isSchoolAccordionOpen ? "−" : "+"}</span>
                  </button>
                  {isSchoolAccordionOpen && (
                    <div className="p-3 bg-white space-y-2">
                      <input
                        type="text"
                        value={drawerSchool}
                        onChange={(e) => setDrawerSchool(e.target.value)}
                        placeholder="Maktab yoki universitet nomi..."
                        className="w-full p-2 border border-slate-200 rounded-md outline-hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* SAQLASH Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5d5fef] hover:bg-[#4f51e0] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SMS Modal matching video */}
      {isSmsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Talabalarga SMS yuborish</h3>
              <button
                onClick={() => setIsSmsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Qabul qiluvchilar
                </label>
                <div className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  Barcha faol o'quvchilar ({filteredStudents.length} nafar)
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Xabar matni
                </label>
                <textarea
                  rows={4}
                  placeholder="Hurmatli o'quvchi..."
                  className="w-full p-3 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsSmsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 font-semibold rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => {
                    alert("SMS muvaffaqiyatli yuborildi!");
                    setIsSmsModalOpen(false);
                  }}
                  className="px-5 py-2 bg-[#5d5fef] font-bold text-white rounded-lg shadow-sm hover:bg-[#4f51e0] cursor-pointer"
                >
                  Yuborish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
