from django.conf.urls import include, url

from . import views


urlpatterns = [
    # ex: /
    url(r'^$', views.index, name='index'),
    # ex: /about/
    url(r'^about/$', views.about, name='about'),

    # Just for Google validation
    # url(r'^googleff1931c407ddd6d6.html$', views.googleConfirm),
]
