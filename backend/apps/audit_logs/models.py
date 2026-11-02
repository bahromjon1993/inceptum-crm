from django.db import models
from django.conf import settings

class AuditLog(models.Model):
    class ActionType(models.TextChoices):
        LOGIN = 'LOGIN', 'Tizimga kirish'
        LOGOUT = 'LOGOUT', 'Tizimdan chiqish'
        PAYMENT = 'PAYMENT', 'To\'lov amali'
        STUDENT_ADD = 'STUDENT_ADD', 'O\'quvchi qo\'shish'
        STUDENT_UPDATE = 'STUDENT_UPDATE', 'O\'quvchi yangilash'
        STUDENT_DELETE = 'STUDENT_DELETE', 'O\'quvchi o\'chirish'
        GROUP_CHANGE = 'GROUP_CHANGE', 'Guruh o\'zgartirish'
        ATTENDANCE = 'ATTENDANCE', 'Davomat belgilash'
        GRADE = 'GRADE', 'Baho qo\'yish'
        COIN = 'COIN', 'Coin berish/olish'
        DISCOUNT = 'DISCOUNT', 'Chegirma kiritish'
        SMS = 'SMS', 'SMS yuborish'
        SETTINGS = 'SETTINGS', 'Sozlama o\'zgartirish'

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='audit_logs',
        verbose_name='Foydalanuvchi'
    )
    user_name = models.CharField(max_length=255, blank=True, verbose_name='Ism sharif')
    action = models.CharField(max_length=50, choices=ActionType.choices, default=ActionType.LOGIN)
    title = models.CharField(max_length=255, verbose_name='Sarlavha')
    description = models.TextField(blank=True, verbose_name='Tafsilotlar')
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name='IP manzil')
    extra_data = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Harakatlar tarixi'
        verbose_name_plural = 'Harakatlar tarixi'

    def __str__(self):
        return f"{self.created_at.strftime('%d.%m.%Y %H:%M')} | {self.user_name} | {self.title}"
