from django.http import HttpResponse
from django.shortcuts import render
from config import *
from django.shortcuts import resolve_url,redirect,render, render_to_response
from django.template import RequestContext, loader
from database_api import *
from conversion import *

# Create your views here.
def index(request):
    return render_to_response('core/index.html')

def start(request,value,uid):
    template = loader.get_template('core/pay.html')
    context = RequestContext(request, {
        'value': value,
        'uid': uid,
    })
    return HttpResponse(template.render(context))

def paypal_redirect(request,value=1000,uid=None):
    kw = {
        'amt': str(int(value)/100),
        'currencycode': 'EUR',
        'returnurl': request.build_absolute_uri(resolve_url('paypal_confirm', uid)),
        'cancelurl': request.build_absolute_uri(resolve_url('paypal_cancel')),
        'paymentaction': 'Sale'
    }

    setexp_response = interface.set_express_checkout(**kw)
    add_token(setexp_response.token,uid,0)
    return redirect(interface.generate_express_checkout_redirect_url(setexp_response.token))

def paypal_confirm(request,uid=None):
    getexp_response = interface.get_express_checkout_details(token=request.GET.get('token', ''))

    if getexp_response['ACK'] == 'Success':
        template = loader.get_template('core/confirm.html')
        context = RequestContext(request, {
            'token': getexp_response['TOKEN'],
            'uid': uid,
        })
        return HttpResponse(template.render(context))
    else:
        template = loader.get_template('core/error.html')
        context = RequestContext(request, {
            'error': getexp_response['ACK']
        })
        return HttpResponse(template.render(context))


def paypal_do(request,token,uid=None):
    getexp_response = interface.get_express_checkout_details(token=token)
    kw = {
        'amt': getexp_response['AMT'],
        'paymentaction': 'Sale',
        'payerid': getexp_response['PAYERID'],
        'token': token,
        'currencycode': getexp_response['CURRENCYCODE']
    }
    interface.do_express_checkout_payment(**kw)

    return redirect(resolve_url('paypal_status', token=kw['token'], uid=uid))

def paypal_status(request,token,uid=None):
    checkout_response = interface.get_express_checkout_details(token=token)

    if checkout_response['CHECKOUTSTATUS'] == 'PaymentActionCompleted':
        # Here you would update a database record.
        if not check_token(token):
            update_token(token,1)
            nrcredits = convert(float(checkout_response['AMT']))
            add_credits(uid,nrcredits)
            template = loader.get_template('core/ok.html')
        else:
            template = loader.get_template('core/already.html')
        context = RequestContext(request, {
            'value': checkout_response['AMT'],
            'currency': checkout_response['CURRENCYCODE']
        })
    else:
        template = loader.get_template('core/error.html')
        context = RequestContext(request, {
            'error': checkout_response['CHECKOUTSTATUS']
        })
    return HttpResponse(template.render(context))


def paypal_cancel(request):
    return redirect(resolve_url('index'))