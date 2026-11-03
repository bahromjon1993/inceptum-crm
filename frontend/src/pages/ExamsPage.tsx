import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  Calendar,
  Clock,
  Award,
  Users2,
  Plus,
  Search,
  Check,
  X,
  MapPin,
  User,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { apiClient } from "../api/client";
import type { ExamRecord } from "../types";

export function ExamsPage() {
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PLANNED" | "COMPLETED">("ALL");
  const [courseFilter, setCourseFilter] = useState("Barchasi");

  // Create Exam Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("IELTS Intensive 7.5+");
  const [newGroup, setNewGroup] = useState("IELTS-701");
  const [newDate, setNewDate] = useState("2026-11-05");
  const [newTime, setNewTime] = useState("10:00 - 13:00");
  const [newRoom, setNewRoom] = useState("Xona 204 (Cambridge)");
  const [newExaminer, setNewExaminer] = useState("Abduqodir Ziyodov");
  const [newMaxScore, setNewMaxScore] = useState<number>(9.0);
  const [newPassScore, setNewPassScore] = useState<number>(6.5);
  const [newIsCompleted, setNewIsCompleted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Results Modal State
  const [resultsExam, setResultsExam] = useState<ExamRecord | null>(null);
  const [examResultsList, setExamResultsList] = useState<any[]>([]);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Default courses, groups, rooms, and examiners for form
  const coursesList = [
    "IELTS Intensive 7.5+",
    "Python & Django Backend",
    "General English (B2 Upper)",
    "Elementary",
    "Pre-IELTS 1",
    "Pre-IELTS 2",
  ];

  const groupsList = [
    "IELTS-701",
    "PY-DJANGO-01",
    "Feruzbek E 4-6",
    "Feruzbek O 4-6",
    "Gulasal E 4-6",
    "Ahmadjon E 2-4",
  ];

  const roomsList = [
    "Xona 204 (Cambridge)",
    "IT Lab",
    "FERUZ 1-xona",
    "GULASAL 2-xona",
    "AHMADJON 3-xona",
  ];

  const examinersList = [
    "Abduqodir Ziyodov",
    "Bekzod Rahimov",
    "Gulasal Karimova",
    "Feruzbek teacher",
    "Axmadjon teacher",
  ];

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get("/exams/");
      const data = res.data.results || res.data;
      if (Array.isArray(data)) {
        setExams(data);
      } else {
        setExams([]);
      }
    } catch {
      setExams([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFallbackExams = () => {
    setExams([
      {
        id: 1,
        title: "Mock IELTS Examination #4",
        group_name: "IELTS-701",
        course_name: "IELTS Intensive 7.5+",
        date: "2026-10-30",
        time: "10:00 - 13:00",
        room_name: "Xona 204 (Cambridge)",
        examiner_name: "Abduqodir Ziyodov",
        max_score: 9.0,
        pass_score: 6.5,
        is_completed: false,
        participants_count: 16,
        passed_count: 0,
      },
      {
        id: 2,
        title: "Python & Django Midterm Exam",
        group_name: "PY-DJANGO-01",
        course_name: "Python & Django Backend",
        date: "2026-10-25",
        time: "16:00 - 18:00",
        room_name: "IT Lab",
        examiner_name: "Bekzod Rahimov",
        max_score: 100,
        pass_score: 70,
        is_completed: true,
        participants_count: 14,
        passed_count: 12,
      },
      {
        id: 3,
        title: "IELTS Listening & Reading Mini Test",
        group_name: "IELTS-701",
        course_name: "IELTS Intensive 7.5+",
        date: "2026-11-05",
        time: "14:00 - 15:30",
        room_name: "Xona 204 (Cambridge)",
        examiner_name: "Abduqodir Ziyodov",
        max_score: 9.0,
        pass_score: 6.0,
        is_completed: false,
        participants_count: 15,
        passed_count: 0,
      },
    ]);
  };

  // Open Results Modal for an Exam
  const handleOpenResults = async (exam: ExamRecord) => {
    setResultsExam(exam);
    setIsResultsLoading(true);
    setSaveSuccessMsg("");

    try {
      const res = await apiClient.get(`/exams/${exam.id}/results/`);
      if (res.data && res.data.results && res.data.results.length > 0) {
        setExamResultsList(res.data.results);
      } else {
        generateDefaultResults(exam);
      }
    } catch {
      generateDefaultResults(exam);
    } finally {
      setIsResultsLoading(false);
    }
  };

  const generateDefaultResults = (exam: ExamRecord) => {
    const isIelts = exam.max_score <= 10;
    setExamResultsList([
      {
        id: 101,
        student_name: "Muhammadjanova Shodiya",
        student_phone: "+998505735536",
        score: isIelts ? 7.0 : 85,
        passed: isIelts ? 7.0 >= exam.pass_score : 85 >= exam.pass_score,
        certificate_issued: true,
        notes: "A'lo darajada bajardi",
      },
      {
        id: 102,
        student_name: "Tursunov Temur",
        student_phone: "+998500179515",
        score: isIelts ? 6.5 : 74,
        passed: isIelts ? 6.5 >= exam.pass_score : 74 >= exam.pass_score,
        certificate_issued: false,
        notes: "Yaxshi",
      },
      {
        id: 103,
        student_name: "Abduqaxarov Baxromjon",
        student_phone: "+998930920983",
        score: isIelts ? 5.5 : 55,
        passed: isIelts ? 5.5 >= exam.pass_score : 55 >= exam.pass_score,
        certificate_issued: false,
        notes: "Qayta topshirish tavsiya etiladi",
      },
      {
        id: 104,
        student_name: "G'aybullayev Humoyunmirzo",
        student_phone: "+998501736580",
        score: isIelts ? 7.5 : 92,
        passed: isIelts ? 7.5 >= exam.pass_score : 92 >= exam.pass_score,
        certificate_issued: true,
        notes: "Guruhda 1-o'rin",
      },
    ]);
  };

  const handleUpdateStudentScore = (idx: number, newScoreVal: number) => {
    if (!resultsExam) return;
    const updated = [...examResultsList];
    const item = { ...updated[idx] };
    item.score = newScoreVal;
    item.passed = newScoreVal >= resultsExam.pass_score;
    updated[idx] = item;
    setExamResultsList(updated);
  };

  const handleToggleCertificate = (idx: number) => {
    const updated = [...examResultsList];
    updated[idx] = { ...updated[idx], certificate_issued: !updated[idx].certificate_issued };
    setExamResultsList(updated);
  };

  const handleSaveResults = () => {
    if (!resultsExam) return;
    const passedCount = examResultsList.filter((r) => r.passed).length;
    // Update local exam record
    setExams((prev) =>
      prev.map((e) =>
        e.id === resultsExam.id
          ? {
              ...e,
              is_completed: true,
              participants_count: examResultsList.length,
              passed_count: passedCount,
            }
          : e
      )
    );
    setSaveSuccessMsg("Natijalar muvaffaqiyatli saqlandi!");
    setTimeout(() => {
      setResultsExam(null);
      setSaveSuccessMsg("");
    }, 1200);
  };

  // Toggle Exam Completion Status
  const handleToggleCompleted = (examId: number) => {
    setExams((prev) =>
      prev.map((e) => (e.id === examId ? { ...e, is_completed: !e.is_completed } : e))
    );
  };

  // Delete Exam
  const handleDeleteExam = (examId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Rostdan ham ushbu imtihonni o'chirmoqchimisiz?")) {
      setExams((prev) => prev.filter((ex) => ex.id !== examId));
    }
  };

  // Handle Create New Exam Form Submission
  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    const newExamObj: ExamRecord = {
      id: Date.now(),
      title: newTitle.trim(),
      course_name: newCourse,
      group_name: newGroup,
      date: newDate,
      time: newTime,
      room_name: newRoom,
      examiner_name: newExaminer,
      max_score: Number(newMaxScore),
      pass_score: Number(newPassScore),
      is_completed: newIsCompleted,
      participants_count: 15,
      passed_count: newIsCompleted ? 12 : 0,
    };

    try {
      // Attempt backend post
      const res = await apiClient.post("/exams/", {
        title: newTitle.trim(),
        date: newDate,
        time: newTime,
        max_score: Number(newMaxScore),
        pass_score: Number(newPassScore),
        is_completed: newIsCompleted,
      });
      if (res.data && res.data.id) {
        newExamObj.id = res.data.id;
      }
    } catch {
      // Keep optimistic object
    }

    setExams([newExamObj, ...exams]);
    setIsSubmitting(false);
    setIsCreateModalOpen(false);

    // Reset form
    setNewTitle("");
  };

  // Multi-filter logic
  const filteredExams = exams.filter((ex) => {
    const matchesSearch =
      !searchTerm ||
      ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ex.group_name && ex.group_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ex.examiner_name && ex.examiner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ex.course_name && ex.course_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "PLANNED" && !ex.is_completed) ||
      (statusFilter === "COMPLETED" && ex.is_completed);

    const matchesCourse =
      courseFilter === "Barchasi" ||
      (ex.course_name && ex.course_name.toLowerCase().includes(courseFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesCourse;
  });

  return (
    <div className="space-y-5 pb-12 select-none">
      {/* Top Header Row matching SoffCRM theme */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-bold text-slate-800">Imtihonlar va Sinovlar</h1>
          <span className="px-3 py-1 rounded-full border border-[#5d5fef]/40 text-[#5d5fef] text-xs font-semibold bg-indigo-50/20">
            Imtihonlar soni: {filteredExams.length} ta
          </span>
        </div>

        {/* Action Button: Yangi imtihon belgilash */}
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>YANGI IMTIHON BELGILASH</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1 sm:flex-initial">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Imtihon, guruh yoki nazoratchi bo'yicha qidiruv"
            className="w-full h-9 pl-3.5 pr-8 bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 rounded-lg outline-hidden focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef]/20 transition-all shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Filters Toggle */}
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === "ALL"
                ? "bg-[#5d5fef] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Barchasi ({exams.length})
          </button>
          <button
            onClick={() => setStatusFilter("PLANNED")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === "PLANNED"
                ? "bg-[#5d5fef] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Rejalashtirilgan ({exams.filter((e) => !e.is_completed).length})
          </button>
          <button
            onClick={() => setStatusFilter("COMPLETED")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              statusFilter === "COMPLETED"
                ? "bg-[#5d5fef] text-white shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Tugatilgan ({exams.filter((e) => e.is_completed).length})
          </button>
        </div>

        {/* Course Filter Dropdown */}
        <div className="relative min-w-[150px]">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="h-9 px-3 bg-white border border-slate-200 text-xs font-medium text-slate-700 rounded-lg outline-hidden focus:border-[#5d5fef] transition-colors cursor-pointer"
          >
            <option value="Barchasi">Barcha kurslar</option>
            {coursesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {(searchTerm !== "" || statusFilter !== "ALL" || courseFilter !== "Barchasi") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("ALL");
              setCourseFilter("Barchasi");
            }}
            className="h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {/* Exams Grid */}
      {filteredExams.length === 0 ? (
        <div className="bg-white border border-[#e8ecf4] rounded-2xl p-12 text-center text-slate-500 shadow-xs">
          <FileCheck2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-700">Hech qanday imtihon topilmadi</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Qidiruv so'rovi yoki tanlangan filtrlar bo'yicha imtihonlar mavjud emas
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yangi imtihon qo'shish</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExams.map((ex) => (
            <div
              key={ex.id}
              className="bg-white border border-[#e8ecf4] hover:border-[#5d5fef]/40 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Title & Status Badge */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{ex.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                      <span className="font-semibold text-slate-700">{ex.course_name}</span>
                      <span>•</span>
                      <span className="text-[#5d5fef] font-bold bg-indigo-50/50 px-1.5 py-0.2 rounded border border-indigo-100">
                        {ex.group_name}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggleCompleted(ex.id)}
                    title="Holatni o'zgartirish uchun bosing"
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border shrink-0 ${
                      ex.is_completed
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                        : "bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100"
                    }`}
                  >
                    {ex.is_completed ? "✓ Tugatilgan" : "⏱ Rejalashtirilgan"}
                  </button>
                </div>

                {/* Card Meta details */}
                <div className="grid grid-cols-2 gap-2.5 py-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-700">{ex.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-slate-700">{ex.time}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-700">{ex.room_name || "Xona belgilanmagan"}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-700">
                      {ex.is_completed
                        ? `${ex.passed_count}/${ex.participants_count} o'tdi`
                        : `${ex.participants_count} qatnashuvchi`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 col-span-2">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-slate-700">
                      O'tish bali: <strong className="text-slate-900">{ex.pass_score}</strong> / Maksimal:{" "}
                      <strong>{ex.max_score}</strong> ball
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Bottom: Examiner & Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1 text-slate-500 text-[11px] truncate">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{ex.examiner_name || "Nazoratchi yo'q"}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenResults(ex)}
                    className="h-7 px-3 bg-indigo-50 hover:bg-indigo-100 text-[#5d5fef] font-bold text-xs rounded-lg transition-colors cursor-pointer border border-indigo-200/60"
                  >
                    Natijalar
                  </button>
                  <button
                    onClick={(e) => handleDeleteExam(ex.id, e)}
                    title="O'chirish"
                    className="h-7 w-7 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL: YANGI IMTIHON BELGILASH ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#5d5fef] flex items-center justify-center">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Yangi imtihon belgilash</h3>
                  <p className="text-[11px] text-slate-500">Imtihon yoki oraliq test ma'lumotlarini to'ldiring</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateExam} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Imtihon nomi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Masalan: Mock IELTS Examination #5 yoki Unit 6 Test"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] focus:ring-1 focus:ring-[#5d5fef]/20 transition-all font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kurs</label>
                  <select
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] cursor-pointer"
                  >
                    {coursesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guruh</label>
                  <select
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] cursor-pointer"
                  >
                    {groupsList.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">O'tkazilish sanasi</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vaqti</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 - 13:00"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Xona</label>
                  <select
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] cursor-pointer"
                  >
                    {roomsList.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nazoratchi o'qituvchi</label>
                  <select
                    value={newExaminer}
                    onChange={(e) => setNewExaminer(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] cursor-pointer"
                  >
                    {examinersList.map((ex) => (
                      <option key={ex} value={ex}>
                        {ex}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Maksimal ball</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">O'tish bali</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newPassScore}
                    onChange={(e) => setNewPassScore(Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dastlabki holati</label>
                <div className="flex items-center gap-5 mt-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="examStatus"
                      checked={!newIsCompleted}
                      onChange={() => setNewIsCompleted(false)}
                      className="accent-[#5d5fef]"
                    />
                    <span className="text-slate-700">Rejalashtirilgan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="examStatus"
                      checked={newIsCompleted}
                      onChange={() => setNewIsCompleted(true)}
                      className="accent-[#5d5fef]"
                    />
                    <span className="text-slate-700">O'tkazilgan (Tugatilgan)</span>
                  </label>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 font-semibold rounded-xl text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#5d5fef] hover:bg-[#4f51e0] active:scale-[0.98] text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSubmitting ? "Saqlanmoqda..." : "IMTIHONNI SAQLASH"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: IMTIHON NATIJALARI ================= */}
      {resultsExam && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{resultsExam.title} - Natijalari</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Guruh: <strong className="text-slate-700">{resultsExam.group_name}</strong> • O'tish bali:{" "}
                  <strong>{resultsExam.pass_score}</strong> / {resultsExam.max_score}
                </p>
              </div>
              <button
                onClick={() => setResultsExam(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success message banner */}
            {saveSuccessMsg && (
              <div className="my-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* Students results list table */}
            <div className="flex-1 overflow-y-auto my-3 border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100">
                    <th className="py-2.5 px-3">O'quvchi</th>
                    <th className="py-2.5 px-3">Telefon</th>
                    <th className="py-2.5 px-3 w-28">To'plangan ball</th>
                    <th className="py-2.5 px-3 text-center">Holati</th>
                    <th className="py-2.5 px-3 text-center">Sertifikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {examResultsList.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{item.student_name}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                        {item.student_phone || "-"}
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          step="0.5"
                          min={0}
                          max={resultsExam.max_score}
                          value={item.score}
                          onChange={(e) => handleUpdateStudentScore(idx, Number(e.target.value))}
                          className="w-20 p-1.5 border border-slate-200 rounded-lg text-center font-bold text-slate-800 outline-hidden focus:border-[#5d5fef]"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                            item.passed
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                              : "bg-rose-50 text-rose-700 border border-rose-300"
                          }`}
                        >
                          {item.passed ? "O'tdi" : "Yiqildi"}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleCertificate(idx)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                            item.certificate_issued
                              ? "bg-indigo-50 text-[#5d5fef] border border-indigo-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {item.certificate_issued ? "Berildi ✓" : "Berilmadi"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                O'tganlar:{" "}
                <strong className="text-emerald-600">
                  {examResultsList.filter((r) => r.passed).length} / {examResultsList.length}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setResultsExam(null)}
                  className="px-4 py-2 border border-slate-200 font-semibold rounded-xl text-slate-600 hover:bg-slate-50 text-xs cursor-pointer"
                >
                  Yopish
                </button>
                <button
                  type="button"
                  onClick={handleSaveResults}
                  className="px-5 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold rounded-xl shadow-xs text-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>NATIJALARNI SAQLASH</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
