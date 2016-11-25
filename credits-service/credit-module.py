from flask import Flask, url_for, redirect, request
from config import interface


app = Flask(__name__)



@app.route("/")
def index():
    return """
    SmartTicket payments service! here to insert api page
    """

@app.route("/pay/<int:value>/<string:uid>/")
def start(value,uid):
    return """
        <a href="%s">
            <img src="https://www.paypalobjects.com/en_US/i/btn/btn_xpressCheckout.gif">
        </a>
        """ % url_for('paypal_redirect',value=value,uid=uid)

@app.route("/paypal/redirect/<int:value>/<string:uid>/")
def paypal_redirect(value=1000,uid=None):
    kw = {
        'amt': str(value/100),
        'currencycode': 'EUR',
        'returnurl': url_for('paypal_confirm',uid=uid, _external=True),
        'cancelurl': url_for('paypal_cancel', _external=True),
        'paymentaction': 'Sale'
    }

    setexp_response = interface.set_express_checkout(**kw)
    return redirect(interface.generate_express_checkout_redirect_url(setexp_response.token))

@app.route("/paypal/confirm/<string:uid>/")
def paypal_confirm(uid=None):
    getexp_response = interface.get_express_checkout_details(token=request.args.get('token', ''))

    if getexp_response['ACK'] == 'Success':
        return """
            Everything looks good! <br />
            <a href="%s">Click here to complete the payment.</a>
        """ % url_for('paypal_do', token=getexp_response['TOKEN'],uid=uid)
    else:
        return """
        Oh no! Paypal returned an error. <br />
        <pre>
            %s
        </pre>
        """ % (getexp_response['ACK'])
#        return """
#            Oh noes! PayPal returned an error code. <br />
#            <pre>
#                %s
#            </pre>
#            Click <a href="%s">here</a> to try again.
#        """ % (getexp_response['ACK'], url_for('index'))


@app.route("/paypal/do/<string:token>/<string:uid>/")
def paypal_do(token,uid=None):
    getexp_response = interface.get_express_checkout_details(token=token)
    kw = {
        'amt': getexp_response['AMT'],
        'paymentaction': 'Sale',
        'payerid': getexp_response['PAYERID'],
        'token': token,
        'currencycode': getexp_response['CURRENCYCODE']
    }
    interface.do_express_checkout_payment(**kw)

    return redirect(url_for('paypal_status', token=kw['token'], uid=uid))

@app.route("/paypal/status/<string:token>/<string:uid>/")
def paypal_status(token,uid=None):
    checkout_response = interface.get_express_checkout_details(token=token)

    if checkout_response['CHECKOUTSTATUS'] == 'PaymentActionCompleted':
        # Here you would update a database record.
        #check if this token was not used yet
        #associate the token with the user on paypal redirect and check it here, for security reasons

        print str(checkout_response['AMT']) + " "+ str(uid)
        return """
            Awesome! Thank you for your %s %s purchase.
        """ % (checkout_response['AMT'], checkout_response['CURRENCYCODE'])
    else:
        return """
            Oh no! PayPal doesn't acknowledge the transaction. Here's the status:
            <pre>
                %s
            </pre>
        """ % checkout_response['CHECKOUTSTATUS']

@app.route("/paypal/cancel")
def paypal_cancel():
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
