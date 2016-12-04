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
from forms import add_uuid_form, add_phone_form
# from allauth.account.views import EmailView

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


def manage_uuid(request):
    msg = 'Some error occurred!'
    class_name = 'alert-danger'
    existent_uuid = None

    try:
        # get the user and an existing uuid
        user = User.objects.get(pk=request.user.pk)
        account = SocialAccount.objects.get(user=user)
        c_user = CustomSocialAccount.objects.get(account=account)
        existent_uuid = c_user.uuid

        if request.method == 'POST':
            form = add_uuid_form(request.POST)
            if form.is_valid():
                form_uuid = form.cleaned_data['uuid']
                form_code = form.cleaned_data['code']

                if len(form_uuid) > 0:
                    assoc_type = 0  # association by uuid
                    url = 'https://esmickettodule.herokuapp.com/didUUIDPass?uuid=' + form_uuid
                else:
                    assoc_type = 1  # association by code
                    url = 'https://esmickettodule.herokuapp.com/UUIDByCode?code=' + form_code

                res = requests.get(url)
                if res.status_code == 200:
                    json = res.json()
                    if assoc_type == 0:  # assoc by uuid
                        if json['exists']:
                            res_code = json['code']
                            if res_code == form_code:
                                res = requests.post('https://esmickettodule.herokuapp.com/resolveUUID', data={'uuid': form_uuid})
                                if res.status_code == 200:
                                    c_user.uuid = form_uuid
                                    c_user.save()
                                    class_name = 'alert-success'
                                    msg = 'UUID %s added with success to your account.' % form_uuid
                            else:  # wrong code for uuid
                                msg = 'Wrong code! Better know it, or you\'re screwed'
                        else:  # uuid does not exists
                            msg = 'Invalid UUID, do you know what you\'re doing?'
                    elif assoc_type == 1:  # assoc by code
                        if json['exists']:
                            res_uuid = json['uuid']
                            res = requests.post('https://esmickettodule.herokuapp.com/resolveUUID', data={'uuid': res_uuid})
                            if res.status_code == 200:
                                c_user.uuid = res_uuid
                                c_user.save()
                                class_name = 'alert-success'
                                msg = 'UUID %s added with success to your account.' % form_uuid
                        else:  # uuid does not exists
                            msg = 'Invalid Code, do you know what you\'re doing?'
            else:
                msg = 'Missing required fields!'
        else:
            if existent_uuid is not None and existent_uuid is not unicode(''):
                msg = 'You have currently this uuid: %s' % existent_uuid
                class_name = 'alert-info'
            else:
                msg = 'You don\'t have any associated uuid.'
                class_name = 'alert-warning'
            form = add_uuid_form()
    except:
        template = loader.get_template('index.html')
        context = RequestContext(request, {
            'hasMessage': True,
            'message': 'Some error occurred! Contact the administrator.',
            'className': 'alert-danger',
        })
        return HttpResponse(template.render(context))

    template = loader.get_template('core/account_uuid.html')
    context = RequestContext(request, {
        'hasMessage': True,
        'message': msg,
        'className': class_name,
        'uuid_form': form,
    })
    return HttpResponse(template.render(context))


def manage_phone(request):
    msg = 'Some error occurred!'
    class_name = 'alert-danger'
    existent_phone = None

    try:
        # get the user and an existing phone
        user = User.objects.get(pk=request.user.pk)
        account = SocialAccount.objects.get(user=user)
        c_user = CustomSocialAccount.objects.get(account=account)
        existent_phone = c_user.phone

        if request.method == 'POST':
            form = add_phone_form(request.POST)
            if form.is_valid():
                form_phone = form.cleaned_data['phone']
                c_user.phone = form_phone
                c_user.save()
                class_name = 'alert-success'
                msg = 'Phone number %s added with success to your account.' % form_phone
            else:
                msg = 'Missing required fields!'
        else:
            if existent_phone is not None and existent_phone is not 0:
                msg = 'You have currently this phone number: %s' % existent_phone
                class_name = 'alert-info'
            else:
                msg = 'You don\'t have any associated phone number.'
                class_name = 'alert-warning'
            form = add_phone_form()
    except:
        template = loader.get_template('index.html')
        context = RequestContext(request, {
            'hasMessage': True,
            'message': 'Some error occurred! Contact the administrator.',
            'className': 'alert-danger',
        })
        return HttpResponse(template.render(context))

    template = loader.get_template('core/account_phone.html')
    context = RequestContext(request, {
        'hasMessage': True,
        'message': msg,
        'className': class_name,
        'phone_form': form,
    })
    return HttpResponse(template.render(context))


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
