from django.db import models

class StudentChurnLog(models.Model):
    class Reason(models.TextChoices):
        SCHEDULE = 'SCHEDULE', 'Dars vaqti to\'g\'ri kelmadi'
        FINANCIAL = 'FINANCIAL', 'Moliyaviy qiyinchilik / to\'lov'
        METHODOLOGY = 'METHODOLOGY', 'O\'qituvchi metodikasi to\'g\'ri kelmadi'
        RELOCATION = 'RELOCATION', 'Yashash joyi yoki maktab o\'zgarganligi'
        HEALTH = 'HEALTH', 'Salomatlik / oilaviy sabablar'
        COMPLETED = 'COMPLETED', 'Maqsadga erishdi / kursni tamomladi'
        OTHER = 'OTHER', 'Boshqa sabablar'

    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='churn_records')
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True, blank=True)
    teacher = models.ForeignKey('teachers.Teacher', on_delete=models.SET_NULL, null=True, blank=True)
    churn_date = models.DateField(auto_now_add=True)
    reason = models.CharField(max_length=30, choices=Reason.choices, default=Reason.SCHEDULE)
    details = models.TextField(blank=True, verbose_name='Batafsil izoh')
    feedback_rating = models.PositiveSmallIntegerField(default=4, verbose_name='O\'quv markaz bahosi (1-5)')

    class Meta:
        verbose_name = 'Ketish tahlili qaydi'
        verbose_name_plural = 'Ketish tahlili qaydlari'
        ordering = ['-churn_date']

    def __str__(self):
        return f"{self.student.full_name} | {self.get_reason_display()} ({self.churn_date})"
