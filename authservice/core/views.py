from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render_to_response


def index(request):
    return render_to_response("index.html", RequestContext(request))


def about(request):
    return render_to_response("core/about.html", RequestContext(request))

    # template = loader.get_template('core/about.html')
    # return HttpResponse(template.render({'loggedIn': request.session['loggedIn'], 'email': request.session['email']}))
    # return HttpResponse(template.render())
