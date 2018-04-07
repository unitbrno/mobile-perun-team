from django.views.generic import View, ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.views import login, logout  # NOQA
from django.core.urlresolvers import reverse_lazy

from user.models import User
from user.forms import AuthenticationForm, UserChangeForm, UserCreationForm, SetPasswordForm
from user.mixins import AdminRequiredMixin, LoginRequiredMixin

from django.core.urlresolvers import reverse

from django.core.exceptions import ValidationError
from django.contrib import messages
import json
from django.http import HttpResponse
from django.db.models import Q


class ClassWrapper(View):
    view_function = None
    view_function_kwargs = {}

    def get_view_function(self):
        return globals()[self.view_function]
        return None

    def get_view_function_kwargs(self):
        return self.view_function_kwargs

    def dispatch(self, request, *args, **kwargs):
        self.request = request
        self.args = args
        self.kwargs = kwargs

        kwargs.update(self.get_view_function_kwargs())
        return self.get_view_function()(request, *args, **kwargs)


class Login(ClassWrapper):
    view_function = 'login'
    view_function_kwargs = {
        'template_name': 'user/login.html',
        'authentication_form': AuthenticationForm,
    }


class Logout(ClassWrapper):
    view_function = 'logout'
    view_function_kwargs = {
        'template_name': 'user/logout.html'
    }


class UserList(AdminRequiredMixin, ListView):
    model = User

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs)

class UserAdd(AdminRequiredMixin, CreateView):
    model = User
    form_class = UserCreationForm

    def get_success_url(self):
        return reverse('user:list')

    def form_valid(self, form):

        try:
            return super(UserAdd, self).form_valid(form)
        except ValidationError as e:
            messages.error(self.request, e.message)
            return self.form_invalid(form)


class UserEdit(AdminRequiredMixin, UpdateView):
    model = User
    form_class = UserChangeForm

    def get_success_url(self):
        return reverse('user:list')

    def form_valid(self, form):

        try:
            return super(UserEdit, self).form_valid(form)
        except ValidationError as e:
            messages.error(self.request, e.message)
            return self.form_invalid(form)


class UserDelete(AdminRequiredMixin, DeleteView):
    model = User

    def get_success_url(self):
        return reverse('user:list')


class UserSetPassword(AdminRequiredMixin, UpdateView):
    model = User
    form_class = SetPasswordForm

    def get_success_url(self):
        return reverse('user:list')

    def get_form_kwargs(self, *args, **kwargs):
        kw = super(UserSetPassword, self).get_form_kwargs(*args, **kwargs)
        kw.update({
            'user': self.get_object()
        })
        kw.pop('instance')
        return kw
