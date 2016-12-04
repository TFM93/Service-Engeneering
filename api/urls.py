from django.conf.urls import url, include
from . import views


urlpatterns = [
    # ex: /api/authentication/users/
    # url(r'^authentication/users/$', views.ListUsers.as_view()),

    # ex: /api/authentication/user/delete/1/
    # url(r'^authentication/user/delete/(?P<pk>[0-9]+)/$', views.DeleteUser.as_view()),
    # ex: /api/authentication/user/logout/
    # url(r'^authentication/user/logout/$', views.LogoutUser.as_view()),
    # ex: /api/authentication/user/12F830DF/
    url(r'^authentication/user/uuid/(?P<uuid>[a-zA-Z0-9]+)/$', views.GetUserInfoByUUID.as_view()),
    # ex: /api/authentication/user/1/
    url(r'^authentication/user/details/(?P<pk>[0-9]+)/$', views.GetUserInfoByID.as_view()),
    # ex: /api/authentication/user/uuid/1/
    url(r'^authentication/user/id/(?P<pk>[0-9]+)/$', views.GetUserUUIDbyID.as_view()),
    # ex: /api/authentication/user/register/uuid/
    url(r'^authentication/user/register/uuid/$', views.RegisterUserUUID.as_view()),
]
