from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as rest_ValidationError


CODE_REGEX_LOOKUP = '[a-zA-Z0-9_-]+'
CODE_REGEX = '^' + CODE_REGEX_LOOKUP + '$'


class Example(models.Model):
    name = models.CharField(max_length=255, verbose_name='jméno a příjmení')
    code = models.CharField(max_length=255, verbose_name='kód', db_index=True, validators=[RegexValidator(CODE_REGEX), ])
    note = models.TextField(verbose_name='poznámka', blank=True)
    base = models.BooleanField(verbose_name='hlavni', default=False)
    price = models.IntegerField(verbose_name='cena', blank=True, null=True)

    # def __str__(self):
    #     return self.name + self.code

    # def save(self, *args, **kwargs):
    #     if Example.objects.filter(name=self.name, code=self.code).count() > 0:
    #         raise rest_ValidationError('Tato kombinace Mena a kódu již existuje')

    #     return super(Example, self).save(*args, **kwargs)
