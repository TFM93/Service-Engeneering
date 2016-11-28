from __future__ import unicode_literals
#from django.contrib.auth.models import User #users database
from django.db import models

# Create your models here.


class PaymentsReceipt(models.Model):
    token = models.CharField(max_length=200, blank=False, primary_key=True)
    user_id = models.CharField(max_length=30)
    payd = models.BooleanField(default=False)



class UserCredits(models.Model):
    user_id = models.CharField(max_length=30)
    credit_amt = models.IntegerField(default=0)
