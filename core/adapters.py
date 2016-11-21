from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount
from models import CustomSocialAccount
from rest_framework.authtoken.models import Token
from django.http import HttpResponse

import requests
from django.shortcuts import resolve_url
from django.core import files


# Redirect to specific url after login
class AccountAdapter(DefaultAccountAdapter):
    def get_login_redirect_url(self, request):
        token = Token.objects.get(user=self.request.user)
        host = self.request.META['SERVER_NAME']
        url = 'http://' + host + ':8000/?id=' + str(self.request.user.id) + '&token=' + str(token.key)
        data = {'id': str(self.request.user.id), 'token': token.key}

        return resolve_url(url, data)


# Create entry on CustomSocialAccount and associates to the SocialAccount and adds custom info
class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def save_user(self, request, sociallogin, form=None):
        user = super(SocialAccountAdapter, self).save_user(request, sociallogin, form)
        new_user = SocialAccount.objects.get(user=user)

        url = sociallogin.account.get_avatar_url()
        avatar = download_file_from_url(url, user.pk)  # download file from provided url

        if avatar:
            # profile = SocialAccount.objects.get(user=user)  # access your profile from user by correct name
            customUser = CustomSocialAccount(account=new_user, user_avatar='static/web/avatars/avatar%d.jpg' % user.pk)
            customUser.save()
        return user


def download_file_from_url(url, pk):
    # Stream the image from the url
    try:
        request = requests.get(url, stream=True)
    except requests.exceptions.RequestException as e:
        print "Can't import requests module!"
        return None

    if request.status_code != requests.codes.ok:
        print "Can't get avatar from given url!"
        return None

    # Create a temporary file
    # lf = tempfile.NamedTemporaryFile(dir='static/web/avatars/')
    lf = open('static/web/avatars/avatar%d.jpg' % pk, 'wb+')

    # Read the streamed image in sections
    for block in request.iter_content(1024 * 8):
        # If no more file then stop
        if not block:
            break
        # Write image block to file
        lf.write(block)
    return files.File(lf)
