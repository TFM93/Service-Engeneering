import nfc
import requests


def connected(tag):
    print('tag has been connected')
    print(tag)
    print('calling server')

    ticket_type = 'A'

    ticket_type = raw_input('choose ticket type: ')

    body = {"ticket_request":{"ticket_type":ticket_type}}

    resp = requests.post('http://192.168.1.78:80/client/requestTicket', json=body)

    if resp.status_code == 200:
        print('done')
        print('your ticket number is:')

        result = resp.json()
        print(result['ticket_number'])

    else:
        print('this is bad')

    return False

clf = nfc.ContactlessFrontend('usb')
clf.connect(rdwr={'on-connect': connected})