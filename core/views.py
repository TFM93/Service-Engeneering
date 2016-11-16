from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response
from django.dispatch import receiver
from allauth.socialaccount.signals import pre_social_login
from allauth.socialaccount.models import SocialAccount
from models import  CustomSocialAccount


def index(request):
    return render_to_response("index.html", RequestContext(request))


def about(request):
    return render_to_response("core/about.html", RequestContext(request))


# def googleConfirm(request):
#     return render_to_response("core/googleff1931c407ddd6d6.html")


@receiver(pre_social_login)
def social_account_login(sender, **kwargs):
    sociallogin = kwargs['sociallogin']
    provider = sociallogin.account.provider
    user_id = sociallogin.user.id
    username = sociallogin.user.username
    # print 'ID: {}, username: {}, provider: {}'.format(user_id, username, provider)

    try:
        account = SocialAccount.objects.get(user_id=user_id)
    except:
        return
    try:
        c_user = CustomSocialAccount.objects.get(account=account)
        c_user.save(logged=True)
    except:
        print 'Some error ocurred during login.'

    # TODO redirect user to main page (composer)
    return HttpResponse('www.google.com')
