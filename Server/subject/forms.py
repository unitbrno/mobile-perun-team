from django import forms
from django.contrib.auth.hashers import make_password

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
from crispy_forms.bootstrap import StrictButton
from bootstrap_datepicker.widgets import DatePicker
from subject.models import Event, Subject


class DateInput(forms.DateInput):
    input_type = 'date'

class EventAddForm(forms.ModelForm):
    subject = forms.ModelMultipleChoiceField(widget=forms.CheckboxSelectMultiple(), queryset=Subject.objects.all())

    class Meta:
        model = Event
        fields = ('id', 'when', 'subject')
        widgets = {
            'when': DateInput(),
        }

    def __init__(self, *args, **kwargs):
        super(EventAddForm, self).__init__(*args, **kwargs)

        if self.instance.pk:
            add_or_edit_text = 'Upravit'
        else:
            add_or_edit_text = 'Přidat'

        self.fields['subject'].queryset = Subject.objects.all()

        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.layout = Layout(
            'id',
            'when',
            'subject',
            StrictButton(add_or_edit_text, type="submit", css_class='btn-primary')
        )
