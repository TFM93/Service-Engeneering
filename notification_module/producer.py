import pika
import uuid
'''
This class is responsible to produce messages to the queue, rpc type
'''
class RpcClient(object):
    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(
                host='localhost'))

        self.channel = self.connection.channel()
        result = self.channel.queue_declare(exclusive=True)
        self.callback_queue = result.method.queue
        self.channel.basic_consume(self.on_response, no_ack=True,
                                   queue=self.callback_queue)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def sms_request(self,subject,text,dest):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        message = subject + ':::' + text + ':::' + dest
        self.channel.basic_publish(exchange='',
                                   routing_key='sms',
                                   properties=pika.BasicProperties(
                                         reply_to = self.callback_queue,
                                         correlation_id = self.corr_id,
                                         ),
                                   body=str(message))
        while self.response is None:
            self.connection.process_data_events()
        return int(self.response)

    def mail_request(self,subject,text,dest):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        message = subject + ':::' + text + ':::' + dest
        self.channel.basic_publish(exchange='',
                                   routing_key='mail',
                                   properties=pika.BasicProperties(
                                         reply_to = self.callback_queue,
                                         correlation_id = self.corr_id,
                                         ),
                                   body=str(message))
        while self.response is None:
            self.connection.process_data_events()
        return int(self.response)