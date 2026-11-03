import React, { useState, useEffect } from "react";
import {
  Printer,
  Check,
  Save,
  Building,
  Users,
  Clock,
  Shield,
  FileText,
  Plus,
  MoreVertical,
  Camera,
  Coins,
  CheckSquare,
  HelpCircle,
  AlertCircle,
  Eye,
  Trash2,
  Edit2,
  Calendar,
  Phone,
  DollarSign,
  Smartphone,
  ExternalLink,
  X,
  Search,
  School,
  Share2,
  Copy,
  RotateCw,
  Percent,
  GraduationCap,
  Play,
  MessageSquare,
  PhoneCall,
  Send,
} from "lucide-react";
import { RolesPage } from "./RolesPage";

interface SettingsPageProps {
  initialSubView?: string;
  onSubViewChange?: (subView: string) => void;
}

export function SettingsPage({
  initialSubView = "courses",
  onSubViewChange,
}: SettingsPageProps) {
  const [subView, setSubView] = useState<string>(initialSubView);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubView) {
      setSubView(initialSubView);
    }
  }, [initialSubView]);

  const handleSelectSubView = (view: string) => {
    setSubView(view);
    if (onSubViewChange) {
      onSubViewChange(view);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ================= 1. CHEK SOZLAMALARI (frame_029 & frame_030) =================
  const [receiptAddress, setReceiptAddress] = useState("A.Temur,218-uy");
  const [receiptPhone, setReceiptPhone] = useState("(99) 324-02-23");
  const [logoPosition, setLogoPosition] = useState<"YUQORIDA" | "PASTDA">("YUQORIDA");
  const [footerText, setFooterText] = useState("TO'LOVINGIZ UCHUN RAHMAT :)");

  const [receiptFields, setReceiptFields] = useState<Record<string, boolean>>({
    logo: true,
    header: true,
    address: true,
    phone: true,
    time: true,
    groupInfo: true,
    paymentMethod: true,
    paymentDate: true,
    cashier: false,
    amount: true,
    footer: true,
    footerText: true,
    qrCode: false,
    teacher: true,
    courseFee: true,
  });

  const toggleReceiptField = (key: string) => {
    setReceiptFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Chek sozlamalari muvaffaqiyatli saqlandi!");
  };

  // ================= 2. XODIMLAR (frame_043 & frame_045) =================
  const [staffFilter, setStaffFilter] = useState("BARCHASI");
  const [staffSearch, setStaffSearch] = useState("");
  const [isAddStaffDrawerOpen, setIsAddStaffDrawerOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffPhone, setNewStaffPhone] = useState("+998 ");
  const [newStaffRole, setNewStaffRole] = useState("teacher");
  const [newStaffSalary, setNewStaffSalary] = useState("3 000 000 so'm");

  const [staffList, setStaffList] = useState([
    { id: 1, name: "Adminoy Adminovna", phone: "+998999999999", salary: "*****", share: "- %", role: "admin, casher", hired: "2026-06-01" },
    { id: 2, name: "Axmadjon teacher", phone: "+998931790214", salary: "*****", share: "- %", role: "teacher", hired: "2026-06-01" },
    { id: 3, name: "Feruzbek teacher", phone: "+998938141440", salary: "*****", share: "- %", role: "teacher", hired: "2026-06-01" },
    { id: 4, name: "Gulasal teacher", phone: "+998940167500", salary: "*****", share: "- %", role: "teacher", hired: "2026-06-01" },
    { id: 5, name: "Imron Erkinov", phone: "+998993240223", salary: "*****", share: "- %", role: "admin, ceo, casher", hired: "2026-06-03" },
    { id: 6, name: "MUSLIMBEK O'RMANOV", phone: "+998200076100", salary: "*****", share: "- %", role: "ceo", hired: "2026-06-06" },
    { id: 7, name: "Marjona teacher", phone: "+998946663537", salary: "*****", share: "- %", role: "teacher", hired: "2026-06-01" },
  ]);

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim()) return;
    const s = {
      id: staffList.length + 1,
      name: newStaffName.trim(),
      phone: newStaffPhone,
      salary: newStaffSalary,
      share: "- %",
      role: newStaffRole,
      hired: new Date().toISOString().split("T")[0],
    };
    setStaffList([s, ...staffList]);
    setNewStaffName("");
    setNewStaffPhone("+998 ");
    setIsAddStaffDrawerOpen(false);
    showToast("Yangi xodim muvaffaqiyatli qo'shildi!");
  };

  const filteredStaff = staffList.filter((m) => {
    const matchesSearch =
      !staffSearch ||
      m.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      m.phone.includes(staffSearch) ||
      m.role.toLowerCase().includes(staffSearch.toLowerCase());

    const matchesRole =
      staffFilter === "BARCHASI" ||
      (staffFilter === "ADMIN" && m.role.toLowerCase().includes("admin")) ||
      (staffFilter === "TEACHER" && m.role.toLowerCase().includes("teacher")) ||
      (staffFilter === "CEO" && m.role.toLowerCase().includes("ceo")) ||
      (staffFilter === "CASHER" && m.role.toLowerCase().includes("casher"));

    return matchesSearch && matchesRole;
  });

  // ================= 3. CEO UMUMIY SOZLAMALAR (frame_041) =================
  const [ceoToggles, setCeoToggles] = useState({
    splitExcess: false,
    ceoApproval: false,
    receiptAfterPayment: true,
    refundFunction: true,
    choosePaymentDate: true,
    editPayment: true,
  });

  const [paymentMethods, setPaymentMethods] = useState(["Naqd", "Click", "Karta orqali"]);
  const [newPayMethodName, setNewPayMethodName] = useState("");
  const [isAddPayModalOpen, setIsAddPayModalOpen] = useState(false);
  const [timeInterval, setTimeInterval] = useState<"15" | "30">("30");

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayMethodName.trim()) return;
    setPaymentMethods([...paymentMethods, newPayMethodName.trim()]);
    setNewPayMethodName("");
    setIsAddPayModalOpen(false);
    showToast("Yangi to'lov usuli qo'shildi!");
  };

  // ================= 4. KURSLAR (frame_032) =================
  const [coursesList, setCoursesList] = useState<any[]>([]);

  const [isAddCourseDrawerOpen, setIsAddCourseDrawerOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseFee, setNewCourseFee] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("3 oy");

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseName.trim()) return;
    const c = {
      id: coursesList.length + 1,
      name: newCourseName.trim(),
      fee: newCourseFee ? `${newCourseFee} so'm` : "300 000 so'm",
      branch: "INCEPTUM Filliali",
      dur: newCourseDuration,
      sys: "Sozlanmagan",
    };
    setCoursesList([...coursesList, c]);
    setNewCourseName("");
    setNewCourseFee("");
    setIsAddCourseDrawerOpen(false);
    showToast("Yangi kurs muvaffaqiyatli qo'shildi!");
  };

  // ================= 5. XONALAR (frame_035 & frame_036) =================
  const [roomsList, setRoomsList] = useState<any[]>([]);

  const [isAddRoomDrawerOpen, setIsAddRoomDrawerOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomCapacity, setNewRoomCapacity] = useState("");

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const r = {
      id: roomsList.length + 1,
      name: newRoomName.trim(),
      capacity: newRoomCapacity ? `${newRoomCapacity} o'rin` : "20 o'rin",
      branch: "INCEPTUM Filliali",
    };
    setRoomsList([...roomsList, r]);
    setNewRoomName("");
    setNewRoomCapacity("");
    setIsAddRoomDrawerOpen(false);
    showToast("Yangi xona muvaffaqiyatli saqlandi!");
  };

  // ================= 6. COIN SOZLAMALARI (frame_038) =================
  const [isCoinActive, setIsCoinActive] = useState(true);
  const [coinRules, setCoinRules] = useState([
    { id: 1, event: "Davomat", coins: "+5", active: true },
    { id: 2, event: "Uy vazifasi", coins: "+10", active: true },
    { id: 3, event: "Test natijasi", coins: "+20", active: true },
    { id: 4, event: "Tug'ilgan kun", coins: "+50", active: true },
    { id: 5, event: "Darsga vaqtida kelish (Kechikish: +0 daqiqa)", coins: "+50", active: true },
    { id: 6, event: "To'lovni o'z vaqtida qilish", coins: "+500", active: true },
  ]);

  // ================= 7. KIRISHLAR SONI / LOGINS (frame_046) =================
  const [loginSearch, setLoginSearch] = useState("");
  const loginsList: any[] = [];

  const filteredLogins = loginsList.filter(
    (l) =>
      !loginSearch ||
      l.name.toLowerCase().includes(loginSearch.toLowerCase()) ||
      l.phone.includes(loginSearch)
  );

  // ================= 8. TO'LOV TARIXI LOGLARI (frame_047) =================
  const paymentHistoryList: any[] = [];

  // ================= 9. FORMALAR (frame_049) =================
  const [formsList, setFormsList] = useState<any[]>([]);

  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [newFormDept, setNewFormDept] = useState("Marketing");
  const [newFormSource, setNewFormSource] = useState("Instagram");
  const [newFormLink, setNewFormLink] = useState("https://inceptum.uz/form/yangi");

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFormName.trim()) return;
    const f = {
      id: formsList.length + 1,
      name: newFormName.trim(),
      dept: newFormDept,
      source: newFormSource,
      leadsCount: 0,
      link: newFormLink,
      integration: "Telegram Bot",
    };
    setFormsList([...formsList, f]);
    setNewFormName("");
    setIsAddFormModalOpen(false);
    showToast("Yangi forma yaratildi!");
  };

  // ================= 10. MAKTABLAR =================
  const [schoolsList, setSchoolsList] = useState([
    { id: 1, name: "1-maktab", address: "Toshkent sh., Yunusobod", students: 34 },
    { id: 2, name: "2-maktab", address: "Toshkent sh., Chilonzor", students: 28 },
    { id: 3, name: "21-maktab", address: "Toshkent sh., Mirzo Ulug'bek", students: 45 },
    { id: 4, name: "Prezident maktabi", address: "Toshkent sh., Shayxontohur", students: 52 },
    { id: 5, name: "Al-Xorazmiy IT maktabi", address: "Toshkent sh., Yashnobod", students: 60 },
  ]);

  // ================= 11. DAM OLISH KUNLARI =================
  const [holidaysList, setHolidaysList] = useState([
    { id: 1, name: "Yangi Yil bayrami", date: "2026-01-01 / 2026-01-02", status: "O'tgan" },
    { id: 2, name: "Xalqaro Xotin-qizlar kuni", date: "2026-03-08", status: "O'tgan" },
    { id: 3, name: "Navro'z umumxalq bayrami", date: "2026-03-21", status: "O'tgan" },
    { id: 4, name: "Mustaqillik kuni", date: "2026-09-01", status: "O'tgan" },
    { id: 5, name: "O'qituvchi va murabbiylar kuni", date: "2026-10-01", status: "O'tgan" },
    { id: 6, name: "Konstitutsiya kuni", date: "2026-12-08", status: "Kutilmoqda" },
  ]);

  // ================= 12. SMS SHABLONLARI (1:1 with t_0057.jpg / sms_003.jpg) =================
  const [smsCategories, setSmsCategories] = useState<string[]>([]);
  const [smsTemplates, setSmsTemplates] = useState<any[]>([]);
  const [isAddSmsCategoryOpen, setIsAddSmsCategoryOpen] = useState(false);
  const [isAddSmsTemplateOpen, setIsAddSmsTemplateOpen] = useState(false);
  const [newSmsCatName, setNewSmsCatName] = useState("");
  const [newSmsTplName, setNewSmsTplName] = useState("");
  const [newSmsTplCat, setNewSmsTplCat] = useState("");
  const [newSmsTplText, setNewSmsTplText] = useState("");

  // ================= TESTLAR BOSHQARUVI =================
  const [testActiveTab, setTestActiveTab] = useState<"tests" | "bank">("tests");
  const [testSearch, setTestSearch] = useState("");
  const [testStatus, setTestStatus] = useState("Barcha holatlar");
  const [testSort, setTestSort] = useState("Yangi qo'shilganlar");

  // ================= HARAKATLAR TARIXI =================
  const [callSearch, setCallSearch] = useState("");
  const [smsHistSearch, setSmsHistSearch] = useState("");
  const [smsHistDate, setSmsHistDate] = useState("");
  const [botNotifSearch, setBotNotifSearch] = useState("");

  // ================= 13. INTEGRATSIYALAR (1:1 with frame_051) =================
  const [amoSubdomain, setAmoSubdomain] = useState("inceptum");
  const [amoClientId, setAmoClientId] = useState("amo_client_d98f72");
  const [amoSecretKey, setAmoSecretKey] = useState("••••••••••••••••••••••••");
  const [amoRedirectUri, setAmoRedirectUri] = useState("https://inceptum.uz/api/integrations/amocrm/callback");
  const [isAmoActive, setIsAmoActive] = useState(false);

  const [faceIp, setFaceIp] = useState("192.168.1.120");
  const [facePort, setFacePort] = useState("8080");
  const [faceModel, setFaceModel] = useState("Hikvision DS-K1T671MF");
  const [isFaceActive, setIsFaceActive] = useState(false);

  return (
    <div className="space-y-5 pb-16 select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#5d5fef] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4 duration-200 text-xs font-semibold">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= 1. CHEK SOZLAMALARI (1:1 with frame_029 & frame_030) ================= */}
      {subView === "receipt" && (
        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold text-[#1e1b4b]">Chek Sozlamalari</h1>
            <div className="text-xs text-slate-400 mt-0.5">Sozlamalar / Chek sozlamalari</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Configuration Form matching frame_029 & frame_030 */}
            <div className="lg:col-span-6 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-6">
              <form onSubmit={handleSaveReceipt} className="space-y-5 text-xs">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-3">Chek yuqori qismi</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-500 mb-1">Manzil</label>
                      <input
                        type="text"
                        value={receiptAddress}
                        onChange={(e) => setReceiptAddress(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 mb-1">Telefon raqami</label>
                      <input
                        type="text"
                        value={receiptPhone}
                        onChange={(e) => setReceiptPhone(e.target.value)}
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#1e1b4b] hover:bg-[#0f172a] text-white font-bold rounded-lg transition-colors cursor-pointer tracking-wider"
                    >
                      SAQLASH
                    </button>
                  </div>
                </div>

                {/* Ko'rinadigan maydonlar toggles */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm">Ko'rinadigan maydonlar</h3>
                  <div className="space-y-2.5">
                    {[
                      { key: "logo", label: "Logotip" },
                      { key: "header", label: "Chek yuqori qismi" },
                      { key: "address", label: "Manzil" },
                      { key: "phone", label: "Telefon raqami" },
                      { key: "time", label: "Chek chiqarilgan vaqt" },
                      { key: "groupInfo", label: "Guruh ma'lumotlari" },
                      { key: "paymentMethod", label: "To'lov shakli" },
                      { key: "paymentDate", label: "To'lov sanasi" },
                      { key: "cashier", label: "Kassir" },
                      { key: "amount", label: "Summa" },
                      { key: "footer", label: "Pastki qism" },
                      { key: "footerText", label: "Pastki qism matni" },
                      { key: "qrCode", label: "QR kod" },
                      { key: "teacher", label: "O'qituvchi" },
                      { key: "courseFee", label: "Kurs narxi" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-0.5">
                        <span className="text-slate-700 font-medium">{item.label}</span>
                        <button
                          type="button"
                          onClick={() => toggleReceiptField(item.key)}
                          className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                            receiptFields[item.key] ? "bg-[#1e1b4b]" : "bg-slate-200"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform ${
                              receiptFields[item.key] ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logotip joylashuvi matching frame_030 */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <label className="block text-slate-700 font-bold">Logotip joylashuvi</label>
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg max-w-xs">
                    <button
                      type="button"
                      onClick={() => setLogoPosition("YUQORIDA")}
                      className={`py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                        logoPosition === "YUQORIDA"
                          ? "bg-[#1e1b4b] text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      YUQORIDA
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoPosition("PASTDA")}
                      className={`py-1.5 font-bold rounded-md transition-all cursor-pointer ${
                        logoPosition === "PASTDA"
                          ? "bg-[#1e1b4b] text-white"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      PASTDA
                    </button>
                  </div>
                </div>

                {/* Chek pastki qismi textarea matching frame_030 */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h3 className="font-bold text-slate-800 text-sm">Chek pastki qismi</h3>
                  <div className="text-slate-500 text-[11px]">Pastki qism matni</div>
                  <textarea
                    rows={3}
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#1e1b4b] hover:bg-[#0f172a] text-white font-bold rounded-lg transition-colors cursor-pointer tracking-wider"
                  >
                    SAQLASH
                  </button>
                </div>
              </form>
            </div>

            {/* Right Live Preview matching frame_029 */}
            <div className="lg:col-span-6 bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Ko'rinishi</h3>

              <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8 shadow-sm font-sans space-y-4 text-xs">
                {receiptFields.logo && logoPosition === "YUQORIDA" && (
                  <div className="text-center font-black text-lg text-slate-900 tracking-wider">
                    Soff<span className="text-[#10b981]">CRM</span> INCEPTUM
                  </div>
                )}

                <div className="text-center space-y-1">
                  <h4 className="font-black text-sm text-[#1e1b4b] tracking-wide uppercase">
                    TO'LOV KVITANSIYASI
                  </h4>
                  {receiptFields.address && (
                    <div className="text-slate-500">{receiptAddress}</div>
                  )}
                  {receiptFields.phone && (
                    <div className="text-slate-500">{receiptPhone}</div>
                  )}
                </div>

                {receiptFields.time && (
                  <div className="flex justify-between text-slate-400 border-t border-b border-slate-100 py-1.5 font-mono text-[11px]">
                    <span>2026-10-28</span>
                    <span>18:06</span>
                  </div>
                )}

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>ID</span>
                    <span className="font-semibold text-slate-800">12345</span>
                  </div>
                  <div className="flex justify-between">
                    <span>O'quvchi</span>
                    <span className="font-semibold text-slate-800">John Doe</span>
                  </div>
                  {receiptFields.groupInfo && (
                    <div className="flex justify-between">
                      <span>Kurs nomi</span>
                      <span className="font-semibold text-slate-800">Ingliz tili-1</span>
                    </div>
                  )}
                  {receiptFields.courseFee && (
                    <div className="flex justify-between">
                      <span>Kurs narxi</span>
                      <span className="font-semibold text-slate-800">UZS 1,000,000</span>
                    </div>
                  )}
                  {receiptFields.paymentMethod && (
                    <div className="flex justify-between">
                      <span>To'lov turi</span>
                      <span className="font-semibold text-slate-800">Naqd</span>
                    </div>
                  )}
                  {receiptFields.paymentDate && (
                    <div className="flex justify-between">
                      <span>To'lov sanasi</span>
                      <span className="font-semibold text-slate-800 font-mono">2026-10-28</span>
                    </div>
                  )}
                  {receiptFields.teacher && (
                    <div className="flex justify-between">
                      <span>O'qituvchi</span>
                      <span className="font-semibold text-slate-800">Avazbek ustoz</span>
                    </div>
                  )}
                </div>

                {receiptFields.amount && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center space-y-0.5">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">To'lov miqdori</div>
                    <div className="text-base font-black text-slate-900">UZS 100,000</div>
                  </div>
                )}

                {receiptFields.footerText && (
                  <div className="text-center italic text-slate-400 pt-2 text-[11px]">
                    {footerText}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. XODIMLAR (1:1 with frame_043 & frame_045) ================= */}
      {subView === "staff" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-800">Xodimlar</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  placeholder="Xodim qidirish..."
                  className="h-9 pl-3 pr-8 text-xs border border-slate-200 rounded-lg outline-hidden w-48 focus:border-[#5d5fef]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button
                onClick={() => showToast("Xodimlar davomati ochildi")}
                className="h-9 px-4 bg-white border border-[#5d5fef]/40 text-[#5d5fef] font-bold text-xs rounded-lg hover:bg-indigo-50 cursor-pointer"
              >
                XODIMLAR DAVOMATI
              </button>
              <button
                onClick={() => showToast("Xodimlar ro'yxati Excel yuklab olindi")}
                className="h-9 px-3 bg-white border border-emerald-500/40 text-emerald-600 font-bold text-xs rounded-lg hover:bg-emerald-50 cursor-pointer"
              >
                EXCEL
              </button>
              <button
                onClick={() => setIsAddStaffDrawerOpen(true)}
                className="h-9 px-4 bg-[#5d5fef] text-white font-bold text-xs rounded-lg hover:bg-[#4f51e0] shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                YANGI QO'SHISH
              </button>
            </div>
          </div>

          {/* Exact pills from frame_043 & frame_045 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold text-slate-600 border-b border-slate-200">
            {[
              { key: "BARCHASI", label: `BARCHASI - ${staffList.length}` },
              { key: "ADMIN", label: "ADMIN - 2" },
              { key: "TEACHER", label: "O'QITUVCHI - 4" },
              { key: "CEO", label: "CEO - 2" },
              { key: "CASHER", label: "KASSIR - 2" },
              { key: "OTHER", label: "BOSHQA - 0" },
              { key: "SUPPORT", label: "SUPPORT TEACHER - 0" },
              { key: "WATCHER", label: "WATCHER - 0" },
              { key: "PARENT", label: "PARENT - 0" },
              { key: "MARKETOLOG", label: "MARKETOLOG - 0" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setStaffFilter(p.key)}
                className={`px-3 py-1.5 rounded-t-md border-b-2 font-bold cursor-pointer whitespace-nowrap ${
                  staffFilter === p.key
                    ? "border-[#5d5fef] text-[#5d5fef] bg-indigo-50/40"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Staff Table matching frame_045 */}
          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[800px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3 px-3 w-8">#</th>
                  <th className="py-3 px-4">Ism familiya</th>
                  <th className="py-3 px-4">Telefon raqam</th>
                  <th className="py-3 px-4">Doimiy oylik</th>
                  <th className="py-3 px-4">Foiz ulush (%)</th>
                  <th className="py-3 px-4">Kasbi / Rol</th>
                  <th className="py-3 px-4">Ishga olingan sana</th>
                  <th className="py-3 px-3 text-center" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 text-slate-400">{m.id}.</td>
                    <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px]">
                        {m.name.charAt(0)}
                      </div>
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{m.phone}</td>
                    <td className="py-3 px-4 text-slate-500">{m.salary}</td>
                    <td className="py-3 px-4 text-slate-500">{m.share}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">{m.hired}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm(`${m.name} xodimini o'chirmoqchimisiz?`)) {
                            setStaffList(staffList.filter((s) => s.id !== m.id));
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 3. CEO UMUMIY SOZLAMALAR (1:1 with frame_041) ================= */}
      {subView === "ceo_all" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Tags and Toggles */}
            <div className="lg:col-span-7 space-y-5">
              {/* Organization Header Box */}
              <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">🏢 MARKAZ SOZLAMALARI</h3>
                  <button
                    onClick={() => showToast("Markaz sozlamalari yangilandi")}
                    className="px-3 py-1 bg-[#5d5fef] text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    SAQLASH
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 mb-1">Tashkilot nomi</label>
                    <input
                      type="text"
                      defaultValue="INCEPTUM"
                      className="w-full p-2 border border-slate-200 rounded-lg outline-hidden font-bold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Filial</label>
                    <input
                      type="text"
                      defaultValue="INCEPTUM Filliali"
                      className="w-full p-2 border border-slate-200 rounded-lg outline-hidden text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-slate-600 font-semibold">To'lov usullari</label>
                    <button
                      type="button"
                      onClick={() => setIsAddPayModalOpen(true)}
                      className="text-[11px] text-[#5d5fef] font-bold hover:underline cursor-pointer"
                    >
                      + YANGI QO'SHISH
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {paymentMethods.map((pm, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold flex items-center gap-1.5"
                      >
                        <span>{pm}</span>
                        {idx > 2 && (
                          <button
                            onClick={() => setPaymentMethods(paymentMethods.filter((_, i) => i !== idx))}
                            className="text-slate-400 hover:text-rose-500 cursor-pointer"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Tags from frame_041 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-emerald-400 text-emerald-600 bg-emerald-50/50">
                  Chek chiqariladi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-rose-400 text-rose-600 bg-rose-50/50">
                  Davomat qilishda izoh yoza olmaydi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-rose-400 text-rose-600 bg-rose-50/50">
                  O'qituvchiga oylik ko'rinmasligi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-rose-400 text-rose-600 bg-rose-50/50">
                  Ortiqcha to'lov keyingi oylarga bo'lib yuborilmaydi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-emerald-400 text-emerald-600 bg-emerald-50/50">
                  Guruhga dam berilganda o'qituvchiga oylik yoziladi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold border border-rose-400 text-rose-600 bg-rose-50/50">
                  O'qituvchi o'quvchi qo'sha olmaydi
                </span>
              </div>

              {/* Toggles Card */}
              <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-700 font-medium">O'quvchini ortiqcha to'lovi keyingi oylarga bo'lib yuborilishi</span>
                  <button
                    type="button"
                    onClick={() => setCeoToggles({ ...ceoToggles, splitExcess: !ceoToggles.splitExcess })}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      ceoToggles.splitExcess ? "bg-[#5d5fef]" : "bg-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.splitExcess ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-700 font-medium">Admin amallarini CEO tasdig'idan o'tkazish</span>
                  <button
                    type="button"
                    onClick={() => setCeoToggles({ ...ceoToggles, ceoApproval: !ceoToggles.ceoApproval })}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      ceoToggles.ceoApproval ? "bg-[#5d5fef]" : "bg-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.ceoApproval ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-700 font-medium">To'lov qilgandan so'ng chek chiqishi</span>
                  <button
                    type="button"
                    onClick={() => setCeoToggles({ ...ceoToggles, receiptAfterPayment: !ceoToggles.receiptAfterPayment })}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      ceoToggles.receiptAfterPayment ? "bg-[#5d5fef]" : "bg-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.receiptAfterPayment ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-700 font-medium">Pul qaytarish funksiyasi</span>
                  <button
                    type="button"
                    onClick={() => setCeoToggles({ ...ceoToggles, refundFunction: !ceoToggles.refundFunction })}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      ceoToggles.refundFunction ? "bg-[#5d5fef]" : "bg-slate-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.refundFunction ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <h4 className="font-bold text-slate-800 text-xs">To'lov amallari</h4>
                  <p className="text-[10px] text-slate-400">
                    O'chirilgan amalni CEO'dan boshqa hech bir rol (admin, kassir, ustoz va boshqalar) bajara olmaydi.
                  </p>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-700 font-medium">To'lov sanasini tanlash</span>
                    <button
                      type="button"
                      onClick={() => setCeoToggles({ ...ceoToggles, choosePaymentDate: !ceoToggles.choosePaymentDate })}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        ceoToggles.choosePaymentDate ? "bg-[#5d5fef]" : "bg-slate-300"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.choosePaymentDate ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-700 font-medium">To'lovni tahrirlash</span>
                    <button
                      type="button"
                      onClick={() => setCeoToggles({ ...ceoToggles, editPayment: !ceoToggles.editPayment })}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                        ceoToggles.editPayment ? "bg-[#5d5fef]" : "bg-slate-300"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${ceoToggles.editPayment ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Vaqt intervali and Baholash tizimlari */}
            <div className="lg:col-span-5 space-y-5">
              {/* Vaqt intervali */}
              <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">Vaqt intervali</span>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="radio"
                      name="interval"
                      checked={timeInterval === "15"}
                      onChange={() => setTimeInterval("15")}
                      className="accent-[#5d5fef]"
                    />
                    <span>15 daqiqa</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-bold">
                    <input
                      type="radio"
                      name="interval"
                      checked={timeInterval === "30"}
                      onChange={() => setTimeInterval("30")}
                      className="accent-[#5d5fef]"
                    />
                    <span>30 daqiqa</span>
                  </label>
                </div>
              </div>

              {/* Baholash tizimlarini boshqarish */}
              <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs">Baholash tizimlarini boshqarish</span>
                  <button
                    onClick={() => showToast("Yangi baholash tizimi")}
                    className="px-3 py-1.5 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold rounded-lg text-[11px] cursor-pointer"
                  >
                    + TIZIM YARATISH
                  </button>
                </div>
                <div className="border-b border-slate-100 pb-2 text-[11px] font-bold text-[#5d5fef]">
                  TIZIMLAR RO'YXATI
                </div>
                <div className="py-6 text-center space-y-2 text-slate-400">
                  <div className="font-bold text-slate-700 text-xs">Baholash tizimlari mavjud emas</div>
                  <p className="text-[10px]">
                    Siz barcha baholash tizimlarini o'chirgansiz. Yangi tizim yaratishingiz yoki tavsiya etilgan andozalardan foydalanishingiz mumkin.
                  </p>
                  <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
                    <button
                      onClick={() => showToast("Standart baholash andozalari yuklandi")}
                      className="w-full py-2 bg-[#5d5fef] text-white font-bold rounded-lg text-xs cursor-pointer"
                    >
                      + YANGI TIZIM YARATISH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. KURSLAR (1:1 with frame_032) ================= */}
      {subView === "courses" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-800">Kurslar</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Kurslar haqida video qo'llanma: https://youtube.com/inceptum-courses")}
                className="px-4 py-2 bg-white border border-[#5d5fef]/40 text-[#5d5fef] font-bold text-xs rounded-lg hover:bg-indigo-50 flex items-center gap-1.5 cursor-pointer"
              >
                <span>▶ Kurslar sahifasidan qanday foydalaniladi?</span>
              </button>
              <button
                onClick={() => setIsAddCourseDrawerOpen(true)}
                className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                YANGI KURS QO'SHISH
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[750px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3.5 px-4">Kurslar</th>
                  <th className="py-3.5 px-4">Izoh</th>
                  <th className="py-3.5 px-4">Kurs narxi</th>
                  <th className="py-3.5 px-4">Filial</th>
                  <th className="py-3.5 px-4">Kurs davomiyligi (oy)</th>
                  <th className="py-3.5 px-4">Baholash tizimi</th>
                  <th className="py-3.5 px-4 text-center">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coursesList.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{c.name}</td>
                    <td className="py-3.5 px-4 text-slate-400">-</td>
                    <td className="py-3.5 px-4 text-slate-700 font-bold">{c.fee}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-medium">{c.branch}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.dur}</td>
                    <td className="py-3.5 px-4 text-slate-400">{c.sys}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm(`${c.name} kursini o'chirmoqchimisiz?`)) {
                            setCoursesList(coursesList.filter((item) => item.id !== c.id));
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 5. XONALAR (1:1 with frame_035 & frame_036) ================= */}
      {subView === "rooms" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">Xonalar</h1>
            <button
              onClick={() => setIsAddRoomDrawerOpen(true)}
              className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              YANGI XONA QO'SHISH
            </button>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3.5 px-4 w-16">ID</th>
                  <th className="py-3.5 px-4">Nomi</th>
                  <th className="py-3.5 px-4">Sig'im</th>
                  <th className="py-3.5 px-4">Filial</th>
                  <th className="py-3.5 px-4 text-center">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {roomsList.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 text-slate-400 font-medium">{r.id}.</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{r.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{r.capacity}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-medium">{r.branch}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          if (window.confirm(`${r.name} xonasini o'chirmoqchimisiz?`)) {
                            setRoomsList(roomsList.filter((item) => item.id !== r.id));
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 6. COIN SOZLAMALARI (1:1 with frame_038) ================= */}
      {subView === "coins" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Coin sozlamalari</h1>
            <div className="text-xs text-slate-400 mt-0.5">Butun o'quv markazi uchun coin tizimini sozlash</div>
          </div>

          {/* Avtomatik coin tizimi toggle */}
          <div className="bg-white border border-[#e8ecf4] rounded-2xl p-6 shadow-xs flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-800 text-sm">Avtomatik coin tizimi</div>
              <div className="text-slate-400 mt-0.5">O'chirilganda avtomatik coinlar berilmaydi. Qo'lda berish ishlashda davom etadi.</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCoinActive(!isCoinActive);
                showToast(isCoinActive ? "Coin tizimi o'chirildi" : "Coin tizimi faollashtirildi");
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                isCoinActive ? "bg-[#5d5fef]" : "bg-slate-200"
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isCoinActive ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Avtomatik coin qoidalari matching frame_038 */}
          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm">Avtomatik coin qoidalari</h3>
              <div className="text-xs text-slate-400 mt-0.5">O'quvchilarga qachon avtomatik tarzda coin berilishini sozlang.</div>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3 px-5">Hodisa</th>
                  <th className="py-3 px-4">Coin miqdori</th>
                  <th className="py-3 px-4 text-center">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coinRules.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-5 font-medium text-slate-800">{c.event}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{c.coins}</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => {
                          const val = prompt(`${c.event} uchun yangi coin miqdorini kiriting:`, c.coins);
                          if (val) {
                            const updated = [...coinRules];
                            updated[idx].coins = val.startsWith("+") ? val : `+${val}`;
                            setCoinRules(updated);
                            showToast("Coin qoidasi yangilandi!");
                          }
                        }}
                        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 7. TESTLAR BOSHQARUVI (1:1 with sec_0066) ================= */}
      {subView === "test_settings" && (
        <div className="space-y-5">
          {/* Top Subtabs matching sec_0066 */}
          <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setTestActiveTab("tests")}
              className={`pb-3 cursor-pointer transition-colors flex items-center gap-2 ${
                testActiveTab === "tests"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Testlar</span>
            </button>
            <button
              onClick={() => setTestActiveTab("bank")}
              className={`pb-3 cursor-pointer transition-colors flex items-center gap-2 ${
                testActiveTab === "bank"
                  ? "text-[#5d5fef] border-b-2 border-[#5d5fef]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Savollar banki</span>
            </button>
          </div>

          {/* Title & Action */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Testlar boshqaruvi
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                O'quv markazi test sinovlari, baholash mezonlari va auditoriyaga biriktirish
              </div>
            </div>
            <button
              onClick={() => showToast("Yangi test yaratish oynasi ochildi")}
              className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
            >
              + Yangi test yaratish
            </button>
          </div>

          {/* 4 KPI Cards matching sec_0066 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Jami testlar</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">0</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Faol testlar</span>
                <GraduationCap className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-black text-emerald-600">0</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Topshirganlar soni</span>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-black text-[#5d5fef]">0</div>
            </div>

            <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">O'rtacha aniqlik</span>
                <Percent className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-black text-amber-500">0%</div>
            </div>
          </div>

          {/* Filter Bar & Empty State matching sec_0066 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Test nomi bo'yicha qidirish..."
                  value={testSearch}
                  onChange={(e) => setTestSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={testStatus}
                  onChange={(e) => setTestStatus(e.target.value)}
                  className="h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
                >
                  <option value="Barcha holatlar">Barcha holatlar</option>
                  <option value="Faol">Faol</option>
                  <option value="Nofaol">Nofaol</option>
                </select>

                <select
                  value={testSort}
                  onChange={(e) => setTestSort(e.target.value)}
                  className="h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-200 outline-hidden cursor-pointer"
                >
                  <option value="Yangi qo'shilganlar">Yangi qo'shilganlar</option>
                  <option value="Eski qo'shilganlar">Eski qo'shilganlar</option>
                </select>
              </div>
            </div>

            {/* Empty State Illustration */}
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl">
                📋
              </div>
              <div className="text-sm font-semibold text-slate-500">Ma'lumot topilmadi</div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 8. KIRISHLAR SONI / LOGINS (1:1 with frame_046) ================= */}
      {subView === "logins" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">Kirishlar soni</h1>
            <div className="relative">
              <input
                type="text"
                value={loginSearch}
                onChange={(e) => setLoginSearch(e.target.value)}
                placeholder="Qidirish..."
                className="h-9 pl-3 pr-8 text-xs border border-slate-200 rounded-lg outline-hidden w-64 focus:border-[#5d5fef]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3 px-4 w-12">ID</th>
                  <th className="py-3 px-4">Ism</th>
                  <th className="py-3 px-4">Telefon raqam</th>
                  <th className="py-3 px-4">Kirgan sanasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogins.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 text-slate-400">{l.id}.</td>
                    <td className="py-3 px-4 font-semibold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{l.name}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{l.phone}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 9. TO'LOV TARIXI LOGLARI (1:1 with frame_047 & sec_0110) ================= */}
      {subView === "payment_history" && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-slate-800">To'lovlar amallari tarixi</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentHistoryList.map((p, idx) => (
              <div key={idx} className="p-4 bg-white border border-[#e8ecf4] rounded-xl shadow-xs space-y-2 text-xs">
                <div className="text-[11px] text-slate-500 font-semibold">
                  To'lov yaratildi. Xodim: (99) 324-02-23 {p.officer}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-slate-800">{p.user}</span>
                  <span className="font-bold text-emerald-600">{p.amount}</span>
                </div>
                <div className="text-slate-500 text-[11px]">{p.phone} • Guruh: {p.group}</div>
                <div className="text-slate-400 text-[10px] font-mono pt-1 border-t border-slate-100">
                  {p.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= QO'NG'IROQLAR LOGI ================= */}
      {subView === "calls_log" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Qo'ng'iroqlar tarixi
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Markaz xodimlari va o'quvchilar o'rtasidagi qo'ng'iroqlar jurnali
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={callSearch}
                onChange={(e) => setCallSearch(e.target.value)}
                className="h-9 pl-9 pr-3 text-xs bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden w-64"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4 w-12">ID</th>
                  <th className="py-3 px-4">Qo'ng'iroq qiluvchi</th>
                  <th className="py-3 px-4">Qabul qiluvchi</th>
                  <th className="py-3 px-4">Davomiyligi</th>
                  <th className="py-3 px-4">Holati</th>
                  <th className="py-3 px-4">Vaqti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {[
                  { id: 1, caller: "Imron Erkinov", callee: "+998943703101 (Abduhalilov S.)", duration: "02:45 min", status: "Javob berildi", time: "2026-10-28 16:40" },
                  { id: 2, caller: "Imron Erkinov", callee: "+998993240223 (Sobirov O.)", duration: "01:12 min", status: "Javob berildi", time: "2026-10-28 15:20" },
                  { id: 3, caller: "Madina Karimova", callee: "+998901234567 (Karimova R.)", duration: "00:00 min", status: "Javobsiz", time: "2026-10-28 14:10" },
                  { id: 4, caller: "Feruzbek teacher", callee: "+998937654321 (Toshmatov B.)", duration: "03:10 min", status: "Javob berildi", time: "2026-10-28 11:30" },
                ].map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400">{c.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-[#5d5fef]" />
                      <span>{c.caller}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{c.callee}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{c.duration}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === "Javob berildi"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40"
                          : "bg-rose-50 text-rose-600 dark:bg-rose-950/40"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= BOT XABARNOMALARI ================= */}
      {subView === "bot_notifications" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Bot xabarnoma jurnali
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Telegram bot orqali yuborilgan avtomatik bildirishnomalar jurnali
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={botNotifSearch}
                onChange={(e) => setBotNotifSearch(e.target.value)}
                className="h-9 pl-9 pr-3 text-xs bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden w-64"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4 w-12">ID</th>
                  <th className="py-3 px-4">Foydalanuvchi</th>
                  <th className="py-3 px-4">Telegram ID</th>
                  <th className="py-3 px-4">Xabar turi</th>
                  <th className="py-3 px-4">Xabar matni</th>
                  <th className="py-3 px-4">Holati</th>
                  <th className="py-3 px-4">Vaqti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {[
                  { id: 1, user: "Abduhalilov Sardorbek", tgId: "598214710", type: "To'lov cheki", text: "To'lovingiz qabul qilindi: 300 000 UZS", status: "Yetkazildi", time: "2026-10-28 17:55" },
                  { id: 2, user: "Sayfiddinova Diora", tgId: "482910382", type: "Dars eslatmasi", text: "Ertaga 09:00 da IELTS darsi", status: "Yetkazildi", time: "2026-10-28 18:00" },
                  { id: 3, user: "Yusufjanov Javohir", tgId: "394817293", type: "Davomat xabari", text: "Darsga keldingiz (+10 coin)", status: "Yetkazildi", time: "2026-10-28 16:30" },
                  { id: 4, user: "Rustamov Firdavs", tgId: "610293847", type: "Lid tasdiqlash", text: "Arizangiz qabul qilindi, tez orada bog'lanamiz", status: "Yetkazildi", time: "2026-10-28 14:15" },
                ].map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-slate-400">{b.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">{b.user}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{b.tgId}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5d5fef]/10 text-[#5d5fef]">
                        {b.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">{b.text}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 10. YUBORILGAN SMSLAR (1:1 with sec_0116) ================= */}
      {subView === "sms_history" && (
        <div className="space-y-4">
          {/* Filter Bar matching sec_0116 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl p-4 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Qidirish..."
                  value={smsHistSearch}
                  onChange={(e) => setSmsHistSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-hidden text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 text-slate-500 text-xs">
                  <span>yyyy-MM-dd ~ yyyy-MM-dd</span>
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Table matching sec_0116 */}
          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">Qabul qildi</th>
                  <th className="py-3 px-4">Xabar</th>
                  <th className="py-3 px-4">Yubordi</th>
                  <th className="py-3 px-4 text-right">Vaqti</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-4xl">
                        📨
                      </div>
                      <div className="text-sm font-semibold text-slate-500">Ma'lumot topilmadi</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 10. FORMALAR (1:1 with frame_049) ================= */}
      {subView === "forms" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">Formalar</h1>
            <button
              onClick={() => setIsAddFormModalOpen(true)}
              className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
            >
              + YANGI
            </button>
          </div>

          {/* Banner from frame_049 */}
          <div className="p-3 bg-[#ede9fe] text-[#5d5fef] text-xs font-semibold rounded-xl flex items-center justify-between">
            <span>Linkni nusxalash uchun qatorning istalgan joyiga bosing</span>
            <Copy className="w-4 h-4" />
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3 px-4"># Nomi</th>
                  <th className="py-3 px-4">Lid bo'limi</th>
                  <th className="py-3 px-4">Manba</th>
                  <th className="py-3 px-4">Tushgan lidlar soni</th>
                  <th className="py-3 px-4">Link</th>
                  <th className="py-3 px-4">Integratsiya</th>
                  <th className="py-3 px-4">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {formsList.map((f) => (
                  <tr
                    key={f.id}
                    onClick={() => {
                      navigator.clipboard?.writeText(f.link);
                      showToast("Forma havolasi nusxalandi!");
                    }}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{f.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{f.dept}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{f.source}</td>
                    <td className="py-3.5 px-4 font-bold text-[#5d5fef]">{f.leadsCount} ta</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] truncate max-w-[150px]">
                      {f.link}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 font-medium">{f.integration}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormsList(formsList.filter((item) => item.id !== f.id));
                        }}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 11. SMS SHABLONLARI (1:1 with sms_003.jpg / t_0057.jpg) ================= */}
      {subView === "sms" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-slate-800">SMS shablonlari</h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast("SMS shablonlari yangilandi")}
                className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white text-slate-500 hover:text-slate-700 transition-colors cursor-pointer shadow-2xs"
                title="Yangilash"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsAddSmsCategoryOpen(true)}
                className="px-4 py-2 border border-[#5d5fef] text-[#5d5fef] hover:bg-[#5d5fef]/5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>KATEGORIYA YARATISH</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAddSmsTemplateOpen(true)}
                className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>SHABLON YARATISH</span>
              </button>
            </div>
          </div>

          {smsTemplates.length === 0 ? (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-16 text-center shadow-xs">
              <div className="max-w-md mx-auto space-y-1">
                <p className="text-sm font-semibold text-slate-600">Kategoriyalar topilmadi</p>
                <p className="text-xs text-slate-400">Yangi kategoriya yoki shablon yarating</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {smsTemplates.map((tpl) => (
                <div key={tpl.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{tpl.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#5d5fef]/10 text-[#5d5fef]">
                      {tpl.category || "Umumiy"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    {tpl.text}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => setSmsTemplates(smsTemplates.filter((t) => t.id !== tpl.id))}
                      className="text-xs text-rose-500 hover:underline cursor-pointer"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= 12. MAKTABLAR ================= */}
      {subView === "schools" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-800">Maktablar va O'quv muassasalari</h1>
            <button
              onClick={() => {
                const name = prompt("Yangi maktab yoki universitet nomini kiriting:");
                if (name) {
                  setSchoolsList([...schoolsList, { id: schoolsList.length + 1, name, address: "Toshkent", students: 0 }]);
                  showToast("Yangi maktab ro'yxatga qo'shildi!");
                }
              }}
              className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer"
            >
              + YANGI MAKTAB QO'SHISH
            </button>
          </div>

          <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="bg-[#fafafa] border-b border-slate-100 text-slate-600 font-semibold">
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4">Muassasa nomi</th>
                  <th className="py-3 px-4">Manzil</th>
                  <th className="py-3 px-4">O'quvchilar soni</th>
                  <th className="py-3 px-4 text-center">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schoolsList.map((sc) => (
                  <tr key={sc.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 text-slate-400">{sc.id}.</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{sc.name}</td>
                    <td className="py-3 px-4 text-slate-600">{sc.address}</td>
                    <td className="py-3 px-4 font-bold text-[#5d5fef]">{sc.students} nafar</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSchoolsList(schoolsList.filter((s) => s.id !== sc.id))}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/*{/* ================= 12. DAM OLISH KUNLARI (1:1 with sec_0056) ================= */}
      {subView === "holidays" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Dam olish kunlari
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast("Dam olish kunlari qo'llanmasi")}
                className="h-9 px-3.5 border border-slate-200 dark:border-slate-700 text-[#5d5fef] hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Dam olish kunlari sahifasidan qanday foydalaniladi?</span>
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Dam olish sababini kiriting:");
                  if (reason) {
                    setHolidaysList([
                      ...holidaysList,
                      { id: holidaysList.length + 1, name: reason, date: "2026-11-18", status: "Kutilmoqda" },
                    ]);
                    showToast("Dam olish kuni muvaffaqiyatli qo'shildi!");
                  }
                }}
                className="h-9 px-4 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs rounded-lg shadow-sm cursor-pointer uppercase tracking-wider"
              >
                + YANGI QO'SHISH
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e293b] border border-[#e8ecf4] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs min-w-[600px]">
              <thead>
                <tr className="bg-[#fafafa] dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  <th className="py-3 px-4 w-16">ID</th>
                  <th className="py-3 px-4">Sana</th>
                  <th className="py-3 px-4">Sabab</th>
                  <th className="py-3 px-4 text-center">Harakatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {holidaysList.length > 0 ? (
                  holidaysList.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-slate-400">{h.id}</td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-200">{h.date}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100">{h.name}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setHolidaysList(holidaysList.filter((item) => item.id !== h.id))}
                          className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">
                      Ma'lumot topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 13. ROLLAR (frame_041 & roles page) ================= */}
      {subView === "roles" && (
        <div className="space-y-4">
          <RolesPage />
        </div>
      )}

      {/* ================= 14. INTEGRATSIYALAR (1:1 with frame_051) ================= */}
      {(subView === "integrations" || subView === "amocrm" || subView === "faceid") && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1e1b4b]">
                {subView === "amocrm"
                  ? "Amo CRM sozlamalari"
                  : subView === "faceid"
                  ? "Face ID sozlamalari"
                  : "Integratsiyalar"}
              </h1>
              <div className="text-xs text-slate-400 mt-0.5">
                Sozlamalar / Integratsiyalar
                {subView === "amocrm" ? " / Amo CRM" : subView === "faceid" ? " / Face ID" : ""}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Amo CRM Integration Card */}
            {(subView === "integrations" || subView === "amocrm") && (
              <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      amo
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Amo CRM Integratsiyasi</h3>
                      <p className="text-[11px] text-slate-400">Lidlar va mijozlarni avtomatik sinxronlash</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isAmoActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isAmoActive ? "FAOL" : "ULANMAGAN"}
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsAmoActive(true);
                    showToast("Amo CRM integratsiyasi sozlamalari saqlandi!");
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Amo CRM Subdomain</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={amoSubdomain}
                        onChange={(e) => setAmoSubdomain(e.target.value)}
                        placeholder="masalan: inceptum"
                        className="flex-1 p-2.5 border border-slate-200 rounded-l-lg outline-hidden focus:border-[#5d5fef]"
                        required
                      />
                      <span className="px-3 py-2.5 bg-slate-100 border border-l-0 border-slate-200 text-slate-500 rounded-r-lg font-mono text-xs">
                        .amocrm.ru
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Integratsiya ID (Client ID)</label>
                    <input
                      type="text"
                      value={amoClientId}
                      onChange={(e) => setAmoClientId(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Maxfiy kalit (Secret Key)</label>
                    <input
                      type="password"
                      value={amoSecretKey}
                      onChange={(e) => setAmoSecretKey(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Redirect URI</label>
                    <input
                      type="text"
                      value={amoRedirectUri}
                      onChange={(e) => setAmoRedirectUri(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono text-[11px] bg-slate-50"
                      readOnly
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold rounded-lg shadow-sm cursor-pointer uppercase tracking-wider"
                    >
                      SAQLASH VA ULASH
                    </button>
                    {isAmoActive && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsAmoActive(false);
                          showToast("Amo CRM integratsiyasi uzildi.");
                        }}
                        className="text-xs text-rose-500 hover:underline cursor-pointer"
                      >
                        Ulanishni uzish
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Face ID Terminal Integration Card */}
            {(subView === "integrations" || subView === "faceid") && (
              <div className="bg-white border border-[#e8ecf4] rounded-2xl shadow-xs p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Face ID Terminal Integratsiyasi</h3>
                      <p className="text-[11px] text-slate-400">O'quvchi va xodimlar davomatini avtomatik qayd etish</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      isFaceActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isFaceActive ? "FAOL" : "ULANMAGAN"}
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsFaceActive(true);
                    showToast("Face ID terminal sozlamalari muvaffaqiyatli saqlandi!");
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Terminal modeli</label>
                    <select
                      value={faceModel}
                      onChange={(e) => setFaceModel(e.target.value)}
                      className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] bg-white"
                    >
                      <option value="Hikvision DS-K1T671MF">Hikvision DS-K1T671MF (Tavsiya etiladi)</option>
                      <option value="Dahua ASI7213X-T1">Dahua ASI7213X-T1</option>
                      <option value="ZKTeco SpeedFace-V5L">ZKTeco SpeedFace-V5L</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-slate-600 font-semibold mb-1">Terminal IP manzili</label>
                      <input
                        type="text"
                        value={faceIp}
                        onChange={(e) => setFaceIp(e.target.value)}
                        placeholder="192.168.1.120"
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Port</label>
                      <input
                        type="text"
                        value={facePort}
                        onChange={(e) => setFacePort(e.target.value)}
                        placeholder="8080"
                        className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold rounded-lg shadow-sm cursor-pointer uppercase tracking-wider"
                    >
                      SAQLASH VA TEST QILISH
                    </button>
                    {isFaceActive && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsFaceActive(false);
                          showToast("Face ID integratsiyasi o'chirildi.");
                        }}
                        className="text-xs text-rose-500 hover:underline cursor-pointer"
                      >
                        O'chirish
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}


      {/* ================= RIGHT DRAWER: YANGI XONA QO'SHISH (1:1 with frame_035) ================= */}
      {isAddRoomDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Yangi xona qo'shish</h3>
              <button
                onClick={() => setIsAddRoomDrawerOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRoom} className="p-6 space-y-4 text-xs flex-1">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Xona nomi</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="Xona nomi"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Sig'im</label>
                <input
                  type="number"
                  value={newRoomCapacity}
                  onChange={(e) => setNewRoomCapacity(e.target.value)}
                  placeholder="Sig'im (o'quvchilar soni)"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= RIGHT DRAWER: YANGI KURS QO'SHISH ================= */}
      {isAddCourseDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Yangi kurs qo'shish</h3>
              <button
                onClick={() => setIsAddCourseDrawerOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 space-y-4 text-xs flex-1">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kurs nomi</label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="Masalan: IELTS Intensive yoki CEFR B2"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kurs narxi (oylik)</label>
                <input
                  type="text"
                  value={newCourseFee}
                  onChange={(e) => setNewCourseFee(e.target.value)}
                  placeholder="350 000"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Davomiyligi (oy)</label>
                <input
                  type="text"
                  value={newCourseDuration}
                  onChange={(e) => setNewCourseDuration(e.target.value)}
                  placeholder="3 oy"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= RIGHT DRAWER: YANGI XODIM QO'SHISH ================= */}
      {isAddStaffDrawerOpen && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex justify-end z-50 animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base">Yangi xodim qo'shish</h3>
              <button
                onClick={() => setIsAddStaffDrawerOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="p-6 space-y-4 text-xs flex-1">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Ism familiya</label>
                <input
                  type="text"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  placeholder="Ism familiyani kiriting"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Telefon raqam</label>
                <input
                  type="text"
                  value={newStaffPhone}
                  onChange={(e) => setNewStaffPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kasbi / Rol</label>
                <select
                  value={newStaffRole}
                  onChange={(e) => setNewStaffRole(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef] bg-white"
                >
                  <option value="teacher">O'qituvchi</option>
                  <option value="admin">Administrator</option>
                  <option value="casher">Kassir</option>
                  <option value="ceo">CEO</option>
                  <option value="support">Support Teacher</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Doimiy oylik</label>
                <input
                  type="text"
                  value={newStaffSalary}
                  onChange={(e) => setNewStaffSalary(e.target.value)}
                  placeholder="3 000 000 so'm"
                  className="w-full p-3 border border-slate-200 rounded-xl outline-hidden focus:border-[#5d5fef]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#5d5fef] hover:bg-[#4f51e0] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: YANGI TO'LOV USULI ================= */}
      {isAddPayModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Yangi to'lov usulini qo'shish</h3>
            <form onSubmit={handleAddPaymentMethod} className="space-y-4 text-xs">
              <input
                type="text"
                value={newPayMethodName}
                onChange={(e) => setNewPayMethodName(e.target.value)}
                placeholder="Masalan: Payme, Uzum Bank"
                className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPayModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5d5fef] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: YANGI FORMA ================= */}
      {isAddFormModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Yangi forma yaratish</h3>
            <form onSubmit={handleSaveForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Forma nomi</label>
                <input
                  type="text"
                  value={newFormName}
                  onChange={(e) => setNewFormName(e.target.value)}
                  placeholder="Masalan: IELTS Mock Sinovi uchun forma"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Lid bo'limi</label>
                <select
                  value={newFormDept}
                  onChange={(e) => setNewFormDept(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] bg-white"
                >
                  <option value="IELTS Bo'limi">IELTS Bo'limi</option>
                  <option value="IT Dasturlash">IT Dasturlash</option>
                  <option value="Bolalar Bo'limi">Bolalar Bo'limi</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Manba</label>
                <select
                  value={newFormSource}
                  onChange={(e) => setNewFormSource(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] bg-white"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Sayt">Sayt</option>
                  <option value="Facebook">Facebook</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFormModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5d5fef] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: YANGI SMS KATEGORIYA ================= */}
      {isAddSmsCategoryOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Yangi SMS kategoriya yaratish</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSmsCatName.trim()) return;
                setSmsCategories([...smsCategories, newSmsCatName.trim()]);
                setNewSmsCatName("");
                setIsAddSmsCategoryOpen(false);
                showToast("SMS kategoriya yaratildi!");
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kategoriya nomi</label>
                <input
                  type="text"
                  value={newSmsCatName}
                  onChange={(e) => setNewSmsCatName(e.target.value)}
                  placeholder="Masalan: To'lovlar, Eslatmalar"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddSmsCategoryOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5d5fef] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Yaratish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: YANGI SMS SHABLON ================= */}
      {isAddSmsTemplateOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm mb-3">Yangi SMS shablon yaratish</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSmsTplName.trim()) return;
                const tpl = {
                  id: smsTemplates.length + 1,
                  name: newSmsTplName.trim(),
                  category: newSmsTplCat || (smsCategories[0] || "Umumiy"),
                  text: newSmsTplText.trim(),
                };
                setSmsTemplates([...smsTemplates, tpl]);
                setNewSmsTplName("");
                setNewSmsTplText("");
                setIsAddSmsTemplateOpen(false);
                showToast("SMS shabloni yaratildi!");
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Shablon nomi</label>
                <input
                  type="text"
                  value={newSmsTplName}
                  onChange={(e) => setNewSmsTplName(e.target.value)}
                  placeholder="Masalan: To'lov haqida eslatma"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Kategoriya</label>
                <select
                  value={newSmsTplCat}
                  onChange={(e) => setNewSmsTplCat(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef] bg-white"
                >
                  <option value="Umumiy">Umumiy</option>
                  {smsCategories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Shablon matni</label>
                <textarea
                  value={newSmsTplText}
                  onChange={(e) => setNewSmsTplText(e.target.value)}
                  placeholder="Hurmatli o'quvchi, sizning darsingiz..."
                  rows={4}
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-hidden focus:border-[#5d5fef]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddSmsTemplateOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5d5fef] text-white rounded-lg font-bold shadow-xs cursor-pointer"
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
