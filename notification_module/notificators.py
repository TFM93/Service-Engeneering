from flask_mail import Mail,Message
from smsGateway import *
from celery import Celery
import notifications
# Import smtplib for the actual sending function
import smtplib

# Import the email modules we'll need
from email.mime.text import MIMEText

#mail address
me = 'engserv2016@gmail.com'
#SMS credentials
uname="tiagofm945@gmail.com"
pwd="EngServ2016"

app = Celery('notificators', backend='rpc://', broker='amqp://localhost')

@app.task
def send_sms(subject,text,dest):
    # send the sms
    gateway = smsGateway(uname,pwd)
    text = subject + ' \n ' + text
    ret = gateway.sendMessageToNumber(dest,text,31298)
    if ret['status'] is 401:
        return 'Wrong Credentials Maibe'
    elif ret['status'] is 200:
        return 'Message Sent!'
    return 'Unknown Error'

# @app.task
# def send_email_flask(subject,text,dest):
#     mail = Mail(notifications.app)
#     msg = Message(subject, sender=me, recipients=[dest])
#     msg.body = text
#     ret = mail.send(msg)
#     return ret



@app.task
def send_email(subject,text,dest):
    msg = MIMEText(text)
    msg['Subject'] = subject
    msg['From'] = "SmartTicket"
    msg['To'] = dest
    # Send the message via our own SMTP server.
    server = smtplib.SMTP('smtp.gmail.com', 587)  # port 465 or 587
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(me, 'engserv2016')
    server.sendmail(me, dest, msg.as_string())
    server.quit()

