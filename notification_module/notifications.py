from flask import Flask
from notificators import * #import methods for notification methods

app = Flask(__name__)

@app.route("/")# test node
def hello():
    return "Hello World!"

@app.route("/getMethods")
def getNotMethods():
    return "SMS"# test answer

@app.route("/notify")
def notifications():
    return "Notified"# test answer

if __name__ == "__main__":
    app.run()


