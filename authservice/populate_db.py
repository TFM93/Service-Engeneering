import os
import sys

from django.conf import settings
settings.configure(DEBUG=True)

from django.contrib.auth.models import User
from allauth.socialaccount.models import SocialApp, Site
from allauth.socialaccount.providers import facebook, twitter, google, linkedin


# os.environ['DJANGO_SETTINGS_MODULE'] = ''

sites = [
    {'domain': 'authservice-es-2016.herokuapp.com', 'name': 'authservice-es-2016.herokuapp.com'}
]
for site in sites:
    try:
        new_site = Site(domain=site['domain'], name=site['name'])
        new_site.save()
    except:
        print 'Some error occurred creating Site.'
        pass


users = [
    {'username': 'admin', 'email': 'admin@ua.pt', 'password': 'ad.test.min.es', 'role': 'admin'},
]

for user in users:
    try:
        user_db = User.objects.create_user(user['username'], user['email'], user['password'])
        if user['role'] == 'admin':
            user_db.is_superuser = True
            user_db.is_staff = True
            user_db.save()
    except:
        print 'some exception creating user'
        pass


try:
    # site = Site.objects.get(domain=sites[0]['domain'])

    social_apps = [
        {'provider': facebook, 'name': 'Facebook',
         'client_id': os.environ['F_APP_ID'], 'secret': os.environ['F_APP_KEY']},
    ]

    for app in social_apps:
        try:
            new_app = SocialApp(provider=app['provider'], name=app['name'], client_id=app['client_id'],
                                secret=app['secret'])
            new_app.save()
        except Exception as e:
            print 'Error occurred when adding Social App.'
            print e.message
            pass
except Exception as e:
    print 'Error adding Social App.'
    print e.message
    pass
