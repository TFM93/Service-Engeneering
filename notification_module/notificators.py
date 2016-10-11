from flask_mail import Mail,Message
from smsGateway import *

#mail address
me = 'engserv2016@gmail.com'
#SMS credentials
uname="tiagofm945@gmail.com"
pwd=""


def add_to_queue():
    return

def send_sms(subject,text,dest):
    # send the sms
    gateway = smsGateway(uname,pwd)
    text = subject + ' \n ' + text
    ret = gateway.sendMessageToNumber(dest,text,31216)
    if ret['status'] is 401:
        return 'Wrong Credentials Maibe'
    elif ret['status'] is 200:
        return 'Message Sent!'
    return 'Unknown Error'

def send_email(app,subject,text,dest):
    mail = Mail(app)
    msg = Message(subject, sender=me, recipients=[dest])
    msg.body = text
    ret = mail.send(msg)
    return ret
