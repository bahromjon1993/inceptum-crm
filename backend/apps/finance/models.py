import uuid
from django.db import models
from django.conf import settings

class Payment(models.Model):
    class Method(models.TextChoices):
        CASH = 'CASH', 'Naqd pul'
        CARD = 'CARD', 'Bank kartasi (Uzcard/Humo)'
        CLICK = 'CLICK', 'Click'
        PAYME = 'PAYME', 'Payme'
        UZUM = 'UZUM', 'Uzum Bank'
        BANK_TRANSFER = 'BANK_TRANSFER', 'Bank orqali o\'tkazma'

    receipt_number = models.CharField(max_length=50, unique=True, verbose_name='Chek raqami')
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='payments', verbose_name='O\'quvchi')
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True, blank=True, related_name='payments', verbose_name='Guruh')
    amount = models.DecimalField(max_digits=14, decimal_places=2, verbose_name='To\'lov summasi')
    payment_method = models.CharField(max_length=30, choices=Method.choices, default=Method.CASH, verbose_name='To\'lov usuli')
    cashier = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='received_payments', verbose_name='Qabul qiluvchi')
    comment = models.TextField(blank=True, verbose_name='Izoh')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        verbose_name = 'To\'lov'
        verbose_name_plural = 'To\'lovlar'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.receipt_number:
            self.receipt_number = f"CHK-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.receipt_number} | {self.student.full_name} | {self.amount} so'm"


class Discount(models.Model):
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='discounts')
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True, blank=True, related_name='discounts')
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, verbose_name='Chegirma foizi')
    fixed_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0, verbose_name='Qat\'iy chegirma summasi')
    reason = models.CharField(max_length=255, verbose_name='Chegirma sababi')
    granted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Chegirma'
        verbose_name_plural = 'Chegirmalar'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student.full_name} - {self.percentage}% ({self.reason})"


class CoinTransaction(models.Model):
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='coin_transactions')
    amount = models.IntegerField(verbose_name='Coin miqdori (+ yoki -)')
    reason = models.CharField(max_length=255, verbose_name='Sabab / Vazifa')
    granted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Coin tranzaksiyasi'
        verbose_name_plural = 'Coin tranzaksiyalari'
        ordering = ['-created_at']

    def __str__(self):
        sign = '+' if self.amount > 0 else ''
        return f"{self.student.full_name}: {sign}{self.amount} ({self.reason})"


class ReceiptSetting(models.Model):
    center_name = models.CharField(max_length=200, default='INCEPTUM IT & LANGUAGE ACADEMY')
    branch_name = models.CharField(max_length=150, default='Chilonzor filiali')
    address = models.CharField(max_length=255, default='Toshkent sh., Chilonzor tumani, 9-mavze, 24-uy')
    phone = models.CharField(max_length=50, default='+998 (71) 200-45-45')
    header_message = models.TextField(default='To\'lovingiz uchun tashakkur!\nBilim olishingizda omad tilaymiz.')
    footer_message = models.TextField(default='Ushbu chek to\'lov tasdig\'i hisoblanadi.\nQaytarib berilmaydi.')
    printer_width = models.CharField(max_length=10, choices=[('58mm', '58 mm'), ('80mm', '80 mm')], default='80mm')
    show_balance = models.BooleanField(default=True, verbose_name='Qoldiq balansni ko\'rsatish')
    show_qr_code = models.BooleanField(default=True, verbose_name='QR kodni chop etish')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Chek sozlamasi'
        verbose_name_plural = 'Chek sozlamalari'

    def __str__(self):
        return f"{self.center_name} - {self.printer_width}"
