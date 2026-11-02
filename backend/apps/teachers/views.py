from rest_framework import serializers, viewsets, permissions
from .models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    salary_type_display = serializers.CharField(source='get_salary_type_display', read_only=True)
    active_groups_count = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = [
            'id', 'name', 'phone', 'subject', 'salary_type', 'salary_type_display',
            'salary_rate', 'branch', 'branch_name', 'avatar_url', 'is_active',
            'active_groups_count', 'created_at'
        ]

    def get_active_groups_count(self, obj):
        return obj.groups.filter(status='ACTIVE').count()

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.filter(is_active=True)
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]
