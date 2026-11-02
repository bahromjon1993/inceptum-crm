from django.db import models

class Branch(models.Model):
    name = models.CharField(max_length=150, verbose_name='Filial nomi')
    code = models.CharField(max_length=20, unique=True, verbose_name='Filial kodi')
    address = models.CharField(max_length=255, blank=True, verbose_name='Manzil')
    phone = models.CharField(max_length=50, blank=True, verbose_name='Telefon')
    is_active = models.BooleanField(default=True, verbose_name='Faol')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Filial'
        verbose_name_plural = 'Filiallar'
        ordering = ['name']

    def __str__(self):
        return self.name
