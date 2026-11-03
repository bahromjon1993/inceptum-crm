import os
import sys
import io
import django

# Force utf-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'apps'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User, RolePermission
from branches.models import Branch
from teachers.models import Teacher
from groups.models import Course, Room, Group
from students.models import Student, StudentGroupEnrollment, StudentTransitionHistory
from attendance.models import Attendance, DailyGrade
from finance.models import Payment, Discount, CoinTransaction, ReceiptSetting
from exams.models import Exam, ExamResult
from reports.models import StudentChurnLog
from audit_logs.models import AuditLog

def clean():
    print("🧹 INCEPTUM CRM: Ma'lumotlar bazasini tozalash boshlandi...")

    # 1. Audit logs & Reports
    c_audit, _ = AuditLog.objects.all().delete()
    c_churn, _ = StudentChurnLog.objects.all().delete()
    print(f"  - Audit va Churn jurnallari tozalandi ({c_audit + c_churn} ta)")

    # 2. Exams
    c_results, _ = ExamResult.objects.all().delete()
    c_exams, _ = Exam.objects.all().delete()
    print(f"  - Imtihon natijalari va imtihonlar tozalandi ({c_results + c_exams} ta)")

    # 3. Attendance & Daily grades
    c_grades, _ = DailyGrade.objects.all().delete()
    c_att, _ = Attendance.objects.all().delete()
    print(f"  - Davomat va baholar tozalandi ({c_grades + c_att} ta)")

    # 4. Finance (Payments, Discounts, Coins)
    c_coins, _ = CoinTransaction.objects.all().delete()
    c_disc, _ = Discount.objects.all().delete()
    c_pay, _ = Payment.objects.all().delete()
    print(f"  - To'lovlar, chegirmalar va coinlar tozalandi ({c_coins + c_disc + c_pay} ta)")

    # 5. Students & Enrollments
    c_trans, _ = StudentTransitionHistory.objects.all().delete()
    c_enr, _ = StudentGroupEnrollment.objects.all().delete()
    c_stu, _ = Student.objects.all().delete()
    print(f"  - O'quvchilar va guruhga biriktirishlar tozalandi ({c_trans + c_enr + c_stu} ta)")

    # 6. Groups, Courses, Rooms
    c_grp, _ = Group.objects.all().delete()
    c_crs, _ = Course.objects.all().delete()
    c_rm, _ = Room.objects.all().delete()
    print(f"  - Guruhlar, kurslar va xonalar tozalandi ({c_grp + c_crs + c_rm} ta)")

    # 7. Teachers
    c_tch, _ = Teacher.objects.all().delete()
    print(f"  - O'qituvchilar tozalandi ({c_tch} ta)")

    # 8. Clean users except superuser / CEO
    deleted_users, _ = User.objects.exclude(phone_number='+998901234567').delete()
    print(f"  - Qo'shimcha foydalanuvchilar o'chirildi ({deleted_users} ta)")

    # Ensure main CEO user exists and is active
    branch_chl, _ = Branch.objects.get_or_create(
        code='CHL',
        defaults={'name': 'INCEPTUM Filiali', 'address': 'Toshkent shahar', 'phone': '+998 (71) 200-45-45'}
    )

    ceo_user, created = User.objects.get_or_create(
        phone_number='+998901234567',
        defaults={
            'first_name': 'Sherzodbek',
            'last_name': 'Qodirov',
            'role': User.Role.CEO,
            'is_staff': True,
            'is_superuser': True,
            'branch': branch_chl,
        }
    )
    ceo_user.set_password('admin123')
    ceo_user.role = User.Role.CEO
    ceo_user.is_staff = True
    ceo_user.is_superuser = True
    ceo_user.branch = branch_chl
    ceo_user.save()

    print("\n✅ Baza 100% muvaffaqiyatli tozalandi!")
    print("🔑 Tizimga kirish uchun CEO hisobi tayyor:")
    print("   Telefon: +998901234567")
    print("   Parol:   admin123")

if __name__ == '__main__':
    clean()

