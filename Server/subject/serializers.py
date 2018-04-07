from rest_framework import serializers
from subject.models import Subject, Record, Tape, Event


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'


class TapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tape
        # fields = ('id', 'text', 'result_url', 'record')
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'