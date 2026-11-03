import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  FileSpreadsheet,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronDown,
  ArrowUpDown,
  Calendar,
  Clock,
  User,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

interface GroupsPageProps {
  onSelectGroup: (group: any) => void;
}

export function GroupsPage({ onSelectGroup }: GroupsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filters state matching video frame_008
  const [statusFilter, setStatusFilter] = useState("Faol");
  const [teacherFilter, setTeacherFilter] = useState("Feruzbek teacher");
  const [teacherRoleFilter, setTeacherRoleFilter] = useState("Barchasi");
  const [courseFilter, setCourseFilter] = useState("Barchasi");
  const [daysFilter, setDaysFilter] = useState("Barchasi");

  // Active open dropdown tracker
  const [activeDropdown, setActiveDropdown] = useState<
    "status" | "teacher" | "role" | "course" | "days" | null
  >(null);

  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Complete groups list matching video frames (Feruzbek, Gulasal, Ahmadjon, Marjona)
  const [groups, setGroups] = useState<any[]>([]);

  // New Group state
  const [newGroupName, setNewGroupName] = useState("");
  const [newCourse, setNewCourse] = useState("Elementary");
  const [newTeacher, setNewTeacher] = useState("Feruzbek teacher");
  const [newDays, setNewDays] = useState("Toq kunlari");
  const [newTime, setNewTime] = useState("16:00 / 18:00");

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const g = {
      id: groups.length + 1,
      name: newGroupName.trim(),
      course: newCourse,
      teacher: newTeacher,
      supportTeacher: "-",
      teacherRole: "Asosiy o'qituvchi",
      days: newDays,
      time: newTime,
      studentsCount: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "2026-12-31",
      status: "Faol",
      room: "FERUZ 1-xona",
      fee: 300000,
    };
    setGroups([g, ...groups]);
    setIsNewGroupModalOpen(false);
    setNewGroupName("");
  };

  // Full interactive filtering logic
  const filteredGroups = groups.filter((g) => {
    // 1. Search filter
    const matchesSearch =
      !searchTerm ||
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.course.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Status filter
    const matchesStatus =
      statusFilter === "Barchasi" ||
      g.status.toLowerCase() === statusFilter.toLowerCase();

    // 3. Teacher filter
    const matchesTeacher =
      teacherFilter === "Barchasi" ||
      g.teacher.toLowerCase().includes(teacherFilter.toLowerCase());

    // 4. Teacher role filter
    const matchesTeacherRole =
      teacherRoleFilter === "Barchasi" ||
      (teacherRoleFilter === "Support ustoz"
        ? g.supportTeacher && g.supportTeacher !== "-"
        : !g.supportTeacher || g.supportTeacher === "-");

    // 5. Course filter
    const matchesCourse =
      courseFilter === "Barchasi" ||
      g.course.toLowerCase().includes(courseFilter.toLowerCase());

    // 6. Days filter
    const matchesDays =
      daysFilter === "Barchasi" ||
      (daysFilter === "Toq kunlari" &&
        (g.days.includes("Toq") || g.days.includes("Dushanba"))) ||
      (daysFilter === "Juft kunlari" &&
        (g.days.includes("Juft") ||
          g.days.includes("Seshanba") ||
          g.days.includes("Payshanba"))) ||
      g.days.toLowerCase().includes(daysFilter.toLowerCase());

    return (
      matchesSearch &&
      matchesStatus &&
      matchesTeacher &&
      matchesTeacherRole &&
      matchesCourse &&
      matchesDays
    );
  });

  const resetFilters = () => {
    setStatusFilter("Barchasi");
    setTeacherFilter("Barchasi");
    setTeacherRoleFilter("Barchasi");
    setCourseFilter("Barchasi");
    setDaysFilter("Barchasi");
    setSearchTerm("");
    setActiveDropdown(null);
  };

  const hasActiveFilters =
    statusFilter !== "Barchasi" ||
    teacherFilter !== "Barchasi" ||
    teacherRoleFilter !== "Barchasi" ||
    courseFilter !== "Barchasi" ||
    daysFilter !== "Barchasi" ||
    searchTerm !== "";

  return (
    <div className="space-y-5 pb-12 select-none" ref={dropdownRef}>
      {/* Top Header Row with + YANGI QO'SHISH button matching frame_008 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-800">Guruhlar</h1>
          <span className="w-6 h-6 rounded-full border border-[#5d5fef] text-[#5d5fef] text-xs font-bold flex items-center justify-center">
            {filteredGroups.length}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Filtrlarni tozalash"
              className="text-[11px] text-[#5d5fef] hover:underline flex items-center gap-1 ml-2 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Barcha guruhlarni ko'rsatish</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setIsNewGroupModalOpen(true)}
          className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold tracking-wider rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          YANGI QO'SHISH
        </button>
      </div>

      {/* Filter Row matching frame_008.jpg exactly */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 1. Search with tooltip */}
        <div className="relative group min-w-[200px] flex-1 sm:flex-initial">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Qidirish"
            className="w-full h-9 pl-3 pr-8 bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 rounded-lg focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef] outline-hidden shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <div className="absolute -top-8 left-0 hidden group-hover:block bg-[#1e293b] text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-30">
            Guruh nomi va boshlanish vaqti bilan qidiruv
          </div>
        </div>

        {/* 2. Status dropdown (Interaktiv) */}
        <div className="relative min-w-[110px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "status" ? null : "status")
            }
            className={`h-9 px-3 bg-white border text-xs font-semibold rounded-lg flex items-center justify-between w-full transition-all cursor-pointer ${
              activeDropdown === "status"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${statusFilter !== "Barchasi" ? "text-slate-800" : "text-slate-600"}`}
          >
            <div className="flex items-center truncate">
              <span className="text-[10px] text-slate-400 mr-1 font-normal">Status:</span>
              <span className="truncate">{statusFilter}</span>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 ml-1.5 transition-transform ${
                activeDropdown === "status" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "status" && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {["Barchasi", "Faol", "Arxiv"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setStatusFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    statusFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {statusFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. Teacher dropdown (Interaktiv) */}
        <div className="relative min-w-[150px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "teacher" ? null : "teacher")
            }
            className={`h-9 px-3 bg-white border text-xs font-semibold rounded-lg flex items-center justify-between w-full transition-all cursor-pointer ${
              activeDropdown === "teacher"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${teacherFilter !== "Barchasi" ? "text-slate-800" : "text-slate-600"}`}
          >
            <div className="flex items-center truncate max-w-[125px]">
              <span className="text-[10px] text-slate-400 mr-1 font-normal shrink-0">O'qituvchi:</span>
              <span className="truncate">
                {teacherFilter === "Feruzbek teacher" ? "Feruzbek te..." : teacherFilter}
              </span>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 ml-1.5 shrink-0 transition-transform ${
                activeDropdown === "teacher" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "teacher" && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {[
                "Barchasi",
                "Feruzbek teacher",
                "Gulasal teacher",
                "Axmadjon teacher",
                "Marjona teacher",
              ].map((item) => (
                <button
                  key={item}
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

        {/* 4. Teacher Role dropdown (Interaktiv) */}
        <div className="relative min-w-[130px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "role" ? null : "role")
            }
            className={`h-9 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between w-full transition-all cursor-pointer ${
              activeDropdown === "role"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${teacherRoleFilter !== "Barchasi" ? "text-slate-800 font-semibold" : "text-slate-600"}`}
          >
            <span className="truncate">
              {teacherRoleFilter === "Barchasi" ? "O'qituvchi roli" : teacherRoleFilter}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 ml-1.5 shrink-0 transition-transform ${
                activeDropdown === "role" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "role" && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {["Barchasi", "Asosiy o'qituvchi", "Support ustoz"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setTeacherRoleFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    teacherRoleFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {teacherRoleFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Course dropdown (Interaktiv) */}
        <div className="relative min-w-[120px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "course" ? null : "course")
            }
            className={`h-9 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between w-full transition-all cursor-pointer ${
              activeDropdown === "course"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${courseFilter !== "Barchasi" ? "text-slate-800 font-semibold" : "text-slate-600"}`}
          >
            <span className="truncate">
              {courseFilter === "Barchasi" ? "Kurs" : courseFilter}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 ml-1.5 shrink-0 transition-transform ${
                activeDropdown === "course" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "course" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {[
                "Barchasi",
                "Elementary",
                "Pre-IELTS 1",
                "Pre-IELTS 2",
                "IELTS Graduation",
                "Beginner",
                "CEFR",
                "Kids English",
              ].map((item) => (
                <button
                  key={item}
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

        {/* 6. Days dropdown (Interaktiv) */}
        <div className="relative min-w-[130px]">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "days" ? null : "days")
            }
            className={`h-9 px-3 bg-white border text-xs font-medium rounded-lg flex items-center justify-between w-full transition-all cursor-pointer ${
              activeDropdown === "days"
                ? "border-[#5d5fef] ring-1 ring-[#5d5fef]/20"
                : "border-slate-200 hover:border-slate-300"
            } ${daysFilter !== "Barchasi" ? "text-slate-800 font-semibold" : "text-slate-600"}`}
          >
            <span className="truncate">
              {daysFilter === "Barchasi" ? "Dars kunlari" : daysFilter}
            </span>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 ml-1.5 shrink-0 transition-transform ${
                activeDropdown === "days" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "days" && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 text-xs animate-in fade-in zoom-in-95">
              {[
                "Barchasi",
                "Toq kunlari",
                "Juft kunlari",
                "Payshanba, Seshanba, Shanba",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setDaysFilter(item);
                    setActiveDropdown(null);
                  }}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                    daysFilter === item
                      ? "text-[#5d5fef] font-bold bg-indigo-50/40"
                      : "text-slate-700"
                  }`}
                >
                  <span>{item}</span>
                  {daysFilter === item && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* EXCEL Button */}
        <button
          onClick={() => alert("Guruhlar ro'yxati Excel formatida eksport qilinmoqda...")}
          className="h-9 px-3.5 bg-white hover:bg-emerald-50 border border-emerald-500/50 text-emerald-600 font-bold text-xs rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>EXCEL</span>
        </button>

        {/* Grid/List icon */}
        <button className="h-9 w-9 bg-white border border-emerald-500/50 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-50 transition-colors cursor-pointer">
          <LayoutGrid className="w-4 h-4 text-emerald-600" />
        </button>
      </div>

      {/* Groups Table Card matching frame_008.jpg */}
      <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-600 font-semibold bg-[#fafafa]">
                <th className="py-3.5 px-4 w-12">ID</th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1">
                    Guruh nomi
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Kurs</th>
                <th className="py-3.5 px-4">O'qituvchi</th>
                <th className="py-3.5 px-4">Support ustoz</th>
                <th className="py-3.5 px-4">Dars kunlari</th>
                <th className="py-3.5 px-4">Dars vaqti</th>
                <th className="py-3.5 px-4 text-center">O'quvchilar soni</th>
                <th className="py-3.5 px-4">Ochilgan</th>
                <th className="py-3.5 px-4">Yakunlanadi</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGroups.map((group, index) => (
                <tr
                  key={group.id}
                  onClick={() => onSelectGroup(group)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 text-slate-400 font-medium">
                    {index + 1}.
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 group-hover:text-[#5d5fef] transition-colors">
                      {group.name}
                    </div>
                    {group.remainingDaysBadge && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        {group.remainingDaysBadge}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {group.course}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {group.teacher}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {group.supportTeacher || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                    {group.days}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {group.time}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                    {group.studentsCount}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {group.startDate}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {group.endDate}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        group.status === "Faol"
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      <span>✓</span>
                      <span>{group.status}</span>
                    </span>
                  </td>
                  <td
                    className="py-3.5 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredGroups.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400">
                    Tanlangan filtrlar bo'yicha guruhlar topilmadi.
                    <button
                      onClick={resetFilters}
                      className="text-[#5d5fef] font-semibold hover:underline block mx-auto mt-2 text-xs"
                    >
                      Barcha filtrlarni tozalash
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination row matching frame_008 */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <div className="flex items-center gap-2">
          <select className="h-8 px-2 bg-white border border-slate-200 rounded-lg outline-hidden text-xs">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Jami {filteredGroups.length} ta guruh ko'rsatilmoqda</span>
        </div>
      </div>

      {/* New Group Modal */}
      {isNewGroupModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Yangi guruh ochish</h3>
              <button
                onClick={() => setIsNewGroupModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Guruh nomi
                </label>
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Masalan: Feruzbek E 2-4"
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-[#5d5fef] outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kurs</label>
                  <select
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-[#5d5fef] outline-hidden bg-white"
                  >
                    <option>Elementary</option>
                    <option>Pre-IELTS 1</option>
                    <option>Pre-IELTS 2</option>
                    <option>IELTS Graduation</option>
                    <option>Beginner</option>
                    <option>CEFR</option>
                    <option>Kids English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    O'qituvchi
                  </label>
                  <select
                    value={newTeacher}
                    onChange={(e) => setNewTeacher(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-[#5d5fef] outline-hidden bg-white"
                  >
                    <option>Feruzbek teacher</option>
                    <option>Gulasal teacher</option>
                    <option>Axmadjon teacher</option>
                    <option>Marjona teacher</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Dars kunlari
                  </label>
                  <select
                    value={newDays}
                    onChange={(e) => setNewDays(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-[#5d5fef] outline-hidden bg-white"
                  >
                    <option>Toq kunlari</option>
                    <option>Juft kunlari</option>
                    <option>Payshanba, Seshanba, Shanba</option>
                    <option>Har kuni</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Dars vaqti
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="16:00 / 18:00"
                    className="w-full p-2.5 border border-slate-200 rounded-lg focus:border-[#5d5fef] outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewGroupModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 font-semibold rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] font-bold text-white rounded-lg shadow-sm cursor-pointer"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
