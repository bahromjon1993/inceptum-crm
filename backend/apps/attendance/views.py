from datetime import datetime
from rest_framework import serializers, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Attendance, DailyGrade
from students.models import Student
from groups.models import Group
from finance.models import CoinTransaction
from audit_logs.models import AuditLog

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class DailyGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyGrade
        fields = '__all__'

class BulkMarkAttendanceView(APIView):
    """
    Saves or updates attendance for students in a group for a given date.
    Payload: {
        "group_id": 1,
        "date": "2026-10-27",
        "records": [
            {"student_id": 1, "status": "PRESENT", "note": ""},
            {"student_id": 2, "status": "ABSENT", "note": "Kasal"}
        ]
    }
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        group_id = request.data.get('group_id')
        date_str = request.data.get('date')
        records = request.data.get('records', [])

        if not group_id or not date_str:
            return Response({'detail': 'group_id va date ko\'rsatilishi shart'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist:
            return Response({'detail': 'Guruh topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        updated_count = 0
        for rec in records:
            st_id = rec.get('student_id')
            st_status = rec.get('status', 'PRESENT')
            st_note = rec.get('note', '')

            Attendance.objects.update_or_create(
                student_id=st_id,
                group=group,
                date=date_str,
                defaults={
                    'status': st_status,
                    'note': st_note,
                    'marked_by': request.user
                }
            )
            updated_count += 1

        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.ATTENDANCE,
            title='Davomat belgilandi',
            description=f"Guruh: {group.name} | Sana: {date_str} | {updated_count} nafar o'quvchi",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({
            'status': 'success',
            'message': f"{updated_count} nafar o'quvchi uchun davomat muvaffaqiyatli saqlandi!",
            'group_id': group_id,
            'date': date_str
        })

class SaveDailyGradeView(APIView):
    """
    Saves daily grades, topic, homework score, activity score, exam score, and coin awards.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        student_id = request.data.get('student_id')
        group_id = request.data.get('group_id')
        date_str = request.data.get('date')
        topic = request.data.get('lesson_topic', 'Mavzu')
        hw_score = request.data.get('homework_score', 5.0)
        act_score = request.data.get('activity_score', 5.0)
        exam_score = request.data.get('exam_score')
        coins = int(request.data.get('coin_earned', 0))
        comment = request.data.get('comment', '')

        try:
            student = Student.objects.get(id=student_id)
            group = Group.objects.get(id=group_id)
        except (Student.DoesNotExist, Group.DoesNotExist):
            return Response({'detail': 'O\'quvchi yoki guruh topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        grade, _ = DailyGrade.objects.update_or_create(
            student=student,
            group=group,
            date=date_str,
            defaults={
                'lesson_topic': topic,
                'homework_score': hw_score,
                'activity_score': act_score,
                'exam_score': exam_score,
                'coin_earned': coins,
                'comment': comment
            }
        )

        # If coins were given, update student coins and record transaction
        if coins != 0:
            student.coins += coins
            student.save(update_fields=['coins'])
            CoinTransaction.objects.create(
                student=student,
                amount=coins,
                reason=f"Dars bahosi ({topic})",
                granted_by=request.user
            )

        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.GRADE,
            title=f"Baho qo'yildi: {student.full_name}",
            description=f"Guruh: {group.name} | O'rtacha: {grade.average_score} | Coin: +{coins}",
            ip_address=getattr(request, 'client_ip', None)
        )

        return Response({
            'status': 'success',
            'average_score': float(grade.average_score),
            'student_coins': student.coins,
            'message': 'Baho va coinlar muvaffaqiyatli saqlandi!'
        })
