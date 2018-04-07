from django.conf.urls import include, url

from subject import views as v

urlpatterns = [
    url(r'^event-list$', v.EventList.as_view(), name='event-list'),
    url(r'^event-add$', v.EventAdd.as_view(), name='event-add'),
    url(r'^event-edit/(?P<pk>\d+)$', v.EventEdit.as_view(), name='event-edit'),
    url(r'^event-delete/(?P<pk>\d+)$', v.EventDelete.as_view(), name='event-delete'),
    url(r'^send-email/(?P<pk>\d+)$', v.eventSendEmail, name='send-email'),

]
