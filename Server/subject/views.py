from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from example.serializers import ExampleSerializer
from example.models import Example

from subject.models import Subject, Record, Tape, Event
from subject.serializers import SubjectSerializer, RecordSerializer, TapeSerializer, EventSerializer
from user.mixins import AdminRequiredMixin
from subject.forms import EventAddForm
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy, reverse
from django.core.exceptions import ValidationError
from django.contrib import messages
from rest_framework.views import APIView
from django.shortcuts import redirect
from django.http import HttpResponse
from django.core.mail import send_mail

class ApiSubjectViewSet(viewsets.ModelViewSet):

    # http_method_names = ['get', 'put', 'patch', 'head', 'options', 'post']
    serializer_class = SubjectSerializer
    model = Subject

    def get_queryset(self, *args, **kwargs):
        return Subject.objects.all()


class ApiEventViewSet(viewsets.ModelViewSet):
    # http_method_names = ['get', 'put', 'patch', 'head', 'options', 'post']
    serializer_class = EventSerializer
    model = Event

    def get_queryset(self, *args, **kwargs):
        return Event.objects.all()


class ApiRecordViewSet(viewsets.ModelViewSet):

    # http_method_names = ['get', 'put', 'patch', 'head', 'options', 'post']
    serializer_class = RecordSerializer
    model = Record

    def get_queryset(self, *args, **kwargs):
        return Record.objects.all()


class ApiTapeViewSet(viewsets.ModelViewSet):

    # http_method_names = ['get', 'put', 'patch', 'head', 'options', 'post']
    serializer_class = TapeSerializer
    model = Tape

    def get_queryset(self, *args, **kwargs):
        return Tape.objects.all()


class SubjectEventView(APIView):

    serializer_class = EventSerializer

    def get(self, request, subject_id, *args, **kwargs):
        """
        Return users events.
        """
        events = Event.objects.filter(subject__in=subject_id)
        serializer = EventSerializer(events, many=True)
        # serializer.is_valid(raise_exception=True)
        return Response(serializer.data)

class EventMixin(AdminRequiredMixin):
    model = Event
    form_class = EventAddForm

    def get_success_url(self):
        return reverse('subject:event-list')

    def get_queryset(self, *args, **kwargs):
        qs = super(EventMixin, self).get_queryset(*args, **kwargs)
        return qs

    def form_valid(self, form):
        try:
            return super(EventMixin, self).form_valid(form)
        except ValidationError as e:
            messages.error(self.request, e.message)
            return self.form_invalid(form)


class EventList(EventMixin, ListView):
    pass


class EventAdd(EventMixin, CreateView):
    pass


class EventEdit(EventMixin, UpdateView):
    pass


class EventDelete(EventMixin, DeleteView):
    pass

def eventSendEmail(request, pk):
    subjects = Subject.objects.filter(event__id=pk)

    s = []
    for x in subjects:
        s += [x.email]
    print(s)
    print("Pposlem email")
    send_mail(
    'Nova naplanovana porada',
    'Prid si to nahrat alebo si to pozri v aplikacii.',
    'recordnote@perun.com',
    s,
    fail_silently=True,
    )
    messages.success(request, "Poslanie prebehlo uspesne")
    return redirect(reverse('subject:event-list'))
