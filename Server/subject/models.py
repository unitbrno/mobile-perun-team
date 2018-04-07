from django.db import models
from django.contrib.postgres.fields import JSONField
from common.tasks import get_answer
from django.dispatch import receiver
# from django.core.validators import RegexValidator
# from django.core.exceptions import ValidationError
# from rest_framework.exceptions import ValidationError as rest_ValidationError


# CODE_REGEX_LOOKUP = '[a-zA-Z0-9_-]+'
# CODE_REGEX = '^' + CODE_REGEX_LOOKUP + '$'


class Subject(models.Model):
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.email

class Event(models.Model):
    when = models.DateField(blank=True, null=True)
    subject = models.ManyToManyField(Subject)

class Record(models.Model):
    subject = models.ForeignKey(Subject)
    event = models.ForeignKey(Event)

class Tape(models.Model):
    text = models.CharField(blank=True, max_length=1000000, null=True)
    stt_output = JSONField(blank=True, null=True)
    result_url = models.CharField(max_length=255)
    record = models.ForeignKey(Record)


@receiver(models.signals.post_save, sender=Tape)
def ping_server(sender, instance, **kwargs):
    get_answer.delay(instance.id)

        