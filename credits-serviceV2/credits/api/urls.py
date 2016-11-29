from django.conf.urls import  include, url
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from . import views
urlpatterns = [
    url(r'^get/(?P<uid>.*)/$', views.getCredits.as_view(), name='get_credits'),
]