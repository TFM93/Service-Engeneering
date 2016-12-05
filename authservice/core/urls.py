from django.conf.urls import include, url

from . import views


urlpatterns = [
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /about/
    url(r'^about/$', views.about, name='about'),

    # ex: /accounts/delete/
    url(r'^accounts/delete/$', views.account_delete, name='delete'),

    # ex: /accounts/manage/uuid/
    url(r'^accounts/manage/uuid/$', views.manage_uuid, name='manage_uuid'),

    # ex: /accounts/manage/phone/
    url(r'^accounts/manage/phone/$', views.manage_phone, name='manage_phone'),

]
