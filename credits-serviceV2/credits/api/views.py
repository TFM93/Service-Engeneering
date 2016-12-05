from django.shortcuts import render
from core.models import PaymentsReceipt, UserCredits
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from rest_framework.views import APIView


class getCredits(APIView):
    allowed_methods = ['GET']

    def get(self, request, uid):
        """

        This method retrieves the number of credits for the required user
        <br>receives uid: user id
        <br>return the number of credits

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        try:
            user = UserCredits.objects.get(user_id=uid)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error':'User id not found!'})
        return Response(status=status.HTTP_200_OK, data={'credit_amt': user.credit_amt})

class removeCredits(APIView):
    allowed_methods = ['GET']

    def get(self, request, uid, credits):
        """

        This method retrieves the number of credits for the required user after removing the required ones
        <br>receives uid: user id
        <br>return the number of credits

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST

        """
        try:
            user = UserCredits.objects.get(user_id=uid)
            print 'user credits:'
            print user.credit_amt
            print 'credits to remove:'
            print credits
            if float(user.credit_amt) >= float(credits):
                user.credit_amt = float(user.credit_amt) - float(credits)
                user.save()
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'Insufficient funds! ' + str(user.credit_amt) + 'ret' + str(credits)})
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error':'User id not found!'})
        return Response(status=status.HTTP_200_OK, data={'credit_amt': user.credit_amt})

class addCredits(APIView):
    allowed_methods = ['GET']

    def get(self, request, uid, credits):
        """

        This method retrieves the number of credits for the required user after adding the required ones
        <br>receives uid: user id
        <br>return the number of credits

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND

        """
        try:
            user = UserCredits.objects.get(user_id=uid)
            print 'user credits:'
            print user.credit_amt
            print 'credits to add:'
            print credits
            user.credit_amt = int(user.credit_amt) + int(credits)
            user.save()
        except ObjectDoesNotExist:
            user = UserCredits(user_id=uid, credit_amt=credits)
            user.save()

        return Response(status=status.HTTP_200_OK, data={'credit_amt': user.credit_amt})

