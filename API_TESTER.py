import requests






'''Notification module'''
#get notification methods
r = requests.get('http://127.0.0.1:5000/')

#ask to send an sms
#payload ={'subject':'SmartTicket','content':'Mensagem de Teste','contact':'+351912928194'}
payload ={'subject':'SmartTicket','content':'Mensagem de Teste','contact':'+351919872373'}
r1 = requests.post('http://127.0.0.1:5000/notify/SMS', data = payload)

#ask to send email
payload ={'subject':'SmartTicket','content':'Mensagem de Teste','contact':'tiagoferreiramagalhaes@ua.pt'}
#r2 = requests.post('http://127.0.0.1:5000/notify/EMAIL', data = payload)

print 'methods:'
print r
print 'sms:'
print r1
print 'mail:'
#print r2
print 'done'