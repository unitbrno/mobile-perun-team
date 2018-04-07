from django.conf.urls import url

from user import views as v


urlpatterns = [
    url(r'^login$', v.Login.as_view(), name='login'),
    url(r'^logout$', v.Logout.as_view(), name='logout'),
    url(r'^list$', v.UserList.as_view(), name='list'),
    url(r'^add$', v.UserAdd.as_view(), name='add'),
    url(r'^edit/(?P<pk>\d+)$', v.UserEdit.as_view(), name='edit'),
    url(r'^set-password/(?P<pk>\d+)$', v.UserSetPassword.as_view(), name='set-password'),
    url(r'^delete/(?P<pk>\d+)$', v.UserDelete.as_view(), name='delete'),
]
