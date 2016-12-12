import requests






'''Notification module'''
#get notification methods
r = requests.get('http://nots.aws.atnog.av.it.pt:80/getMethods')

for i in range(0,1,1):
    #ask to send an sms
    payload ={'subject':'SmartTicket','content':'A sua subscricao foi ativada com sucesso. Para cancelar envie SAIR para 3838. 0,35EUR/SMS','contact':'+351961082004'}
    r1 = requests.post('http://nots.aws.atnog.av.it.pt:80/notify/SMS', data = payload)
    print r1

#ask to send email
#payload ={'subject':'SmartTicket','content':'Mensagem de Teste','contact':'tiagoferreiramagalhaes@ua.pt'}
#r2 = requests.post('http://nots.aws.atnog.av.it.pt:80/notify/EMAIL', data = payload)

print 'methods:'
print r.content
print 'sms:'
print r1
#print 'mail:'
#print r2
print 'done'