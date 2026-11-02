from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=150, verbose_name='Kurs nomi')
    description = models.TextField(blank=True, verbose_name='Tavsif')
    duration_months = models.PositiveIntegerField(default=3, verbose_name='Davomiyligi (oy)')
    default_price = models.DecimalField(max_digits=12, decimal_places=2, default=650000.0, verbose_name='Standart narx')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Kurs yo\'nalishi'
        verbose_name_plural = 'Kurs yo\'nalishlari'

    def __str__(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=100, verbose_name='Xona nomi')
    capacity = models.PositiveIntegerField(default=16, verbose_name='Sig\'imi')
    branch = models.ForeignKey('branches.Branch', on_delete=models.CASCADE, related_name='rooms', verbose_name='Filial')

    class Meta:
        verbose_name = 'Xona'
        verbose_name_plural = 'Xonalar'

    def __str__(self):
        return f"{self.name} ({self.branch.name})"


class Group(models.Model):
    class GradingSystem(models.TextChoices):
        UZBEK_5 = 'UZBEK_5', 'O\'zbekcha baholash (1-5)'
        COIN_SYSTEM = 'COIN_SYSTEM', 'Coin gamifikatsiya tizimi'
        IELTS_BAND = 'IELTS_BAND', 'IELTS Band (0-9.0)'
        PERCENT_100 = 'PERCENT_100', '100 ballik shkala'

    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Faol guruh'
        PENDING = 'PENDING', 'Yig\'ilayotgan guruh'
        FINISHED = 'FINISHED', 'Tugatilgan guruh'

    name = models.CharField(max_length=100, verbose_name='Guruh nomi')
    course = models.ForeignKey(Course, on_delete=models.PROTECT, related_name='groups', verbose_name='Kurs')
    teacher = models.ForeignKey('teachers.Teacher', on_delete=models.PROTECT, related_name='groups', verbose_name='O\'qituvchi')
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, blank=True, related_name='groups', verbose_name='Xona')
    branch = models.ForeignKey('branches.Branch', on_delete=models.CASCADE, related_name='groups', verbose_name='Filial')
    
    schedule_days = models.CharField(max_length=50, default='Du-Chor-Juma', verbose_name='Dars kunlari')
    schedule_time = models.CharField(max_length=50, default='14:00 - 16:00', verbose_name='Dars vaqti')
    grading_system = models.CharField(
        max_length=30,
        choices=GradingSystem.choices,
        default=GradingSystem.UZBEK_5,
        verbose_name='Baholash tizimi'
    )
    monthly_fee = models.DecimalField(max_digits=12, decimal_places=2, default=650000.0, verbose_name='Oylik to\'lov')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE, verbose_name='Holati')
    start_date = models.DateField(null=True, blank=True, verbose_name='Boshlangan sana')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Guruh'
        verbose_name_plural = 'Guruhlar'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.course.name} ({self.teacher.name})"
