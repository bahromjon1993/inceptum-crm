import React, { useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Headphones,
  Lock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types";

export function LoginPage() {
  const { login } = useAuth();

  // Login form states - strictly for login only
  const [phone, setPhone] = useState("+998 (90) 123-45-67");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Demo accounts for fast 1-click access
  const demoAccounts: {
    role: UserRole;
    name: string;
    phone: string;
    pass: string;
    badge: string;
  }[] = [
    { role: "CEO", name: "Bosh direktor (CEO)", phone: "+998901234567", pass: "admin123", badge: "CEO" },
    { role: "ADMIN", name: "Administrator", phone: "+998902345678", pass: "admin123", badge: "Admin" },
    { role: "TEACHER", name: "O'qituvchi", phone: "+998903456789", pass: "teacher123", badge: "Ustoz" },
    { role: "OPERATOR", name: "Operator", phone: "+998904567890", pass: "operator123", badge: "Qabul" },
  ];

  const handleQuickLogin = (acc: (typeof demoAccounts)[0]) => {
    setPhone(acc.phone);
    setPassword(acc.pass);
    login(acc.phone, acc.pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const cleanPhone = phone.replace(/[^\d+]/g, "");

    try {
      const ok = await login(cleanPhone || phone, password);
      if (!ok) setErrorMsg("Telefon raqami yoki parol noto'g'ri!");
    } catch {
      setErrorMsg("Kirishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-slate-800 flex flex-col font-sans select-none overflow-x-hidden max-w-full">
      {/* 1. TOP NAVBAR in exact SoffCRM design */}
      <header className="w-full border-b border-slate-200/70 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Logo matching soffcrm.uz */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <svg
              className="w-7 h-7 sm:w-9 sm:h-9 text-[#00a859] shrink-0"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 4C10.268 4 4 10.268 4 18C4 21.866 5.567 25.366 8.1 27.9L11.5 24.5C9.9 22.8 9 20.5 9 18C9 13.03 13.03 9 18 9C22.97 9 27 13.03 27 18C27 22.97 22.97 27 18 27C16.8 27 15.6 26.7 14.6 26.2L11.8 29.5C13.6 30.5 15.7 31 18 31C25.732 31 32 24.732 32 18C32 10.268 25.732 4 18 4Z"
                fill="url(#soff-grad-login)"
              />
              <circle cx="18" cy="18" r="4.5" fill="#00a859" />
              <defs>
                <linearGradient
                  id="soff-grad-login"
                  x1="4"
                  y1="4"
                  x2="32"
                  y2="31"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#00a859" />
                  <stop offset="1" stopColor="#008236" />
                </linearGradient>
              </defs>
            </svg>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900">
                  IT Pixel <span className="text-[#00a859]">CRM</span>
                </span>
                <span className="text-[10px] sm:text-xs font-black tracking-wider text-white bg-[#00a859] px-1.5 sm:px-2 py-0.5 rounded-md">
                  INCEPTUM
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              onClick={() => alert("Qo'llab-quvvatlash xizmati: +998 71 200 45 45")}
              className="h-8 sm:h-10 px-2.5 sm:px-5 bg-white hover:bg-emerald-50/50 border border-[#00a859] text-[#00a859] font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5"
            >
              <Headphones className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Yordam</span>
            </button>
            <button
              onClick={() => alert("+998 71 200 45 45 raqamiga qo'ng'iroq")}
              className="h-8 sm:h-10 px-3 sm:px-5 bg-[#00a859] hover:bg-[#008f4c] active:scale-[0.98] text-white font-bold text-[11px] sm:text-xs rounded-lg sm:rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Qo'ng'iroq qilish
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER: Exact Split Card Layout matching screenshot */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* ================= LEFT CARD (Dark Green Box) ================= */}
          <div className="lg:col-span-5 bg-[#008236] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-400/10 rounded-full pointer-events-none" />

            <div className="space-y-5 sm:space-y-6 relative z-10">
              {/* Translucent pill badge */}
              <div className="inline-flex items-center px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/20 text-white backdrop-blur-xs">
                O'quv markazlar uchun
              </div>

              {/* Headline */}
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                IT Pixel CRM ga kirish va markazni boshqarish
              </h2>

              {/* Value Propositions with Checkmarks */}
              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-white text-sm">To'liq avtomatlashtirilgan boshqaruv</div>
                    <div className="text-emerald-100 leading-relaxed">
                      O'quvchilar, guruhlar, to'lovlar va davomat bitta platformada nazorat qilinadi.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-white text-sm">Real vaqt tahlili va moliya</div>
                    <div className="text-emerald-100 leading-relaxed">
                      Markaz foydaliligi, oylik hisobotlar va qarzdorliklar avtomatik hisoblanadi.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-white text-sm">Xavfsiz va tezkor kirish</div>
                    <div className="text-emerald-100 leading-relaxed">
                      Har bir xodim o'z roli va ruxsatlari bo'yicha tizimdan xavfsiz foydalanadi.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom prompt matching screenshot */}
            <div className="pt-8 text-xs text-emerald-100 leading-relaxed relative z-10 border-t border-white/10 mt-6">
              Savollaringiz bormi yoki tizimga kirishda qiyinchilik bormi?{" "}
              <a
                href="#consultation"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Mutaxassis konsultatsiyasi: +998 71 200 45 45");
                }}
                className="underline font-bold text-white hover:text-emerald-200 cursor-pointer"
              >
                Konsultatsiya oling
              </a>
            </div>
          </div>

          {/* ================= RIGHT CARD (Pure Login Form in exact design) ================= */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Sarlavha matching screenshot typography */}
              <div>
                <div className="text-xs font-bold text-[#00a859] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00a859]" />
                  <span>XAVFSIZ KIRISH</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Tizimga kirish
                </h1>
                <p className="text-xs text-slate-500 mt-1.5">
                  Profilingizga kirish uchun telefon raqamingiz va parolingizni kiriting.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Telefon raqam input */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    Telefon raqamingiz
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 (90) 123-45-67"
                      className="w-full h-12 px-4 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-slate-800 font-mono placeholder-slate-400 focus:bg-white focus:border-[#00a859] focus:ring-2 focus:ring-[#00a859]/15 outline-hidden transition-all"
                      required
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Telefon raqamingiz CRM tizimiga kirish logini hisoblanadi
                  </span>
                </div>

                {/* Parol input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-700 font-semibold">Parol</label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("Parolni tiklash: Administrator bilan bog'laning (+998 71 200 45 45)");
                      }}
                      className="text-[11px] text-[#00a859] font-medium hover:underline cursor-pointer"
                    >
                      Parolni unutdingizmi?
                    </a>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Parolingizni kiriting"
                      className="w-full h-12 pl-4 pr-11 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#00a859] focus:ring-2 focus:ring-[#00a859]/15 outline-hidden transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Parol kamida 6 ta belgidan iborat bo'lishi kerak
                  </span>
                </div>

                {/* Eslab qolish checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#00a859] focus:ring-[#00a859] accent-[#00a859] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">
                    Meni eslab qolish
                  </label>
                </div>

                {/* Big Green Action Button matching screenshot */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#00a859] hover:bg-[#008f4c] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Tizimga kirish</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Terms disclaimer matching screenshot */}
              <div className="text-center text-[11px] text-slate-400 pt-1">
                Tizimga kirish orqali{" "}
                <a href="#terms" className="text-[#00a859] underline hover:text-[#008236]">
                  ommaviy oferta
                </a>{" "}
                shartlari va{" "}
                <a href="#privacy" className="text-[#00a859] underline hover:text-[#008236]">
                  maxfiylik siyosati
                </a>
                ga rozilik bildirasiz.
              </div>

              {/* Quick Demo Role Picker */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Tezkor kirish (Demo hisoblar):</span>
                  <span className="text-[10px] text-[#00a859] font-bold">1 bosishda kirish</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      className="p-2.5 bg-slate-50 border border-slate-200 hover:border-[#00a859] hover:bg-emerald-50/50 rounded-xl text-left transition-all cursor-pointer group"
                    >
                      <div className="text-[11px] font-bold text-slate-800 group-hover:text-[#00a859]">
                        {acc.badge}
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono truncate mt-0.5">
                        {acc.phone.slice(-4)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white py-6 text-center text-xs text-slate-400">
        © 2026 IT Pixel CRM & INCEPTUM. Barcha huquqlar himoyalangan.
      </footer>
    </div>
  );
}
