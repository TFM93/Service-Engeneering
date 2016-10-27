from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from allauth.account.models import EmailAddress
from serializers import EmailAddressSerializer


class ListUsers(generics.ListAPIView):
    queryset = EmailAddress.objects.all()
    serializer_class = EmailAddressSerializer
    allowed_methods = ['GET']

    def get(self, request):
        """
        Gets list of users

        <h3>Details</h3>

        METHODS : GET

        <b>RETURNS:</b>

        - 200 OK.

        """
        # result = [users for users in EmailAddress.objects.all()]
        return self.list(request)


class Login(APIView):
    """ Login User """
    allowed_methods = ['POST']

    def post(self, request):
        """
        Login user in the system.

        <b>Details</b>

        <b>METHODS:</b>
            - POST

        <b>RETURNS:</b>
            - 200 OK
            - 400 BAD REQUEST
        """
        # print request.META['HTTP_X_CSRFTOKEN']
        # X-CSRFToken: zhOXQAEtUqXoolDN66tlSJ76zKLPl48N
        # Content-Type: application/json
        if request is not None:
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class Logout(generics.DestroyAPIView):
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
    allowed_methods = ['DELETE']

    def delete(self, request, pk=None):
        """
        Deletes a users logged by given user id

        <b>Details</b>

        METHODS : DELETE

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
                # user = User.objects.get(id=int_id)
                # user.delete()
                return Response(status=status.HTTP_200_OK, data={"detail": "User deleted with success."})
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={"detail": "User not found."})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "Bad request."})
