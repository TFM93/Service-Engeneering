from flask_mail import Mail,Message

import sys

me = 'engserv2016@gmail.com'


def add_to_queue():
    return

def send_sms(subject,text,dest):
    return

def send_email(app,subject,text,dest):
    mail = Mail(app)
    msg = Message(subject, sender=me, recipients=[dest])
    msg.body = text
    mail.send(msg)
    return 1
