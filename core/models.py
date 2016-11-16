from django.db import models
from allauth.socialaccount.models import SocialAccount


class CustomSocialAccount(models.Model):
    account = models.ForeignKey(SocialAccount)
    logged = models.BooleanField(default=True)
    uuid = models.CharField(max_length=100, unique=True)
    credits = models.IntegerField(default=0)
    user_avatar = models.CharField(max_length=300, blank=True)
