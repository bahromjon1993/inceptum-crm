from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from accounts.views import CustomLoginView, CurrentUserProfileView, RolePermissionViewSet
from branches.views import BranchViewSet
from teachers.views import TeacherViewSet
from groups.views import GroupViewSet, GroupDetailDataView
from students.views import StudentViewSet, StudentProfileDetailView, SendStudentSMSView
from attendance.views import BulkMarkAttendanceView, SaveDailyGradeView
from finance.views import PaymentViewSet, ReceiptSettingView, GiveCoinsView, GiveDiscountView
from exams.views import ExamViewSet, ExamResultsView
from reports.views import CenterActivityReportView, ChurnAnalysisReportView
from audit_logs.views import AuditLogViewSet

router = DefaultRouter()
router.register(r'roles', RolePermissionViewSet, basename='role')
router.register(r'branches', BranchViewSet, basename='branch')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'payments', PaymentViewSet, basename='payment')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'audit-logs', AuditLogViewSet, basename='audit-log')

urlpatterns = [
    # Auth
    path('auth/login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', CurrentUserProfileView.as_view(), name='current_user'),

    # Group details
    path('groups/<int:pk>/details/', GroupDetailDataView.as_view(), name='group_details'),

    # Student details & actions
    path('students/<int:pk>/profile/', StudentProfileDetailView.as_view(), name='student_profile'),
    path('students/<int:pk>/sms/', SendStudentSMSView.as_view(), name='student_send_sms'),

    # Attendance & Grades
    path('attendance/mark/', BulkMarkAttendanceView.as_view(), name='bulk_mark_attendance'),
    path('attendance/grade/', SaveDailyGradeView.as_view(), name='save_daily_grade'),

    # Finance extra
    path('finance/receipt-settings/', ReceiptSettingView.as_view(), name='receipt_settings'),
    path('finance/give-coins/', GiveCoinsView.as_view(), name='give_coins'),
    path('finance/give-discount/', GiveDiscountView.as_view(), name='give_discount'),

    # Exam results
    path('exams/<int:pk>/results/', ExamResultsView.as_view(), name='exam_results'),

    # Reports
    path('reports/activity/', CenterActivityReportView.as_view(), name='report_activity'),
    path('reports/churn/', ChurnAnalysisReportView.as_view(), name='report_churn'),

    # Router endpoints
    path('', include(router.urls)),
]
