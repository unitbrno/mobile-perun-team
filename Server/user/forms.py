from django.contrib.auth.forms import AuthenticationForm, UserCreationForm, UserChangeForm, SetPasswordForm, PasswordChangeForm
from django.core.urlresolvers import reverse

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout
from crispy_forms.bootstrap import StrictButton

from user.models import User

from django import forms


class AuthenticationForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(AuthenticationForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.form_class = 'login-form'
        self.helper.layout = Layout(
            'username',
            'password',
            StrictButton('Přihlásit', type="submit", css_class='btn-primary')
        )


class UserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ('email', 'is_active', 'is_admin', 'password')

    def __init__(self, *args, **kwargs):
        super(UserChangeForm, self).__init__(*args, **kwargs)

        self.fields['email'].help_text = """<br />Změnit heslo je možné pomocí <a href="%s">tohoto formuláře</a>.""" % reverse('user:set-password', kwargs={'pk': self.instance.pk})

        self.helper = FormHelper()
        self.helper.form_method = "post"

        self.helper.layout = Layout(
            'email',
            'password',
            'is_active',
            'is_admin',
            StrictButton('Upravit', type="submit", css_class='btn-primary')
        )


class SetPasswordForm(SetPasswordForm):
    class Meta:
        model = User
        fields = ('new_password1', 'new_password2')

    def __init__(self, *args, **kwargs):
        super(SetPasswordForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.layout = Layout(
            'new_password1',
            'new_password2',
            StrictButton('Změnit', type="submit", css_class='btn-primary')
        )


class UserCreationForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('email', 'password1', 'password2', 'is_active', 'is_admin')

    def __init__(self, *args, **kwargs):
        super(UserCreationForm, self).__init__(*args, **kwargs)

        self.helper = FormHelper()
        self.helper.form_method = "post"
        self.helper.layout = Layout(
            'email',
            'password1',
            'password2',
            'is_active',
            'is_admin',
            StrictButton('Přidat', type="submit", css_class='btn-primary')
        )
