from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from example import views as example_v
from subject import views as subject_v

router = DefaultRouter()

router.register(r'example', example_v.ApiExampleListView, base_name='example')
router.register(r'subject', subject_v.ApiSubjectViewSet, base_name='subject')
router.register(r'record', subject_v.ApiRecordViewSet, base_name='record')
router.register(r'tape', subject_v.ApiTapeViewSet, base_name='tape')
router.register(r'event', subject_v.ApiEventViewSet, base_name='event')


urlpatterns = router.urls + [
    url(r'^subject/(?P<subject_id>\d+)/events', subject_v.SubjectEventView.as_view(), name='subject-events'),
]
