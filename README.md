# INCEPTUM CRM & LMS v2.0 (Full-Stack Architecture)

Modern, enterprise-darajadagi o'quv markazini boshqarish tizimi (Linear & Vercel minimalistik uslubida).

---

## 🏗 Arxitektura va Texnologiyalar

### 1. Frontend:
- **Framework**: React 18+ (Vite)
- **Til**: TypeScript (To'liq tiplash)
- **Styling**: Tailwind CSS + shadcn/ui dizayn tizimi
- **Aesthetics**: Linear / Vercel dark mode birinchi o'rinda, monospaced indikatorlar, mikrokontrast chegaralar (`border-zinc-800`), glassmorphism panellar
- **Icons**: Lucide Icons
- **HTTP Client**: Axios (avtomatik JWT request & refresh interceptorlari bilan)

### 2. Backend:
- **Til**: Python 3.14
- **Framework**: Django 5.2 + Django REST Framework (DRF)
- **Autentifikatsiya**: JSON Web Tokens (`rest_framework_simplejwt`)
- **Ruxsatlar (RBAC)**: Custom RBAC (Bosh direktor / CEO, Administrator, O'qituvchi, Operator, O'quvchi) va dinamik `RolePermission` matritsasi
- **Xavfsizlik**: CORS ruxsatnomalari, DRF Throttling (Rate Limiting), parollarni PBKDF2-SHA256 xeshlash, harakatlarni to'liq audit qilish (`AuditLogMiddleware`)
- **API Formati**: Toza RESTful `/api/v1/...`

### 3. Database:
- **RDBMS**: PostgreSQL 18 (`inceptum_db`)
- **Driver**: `psycopg` (v3) binary
- **Modellar**:
  - `branches.Branch` — Ko'p filialli tizim (Chilonzor, Yunusobod va h.k.)
  - `accounts.User` — Telefon raqami orqali login, rollar, filiallar
  - `accounts.RolePermission` — Har bir rol uchun dinamik modul ruxsatlari
  - `teachers.Teacher` — O'qituvchilar, dars beradigan fanlar, ish haqi foizi/stavkasi
  - `groups.Group`, `Course`, `Room` — Guruhlar, dars vaqtlari, xonalar va baholash tizimlari (`UZBEK_5`, `COIN_SYSTEM`, `IELTS_BAND`)
  - `students.Student`, `StudentGroupEnrollment`, `StudentTransitionHistory` — O'quvchilar, balanslar, guruhlar almashinuvi tarixi
  - `attendance.Attendance`, `DailyGrade` — Davomat (Bor, Yo'q, Sababli, Kechikdi) va kunlik baholash jurnali
  - `finance.Payment`, `Discount`, `CoinTransaction`, `ReceiptSetting` — Kassa to'lovlari, chegirmalar, coinlar balansi, termal chek sozlamalari (58mm/80mm)
  - `exams.Exam`, `ExamResult` — Imtihonlar, mock testlar va sertifikatlash
  - `reports.StudentChurnLog` — Ketish sabablari tahlili (Churn analysis)
  - `audit_logs.AuditLog` — Har bir foydalanuvchining tizimdagi amallari va IP manzillari

---

## 🚀 Ishga tushirish (Run Locally)

### 1. Backend (Django + PostgreSQL):
```powershell
cd backend
# Virtual muhitni faollashtirish
.\venv\Scripts\Activate.ps1

# Ma'lumotlar bazasi migratsiyalari
python manage.py migrate

# Sinov ma'lumotlarini yuklash (Seed)
python scripts/seed_data.py

# Serverni ishga tushirish (Port 8000)
python manage.py runserver 127.0.0.1:8000
```

### 2. Frontend (React + Vite):
```powershell
cd frontend
# Kutubxonalarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish (Port 5173)
npm run dev
```

Brauzerda oching: `http://localhost:5173/`

---

## 🔑 Test hisoblar (1-Click Login mavjud):

| Rol | Telefon raqami | Parol | Ruxsatlar darajasi |
|---|---|---|---|
| **CEO (Bosh direktor)** | `+998901234567` | `admin123` | Barcha modullar, rollar matritsasi, moliya, o'chirish |
| **Administrator** | `+998902345678` | `admin123` | Filial, guruhlar, to'lovlar, davomat, eksport |
| **O'qituvchi** | `+998903456789` | `teacher123` | O'z guruhlari, davomat belgilash, baho qo'yish, coin berish |
| **Operator** | `+998904567890` | `operator123` | Lidlar, yangi o'quvchi qo'shish, to'lov qabul qilish |
| **O'quvchi** | `+998905678901` | `student123` | Shaxsiy profil, to'lov cheklari, dars jadvallari |

---

## 🛡 Zaxira nusxa (Backup & Disaster Recovery):

PostgreSQL bazasini xavfsiz saqlash uchun buyruqlar:

```powershell
# Qo'lda zaxira nusxa olish
cd backend
python manage.py backup_db --tag manual

# Zaxira nusxadan tiklash
python manage.py restore_db inceptum_db_manual_YYYYMMDD_HHMMSS.sql

# Avtomatlashtirilgan 14-kunlik rotatsiya skripti
powershell -ExecutionPolicy Bypass -File scripts/backup.ps1
```
Barcha yaratilgan zaxira nusxalar `backend/backups/` katalogida saqlanadi va `AuditLog` ga qayd etiladi.
