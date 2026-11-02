import os
import sys
import io
import django
from datetime import date, timedelta
from decimal import Decimal

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

def seed():
    print("🌱 Seeding Inceptum database...")

    # 1. Branches
    branch_chl, _ = Branch.objects.get_or_create(
        code='CHL',
        defaults={'name': 'Chilonzor filiali', 'address': 'Chilonzor 9-mavze, 24-uy', 'phone': '+998 (71) 200-45-45'}
    )
    branch_yun, _ = Branch.objects.get_or_create(
        code='YUN',
        defaults={'name': 'Yunusobod filiali', 'address': 'Amir Temur shoh ko\'chasi, 108', 'phone': '+998 (71) 200-45-46'}
    )

    # 2. Roles and Permissions
    roles_data = [
        (User.Role.CEO, 'Bosh direktor (CEO)', 'To\'liq tizim nazorati va sozlamalar', 1, True, True, True, True, True, True, True, True),
        (User.Role.ADMIN, 'Administrator', 'Filial, guruhlar va to\'lovlar nazorati', 2, True, True, True, True, False, False, True, True),
        (User.Role.TEACHER, 'O\'qituvchi', 'Darslar, davomat, baholash va coinlar', 8, False, False, False, True, False, False, False, True),
        (User.Role.OPERATOR, 'Operator / Qabul', 'Lidlar, yangi arizalar va kassa to\'lovlari', 3, False, True, False, False, False, False, False, True),
        (User.Role.STUDENT, 'O\'quvchi', 'Shaxsiy profil, jadval, baholar va to\'lov cheklari', 154, False, False, False, False, False, False, False, False),
    ]
    for r, name, desc, count, vf, cp, gd, gc, mr, dr, er, ss in roles_data:
        RolePermission.objects.update_or_create(
            role=r,
            defaults={
                'role_name': name,
                'description': desc,
                'user_count': count,
                'can_view_finance': vf,
                'can_create_payment': cp,
                'can_give_discount': gd,
                'can_give_coins': gc,
                'can_manage_roles': mr,
                'can_delete_records': dr,
                'can_export_reports': er,
                'can_send_sms': ss,
            }
        )

    # 3. Users
    ceo_user, _ = User.objects.get_or_create(
        phone_number='+998901234567',
        defaults={
            'first_name': 'Sherzodbek',
            'last_name': 'Qodirov',
            'role': User.Role.CEO,
            'is_staff': True,
            'is_superuser': True,
            'branch': branch_chl,
            'avatar_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        }
    )
    ceo_user.set_password('admin123')
    ceo_user.save()

    admin_user, _ = User.objects.get_or_create(
        phone_number='+998902345678',
        defaults={
            'first_name': 'Madina',
            'last_name': 'Karimova',
            'role': User.Role.ADMIN,
            'is_staff': True,
            'branch': branch_chl,
            'avatar_url': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
        }
    )
    admin_user.set_password('admin123')
    admin_user.save()

    teacher_user, _ = User.objects.get_or_create(
        phone_number='+998903456789',
        defaults={
            'first_name': 'Abduqodir',
            'last_name': 'Ziyodov',
            'role': User.Role.TEACHER,
            'branch': branch_chl,
            'avatar_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
        }
    )
    teacher_user.set_password('teacher123')
    teacher_user.save()

    operator_user, _ = User.objects.get_or_create(
        phone_number='+998904567890',
        defaults={
            'first_name': 'Nargiza',
            'last_name': 'Usmonova',
            'role': User.Role.OPERATOR,
            'branch': branch_chl,
            'avatar_url': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
        }
    )
    operator_user.set_password('operator123')
    operator_user.save()

    # 4. Teachers
    teacher_1, _ = Teacher.objects.get_or_create(
        phone='+998903456789',
        defaults={
            'user': teacher_user,
            'name': 'Abduqodir Ziyodov',
            'subject': 'General English & IELTS',
            'salary_type': Teacher.SalaryType.PERCENTAGE,
            'salary_rate': Decimal('45.0'),
            'branch': branch_chl,
            'avatar_url': teacher_user.avatar_url
        }
    )
    teacher_2, _ = Teacher.objects.get_or_create(
        phone='+998909876543',
        defaults={
            'name': 'Bekzod Rahimov',
            'subject': 'Python & Backend Dev',
            'salary_type': Teacher.SalaryType.PERCENTAGE,
            'salary_rate': Decimal('50.0'),
            'branch': branch_chl,
            'avatar_url': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
        }
    )

    # 5. Rooms & Courses
    room_1, _ = Room.objects.get_or_create(name='Xona 204 (Cambridge)', branch=branch_chl, defaults={'capacity': 18})
    room_2, _ = Room.objects.get_or_create(name='IT Lab (Kompyuter zali)', branch=branch_chl, defaults={'capacity': 16})

    course_ielts, _ = Course.objects.get_or_create(
        name='IELTS Intensive 7.5+',
        defaults={'duration_months': 4, 'default_price': Decimal('750000.0')}
    )
    course_py, _ = Course.objects.get_or_create(
        name='Python & Django Backend',
        defaults={'duration_months': 6, 'default_price': Decimal('900000.0')}
    )
    course_gen, _ = Course.objects.get_or_create(
        name='General English (B2 Upper)',
        defaults={'duration_months': 3, 'default_price': Decimal('600000.0')}
    )

    # 6. Groups
    grp_ielts, _ = Group.objects.get_or_create(
        name='IELTS-701',
        defaults={
            'course': course_ielts,
            'teacher': teacher_1,
            'room': room_1,
            'branch': branch_chl,
            'schedule_days': 'Du-Chor-Juma',
            'schedule_time': '14:00 - 16:00',
            'grading_system': Group.GradingSystem.IELTS_BAND,
            'monthly_fee': Decimal('750000.0'),
            'status': Group.Status.ACTIVE,
            'start_date': date.today() - timedelta(days=45)
        }
    )
    grp_py, _ = Group.objects.get_or_create(
        name='PY-DJANGO-01',
        defaults={
            'course': course_py,
            'teacher': teacher_2,
            'room': room_2,
            'branch': branch_chl,
            'schedule_days': 'Se-Pay-Shanba',
            'schedule_time': '16:00 - 18:00',
            'grading_system': Group.GradingSystem.COIN_SYSTEM,
            'monthly_fee': Decimal('900000.0'),
            'status': Group.Status.ACTIVE,
            'start_date': date.today() - timedelta(days=20)
        }
    )

    # 7. Students
    students_data = [
        ('Javohir', 'Toshpo\'latov', '+998 90 567 89 01', '+998 99 111 22 33', 'Toshpo\'lat aka', Decimal('450000.0'), 120, Student.Status.ACTIVE),
        ('Malika', 'Aliyeva', '+998 93 456 12 78', '+998 90 999 88 77', 'Dilfuza opa', Decimal('-200000.0'), 85, Student.Status.IN_DEBT),
        ('Sardor', 'Mamatqulov', '+998 97 123 90 89', '+998 93 888 77 66', 'Mamatqul aka', Decimal('750000.0'), 210, Student.Status.ACTIVE),
        ('Zilola', 'Hamidova', '+998 94 888 12 34', '+998 90 777 66 55', 'Nodira opa', Decimal('0.0'), 45, Student.Status.ACTIVE),
        ('Bobur', 'Rustamov', '+998 91 333 44 55', '+998 98 555 44 33', 'Rustam aka', Decimal('-750000.0'), 15, Student.Status.IN_DEBT),
        ('Diyorbek', 'Soliyev', '+998 90 111 22 44', '+998 97 222 33 55', 'Solijon aka', Decimal('150000.0'), 95, Student.Status.ACTIVE),
    ]

    created_students = []
    for fn, ln, ph, pph, pn, bal, c, st in students_data:
        s, _ = Student.objects.get_or_create(
            phone=ph,
            defaults={
                'first_name': fn,
                'last_name': ln,
                'parent_phone': pph,
                'parent_name': pn,
                'balance': bal,
                'coins': c,
                'branch': branch_chl,
                'status': st,
                'avatar_url': f"https://api.dicebear.com/7.x/initials/svg?seed={fn}+{ln}&backgroundColor=6366f1"
            }
        )
        created_students.append(s)
        # Enroll in IELTS-701
        StudentGroupEnrollment.objects.get_or_create(student=s, group=grp_ielts)

    # Transition card for Javohir
    StudentTransitionHistory.objects.get_or_create(
        student=created_students[0],
        to_group_name='IELTS-701',
        defaults={
            'from_group_name': 'General English (B2 Upper)',
            'reason': 'Daraja ko\'tarildi, B2 imtihonidan muvaffaqiyatli o\'tdi'
        }
    )

    # 8. Attendance & Daily Grades (last 7 days)
    today = date.today()
    for day_offset in range(7):
        curr_date = today - timedelta(days=day_offset)
        # only Mon, Wed, Fri
        for idx, student in enumerate(created_students):
            st = Attendance.Status.PRESENT
            if idx == 1 and day_offset == 1:
                st = Attendance.Status.ABSENT
            elif idx == 4 and day_offset == 2:
                st = Attendance.Status.LATE
            elif idx == 3 and day_offset == 3:
                st = Attendance.Status.EXCUSED

            Attendance.objects.get_or_create(
                student=student,
                group=grp_ielts,
                date=curr_date,
                defaults={'status': st, 'marked_by': teacher_user}
            )

            # Daily grade
            DailyGrade.objects.get_or_create(
                student=student,
                group=grp_ielts,
                date=curr_date,
                defaults={
                    'lesson_topic': f"Unit {4 + day_offset}: Advanced Reading & Vocab",
                    'homework_score': Decimal('7.5') if idx != 1 else Decimal('5.0'),
                    'activity_score': Decimal('8.0'),
                    'exam_score': Decimal('7.0'),
                    'coin_earned': 5 if st == Attendance.Status.PRESENT else 0,
                    'comment': 'Uy vazifasi to\'liq bajarilgan'
                }
            )

    # 9. Payments
    Payment.objects.get_or_create(
        receipt_number='CHK-2026-9041',
        defaults={
            'student': created_students[0],
            'group': grp_ielts,
            'amount': Decimal('750000.0'),
            'payment_method': Payment.Method.CLICK,
            'cashier': admin_user,
            'comment': 'Oktabr oyi uchun to\'liq to\'lov'
        }
    )
    Payment.objects.get_or_create(
        receipt_number='CHK-2026-9042',
        defaults={
            'student': created_students[2],
            'group': grp_ielts,
            'amount': Decimal('750000.0'),
            'payment_method': Payment.Method.CASH,
            'cashier': admin_user,
            'comment': 'Naqd to\'lov, kassa cheki chiqarildi'
        }
    )

    # 10. Receipt Setting
    ReceiptSetting.objects.get_or_create(
        center_name='INCEPTUM IT & LANGUAGE ACADEMY',
        defaults={
            'branch_name': 'Chilonzor filiali',
            'address': 'Toshkent sh., Chilonzor tumani, 9-mavze, 24-uy',
            'phone': '+998 (71) 200-45-45',
            'header_message': 'To\'lovingiz uchun tashakkur!\nBilim olishingizda ulkan zafarlar tilaymiz.',
            'footer_message': 'Ushbu chek to\'lov tasdig\'i hisoblanadi.\nSavollar bo\'yicha administratorga murojaat qiling.',
            'printer_width': '80mm',
            'show_balance': True,
            'show_qr_code': True
        }
    )

    # 11. Churn logs for Ketish tahlili
    StudentChurnLog.objects.get_or_create(
        student=created_students[4],
        defaults={
            'group': grp_ielts,
            'teacher': teacher_1,
            'reason': StudentChurnLog.Reason.SCHEDULE,
            'details': 'Universitet darslari 2-smenaga o\'tgani sababli guruh vaqti to\'g\'ri kelmadi',
            'feedback_rating': 5
        }
    )

    # 12. Audit logs
    AuditLog.objects.get_or_create(
        title='Yangi to\'lov qabul qilindi',
        defaults={
            'user': admin_user,
            'user_name': admin_user.full_name,
            'action': AuditLog.ActionType.PAYMENT,
            'description': 'Javohir Toshpo\'latov uchun 750 000 so\'m Click orqali qabul qilindi. Chek: CHK-2026-9041',
            'ip_address': '127.0.0.1'
        }
    )
    AuditLog.objects.get_or_create(
        title='Davomat belgilandi',
        defaults={
            'user': teacher_user,
            'user_name': teacher_user.full_name,
            'action': AuditLog.ActionType.ATTENDANCE,
            'description': 'IELTS-701 guruhi bo\'yicha 6 nafar o\'quvchiga davomat saqlandi.',
            'ip_address': '127.0.0.1'
        }
    )

    print("✅ Inceptum database seeded successfully with rich production-grade mock records!")

if __name__ == '__main__':
    seed()
