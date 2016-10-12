import pika
import time
connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()
channel.basic_qos(prefetch_count=1)
#channel.queue_declare(queue='sms', durable=True)

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    time.sleep(body.count('.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(callback,
                      queue='sms',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()