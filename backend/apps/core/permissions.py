from rest_framework import permissions

class IsCEO(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'CEO')

class IsAdminOrCEO(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and
            request.user.role in ['CEO', 'ADMIN']
        )

class IsTeacherOrAbove(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and
            request.user.role in ['CEO', 'ADMIN', 'TEACHER']
        )

def role_has_permission(user, permission_field):
    """
    Checks if user or user role has the required permission flag.
    CEO always has full permission.
    """
    if not user or not user.is_authenticated:
        return False
    if user.role == 'CEO' or user.is_superuser:
        return True
    
    # Check override on user
    if user.permissions_override and permission_field in user.permissions_override:
        return bool(user.permissions_override[permission_field])
        
    # Check role matrix
    from accounts.models import RolePermission
    try:
        rp = RolePermission.objects.get(role=user.role)
        return getattr(rp, permission_field, False)
    except RolePermission.DoesNotExist:
        return False
