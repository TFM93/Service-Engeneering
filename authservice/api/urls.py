from django.conf.urls import url, include
from . import views


urlpatterns = [
    # ex: /api/authentication/users/
    url(r'^authentication/users/$', views.ListUsers.as_view()),

    # ex: /api/authentication/login/
    url(r'^authentication/login/$', views.Login.as_view()),
    # ex: /api/authentication/logout/1
    url(r'^authentication/logout/(?P<pk>[0-9]+)$', views.Logout.as_view()),

]
