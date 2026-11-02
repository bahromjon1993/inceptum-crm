from rest_framework import serializers, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Group, Course, Room
from students.models import StudentGroupEnrollment
from attendance.models import Attendance, DailyGrade
from finance.models import Discount, CoinTransaction

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    class Meta:
        model = Room
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.name', read_only=True)
    teacher_avatar = serializers.CharField(source='teacher.avatar_url', read_only=True)
    room_name = serializers.CharField(source='room.name', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    grading_system_display = serializers.CharField(source='get_grading_system_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    students_count = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = [
            'id', 'name', 'course', 'course_name', 'teacher', 'teacher_name', 'teacher_avatar',
            'room', 'room_name', 'branch', 'branch_name', 'schedule_days', 'schedule_time',
            'grading_system', 'grading_system_display', 'monthly_fee', 'status', 'status_display',
            'start_date', 'students_count', 'created_at'
        ]

    def get_students_count(self, obj):
        return obj.enrollments.filter(status='ACTIVE').count()

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().select_related('course', 'teacher', 'room', 'branch')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        branch_id = self.request.query_params.get('branch')
        if branch_id:
            qs = qs.filter(branch_id=branch_id)
        # If user is teacher, filter to their groups
        if self.request.user.role == 'TEACHER':
            qs = qs.filter(teacher__user=self.request.user)
        return qs

class GroupDetailDataView(APIView):
    """
    Returns complete group details:
    - Enrolled students with balances & contacts
    - Attendance history matrix
    - Daily grades journal
    - Discounts & coin records
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            group = Group.objects.select_related('course', 'teacher', 'room', 'branch').get(pk=pk)
        except Group.DoesNotExist:
            return Response({'detail': 'Guruh topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        enrollments = group.enrollments.select_related('student').all()
        students_list = []
        for en in enrollments:
            st = en.student
            students_list.append({
                'id': st.id,
                'enrollment_id': en.id,
                'full_name': st.full_name,
                'phone': st.phone,
                'parent_phone': st.parent_phone,
                'balance': float(st.balance),
                'coins': st.coins,
                'status': st.status,
                'status_display': st.get_status_display(),
                'enrolled_at': en.enrolled_at,
                'discount_percentage': float(en.discount_percentage)
            })

        # Fetch recent attendances (last 15 dates)
        attendances = Attendance.objects.filter(group=group).order_by('-date')[:150]
        att_data = []
        for a in attendances:
            att_data.append({
                'id': a.id,
                'student_id': a.student_id,
                'date': str(a.date),
                'status': a.status,
                'note': a.note
            })

        # Fetch recent grades
        grades = DailyGrade.objects.filter(group=group).order_by('-date')[:150]
        grades_data = []
        for g in grades:
            grades_data.append({
                'id': g.id,
                'student_id': g.student_id,
                'date': str(g.date),
                'lesson_topic': g.lesson_topic,
                'homework_score': float(g.homework_score),
                'activity_score': float(g.activity_score),
                'exam_score': float(g.exam_score) if g.exam_score is not None else None,
                'average_score': float(g.average_score),
                'coin_earned': g.coin_earned,
                'comment': g.comment
            })

        # Fetch discounts
        discounts = Discount.objects.filter(group=group).select_related('student')
        disc_data = [{
            'id': d.id,
            'student_name': d.student.full_name,
            'percentage': float(d.percentage),
            'amount': float(d.fixed_amount),
            'reason': d.reason,
            'created_at': d.created_at.strftime('%d.%m.%Y')
        } for d in discounts]

        return Response({
            'group': GroupSerializer(group).data,
            'students': students_list,
            'attendances': att_data,
            'grades': grades_data,
            'discounts': disc_data
        })
