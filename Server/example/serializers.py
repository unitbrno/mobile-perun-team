from rest_framework import serializers
from example.models import Example



# QueryFieldsMixin -> ?fields=name,id
class ExampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Example
        fields = ('id', 'name', 'code', 'note', 'base', 'price')
