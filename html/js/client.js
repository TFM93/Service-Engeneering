/**
 * Created by rofler on 10/23/16.
 */


var goingLocal = true
var revenant = -1

if (goingLocal == true) {
    console.log('going_local')
    var url_path = "http://localhost/"
}
else {
    var url_path = "https://esmickettodule.herokuapp.com/"
}

function nextTicket(ticketType) {

    //alert('b');
    url_rest = url_path + 'employee/nextTicket?ticket_type=' + ticketType

    revenant = -1
    $.ajax({
        url: url_rest
    }).then(function (data) {

        var json = JSON.parse(data);
        console.log('%c data received: ' + data, 'background: #222; color: #bada55')
        if (json['ticket_number'] != null) {
            console.log('Next Ticket: ' + json['ticket_number'])
            revenant = json['ticket_number']
        }
        else {
            //console.log('Error: code ' + json['code'] + ', message: ' + json['message'])
            revenant = -1
        }
    });

}

function fullQueue(ticketType) {

    //alert('b');
    url_rest = url_path + 'employee/fullQueue?ticket_type=' + ticketType

    revenant = -1
    $.ajax({
        url: url_rest
    }).then(function (data) {

        var json = JSON.parse(data);
        console.log('%c data received: ' + data, 'background: #222; color: #bada55')
        revenant = json


    });

}

function newDay() {

    //alert('b');
    url_rest = url_path + 'employee/newDay'

    revenant = -1
    $.post({
        url: url_rest
    }).then(function (data) {

        var json = JSON.parse(data);
        console.log('%c data received: ' + data, 'background: #222; color: #bada55')
        revenant = json


    });

}

function closeForTheDay() {

    //alert('b');
    url_rest = url_path + 'employee/closeForTheDay'

    revenant = -1
    $.post({
        url: url_rest
    }).then(function (data) {

        var json = JSON.parse(data);
        console.log('%c data received: ' + data, 'background: #222; color: #bada55')
        revenant = json


    });

}

function remainingTime(ticket_number, ticketType) {

    //alert('b');
    url_rest = url_path + 'client/remainingTime?ticket_type=' + ticketType + '&ticket_number=' + ticket_number

    revenant = -1
    $.ajax({
        url: url_rest
    }).then(function (data) {

        var json = JSON.parse(data);
        console.log('%c data received: ' + data, 'background: #222; color: #bada55')
        if (json['remaining_time'] != null) {
            console.log('remaining time: ' + json['remaining_time'])
            revenant = json['remaining_time']
        }
        else {
            //console.log('Error: code ' + json['code'] + ', message: ' + json['message'])
            revenant = -1
        }
    });

}

function ticketAttended(ticket_number, ticketType) {

    //alert('b');
    url_rest = url_path + 'employee/ticketAttended'

    body = JSON.parse('{"ticket":{"ticket_number":1, "ticket_type":"A"}}')
    body['ticket']['ticket_number'] = ticket_number
    body['ticket']['ticket_type'] = ticketType

    revenant = -1
    $.post(url_rest,
        {
            ticket: body['ticket']
        },
        function (data) {

            var json = JSON.parse(data);
            console.log('%c data received: ' + data, 'background: #222; color: #bada55')
            if (json['result'] == 'success') {
                console.log('success: ticket attended')
                revenant = data
            }
            else {
                //console.log('Error: code ' + json['code'] + ', message: ' + json['message'])
                revenant = -1
            }
        });

}

function cancelTicket(ticket_number, ticketType) {

    //alert('b');
    url_rest = url_path + 'client/cancelTicket'

    body = JSON.parse('{"ticket":{"ticket_number":1, "ticket_type":"A"}}')
    body['ticket']['ticket_number'] = ticket_number
    body['ticket']['ticket_type'] = ticketType

    revenant = -1
    $.post(url_rest,
        {
            ticket: body['ticket']
        },
        function (data) {

            var json = JSON.parse(data);
            console.log('%c data received: ' + data, 'background: #222; color: #bada55')
            if (json['result'] == 'success') {
                console.log('success: ticket attended')
                revenant = data
            }
            else {
                //console.log('Error: code ' + json['code'] + ', message: ' + json['message'])
                revenant = -1
            }
        });

}

function makeNewType(ticketType) {

    //alert('b');
    url_rest = url_path + 'employee/makeNewType'

    body = JSON.parse('{"ticket_type":{"ticket_type":"B"}}')
    body['ticket_type']['ticket_type'] = ticketType

    revenant = -1
    $.post(url_rest,
        {
            ticket_type: body['ticket_type']
        },
        function (data) {

            var json = JSON.parse(data);
            console.log('%c data received: ' + data, 'background: #222; color: #bada55')
            if (json['result'] == 'success') {
                console.log('success: new ticket type created')
                revenant = data
            }
            else {
                //console.log('Error: code ' + json['code'] + ', message: ' + json['message'])
                revenant = -1
            }
        });

}

$("#get_result").on('click', function (e) {
    //ajax call here
    console.log('return: ' + String(revenant))
    console.log('return: ' + JSON.stringify(revenant))

    revenant = -1

});

function doRequest(ticket_number, ticket_type, request) {

    switch (request) {
        case "nextTicket":
            nextTicket(ticket_type)
            break;
        case "fullQueue":
            fullQueue(ticket_type)
            break;
        case "remainingTime":
            remainingTime(ticket_number, ticket_type)
            break;
        case "ticketAttended":
            ticketAttended(ticket_number, ticket_type)
            break;
        case "makeNewType":
            makeNewType(ticket_type)
            break;
        case "closeForTheDay":
            closeForTheDay()
            break;
        case "newDay":
            newDay()
            break;
        case "cancelTicket":
            cancelTicket(ticket_number, ticket_type)
            break;
    }

}


$("form").on('submit', function (e) {
    //ajax call here
    e.preventDefault();


    var ticket_number = $('#inputTicketNumber')[0].value;
    var ticket_type = $('#inputTicketType')[0].value;
    var request = $('#request')[0].value;

    console.log('number: ' + ticket_number + ', type: ' + ticket_type + ', request: ' + request)

    console.log('choice: ' + request)

    doRequest(ticket_number, ticket_type, request);

});


$(document).ready(function () {
    console.log('doc ready');
    $('#inputTicketType')[0].value = 'A'
});

