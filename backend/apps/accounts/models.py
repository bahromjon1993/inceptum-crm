from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number, password=None, **extra_fields):
        if not phone_number:
            raise ValueError(_('Telefon raqami kiritilishi shart'))
        phone_number = phone_number.replace(' ', '').replace('-', '').replace('(', '').replace(')', '')
        user = self.model(phone_number=phone_number, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', User.Role.CEO)
        return self.create_user(phone_number, password, **extra_fields)


class User(AbstractUser):
    class Role(models.TextChoices):
        CEO = 'CEO', 'Bosh direktor (CEO)'
        ADMIN = 'ADMIN', 'Administrator'
        TEACHER = 'TEACHER', 'O\'qituvchi'
        OPERATOR = 'OPERATOR', 'Operator / Qabul'
        STUDENT = 'STUDENT', 'O\'quvchi'

    username = None
    phone_number = models.CharField(
        max_length=20,
        unique=True,
        verbose_name='Telefon raqami'
    )
    first_name = models.CharField(max_length=150, verbose_name='Ism')
    last_name = models.CharField(max_length=150, verbose_name='Familiya')
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.ADMIN,
        verbose_name='Foydalanuvchi roli'
    )
    branch = models.ForeignKey(
        'branches.Branch',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users',
        verbose_name='Filial'
    )
    avatar_url = models.CharField(max_length=500, blank=True, null=True, verbose_name='Avatar URL')
    permissions_override = models.JSONField(default=dict, blank=True, verbose_name='Qo\'shimcha ruxsatlar')
    is_active = models.BooleanField(default=True, verbose_name='Faol')
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    class Meta:
        verbose_name = 'Foydalanuvchi'
        verbose_name_plural = 'Foydalanuvchilar'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.get_role_display()})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.phone_number


class RolePermission(models.Model):
    """
    Dynamic RBAC Matrix settings for each role.
    """
    role = models.CharField(max_length=20, choices=User.Role.choices, unique=True, verbose_name='Rol')
    role_name = models.CharField(max_length=100, verbose_name='Rol nomi')
    description = models.TextField(blank=True, verbose_name='Tavsif')
    user_count = models.PositiveIntegerField(default=0, verbose_name='Foydalanuvchilar soni')

    # Module permissions
    can_view_finance = models.BooleanField(default=False, verbose_name='Moliyani ko\'rish')
    can_create_payment = models.BooleanField(default=False, verbose_name='To\'lov qabul qilish')
    can_give_discount = models.BooleanField(default=False, verbose_name='Chegirma berish')
    can_give_coins = models.BooleanField(default=False, verbose_name='Coin berish')
    can_manage_roles = models.BooleanField(default=False, verbose_name='Rollarni boshqarish')
    can_delete_records = models.BooleanField(default=False, verbose_name='Ma\'lumotlarni o\'chirish')
    can_export_reports = models.BooleanField(default=False, verbose_name='Hisobotlarni eksport qilish')
    can_send_sms = models.BooleanField(default=False, verbose_name='SMS yuborish')
    can_manage_groups = models.BooleanField(default=True, verbose_name='Guruhlarni boshqarish')
    can_manage_students = models.BooleanField(default=True, verbose_name='O\'quvchilarni boshqarish')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Rol ruxsati'
        verbose_name_plural = 'Rol ruxsatlari'

    def __str__(self):
        return self.role_name
