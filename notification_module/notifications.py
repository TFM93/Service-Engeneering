from flask import Flask, request, jsonify
import notificators
#from producer import *
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

@app.route("/getMethods", methods=['GET'])
def getNotMethods():
    return jsonify(sms=True, email=True)

@app.route("/notify/<methodn>", methods=['POST'])
def notifications(methodn):
    #methods = ['POST']
    methodn = str(methodn)
    subject=str(request.form['subject'])
    content=str(request.form['content'])
    contact=str(request.form['contact'])
    ret=None

    if methodn == "EMAIL":
        #ret = message_producer.mail_request(subject,content,contact)#using rabbitmq
        ret = notificators.send_email.delay(subject,content,contact)#using celery directly
    elif methodn == "SMS":
        ret = notificators.send_sms_twilio.delay(subject,content,contact)#using celery directly
    else:
        content_error = "invalid notification method"
        return content_error, 405
    count=0
    while not ret.ready():
        if count > 6:
            return "TimeOut- message not sent!", 504
        count +=1
        time.sleep(1)

    if ret == 'Unknown Error':
        return ret, 500
    return "Message sent", 200


if __name__ == "__main__":
    #message_producer = RpcClient()
    app.run()




