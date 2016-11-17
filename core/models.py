from django.db import models
from allauth.socialaccount.models import SocialAccount

import os


class CustomSocialAccount(models.Model):
    account = models.ForeignKey(SocialAccount)
    logged = models.BooleanField(default=True)
    uuid = models.CharField(max_length=100, blank=True)
    credits = models.IntegerField(default=0)
    user_avatar = models.CharField(max_length=300, blank=True)

    def delete(self, using=None):
        try:
            path = 'static/web/avatars/avatar%s.jpg' % self.pk
            os.remove(path)
        except:
            print 'Error deleting avatar.'

    def __unicode__(self):
        return '{0} - {1} - {2}'.format(self.account, self.uuid, self.credits)
