from django.db import models
from allauth.socialaccount.models import SocialAccount
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

import os


class CustomSocialAccount(models.Model):
    account = models.ForeignKey(SocialAccount)
    uuid = models.CharField(max_length=100, default='')
    uuid_code = models.CharField(max_length=10, default='')
    user_avatar = models.CharField(max_length=300, blank=True)
    login_counter = models.IntegerField(default=0)

    def delete(self, using=None):
        try:
            path = 'static/web/avatars/avatar%s.jpg' % self.account.pk
            os.remove(path)
        except:
            print 'Error deleting avatar.'

    def __unicode__(self):
        return '{0} - uuid: {1} - logins: {2}'.format(self.account, self.uuid, self.login_counter)


@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
