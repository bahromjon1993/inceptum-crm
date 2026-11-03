import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  FileText,
  UserCheck,
  Layers,
  GraduationCap,
  CheckSquare,
  Settings,
  TrendingUp,
  BarChart3,
  Search,
  Bell,
  Shield,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Command,
  LogOut,
  Users,
  Award,
  Sparkles,
  ExternalLink,
  Check,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Trash2,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";

interface SoffcrmHeaderProps {
  currentTab: string;
  currentSettingsSubView?: string;
  currentReportsSubView?: string;
  onTabChange: (tab: string, subView?: string) => void;
  onOpenPaymentModal: () => void;
  onOpenAuditLogs: () => void;
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
}

export function SoffcrmHeader({
  currentTab,
  currentSettingsSubView = "receipt",
  currentReportsSubView = "payment",
  onTabChange,
  onOpenPaymentModal,
  onOpenAuditLogs,
  selectedBranch,
  onBranchChange,
}: SoffcrmHeaderProps) {
  const { user, role, switchRoleDemo, logout } = useAuth();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [expandedSettingsMenu, setExpandedSettingsMenu] = useState<string | null>("ofis");
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNotifTab, setActiveNotifTab] = useState<"all" | "payment" | "leads">("all");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Realistic CRM Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "To'lov muddati kechikmoqda",
      message: "Javohir Toshpo'latov (Frontend Bootcamp) to'lov muddati 2 kunga o'tdi.",
      time: "15 daqiqa oldin",
      unread: true,
      category: "payment",
      type: "alert",
    },
    {
      id: 2,
      title: "Yangi to'lov qabul qilindi",
      message: "Madina Karimova 1,200,000 so'm naqd to'lov qabul qildi (Chek #8921).",
      time: "1 soat oldin",
      unread: true,
      category: "payment",
      type: "success",
    },
    {
      id: 3,
      title: "Yangi lid ro'yxatdan o'tdi",
      message: "Kamronbek Aliyev Telegram orqali 'Python Backend' guruhiga ariza qoldirdi.",
      time: "3 soat oldin",
      unread: false,
      category: "leads",
      type: "lead",
    },
    {
      id: 4,
      title: "Dars xonasi yangilandi",
      message: "IELTS 7.0 Master guruhi darsi bugun 204-xonada o'tiladi.",
      time: "Bugun 09:30",
      unread: false,
      category: "system",
      type: "info",
    },
  ]);

  const settingsRef = useRef<HTMLDivElement>(null);
  const reportsRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem("inceptum_theme");
    const isDark = savedTheme === "dark" || (savedTheme === null && document.documentElement.classList.contains("dark"));
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Close popups on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
      if (reportsRef.current && !reportsRef.current.contains(event.target as Node)) {
        setIsReportsOpen(false);
      }
      if (branchRef.current && !branchRef.current.contains(event.target as Node)) {
        setIsBranchDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("inceptum_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("inceptum_theme", "light");
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeNotifTab === "all") return true;
    return n.category === activeNotifTab;
  });

  const navItems = [
    { id: "dashboard", label: "Bosh sahifa", icon: Home },
    { id: "leads", label: "Lidlar", icon: FileText },
    { id: "mentors", label: "O'qituvchilar", icon: UserCheck },
    { id: "groups", label: "Guruhlar", icon: Layers },
    { id: "students", label: "O'quvchilar", icon: GraduationCap },
    { id: "exams", label: "Imtihonlar", icon: CheckSquare },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#111827] border-b border-[#e8ecf4] dark:border-slate-800 shadow-xs select-none transition-colors duration-200">
      {/* 1. TOP NAVBAR */}
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: SoffCRM + INCEPTUM Logo */}
        <div
          onClick={() => onTabChange("dashboard")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
        >
          {/* Stylized SoffCRM S-Logo */}
          <div className="relative flex items-center">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#10b981]"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 4C10.268 4 4 10.268 4 18C4 21.866 5.567 25.366 8.1 27.9L11.5 24.5C9.9 22.8 9 20.5 9 18C9 13.03 13.03 9 18 9C22.97 9 27 13.03 27 18C27 22.97 22.97 27 18 27C16.8 27 15.6 26.7 14.6 26.2L11.8 29.5C13.6 30.5 15.7 31 18 31C25.732 31 32 24.732 32 18C32 10.268 25.732 4 18 4Z"
                fill="url(#soff-grad)"
              />
              <circle cx="18" cy="18" r="4.5" fill="#10b981" />
              <defs>
                <linearGradient id="soff-grad" x1="4" y1="4" x2="32" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ml-2 leading-tight">
              <div className="flex items-center">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#1e293b] dark:text-white">
                  Soff<span className="text-[#10b981]">CRM</span>
                </span>
                <span className="hidden sm:inline ml-1.5 sm:ml-2 text-xs sm:text-base font-bold tracking-wider text-[#64748b]">
                  INCEPTUM
                </span>
              </div>
              <div className="hidden sm:block text-[9px] uppercase tracking-wider font-semibold text-[#94a3b8] -mt-0.5">
                Smart Solutions For Success
              </div>
            </div>
          </div>
        </div>

        {/* Center: Global Search Input */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              className="w-full h-10 pl-10 pr-16 bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-[#5d5fef] focus:ring-2 focus:ring-[#5d5fef]/15 transition-all outline-hidden"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-400">
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
              <div className="h-4 w-px bg-slate-200" />
              <div className="px-1.5 py-0.5 bg-slate-200/80 rounded text-[10px] font-mono text-slate-600 flex items-center gap-0.5">
                <span>⌘</span>K
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Blue TO'LOV button */}
          <button
            onClick={onOpenPaymentModal}
            className="h-8 sm:h-10 px-2.5 sm:px-5 bg-[#5d5fef] hover:bg-[#4f51e0] active:scale-[0.98] text-white font-bold text-[11px] sm:text-xs tracking-wider rounded-lg shadow-sm transition-all flex items-center gap-1 sm:gap-2 cursor-pointer shrink-0"
          >
            <span className="text-sm">💳</span>
            <span>TO'LOV</span>
          </button>

          {/* Branch Selector Dropdown - hidden on small mobile, available in mobile menu */}
          <div className="relative hidden md:block" ref={branchRef}>
            <button
              onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
              className="h-10 px-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{selectedBranch}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isBranchDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95">
                {["INCEPTUM Filiali", "Chilonzor filiali", "Yunusobod filiali", "Barcha filiallar"].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      onBranchChange(b);
                      setIsBranchDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                      selectedBranch === b
                        ? "bg-[#5d5fef]/10 text-[#5d5fef] font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDarkMode ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="h-4 w-4 animate-in duration-300" />
            )}
          </button>

          {/* Flag (Uzbekistan) - visible on desktop */}
          <div
            title="O'zbek tili"
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer text-base"
          >
            🇺🇿
          </div>

          {/* Security Shield Icon (Audit Logs) - visible on desktop */}
          <button
            onClick={onOpenAuditLogs}
            title="Xavfsizlik va Harakatlar tarixi"
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer relative"
          >
            <Shield className="h-4 w-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            title="Mobil menyu"
            className="md:hidden h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Bell Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              title="Bildirishnomalar"
              className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer relative ${
                isNotificationsOpen
                  ? "bg-[#5d5fef]/10 text-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-white shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-0 z-50 animate-in fade-in zoom-in-95 overflow-hidden">
                {/* Header */}
                <div className="p-3.5 px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Bildirishnomalar
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                        {unreadCount} yangi
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-medium text-[#5d5fef] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      <span>Barchasini o'qildi qilish</span>
                    </button>
                  )}
                </div>

                {/* Filter tabs */}
                <div className="px-4 pt-2.5 pb-2 flex gap-1.5 border-b border-slate-100 bg-white">
                  <button
                    onClick={() => setActiveNotifTab("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeNotifTab === "all"
                        ? "bg-[#5d5fef] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    Barchasi ({notifications.length})
                  </button>
                  <button
                    onClick={() => setActiveNotifTab("payment")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeNotifTab === "payment"
                        ? "bg-[#5d5fef] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    To'lovlar
                  </button>
                  <button
                    onClick={() => setActiveNotifTab("leads")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      activeNotifTab === "leads"
                        ? "bg-[#5d5fef] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    Lidlar
                  </button>
                </div>

                {/* Notifications items */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {filteredNotifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Hech qanday bildirishnoma yo'q
                    </div>
                  ) : (
                    filteredNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3.5 hover:bg-slate-50/80 transition-colors flex items-start gap-3 cursor-pointer ${
                          n.unread ? "bg-indigo-50/20" : ""
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            n.type === "alert"
                              ? "bg-rose-100 text-rose-600"
                              : n.type === "success"
                              ? "bg-emerald-100 text-emerald-600"
                              : n.type === "lead"
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {n.type === "alert" && <AlertTriangle className="w-4 h-4" />}
                          {n.type === "success" && <CheckCircle2 className="w-4 h-4" />}
                          {n.type === "lead" && <Users className="w-4 h-4" />}
                          {n.type === "info" && <Clock className="w-4 h-4" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {n.title}
                            </span>
                            {n.unread && (
                              <span className="w-2 h-2 rounded-full bg-[#5d5fef] shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                            {n.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-[10px] text-slate-400 font-mono">
                              {n.time}
                            </span>
                            {n.category === "payment" && n.type === "alert" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsNotificationsOpen(false);
                                  onOpenPaymentModal();
                                }}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#5d5fef] text-white hover:bg-[#4d4fd9] transition-colors cursor-pointer"
                              >
                                To'lov qabul qilish
                              </button>
                            )}
                            {n.category === "leads" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsNotificationsOpen(false);
                                  onTabChange("leads");
                                }}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                              >
                                Lidlarga o'tish
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                    <button
                      onClick={clearAllNotifications}
                      className="px-3 py-1.5 text-[11px] font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Barchasini tozalash</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-medium pr-2">
                      INCEPTUM xabarlar markazi
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Avatar with Online Dot */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="relative flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-[#5d5fef]/30 transition-all cursor-pointer"
            >
              <div className="h-9 w-9 rounded-full bg-slate-200 border-2 border-white shadow-xs overflow-hidden flex items-center justify-center text-slate-700 font-bold text-xs">
                {user?.first_name?.charAt(0) || "I"}
                {user?.last_name?.charAt(0) || "E"}
              </div>
              {/* Green online badge dot */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#10b981] ring-2 ring-white" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{user?.full_name || "Imron Erkinov"}</div>
                  <div className="text-xs text-slate-500">{user?.phone_number || "+998 99 324 02 23"}</div>
                  <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5d5fef]/10 text-[#5d5fef]">
                    {user?.role_display || "CEO / Administrator"}
                  </div>
                </div>

                <div className="py-1">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Rolni almashtirish (Demo)
                  </div>
                  {(["CEO", "ADMIN", "TEACHER", "OPERATOR", "STUDENT"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRoleDemo(r);
                        setIsProfileOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                        role === r
                          ? "bg-[#5d5fef]/10 text-[#5d5fef] font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{r}</span>
                      {role === r && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          {/* Mobile Branch Selector */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Filialni tanlash
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["INCEPTUM Filiali", "Chilonzor filiali", "Yunusobod filiali", "Barcha filiallar"].map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    onBranchChange(b);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold text-left transition-all ${
                    selectedBranch === b
                      ? "bg-[#5d5fef] text-white shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Links */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Asosiy bo'limlar
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "dashboard", label: "Boshqaruv", icon: Home },
                { id: "leads", label: "Lidlar", icon: FileText },
                { id: "mentors", label: "O'qituvchilar", icon: UserCheck },
                { id: "groups", label: "Guruhlar", icon: Layers },
                { id: "students", label: "O'quvchilar", icon: GraduationCap },
                { id: "exams", label: "Imtihonlar", icon: CheckSquare },
                { id: "finance", label: "Moliya", icon: TrendingUp },
                { id: "settings", label: "Sozlamalar", icon: Settings },
                { id: "reports", label: "Hisobotlar", icon: ClipboardList },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                      isActive
                        ? "bg-[#5d5fef] text-white shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Mobile Actions */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAuditLogs();
              }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 py-1.5 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#5d5fef]" />
              <span>Xavfsizlik tarixi</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 py-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. SUB-NAVBAR TABS (Scrollable & Responsive) */}
      <div className="w-full bg-white dark:bg-[#111827] border-t border-slate-100/80 dark:border-slate-800/80">
        <div className="max-w-[1720px] mx-auto px-2 sm:px-6 overflow-x-auto lg:overflow-visible no-scrollbar py-1.5 scroll-smooth touch-scroll">
          <nav className="flex items-center gap-1 sm:gap-1.5 w-max min-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#5d5fef] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* 3. SOZLAMALAR DROPDOWN (1:1 with frame_031 & frame_038) */}
          <div
            className="relative"
            ref={settingsRef}
            onMouseEnter={() => {
              setIsSettingsOpen(true);
              setIsReportsOpen(false);
            }}
            onMouseLeave={() => setIsSettingsOpen(false)}
          >
            <button
              onClick={() => {
                onTabChange("settings");
                setIsSettingsOpen((prev) => !prev);
                setIsReportsOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                currentTab === "settings"
                  ? "bg-[#5d5fef] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <Settings
                className={`h-4 w-4 ${
                  currentTab === "settings" ? "text-white" : "text-slate-500"
                }`}
              />
              <span>Sozlamalar</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-70 transition-transform ${
                  isSettingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isSettingsOpen && (
              <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-in fade-in zoom-in-95 text-[13px] select-none">
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-100/90 dark:border-slate-800 py-2.5">
                {/* 1. SMS sozlamalari */}
                <button
                  onClick={() => {
                    onTabChange("settings", "sms");
                    setIsSettingsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    currentTab === "settings" && currentSettingsSubView === "sms"
                      ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      currentTab === "settings" && currentSettingsSubView === "sms"
                        ? "bg-[#5d5fef]"
                        : "bg-slate-400"
                    }`}
                  />
                  <span>SMS sozlamalari</span>
                </button>

                {/* 2. Chek sozlamalari */}
                <button
                  onClick={() => {
                    onTabChange("settings", "receipt");
                    setIsSettingsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    currentTab === "settings" && currentSettingsSubView === "receipt"
                      ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      currentTab === "settings" && currentSettingsSubView === "receipt"
                        ? "bg-[#5d5fef]"
                        : "bg-slate-400"
                    }`}
                  />
                  <span>Chek sozlamalari</span>
                </button>

                {/* 3. Ofis Accordion matching frame_031 & frame_038 */}
                <div>
                  <button
                    onClick={() =>
                      setExpandedSettingsMenu(expandedSettingsMenu === "ofis" ? null : "ofis")
                    }
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="font-normal">Ofis</span>
                    </div>
                    {expandedSettingsMenu === "ofis" ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {expandedSettingsMenu === "ofis" && (
                    <div className="py-0.5 space-y-0.5 animate-in fade-in">
                      {[
                        { key: "courses", label: "Kurslar" },
                        { key: "rooms", label: "Xonalar" },
                        { key: "holidays", label: "Dam olish kunlari" },
                        { key: "schools", label: "Maktablar" },
                        { key: "coins", label: "Coin sozlamalari" },
                        { key: "test_settings", label: "Test sozlamalari" },
                      ].map((item) => {
                        const active =
                          currentTab === "settings" && currentSettingsSubView === item.key;
                        return (
                          <button
                            key={item.key}
                            onClick={() => {
                              onTabChange("settings", item.key);
                              setIsSettingsOpen(false);
                            }}
                            className={`w-full text-left pl-7 pr-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                              active
                                ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                active ? "bg-[#5d5fef]" : "bg-slate-400"
                              }`}
                            />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 4. CEO Accordion matching frame_041 & frame_042 */}
                <div>
                  <button
                    onClick={() =>
                      setExpandedSettingsMenu(expandedSettingsMenu === "ceo" ? null : "ceo")
                    }
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="font-normal">CEO</span>
                    </div>
                    {expandedSettingsMenu === "ceo" ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {expandedSettingsMenu === "ceo" && (
                    <div className="py-0.5 space-y-0.5 animate-in fade-in">
                      {[
                        { key: "ceo_all", label: "Umumiy sozlamalar" },
                        { key: "staff", label: "Xodimlar" },
                        { key: "roles", label: "Rollar", badge: "Beta" },
                      ].map((item) => {
                        const active =
                          currentTab === "settings" && currentSettingsSubView === item.key;
                        return (
                          <button
                            key={item.key}
                            onClick={() => {
                              onTabChange("settings", item.key);
                              setIsSettingsOpen(false);
                            }}
                            className={`w-full text-left pl-7 pr-4 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                              active
                                ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  active ? "bg-[#5d5fef]" : "bg-slate-400"
                                }`}
                              />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 bg-amber-400 text-slate-900 rounded-sm text-[9px] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 5. Harakatlar tarixi Accordion matching frame_046 & frame_047 */}
                <div>
                  <button
                    onClick={() =>
                      setExpandedSettingsMenu(expandedSettingsMenu === "logs" ? null : "logs")
                    }
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="font-normal">Harakatlar tarixi</span>
                    </div>
                    {expandedSettingsMenu === "logs" ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {expandedSettingsMenu === "logs" && (
                    <div className="py-0.5 space-y-0.5 animate-in fade-in">
                      {[
                        { key: "calls_log", label: "Qo'ng'iroqlar" },
                        { key: "logins", label: "Tizimga kirishlar" },
                        { key: "payment_history", label: "To'lovlar" },
                        { key: "bot_notifications", label: "Bot xabarnoma" },
                        { key: "sms_history", label: "Yuborilgan SMSlar" },
                      ].map((item) => {
                        const active =
                          currentTab === "settings" && currentSettingsSubView === item.key;
                        return (
                          <button
                            key={item.key}
                            onClick={() => {
                              onTabChange("settings", item.key);
                              setIsSettingsOpen(false);
                            }}
                            className={`w-full text-left pl-7 pr-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                              active
                                ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                active ? "bg-[#5d5fef]" : "bg-slate-400"
                              }`}
                            />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 6. Formalar matching frame_049 */}
                <button
                  onClick={() => {
                    onTabChange("settings", "forms");
                    setIsSettingsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                    currentTab === "settings" && currentSettingsSubView === "forms"
                      ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      currentTab === "settings" && currentSettingsSubView === "forms"
                        ? "bg-[#5d5fef]"
                        : "bg-slate-400"
                    }`}
                  />
                  <span>Formalar</span>
                </button>

                {/* 7. Integratsiyalar Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setExpandedSettingsMenu(
                        expandedSettingsMenu === "integrations" ? null : "integrations"
                      )
                    }
                    className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="font-normal">Integratsiyalar</span>
                    </div>
                    {expandedSettingsMenu === "integrations" ? (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {expandedSettingsMenu === "integrations" && (
                    <div className="py-0.5 space-y-0.5 animate-in fade-in">
                      {[
                        { key: "amocrm", label: "Amo CRM sozlamalari" },
                        { key: "faceid", label: "Face ID sozlamalari" },
                      ].map((item) => {
                        const active =
                          currentTab === "settings" && currentSettingsSubView === item.key;
                        return (
                          <button
                            key={item.key}
                            onClick={() => {
                              onTabChange("settings", item.key);
                              setIsSettingsOpen(false);
                            }}
                            className={`w-full text-left pl-7 pr-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                              active
                                ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                                : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                active ? "bg-[#5d5fef]" : "bg-slate-400"
                              }`}
                            />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. MOLIYA */}
          <button
            onClick={() => onTabChange("finance")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              currentTab === "finance"
                ? "bg-[#5d5fef] text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            <TrendingUp
              className={`h-4 w-4 ${currentTab === "finance" ? "text-white" : "text-slate-500"}`}
            />
            <span>Moliya</span>
          </button>

          {/* 5. HISOBOTLAR DROPDOWN (1:1 with rep_014.jpg) */}
          <div
            className="relative"
            ref={reportsRef}
            onMouseEnter={() => {
              setIsReportsOpen(true);
              setIsSettingsOpen(false);
            }}
            onMouseLeave={() => setIsReportsOpen(false)}
          >
            <button
              onClick={() => {
                onTabChange("reports");
                setIsReportsOpen((prev) => !prev);
                setIsSettingsOpen(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                currentTab === "reports"
                  ? "bg-[#5d5fef] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              <ClipboardList
                className={`h-4 w-4 ${
                  currentTab === "reports" ? "text-white" : "text-slate-500"
                }`}
              />
              <span>Hisobotlar</span>
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-70 transition-transform ${
                  isReportsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isReportsOpen && (
              <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-in fade-in zoom-in-95 text-[13px] select-none">
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-100/90 dark:border-slate-800 py-2.5">
                {[
                  { key: "payment", label: "To'lovlar hisoboti" },
                  { key: "student_payment", label: "O'quvchilar to'lovi" },
                  { key: "churn", label: "Ketgan o'quvchilar hisoboti" },
                  { key: "graduates", label: "Bitiruvchilar hisoboti" },
                  { key: "attendance", label: "Xodimlar davomati hisoboti" },
                  { key: "coins", label: "Coinlar" },
                  { key: "leads", label: "Lidlar hisoboti" },
                  { key: "students_report", label: "O'quvchilar hisoboti" },
                  { key: "statistics", label: "Markaz faoliyati statistikasi" },
                ].map((item) => {
                  const active =
                    currentTab === "reports" && currentReportsSubView === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        onTabChange("reports", item.key);
                        setIsReportsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 flex items-center gap-3 transition-colors cursor-pointer ${
                        active
                          ? "bg-[#f0f2fe] text-[#5d5fef] font-semibold"
                          : "text-slate-700 dark:text-slate-200 hover:bg-[#f0f2fe]/70 hover:text-[#5d5fef]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          active ? "bg-[#5d5fef]" : "bg-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  </header>
);
}
