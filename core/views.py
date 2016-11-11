from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response
from django.dispatch import receiver
from allauth.socialaccount.signals import pre_social_login


def index(request):
    return render_to_response("index.html", RequestContext(request))


def about(request):
    return render_to_response("core/about.html", RequestContext(request))

    # template = loader.get_template('core/about.html')
    # return HttpResponse(template.render({'loggedIn': request.session['loggedIn'], 'email': request.session['email']}))
    # return HttpResponse(template.render())


# def googleConfirm(request):
#     return render_to_response("core/googleff1931c407ddd6d6.html")


@receiver(pre_social_login)
def social_account_login(sender, **kwargs):
    #TODO por flag do user a True
    print str(kwargs)
