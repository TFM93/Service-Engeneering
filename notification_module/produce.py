import pika
import sys

message = ' '.join(sys.argv[1:]) or "Hello World!"
connection = pika.BlockingConnection(pika.ConnectionParameters(
               'localhost'))
channel = connection.channel()
channel.basic_qos(prefetch_count=1)
channel.queue_declare(queue='hello', durable=True)
#channel.basic_publish(exchange='',
 #                     routing_key='hello',
  #                    body='Hello World!')


channel.basic_publish(exchange='',
                      routing_key='hello',
                      body=message,
                      properties=pika.BasicProperties(
                         delivery_mode = 2, # make message persistent
                      ))
print(" [x] Sent %r" % message)
connection.close()