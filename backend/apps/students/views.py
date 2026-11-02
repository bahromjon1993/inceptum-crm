from rest_framework import serializers, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student, StudentGroupEnrollment, StudentTransitionHistory
from attendance.models import Attendance, DailyGrade
from finance.models import Payment
from reports.models import StudentChurnLog
from audit_logs.models import AuditLog

class StudentEnrollmentSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    teacher_name = serializers.CharField(source='group.teacher.name', read_only=True)
    schedule = serializers.CharField(source='group.schedule_time', read_only=True)

    class Meta:
        model = StudentGroupEnrollment
        fields = ['id', 'group', 'group_name', 'teacher_name', 'schedule', 'status', 'discount_percentage', 'enrolled_at']

class StudentTransitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentTransitionHistory
        fields = '__all__'

class StudentListSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    active_groups = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'first_name', 'last_name', 'full_name', 'phone', 'parent_phone',
            'parent_name', 'balance', 'coins', 'branch', 'branch_name',
            'status', 'status_display', 'joined_date', 'avatar_url', 'active_groups'
        ]

    def get_active_groups(self, obj):
        enrollments = obj.enrollments.filter(status='ACTIVE').select_related('group')
        return [en.group.name for en in enrollments]

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().select_related('branch').prefetch_related('enrollments__group')
    serializer_class = StudentListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        branch_id = self.request.query_params.get('branch')
        if branch_id:
            qs = qs.filter(branch_id=branch_id)
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(first_name__icontains=search) | qs.filter(last_name__icontains=search) | qs.filter(phone__icontains=search)
        return qs

class StudentProfileDetailView(APIView):
    """
    Returns complete student profile:
    - Personal info & contacts
    - Enrolled courses & groups
    - Transition history cards (Guruhlar almashinuvi)
    - Attendance matrix
    - Payment history with receipts
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            student = Student.objects.select_related('branch').get(pk=pk)
        except Student.DoesNotExist:
            return Response({'detail': 'O\'quvchi topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        # Enrollments
        enrollments = StudentGroupEnrollment.objects.filter(student=student).select_related('group__teacher')
        enr_data = StudentEnrollmentSerializer(enrollments, many=True).data

        # Transitions
        transitions = StudentTransitionHistory.objects.filter(student=student).order_by('-transition_date')
        trans_data = StudentTransitionSerializer(transitions, many=True).data

        # Recent payments
        payments = Payment.objects.filter(student=student).order_by('-created_at')[:20]
        pay_data = [{
            'id': p.id,
            'receipt_number': p.receipt_number,
            'amount': float(p.amount),
            'method': p.get_payment_method_display(),
            'date': p.created_at.strftime('%d.%m.%Y %H:%M'),
            'cashier': p.cashier.full_name if p.cashier else 'Kassa',
            'comment': p.comment
        } for p in payments]

        # Recent attendances
        attendances = Attendance.objects.filter(student=student).select_related('group').order_by('-date')[:30]
        att_data = [{
            'id': a.id,
            'group_name': a.group.name,
            'date': str(a.date),
            'status': a.status,
            'status_display': a.get_status_display()
        } for a in attendances]

        return Response({
            'student': StudentListSerializer(student).data,
            'enrollments': enr_data,
            'transitions': trans_data,
            'payments': pay_data,
            'attendances': att_data
        })

class SendStudentSMSView(APIView):
    """
    Sends SMS message to student and logs action in AuditLog.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            student = Student.objects.get(pk=pk)
        except Student.DoesNotExist:
            return Response({'detail': 'O\'quvchi topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        message_type = request.data.get('type', 'CUSTOM')
        message_text = request.data.get('text', '')

        if not message_text.strip():
            return Response({'detail': 'SMS matni bo\'sh bo\'lishi mumkin emas'}, status=status.HTTP_400_BAD_REQUEST)

        # Log to AuditLog
        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.SMS,
            title=f"SMS yuborildi: {student.full_name}",
            description=f"Raqam: {student.phone} | Tur: {message_type} | Matn: {message_text[:80]}...",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({
            'status': 'success',
            'message': f"{student.phone} raqamiga SMS muvaffaqiyatli yuborildi!",
            'sent_text': message_text
        })
