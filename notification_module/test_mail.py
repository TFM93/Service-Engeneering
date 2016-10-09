from flask import Flask
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
mail = Mail(app)
#app.config = {'EMAIL_HOST': 'localhost', 'EMAIL_PORT': 25, 'EMAIL_TIMEOUT': 10}
@app.route("/")
def index():
   msg = Message('Hello', sender = 'engserv2016@gmail.com', recipients = ['tiagoferreiramagalhaes@ua.pt'])
   msg.body = "Hello Flask message sent from Flask-Mail"
   mail.send(msg)
   return "Sent"

if __name__ == '__main__':
   app.run(debug = True)


