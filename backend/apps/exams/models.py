from django.db import models

class Exam(models.Model):
    title = models.CharField(max_length=200, verbose_name='Imtihon nomi')
    group = models.ForeignKey('groups.Group', on_delete=models.SET_NULL, null=True, blank=True, related_name='exams')
    course = models.ForeignKey('groups.Course', on_delete=models.SET_NULL, null=True, blank=True, related_name='exams')
    date = models.DateField(verbose_name='O\'tkazilish sanasi')
    time = models.CharField(max_length=50, default='10:00 - 12:00', verbose_name='Vaqti')
    room = models.ForeignKey('groups.Room', on_delete=models.SET_NULL, null=True, blank=True)
    examiner = models.ForeignKey('teachers.Teacher', on_delete=models.SET_NULL, null=True, blank=True)
    max_score = models.DecimalField(max_digits=5, decimal_places=1, default=100.0)
    pass_score = models.DecimalField(max_digits=5, decimal_places=1, default=60.0)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Imtihon'
        verbose_name_plural = 'Imtihonlar'
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} ({self.date})"


class ExamResult(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='results')
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='exam_results')
    score = models.DecimalField(max_digits=5, decimal_places=1, verbose_name='To\'plangan ball')
    passed = models.BooleanField(default=False, verbose_name='Muvaffaqiyatli o\'tdi')
    certificate_issued = models.BooleanField(default=False, verbose_name='Sertifikat berildi')
    notes = models.CharField(max_length=255, blank=True, verbose_name='Izoh')

    class Meta:
        verbose_name = 'Imtihon natijasi'
        verbose_name_plural = 'Imtihon natijalari'
        unique_together = ('exam', 'student')

    def save(self, *args, **kwargs):
        if self.exam and self.score is not None:
            self.passed = self.score >= self.exam.pass_score
        super().save(*args, **kwargs)

    def __str__(self):
        status = "O'tdi" if self.passed else "Yiqildi"
        return f"{self.student.full_name} - {self.score} ball ({status})"
