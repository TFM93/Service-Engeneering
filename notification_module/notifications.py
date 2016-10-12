from flask import Flask
import notificators
from producer import *
import time


__author__ = 'tiagoferreiramagalhaes@ua.pt'

app = Flask(__name__)
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 465,
    MAIL_USE_TLS = False,
    MAIL_USE_SSL = True,
    MAIL_USERNAME = 'engserv2016@gmail.com',
    MAIL_PASSWORD = 'engserv2016',
))

@app.route("/")# test node
def hello():
    return "Hello World!"

@app.route("/getMethods")
def getNotMethods():
    return ['SMS','EMAIL']

@app.route("/notify")
def notifications():
    # method=request.form['method']
    # subject=request.form['subject']
    # content=request.form['content']
    # contact=request.form['contact']
    method='EMAIL'
    subject='SmartTicket'
    content="Esta e uma mensagem de teste"
    contact='+351912928194'
    contact_m= 'tiagoferreiramagalhaes@ua.pt'
    ret=None
    if method is "EMAIL":
        #ret = message_producer.mail_request(subject,content,contact)#using rabbitmq
        ret = notificators.send_email.delay(subject,content,contact_m)#using celery directly
        #time.sleep(1)
    elif method is 'SMS':
        ret = notificators.send_sms.delay(subject,content,contact_m)#using celery directly
    else:
        return "invalid method"
    while not ret.ready():
        time.sleep(1)
    return "Notified"# test answer
    #return "Some error" #todo- write correct api responses


if __name__ == "__main__":
    message_producer = RpcClient()
    app.run()




