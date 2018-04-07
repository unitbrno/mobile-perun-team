from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.core.urlresolvers import reverse_lazy

urlpatterns = [
    url(r'^$', RedirectView.as_view(url=reverse_lazy('user:list'), permanent=False)),

    url(r'^user/', include('user.urls', namespace='user')),
    url(r'^event/', include('subject.urls', namespace='subject')),

    url(r'^api/', include('recordnote.urls_api', namespace='api')),

]
