from django.db import models
from django.conf import settings

class Attendance(models.Model):
    class Status(models.TextChoices):
        PRESENT = 'PRESENT', 'Bor'
        ABSENT = 'ABSENT', 'Yo\'q'
        EXCUSED = 'EXCUSED', 'Sababli'
        LATE = 'LATE', 'Kechikdi'

    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='attendances')
    group = models.ForeignKey('groups.Group', on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField(db_index=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PRESENT)
    marked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Davomat'
        verbose_name_plural = 'Davomatlar'
        unique_together = ('student', 'group', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"{self.date} | {self.student.full_name} | {self.get_status_display()}"


class DailyGrade(models.Model):
    """
    Baholash jurnali - mavzular, uy vazifasi va faollik bo'yicha baholar.
    """
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='grades')
    group = models.ForeignKey('groups.Group', on_delete=models.CASCADE, related_name='grades')
    date = models.DateField(db_index=True)
    lesson_topic = models.CharField(max_length=255, default='Mavzu', verbose_name='Dars mavzusi')
    homework_score = models.DecimalField(max_digits=5, decimal_places=1, default=5.0, verbose_name='Uy vazifasi')
    activity_score = models.DecimalField(max_digits=5, decimal_places=1, default=5.0, verbose_name='Darsdagi faollik')
    exam_score = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True, verbose_name='Test/Lug\'at')
    average_score = models.DecimalField(max_digits=5, decimal_places=1, default=5.0, verbose_name='O\'rtacha ball')
    coin_earned = models.IntegerField(default=0, verbose_name='Berilgan coin')
    comment = models.CharField(max_length=255, blank=True, verbose_name='Izoh')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Kunlik baho'
        verbose_name_plural = 'Kunlik baholar'
        unique_together = ('student', 'group', 'date')
        ordering = ['-date']

    def save(self, *args, **kwargs):
        scores = [self.homework_score, self.activity_score]
        if self.exam_score is not None:
            scores.append(self.exam_score)
        if scores:
            self.average_score = round(sum(scores) / len(scores), 1)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.date} | {self.student.full_name} | O'rtacha: {self.average_score}"
