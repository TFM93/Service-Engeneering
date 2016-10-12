import pika
import notificators
connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))

channel = connection.channel()

channel.queue_declare(queue='sms')
channel.queue_declare(queue='mail')

def on_request_sms(ch, method, props, body):
    args = str(body).split(':::')
    print(args)
    response = notificators.send_sms.delay(args[0],args[1],args[2])
    while(not response.ready()):
        pass

    ch.basic_publish(exchange='',
    routing_key=props.reply_to,
    properties=pika.BasicProperties(correlation_id = \
    props.correlation_id),
    body=str(response))
    ch.basic_ack(delivery_tag = method.delivery_tag)


def on_request_mail(ch, method, props, body):
    args = str(body).split(':::')
    print(args)
    if len(args) <= 2:
        print str(len(args)) + " error!"
        return
    response = notificators.send_email.delay(args[0], args[1], args[2])

    if (response.ready()):
        ch.basic_publish(exchange='',
                         routing_key=props.reply_to,
                         properties=pika.BasicProperties(correlation_id= \
                                                             props.correlation_id),
                         body=str(response))
        ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_qos(prefetch_count=1)
channel.basic_consume(on_request_sms, queue='sms')
channel.basic_consume(on_request_mail, queue= 'mail')

print(" [x] Awaiting SMS or Mail requests")
channel.start_consuming()