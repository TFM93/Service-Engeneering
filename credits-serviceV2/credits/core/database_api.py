from models import *
from django.core.exceptions import ObjectDoesNotExist

def update_token(token,paid): #set token as paid
    receipt = PaymentsReceipt.objects.get(token=token)
    receipt.payd = paid
    receipt.save()
    return 1

def check_token(token): #check if token is paid
    receipt = PaymentsReceipt.objects.get(token=token)
    return receipt.payd

def add_token(token, uid, paid): #add new payment
    receipts = PaymentsReceipt(token=token, user_id=uid,payd=paid)
    receipts.save()
    return  1

def add_credits(uid, nr_credits):#add credits to user
    try:
        user = UserCredits.objects.get(user_id=uid)
        user.credit_amt = user.credit_amt + nr_credits
    except ObjectDoesNotExist:
        user = UserCredits(user_id=uid,credit_amt=nr_credits)
    user.save()
    return  1

def remove_credits(uid, nr_credits):#remove credits from user
    try:
        user = UserCredits.objects.get(user_id=uid)
        if user.credit_amt >= nr_credits:
            user.credit_amt = user.credit_amt - nr_credits
            user.save()
        else:
            return 0 # insufficient funds
    except ObjectDoesNotExist:
        return -1 # object does not exist
    return  1 # ok
