from django.db import models
from allauth.socialaccount.models import SocialAccount


class CustomSocialAccount(models.Model):
    account = models.ForeignKey(SocialAccount)
    logged = models.BooleanField(default=False)
    user_avatar = models.CharField(max_length=300, blank=True)
