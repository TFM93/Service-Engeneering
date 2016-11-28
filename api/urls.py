from django.conf.urls import url, include
from . import views


urlpatterns = [
    # ex: /api/authentication/users/
    # url(r'^authentication/users/$', views.ListUsers.as_view()),

    # ex: /api/authentication/login/facebook/
    # url(r'^authentication/login/(?P<provider>[a-zA-Z0-9]+)/$', views.Login.as_view()),
    # ex: /api/authentication/isLogged/1/
    # url(r'^authentication/isLogged/(?P<pk>[0-9]+)/$', views.IsLogged.as_view()),
    # ex: /api/authentication/logout/1/
    # url(r'^authentication/logout/(?P<pk>[0-9]+)/$', views.Logout.as_view()),
    # ex: /api/authentication/user/delete/1/
    url(r'^authentication/user/delete/(?P<pk>[0-9]+)/$', views.DeleteUser.as_view()),
    # ex: /api/authentication/user/12F8T3J0DF/
    url(r'^authentication/user/(?P<uuid>[a-zA-Z0-9]+)/$', views.GetUserByUUID.as_view()),
    # ex: /api/authentication/user/1/
    url(r'^authentication/user/details/(?P<pk>[0-9]+)/$', views.GetUserByID.as_view()),
    # ex: /api/authentication/user/uuid/1/
    url(r'^authentication/user/uuid/(?P<pk>[0-9]+)/$', views.GetUserUUIDbyID.as_view()),
    # ex: /api/authentication/user/register/uuid/
    url(r'^authentication/user/register/uuid/$', views.RegisterUserUUID.as_view()),
]
