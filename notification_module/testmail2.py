# Import smtplib for the actual sending function
import smtplib
me = 'engserv2016@gmail.com'
pw = 'engserv2016'
# Import the email modules we'll need
from email.mime.text import MIMEText


def send_email2(subject,text,dest):
    msg = MIMEText(text)

    # me == the sender's email address
    # you == the recipient's email address


    msg['Subject'] = subject
    msg['From'] = me
    msg['To'] = dest

    # Send the message via our own SMTP server.
    server = smtplib.SMTP('smtp.gmail.com', 587)  # port 465 or 587
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(me, 'engserv2016')
    server.sendmail(me, dest, msg.as_string())
    server.quit()


def send_email3(subject,text,dest):
    msg = 'Hello world.'

    server = smtplib.SMTP('smtp.gmail.com', 587)  # port 465 or 587
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(me, pw)
    server.sendmail(me, dest, msg)
    server.close()


send_email2("teste","v2",'tiagoferreiramagalhaes@ua.pt')