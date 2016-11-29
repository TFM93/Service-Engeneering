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
from forms import add_uuid_form
from allauth.account.views import EmailView

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
    # context = RequestContext(request)
    msg = 'Some error occurred!'
    class_name = 'alert-danger'

    if request.method == 'POST':
        form = add_uuid_form(request.POST)
        if form.is_valid:
            print 'Form valid!'
    else:
        form = add_uuid_form()

    # try:
    #     uuid = str(request.POST['uuid'])
    #     res = requests.get('https://esmickettodule.herokuapp.com/didUUIDPass?uuid=' + uuid)
    #     if res.status_code == 200:
    #         json = res.json()
    #         if json['exists']:
    #             code = json['code']
    #
    #             user = User.objects.get(pk=request.user.pk)
    #             account = SocialAccount.objects.get(user=user)
    #             c_user = CustomSocialAccount.objects.get(account=account)
    #             c_user.uuid = uuid
    #             c_user.save()
    #
    #             res = requests.post('https://esmickettodule.herokuapp.com/resolveUUID', data={'uuid': uuid})
    #             if res.status_code == 200:
    #                 class_name = ''
    #                 msg = 'UUID %s added with success to your account.' % (request.POST['uuid'])
    #         else:
    #             msg = 'Invalid UUID, do you know what are you doing?'
    # except:
    #     print 'Error'
    #     pass
    context = RequestContext(request, {
        'hasMessage': True,
        'message': msg,
        'className': class_name,
        'uuid_form': form,
    })
    dados = {
        'hasMessage': True,
        'message': msg,
        'className': class_name,
        'uuid_form': form,
    }
    # return HttpResponse(template.render(context))
    return render(request, 'index.html', dados)


# class CustomEmailView(EmailView):
#     # add some context to the already existing context
#     def get_context_data(self, **kwargs):
#         # get context data from original view
#         context = super(CustomEmailView, self).get_context_data(**kwargs)
#         # add for to context
#         context['uuid_form'] = add_uuid_form()
#
#         return context

# def CustomEmailView(self, request, *args, **kwargs):
#
#     return EmailView(request, *args, **kwargs)
