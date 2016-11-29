from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response
from django.dispatch import receiver
from allauth.socialaccount.signals import pre_social_login
from django.contrib.auth.models import User
from django.contrib.auth import logout
from allauth.socialaccount.models import SocialAccount
from models import CustomSocialAccount

import os
import requests


def index(request):
    return render_to_response("index.html", RequestContext(request))


def about(request):
    return render_to_response("core/about.html", RequestContext(request))


def account_delete(request):
    try:
        user = User.objects.get(pk=request.user.pk)
        try:
            path = 'static/web/avatars/avatar%s.jpg' % user.pk
            os.remove(path)
        except:
            print 'Error deleting avatar.'
            return render_to_response("index.html", RequestContext(request))
        user.delete()
        logout(request)
    except:
        print 'Error'
    return render_to_response("index.html", RequestContext(request))


@receiver(pre_social_login)
def social_account_login(sender, **kwargs):
    sociallogin = kwargs['sociallogin']
    user_id = sociallogin.user.id
    try:
        account = SocialAccount.objects.get(user_id=user_id)
    except:
        return
    try:
        c_user = CustomSocialAccount.objects.get(account=account)
        c_user.login_counter += 1
        c_user.save()
    except:
        print 'Some error ocurred during login.'


# def googleConfirm(request):
#     return render_to_response("core/googleff1931c407ddd6d6.html")


def add_uuid(request):
    template = loader.get_template('index.html')
    context = RequestContext(request)
    msg = 'Some error occurred!'
    className = 'alert-danger'
    try:
        uuid = str(request.POST['uuid'])
        res = requests.get('https://esmickettodule.herokuapp.com/didUUIDPass?uuid=' + uuid)
        if res.status_code == 200:
            json = res.json()
            if json['exists']:
                print json['code']

                user = User.objects.get(pk=request.user.pk)
                account = SocialAccount.objects.get(user=user)
                c_user = CustomSocialAccount.objects.get(account=account)
                c_user.uuid = uuid
                c_user.save()

                res = requests.post('https://esmickettodule.herokuapp.com/resolveUUID', data={'uuid': uuid})
                if res.status_code == 200:
                    className = ''
                    msg = 'UUID %s added with success to your account.' % (request.POST['uuid'])
            else:
                msg = 'Invalid UUID, do you know what are you doing?'
    except:
        print 'Error'
        pass
    context = RequestContext(request, {
        'hasMessage': True,
        'message': msg,
        'className': className,
    })
    return HttpResponse(template.render(context))
