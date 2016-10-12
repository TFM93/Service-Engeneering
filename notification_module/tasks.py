from celery import Celery

app = Celery('tasks', broker='amqp://localhost')

@app.task
def add(x, y):
    return x + y
@app.task
def sum(a,b):
    return a +b