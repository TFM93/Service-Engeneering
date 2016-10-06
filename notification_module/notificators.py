import smtplib
from email.mime.text import MIMEText
from email.parser import Parser

import sys

me = 'engserv2016@gmail.com'


def add_to_queue():
    return

def send_sms():
    return

def send_email(subject,text,dest):
    msg =MIMEText(text)
    if subject is None:
        subject = 'default'
    if type(dest) is not list:
        dest = [dest]
    msg['Subject'] = "SmartTicket " + subject + " notification"
    msg['From'] = me
    msg['To'] = dest
    s = smtplib.SMTP("localhost")
    s.sendmail(me, dest, msg.as_string())
    s.quit()
    return True


print "prepare to send message..."
subject_var = raw_input("Please enter subject: ")
content_var = raw_input("Please enter the text: ")
dest_var = raw_input("Please enter the email address: ")
print "sending email..."
if send_email(subject_var,content_var,dest_var):
    print "email sent!"
else:
    print "email not sent!"
sys.exit(0)
