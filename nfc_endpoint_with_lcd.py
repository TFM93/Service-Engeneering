import nfc
#import nfc.ndef
import requests
#from RPLCD import CharLCD

current_ticket_type = "A"

def writeOnLCD(text1, text2):
    lcd = CharLCD()
    lcd.cursor_pos = (0, 0)
    lcd.write_string(text1)
    lcd.cursor_pos = (1, 0)
    lcd.write_string(text2)


def connected(tag):
    print('tag has been connected')
    print(tag)

    tag_id = str(tag).split(' ')[4].split('=')[1]
    print("tag id: " + tag_id)
    #print("tag message: " + tag.ndef.message)

    ticket_type = current_ticket_type
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

    return True


#writeOnLCD('ticket type', current_ticket_type)

clf = nfc.ContactlessFrontend('usb')
clf.connect(rdwr={'on-connect': connected})

