import nfc
#import nfc.ndef
import requests


def connected(tag):
    print('tag has been connected')
    print(tag)

    tag_id = str(tag).split(' ')[4].split('=')[1]
    print("tag id: " + tag_id)
    #print("tag message: " + tag.ndef.message)
    """
    new_ndef = nfc.ndef

    record1 = nfc.ndef.Record("urn:nfc:wkt:T", "id1", "\x02enHello World!")
    record2 = nfc.ndef.Record("urn:nfc:wkt:T", "id2", "\x02deHallo Welt!")
    message = nfc.ndef.Message(record1, record2)
    print(message.pretty())

    new_ndef.message = message


    print(str(message))

    f = open('abc.txt', 'w')
    f.write(str(message)
    f.close()

    #print("is writable: " + tag.ndef.is_writable)

    print(tag.ndef.message.pretty() if tag.ndef else "Sorry, no NDEF")

    #tag.ndef = new_ndef

    print(tag.ndef.message.pretty() if tag.ndef else "Sorry, no NDEF")
    """

    ticket_type = "A"
#    ticket_type = raw_input('choose ticket type: ')
    
    print('calling server')

    body = {"ticket_request":{"ticket_type":ticket_type, "endpoint_id": tag_id}}

    print(body)

    resp = requests.post('http://192.168.1.78/client/requestTicket', json=body)

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