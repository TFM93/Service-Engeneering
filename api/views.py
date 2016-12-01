from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.parsers import JSONParser

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from core.models import CustomSocialAccount
from allauth.socialaccount.models import SocialAccount

import os
import requests


class GetUserByUUID(APIView):
    # permission_classes = (IsAuthenticated,)
    allowed_methods = ['GET']

    def get(self, request, uuid=None):
        """
        Get user info by given UUID

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        if uuid is not None:
            try:
                int_uuid = int(uuid)
                try:
                    user = User.objects.get(pk=int_uuid)
                    social_user = SocialAccount.objects.get(user=user)
                except:
                    raise Exception
                return Response(status=status.HTTP_200_OK, data=social_user.extra_data)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'Not found.'})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Bad request.'})


class GetUserByID(APIView):
    # permission_classes = (IsAuthenticated,)
    allowed_methods = ['GET']

    def get(self, request, pk=None):
        """
        Get user extra info by given ID

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        if pk is not None:
            try:
                int_id = int(pk)
                try:
                    user = User.objects.get(pk=int_id)
                    social_user = SocialAccount.objects.get(user=user)
                except:
                    raise Exception
                return Response(status=status.HTTP_200_OK, data=social_user.extra_data)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'Not found.'})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Bad request.'})


class GetUserUUIDbyID(APIView):
    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    # permission_classes = (IsAuthenticated,)
    allowed_methods = ['GET']

    def get(self, request, pk=None):
        """
        Check and get user UUID by given user ID

        Informs if user does not have uuid yet

        <h3>Details</h3>

        <b>METHODS:</b>
            - GET

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        if pk is not None:
            try:
                int_id = int(pk)
                try:
                    user = User.objects.get(pk=int_id)
                    social_user = SocialAccount.objects.get(user=user)
                    custom_social_user = CustomSocialAccount.objects.get(account=social_user)
                    if custom_social_user.uuid == "":
                        return Response(status=status.HTTP_200_OK, data={'detail': 'This user does not have uuid yet.', 'uuid': ''})
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'User not found.'})
                return Response(status=status.HTTP_200_OK, data={'uuid': custom_social_user.uuid})
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'Invalid request.'})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Bad request.'})


class RegisterUserUUID(APIView):
    # permission_classes = (IsAuthenticated,)
    parser_classes = (JSONParser,)
    allowed_methods = ['POST']

    def post(self, request):
        """
        Register new UUID to given user ID

        <h3>Details</h3> Example:

            {

                "id": "1",
                "uuid": "A73B0CF79",
                "code": "codetest"

            }

        <b>METHODS:</b>
            - POST

        <b>RETURNS:</b>
            - 200 OK
            - 404 NOT FOUND
            - 400 BAD REQUEST
        """
        # X-CSRFToken: CXhYB2UugjkpW8bQsEO269dxeCoigj8T
        # Authorization: Token bc5c07b1993cf54d05d965c1ffc8e6b024976888
        # Content-Type: application/json
        # print(request.META['CSRF_COOKIE'])
        if 'id' in request.data and 'uuid' in request.data and 'code' in request.data:
            try:
                int_id = int(request.data['id'])
                uuid = request.data['uuid']
                code = request.data['code']
                res = requests.get('https://esmickettodule.herokuapp.com/didUUIDPass?uuid=' + uuid)
                if res.status_code == 200:
                    json = res.json()
                    if json['exists']:
                        res_code = json['code']
                        if res_code == code:
                            res = requests.post('https://esmickettodule.herokuapp.com/resolveUUID', data={'uuid': uuid})
                            if res.status_code == 200:
                                account = SocialAccount.objects.get(user=int_id)
                                c_user = CustomSocialAccount.objects.get(account=account)
                                c_user.uuid = uuid
                                c_user.save()
                                return Response(status=status.HTTP_200_OK, data={'detail': 'Added with success.'})
                            else:
                                return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Error when validating code.'})
                        else:
                            return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'Invalid code.'})
                    else:
                        return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'That uuid doesn\'t exists.'})
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Error when validation uuid.'})
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Bad request.'})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Invalid format.'})


class DeleteUser(APIView):
    # permission_classes = (IsAuthenticated,)
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
                try:
                    user = User.objects.get(pk=int_id)
                    # TODO delete avatar image
                    try:
                        path = 'static/web/avatars/avatar%s.jpg' % user.pk
                        os.remove(path)
                    except:
                        raise Exception
                    user.delete()
                except:
                    raise Exception
                return Response(status=status.HTTP_200_OK, data={'detail': 'User deleted with success.'})
            except:
                return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'User not found.'})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Bad request.'})


# class Login(APIView):
#     allowed_methods = ['POST']
#
#     def post(self, request, provider=None):
#         """
#         Login user in the system.
#
#         <h3>Details</h3>
#         <b>Providers available:</b>
#         - Facebook
#         - Twitter
#         - Google
#         - LinkedIn
#
#         <b>METHODS:</b>
#             - POST
#
#         <b>RETURNS:</b>
#             - 200 OK
#             - 400 BAD REQUEST
#         """
#         # print request.META['HTTP_X_CSRFTOKEN']
#         # X-CSRFToken: zhOXQAEtUqXoolDN66tlSJ76zKLPl48N
#         # Content-Type: application/json
#         if provider is not None:
#             try:
#                 # print provider
#                 prov = provider.upper()
#                 if prov == 'FACEBOOK':
#                     print 'Facebook login'
#                     return HttpResponseRedirect('http://localhost:8000')
#                     # return redirect('http://localhost:8000/accounts/facebook/login/', status.HTTP_200_OK)
#                 if prov == 'TWITTER':
#                     print 'Twitter login'
#                     return Response(status=status.HTTP_200_OK)
#                 if prov == 'GOOGLE':
#                     print 'Google login'
#                     return Response(status=status.HTTP_200_OK)
#                 if prov == 'LINKEDIN':
#                     print 'LinkedIn login'
#                     return Response(status=status.HTTP_200_OK)
#
#             except:
#                 return Response(status=status.HTTP_400_BAD_REQUEST)
#         return Response(status=status.HTTP_400_BAD_REQUEST)
