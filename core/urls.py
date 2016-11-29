from django.conf.urls import include, url

from . import views


urlpatterns = [
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /about/
    url(r'^about/$', views.about, name='about'),

    # ex: /account/delete/
    url(r'^account/delete/$', views.account_delete, name='delete'),

    # ex: /account/add/uuid/
    url(r'^account/add/uuid/$', views.add_uuid, name='add_uuid'),

]
