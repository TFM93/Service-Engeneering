from django.conf.urls import  include, url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^pay/(?P<value>[a-zA-Z0-9]+)/(?P<uid>[a-zA-Z0-9]+)/$', views.start, name='index2'),
    url(r'^paypal/redirect/(?P<value>[a-zA-Z0-9]+)/(?P<uid>[a-zA-Z0-9]+)/$', views.paypal_redirect, name='paypal_redirect'),
    url(r'^paypal/do/(?P<token>.*)/(?P<uid>[a-zA-Z0-9]+)/$', views.paypal_do, name='paypal_do'),
    url(r'^paypal/status/(?P<token>.*)/(?P<uid>[a-zA-Z0-9]+)/$', views.paypal_status, name='paypal_status'),
    url(r'^paypal/confirm/(?P<uid>[a-zA-Z0-9]+)/$', views.paypal_confirm, name='paypal_confirm'),
    url(r'^paypal/cancel/$', views.paypal_cancel, name='paypal_cancel'),
]