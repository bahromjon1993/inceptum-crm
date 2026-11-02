from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, RolePermission
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, RolePermissionSerializer
from core.permissions import IsCEO
from audit_logs.models import AuditLog

class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user_data = response.data.get('user', {})
            # Record audit log
            AuditLog.objects.create(
                user_id=user_data.get('id'),
                user_name=user_data.get('full_name', 'Foydalanuvchi'),
                action=AuditLog.ActionType.LOGIN,
                title='Tizimga muvaffaqiyatli kirish',
                description=f"Rol: {user_data.get('role')} | Telefon: {user_data.get('phone_number')}",
                ip_address=getattr(request, 'client_ip', None)
            )
        return response

class CurrentUserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        # Fetch permissions
        rp_data = {}
        try:
            rp = RolePermission.objects.get(role=request.user.role)
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

        data = serializer.data
        data['permissions'] = rp_data
        data['role_display'] = request.user.get_role_display()
        return Response(data)

class RolePermissionViewSet(viewsets.ModelViewSet):
    queryset = RolePermission.objects.all().order_by('id')
    serializer_class = RolePermissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Only CEO can update role matrix
        if request.user.role != 'CEO' and not request.user.is_superuser:
            return Response(
                {'detail': 'Faqat Bosh direktor (CEO) rollarni tahrirlashi mumkin!'},
                status=status.HTTP_403_FORBIDDEN
            )
        response = super().update(request, *args, **kwargs)
        # Log to audit log
        instance = self.get_object()
        AuditLog.objects.create(
            user=request.user,
            user_name=request.user.full_name,
            action=AuditLog.ActionType.SETTINGS,
            title='Rol ruxsatlari yangilandi',
            description=f"Rol: {instance.role_name} ruxsatlar matritsasi tahrirlandi.",
            ip_address=getattr(request, 'client_ip', None)
        )
        return response
