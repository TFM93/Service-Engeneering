from django.conf.urls import include, url

from . import views


urlpatterns = [
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /about/
    url(r'^about/$', views.about, name='about'),

    # ex: /accounts/delete/
    url(r'^accounts/delete/$', views.account_delete, name='delete'),

    # ex: /accounts/add/uuid/
    url(r'^accounts/add/uuid/$', views.add_uuid, name='add_uuid'),

]
