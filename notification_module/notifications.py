from flask import Flask
from flask import request
import notificators
from flask_mail import Mail, Message
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
    method=request.form['method']
    subject=request.form['subject']
    content=request.form['content']
    contact=request.form['contact']
    ret=None
    if method is "EMAIL" and contact.contains('@'):
        ret = notificators.send_email(app,subject,content,contact)
    elif method is 'SMS':
        ret = notificators.send_sms(subject,content,contact)#fill the gaps
    if ret:
        return "Notified"# test answer
    return "Some error"

if __name__ == "__main__":
    app.run()


