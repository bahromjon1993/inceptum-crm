from django.db import models
from django.conf import settings

class Teacher(models.Model):
    class SalaryType(models.TextChoices):
        PERCENTAGE = 'PERCENTAGE', 'Foiz ulushi (%)'
        FIXED = 'FIXED', 'Oylik qat\'iy maosh'
        HOURLY = 'HOURLY', 'Soatbay to\'lov'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='teacher_profile',
        verbose_name='Foydalanuvchi akkaunti'
    )
    name = models.CharField(max_length=150, verbose_name='O\'qituvchi F.I.Sh')
    phone = models.CharField(max_length=30, verbose_name='Telefon raqami')
    subject = models.CharField(max_length=100, verbose_name='Mutaxassislik/Fan')
    salary_type = models.CharField(
        max_length=20,
        choices=SalaryType.choices,
        default=SalaryType.PERCENTAGE,
        verbose_name='Maosh hisoblash usuli'
    )
    salary_rate = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=40.0,
        verbose_name='Maosh stavkasi (foiz yoki summa)'
    )
    branch = models.ForeignKey(
        'branches.Branch',
        on_delete=models.CASCADE,
        related_name='teachers',
        verbose_name='Filial'
    )
    avatar_url = models.CharField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name='Faol')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'O\'qituvchi'
        verbose_name_plural = 'O\'qituvchilar'
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.subject})"
