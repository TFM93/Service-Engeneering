from flask import Flask
from flask import Flask, render_template, redirect
from flask import request

import nfc
import time
import requests

from subprocess import call

app = Flask(__name__)

#./../home_automation/codesend 3389

current_result_code = 'A'
current_ticket_number = 0

current_ticket_type = 'A'
current_tag = " "
must_go_on = True


def set_current_ticket_number(tag):
    global current_ticket_number
    current_ticket_number = tag
def set_current_code(tag):
    global current_result_code
    current_result_code = tag

def set_current_tag(tag):
    global current_tag
    current_tag = tag

def set_ticket_type(tag):
    global current_ticket_type
    current_ticket_type = tag

def set_must_go_on(must):
    global must_go_on
    must_go_on = must

def get_current_tag():
    global current_tag
    return current_tag

def getThings():

	result = {}
	resp = requests.get('https://esmickettodule.herokuapp.com/everyQueue')
	ticket_types = []
	your_tickets = []
	tickets = []

	if resp.status_code == 200:
		ticket_queues = resp.json()
		#print (ticket_queues)
		for x in ticket_queues:
			ticket_types.append(str(x['type']))
			if len(x['queue'])>0:
				#print(x['type'])
				your_tickets.append(x['queue'][len(x['queue'])-1]['ticket_number'] + 1)
				ticket = {}
				ticket['type'] = x['type']
				ticket['num'] = x['queue'][len(x['queue'])-1]['ticket_number'] + 1
				tickets.append(ticket)
				#ticket_queues.append('A')
				pass
		pass

	print(ticket_types)
	print(your_tickets)

	result['ticket_types'] = ticket_types
	result['your_tickets'] = your_tickets
	result['tickets'] = tickets

	return result


def connected(tag):
    '''
    if current_tag == str(tag):
        print('please remove card')
        print('waiting')
        time.sleep(1)

        return False
        pass
    '''
    print('\ntag has been connected')
    #print(tag)

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
    #ticket_type = raw_input('\nticket type?')
#    ticket_type = raw_input('choose ticket type: ')
    
    print('calling server')

    body = {"ticket_request":{"ticket_type":ticket_type, "endpoint_id": tag_id}}

    #print(body)

    resp = requests.post('https://esmickettodule.herokuapp.com/client/requestTicket', json=body)

    if resp.status_code == 200:
        print('\ndone')
        result = resp.json()
        print('your ticket number is:')
        print(result['ticket_number'])

        set_current_ticket_number(result['ticket_number'])
        set_current_code(result['code'])

        if(result['code'] != 'ack' and result['code'] != 'no_ack'):
            print('this card is not registered. Your code is:')
            print(result['code'])        

    else:
        result = resp.json()

        print('\nError')
        print('code: ' + str(result['code']) + ', message: ' + result['message'])

        if(result['message'] == "Gone - service terminated for the day"):
            set_must_go_on(False)


        set_current_ticket_number('Error: ' + result['message'])
        set_current_code('Error: ' + result['message'])

    #print('waiting')
    #time.sleep(1)
    print('\nwaiting for card')

    return tag


@app.route('/', methods=['GET', 'POST'])
def index():

    
    things = getThings()

    #return 'Hello world'
    a_ticket_types = things['ticket_types'] #['A', 'B']
    a_tickets_to_get = things['your_tickets']

    return render_template('template.html', a_ticket_types = a_ticket_types, a_tickets_to_get = things['tickets'])

@app.route('/passCard', methods=['GET'])
def passCard():

   	ticket_type = request.args.get('type')
   	#print(ticket_type)
   	set_ticket_type(ticket_type)

	clf = nfc.ContactlessFrontend('usb')
	clf.connect(rdwr={'on-connect': connected})

   	return redirect("/cardPassed?code="+str(current_result_code)+"&number="+str(current_ticket_number), code=302)

@app.route('/passCard_prev', methods=['GET'])
def passCard_prev():

   	return render_template('pass_card_prev.html')


@app.route('/cardPassed', methods=['GET'])
def cardPassed():

	code=request.args.get('code')
	number=request.args.get('number')

	if(code != 'ack' and code != 'no_ack'):
		code_status = 'this card is not registered. Your code is: ' + code
	else:
		code_status = 'this card is registered.'

   	return render_template('cardPassed.html', code_status = code_status, number = number)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8090)
