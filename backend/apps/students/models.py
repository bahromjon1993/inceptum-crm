from django.db import models
from django.conf import settings

class Student(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Faol ta\'lim olmoqda'
        IN_DEBT = 'IN_DEBT', 'Qarzdorlik mavjud'
        FROZEN = 'FROZEN', 'Muzlatilgan'
        LEFT = 'LEFT', 'O\'qishni tark etgan'

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='student_profile',
        verbose_name='Akkaunt'
    )
    first_name = models.CharField(max_length=100, verbose_name='Ism')
    last_name = models.CharField(max_length=100, verbose_name='Familiya')
    phone = models.CharField(max_length=30, verbose_name='Telefon raqami')
    parent_phone = models.CharField(max_length=30, blank=True, verbose_name='Ota-ona telefoni')
    parent_name = models.CharField(max_length=150, blank=True, verbose_name='Ota-ona F.I.Sh')
    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.0,
        verbose_name='Balans (so\'m)'
    )
    coins = models.IntegerField(default=0, verbose_name='Coinlar balansi')
    branch = models.ForeignKey(
        'branches.Branch',
        on_delete=models.CASCADE,
        related_name='students',
        verbose_name='Filial'
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
        verbose_name='O\'quvchi holati'
    )
    joined_date = models.DateField(auto_now_add=True, verbose_name='Qo\'shilgan sana')
    avatar_url = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        verbose_name = 'O\'quvchi'
        verbose_name_plural = 'O\'quvchilar'
        ordering = ['-joined_date']

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class StudentGroupEnrollment(models.Model):
    class EnrollmentStatus(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Guruhda faol'
        TRANSFERRED = 'TRANSFERRED', 'Boshqa guruhga ko\'chirilgan'
        COMPLETED = 'COMPLETED', 'Kursni yakunladi'
        DROPPED = 'DROPPED', 'Guruhdan chiqarilgan'

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    group = models.ForeignKey('groups.Group', on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=EnrollmentStatus.choices, default=EnrollmentStatus.ACTIVE)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    class Meta:
        verbose_name = 'Guruh a\'zoligi'
        verbose_name_plural = 'Guruh a\'zoliklari'
        unique_together = ('student', 'group')

    def __str__(self):
        return f"{self.student.full_name} -> {self.group.name}"


class StudentTransitionHistory(models.Model):
    """
    Tracks transitions between courses/groups (shown in student profile).
    """
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='transitions')
    from_group_name = models.CharField(max_length=150, blank=True)
    to_group_name = models.CharField(max_length=150)
    transition_date = models.DateField(auto_now_add=True)
    reason = models.CharField(max_length=255, default='Daraja ko\'tarilishi / jadval moslashuvi')

    class Meta:
        verbose_name = 'Guruh o\'zgarish tarixi'
        verbose_name_plural = 'Guruh o\'zgarish tarixlari'
        ordering = ['-transition_date']

    def __str__(self):
        return f"{self.student.full_name}: {self.from_group_name} -> {self.to_group_name}"
