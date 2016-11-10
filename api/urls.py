from django.conf.urls import url, include
from . import views


urlpatterns = [
    # ex: /api/authentication/users/
    # url(r'^authentication/users/$', views.ListUsers.as_view()),

    # ex: /api/authentication/login/facebook/
    url(r'^authentication/login/(?P<provider>[a-zA-Z0-9]+)/$', views.Login.as_view()),
    # ex: /api/authentication/isLogged/1/
    url(r'^authentication/isLogged/(?P<pk>[0-9]+)/$', views.IsLogged.as_view()),
    # ex: /api/authentication/logout/1/
    url(r'^authentication/logout/(?P<pk>[0-9]+)/$', views.Logout.as_view()),
    # ex: /api/authentication/delete/1/
    url(r'^authentication/delete/(?P<pk>[0-9]+)/$', views.DeleteUser.as_view()),

]
