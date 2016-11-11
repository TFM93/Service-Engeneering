from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import HttpResponseRedirect
from allauth.account.models import EmailAddress
from serializers import EmailAddressSerializer


# class ListUsers(generics.ListAPIView):
#     queryset = EmailAddress.objects.all()
#     serializer_class = EmailAddressSerializer
#     allowed_methods = ['GET']
#
#     def get(self, request):
#         """
#         Gets list of users
#
#         <h3>Details</h3>
#
#         <b>METHODS:</b>
#             - GET
#
#         <b>RETURNS:</b>
#             - 200 OK
#
#         """
#         # result = [users for users in EmailAddress.objects.all()]
#         return self.list(request)


class Login(APIView):
    allowed_methods = ['POST']

    def post(self, request, provider=None):
        """
        Login user in the system.

        <h3>Details</h3>
        <b>Providers available:</b>
        - Facebook
        - Twitter
        - Google
        - LinkedIn

        <b>METHODS:</b>
            - POST

        <b>RETURNS:</b>
            - 200 OK
            - 400 BAD REQUEST
        """
        # print request.META['HTTP_X_CSRFTOKEN']
        # X-CSRFToken: zhOXQAEtUqXoolDN66tlSJ76zKLPl48N
        # Content-Type: application/json
        if provider is not None:
            try:
                # print provider
                prov = provider.upper()
                if prov == 'FACEBOOK':
                    print 'Facebook login'
                    return HttpResponseRedirect('http://localhost:8000')
                    # return redirect('http://localhost:8000/accounts/facebook/login/', status.HTTP_200_OK)
                if prov == 'TWITTER':
                    print 'Twitter login'
                    return Response(status=status.HTTP_200_OK)
                if prov == 'GOOGLE':
                    print 'Google login'
                    return Response(status=status.HTTP_200_OK)
                if prov == 'LINKEDIN':
                    print 'LinkedIn login'
                    return Response(status=status.HTTP_200_OK)

            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class IsLogged(APIView):
    allowed_methods = ['GET']

    def get(self, request):
        """
        Checks if given user id is logged in the system

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        return Response(status=status.HTTP_200_OK)


class Logout(APIView):
    allowed_methods = ['POST']

    def post(self, request, pk=None):
        """
        Logout user from the system.

        <h3>Details</h3>

        <b>METHODS:</b>
            - POST

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        # print request.META['HTTP_X_CSRFTOKEN']
        # X-CSRFToken: zhOXQAEtUqXoolDN66tlSJ76zKLPl48N
        # Content-Type: application/json
        if request is not None:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class DeleteUser(APIView):
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    allowed_methods = ['DELETE']

    def delete(self, request, pk=None):
        """
        Deletes a users by given id

        <h3>Details</h3>

        <b>METHODS:</b>
            - DELETE

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        # X-CSRFToken: kN2QGs072FqY47lb6BTp1q1B9cPqlqDPuAVxMWYntlH3O3PpAD0kaLFpLejHGQVB
        # print(request.META['CSRF_COOKIE'])
        if pk is not None:
            try:
                int_id = int(pk)
                user = EmailAddress.objects.get(id=int_id)
                # user.delete()
                return Response(status=status.HTTP_200_OK, data={"detail": "User deleted with success."})
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={"detail": "User not found."})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "Bad request."})
