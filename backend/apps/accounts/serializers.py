from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, RolePermission
from branches.models import Branch

class BranchShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'code']

class UserSerializer(serializers.ModelSerializer):
    branch_detail = BranchShortSerializer(source='branch', read_only=True)
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'phone_number', 'first_name', 'last_name',
            'full_name', 'role', 'branch', 'branch_detail',
            'avatar_url', 'permissions_override', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'phone_number'

    def validate(self, attrs):
        data = super().validate(attrs)
        # Fetch role permissions
        rp_data = {}
        try:
            rp = RolePermission.objects.get(role=self.user.role)
            rp_data = {
                'can_view_finance': rp.can_view_finance,
                'can_create_payment': rp.can_create_payment,
                'can_give_discount': rp.can_give_discount,
                'can_give_coins': rp.can_give_coins,
                'can_manage_roles': rp.can_manage_roles,
                'can_delete_records': rp.can_delete_records,
                'can_export_reports': rp.can_export_reports,
                'can_send_sms': rp.can_send_sms,
                'can_manage_groups': rp.can_manage_groups,
                'can_manage_students': rp.can_manage_students,
            }
        except RolePermission.DoesNotExist:
            pass

        data['user'] = {
            'id': self.user.id,
            'phone_number': self.user.phone_number,
            'full_name': self.user.full_name,
            'role': self.user.role,
            'role_display': self.user.get_role_display(),
            'branch': self.user.branch.name if self.user.branch else 'Barcha filiallar',
            'avatar_url': self.user.avatar_url,
            'permissions': rp_data
        }
        return data

class RolePermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolePermission
        fields = '__all__'
