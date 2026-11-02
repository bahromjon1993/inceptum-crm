from rest_framework import serializers, viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Exam, ExamResult

class ExamResultSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    student_phone = serializers.CharField(source='student.phone', read_only=True)

    class Meta:
        model = ExamResult
        fields = ['id', 'exam', 'student', 'student_name', 'student_phone', 'score', 'passed', 'certificate_issued', 'notes']

class ExamSerializer(serializers.ModelSerializer):
    group_name = serializers.CharField(source='group.name', read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    examiner_name = serializers.CharField(source='examiner.name', read_only=True)
    room_name = serializers.CharField(source='room.name', read_only=True)
    participants_count = serializers.SerializerMethodField()
    passed_count = serializers.SerializerMethodField()

    class Meta:
        model = Exam
        fields = [
            'id', 'title', 'group', 'group_name', 'course', 'course_name', 'date', 'time',
            'room', 'room_name', 'examiner', 'examiner_name', 'max_score', 'pass_score',
            'is_completed', 'participants_count', 'passed_count', 'created_at'
        ]

    def get_participants_count(self, obj):
        return obj.results.count()

    def get_passed_count(self, obj):
        return obj.results.filter(passed=True).count()

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all().select_related('group', 'course', 'room', 'examiner').order_by('-date')
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]

class ExamResultsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            exam = Exam.objects.get(pk=pk)
        except Exam.DoesNotExist:
            return Response({'detail': 'Imtihon topilmadi'}, status=status.HTTP_404_NOT_FOUND)

        results = exam.results.select_related('student').all()
        return Response({
            'exam': ExamSerializer(exam).data,
            'results': ExamResultSerializer(results, many=True).data
        })
