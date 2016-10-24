import nfc
import time
#import nfc.ndef
import requests

current_ticket_type = 'A'
current_tag = " "

def set_current_tag(tag):
    global current_tag
    current_tag = tag

def get_current_tag():
    global current_tag
    return current_tag

def connected(tag):

    if current_tag == str(tag):
        print('please remove card')
        print('waiting')
        time.sleep(1)

        return False
        pass

    print('tag has been connected')
    print(tag)

    set_current_tag(str(tag))

    tag_split = str(tag).split(' ')#[4].split('=')[1]

    for x in tag_split:
        current_part = x.split('=')
        if(current_part[0] == 'ID'):
            tag_id = current_part[1]
            break
        pass

    print("tag id: " + tag_id)
    #print("tag message: " + tag.ndef.message)

    ticket_type = current_ticket_type
#    ticket_type = raw_input('choose ticket type: ')
    
    print('calling server')

    body = {"ticket_request":{"ticket_type":ticket_type, "endpoint_id": tag_id}}

    print(body)

    resp = requests.post('http://localhost/client/requestTicket', json=body)

    if resp.status_code == 200:
        print('done')
        print('your ticket number is:')

        result = resp.json()
        print(result['ticket_number'])

    else:
        result = resp.json()

        print('Error')
        print('code: ' + str(result['code']) + ', message: ' + result['message'])


    print('waiting')
    time.sleep(1)


    return tag



print('\nwaiting for card')

clf = nfc.ContactlessFrontend('usb')
must_go_on = True

while must_go_on == True:
    clf.connect(rdwr={'on-connect': connected})
    print('current_tag: ' + current_tag)
    must_go_on = raw_input('go on?') == '1'

    pass



