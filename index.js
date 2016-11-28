/*** Requirements ****/
var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var async = require("async");

var request = require("request");


/**** Final Variables & Templates ****/
var compositor_url = "http://localhost:8090/";

var ticket_queue_path = __dirname + "/data/ticket_queue.json";
var average_time_path = __dirname + "/data/average_time.json";
var unresolved_uuids_path = __dirname + "/data/unresolved_uuids.json";

var ticket_template = JSON.parse('{"ticket_number":-1,"request_timestamp":0,"ticket_UUID":0}');
var ticket_brief_template = JSON.parse('{"ticket_number":-1}');
var error_template = JSON.parse('{"code":-1,"message":"A","fields":"a"}');
var everyThing_template = JSON.parse('[{"type": "A","queue": [],"last_ticket": 0}]');
var queue_template = JSON.parse('{"type": "a","queue": [],"last_ticket": 0}');
var last_tickets_queue_template = JSON.parse('[{"ticket_type": "a","ticket_number": 0}]');
var last_tickets_queue_ticket_template = JSON.parse('{"ticket_type": "a","ticket_number": 0}');
var average_time_template = JSON.parse('[{"type": "A", "number_of_tickets": 0,"current_average_time": 0}]');
var remaining_time_res_template = JSON.parse('{"remaining_time": 0}');

var average_time_element_template = JSON.parse('{"type":"A", "number_of_tickets":0, "current_average_time":0}');
var closed_for_requests = false;

/**** Initial Things *****/

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

var bodyParser = require('body-parser');
var jsonfile = require('jsonfile');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    extended: true
}));


/**** Private functions ****/

function jumpInQueue(queue, ticket_UUID, numberOfJumps) {

    var result = JSON.parse('{}');
    var newQueue = queue;
    var passedQueue = [];
    var ticket_pos = findTicketByUUID(queue, ticket_UUID);

    if (ticket_pos != -1 && queue != null && ticket_UUID != null && numberOfJumps != null && numberOfJumps > 0) {

        var newTicket = newQueue[ticket_pos];

        var newPlace = (ticket_pos - numberOfJumps) > 0 ? ticket_pos - numberOfJumps : 0;
        console.log('newPlace: ' + newPlace + '  ticketPos: ' + ticket_pos + 'numberJ: ' + numberOfJumps);

        for (var i = ticket_pos; i > newPlace; i--) {
            newQueue[i] = newQueue[i - 1];
            passedQueue[passedQueue.length] = newQueue[i].ticket_UUID;
        }
        newQueue[newPlace] = newTicket;
    }

    result.queue = newQueue;
    result.passed = passedQueue;
    return result;
}

function isUUIDUnresolved(queue, ticket_UUID) {

    var ticketPos = -1;

    if (queue != null && queue.length > 0 && ticket_UUID != null) {
        //console.log('qUUID: ' + )
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].uuid == ticket_UUID) {
                ticketPos = i;
                break;
            }
        }
    }

    return ticketPos;

}

function findTicketByUUID(queue, ticket_UUID) {

    var ticketPos = -1;

    if (queue != null && queue.length > 0 && ticket_UUID != null) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].ticket_UUID == ticket_UUID) {
                ticketPos = i;
                break;
            }
        }
    }

    return ticketPos;

}

function sendToServer(ticket, ticketType, cb) {

    console.log("private method sendToServer entered");
    ticket['ticket_type'] = ticketType;
    console.log("private method sendToServer sending: " + JSON.stringify(ticket));
    var host_url = compositor_url + "newTicket";
    console.log("private method sendToServer host url: " + host_url);


    request({
        url: host_url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: ticket
    }, function (error, response, body) {
        if (response != null) {
            if (!error && response.statusCode === 200) {
                console.log("private method sendToServer: compositor code = " + body.code)
                cb(body.code);
            }
            else {

                console.log("error: " + error);
                console.log("response.statusCode: " + response.statusCode);
                console.log("response.statusText: " + response.statusText);
                cb("no_ack");
            }
        }
        else {

            console.log("no res");
            cb("no_ack");
        }

    })
}

function findTicketInQueue(queue, ticket_number) {

    console.log('findTicketInQueue - checking if queue is empty');
    if (queue.length == 0) {
        return -1;
    }


    console.log('findTicketInQueue - checking if ticket number is at the top of the queue');
    if (ticket_number == queue[0]['ticket_number']) {
        console.log('findTicketInQueue - ticket is at the top of the queue - everything goes as planned');
        return 0;
        //res.status(200).json("gold");
    }
    else {
        console.log('findTicketInQueue - ticket is not at the top of the queue - check if bogus');
        if (ticket_number < queue[0]['ticket_number']) {
            console.log('findTicketInQueue - ticket is not in the queue');
        }
        else {
            for (var i = 1; i < queue.length; i++) {
                if (ticket_number == queue[i]['ticket_number']) {
                    console.log('findTicketInQueue - ticket found in pos %d', i);
                    return i;
                }
            }
        }
        return -1;
        //res.status(200).json("shit");
    }
}

function removeTicketFromQueue(queue, ticket_pos) {

    var newQueue = queue;
    newQueue.splice(0, ticket_pos + 1);

    return newQueue;
}


function cancelTicketInQueue(queue, ticket_pos) {

    var newQueue = queue;
    newQueue.splice(ticket_pos, 1);

    return newQueue;
}

function updateAverageTime(request_timestamp, tickets_passed, average_element) {
    //TO DO

    var current_timestamp = new Date().getTime();
    var new_value = current_timestamp - request_timestamp;

    average_element['current_average_time'] = ((average_element['current_average_time'] * average_element['number_of_tickets']) + (new_value * tickets_passed)) / (average_element['number_of_tickets'] + tickets_passed);
    average_element['number_of_tickets'] = average_element['number_of_tickets'] + tickets_passed;

    return average_element;

}

/**
 * @return {boolean}
 */
function UUID_alreadyInQueue(queue, UUID) {
    console.log('UUID_alreadyInQueue - checking if queue is empty');
    if (queue.length == 0) {
        return false;
    }

    for (var i = 0; i < queue.length; i++) {
        if (UUID == queue[i]['ticket_UUID']) {
            console.log('UUID_alreadyInQueue - ticket found in pos %d', i);
            return true;
        }
    }

    return false;
    //res.status(200).json("shit");
}

/**** GET METHODS ****/

/**** for everyone ****/
app.get('/', function (req, res) {
    //console.log( data );
    res.status(200).json("good evening...");

});


/**** for employees ****/

app.get('/employee/nextTicket', function (req, res) {
    console.log('employee nextTicket - entered');
    var ticket_type = req.query.ticket_type;
    var filesPath = [ticket_queue_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        //var queues = data;

        if (ticket_type != null) {

            var next_ticket = ticket_brief_template;
            console.log('employee nextTicket - searching ticket type (%s) queue', ticket_type);

            var queue_pos = -1;

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_type) {
                    console.log('employee nextTicket - found ticket type queue');
                    queue_pos = i;
                    break;
                }
            }

            if (queue_pos != -1 && queues[queue_pos]['queue'].length > 0) {
                next_ticket['ticket_number'] = queues[queue_pos]['queue'][0]['ticket_number'];
                res.status(200).json(next_ticket);
            }
            else {
                console.log('employee nextTicket - bad request (no more tickets or wrong type)');
                var error_resp = error_template;
                error_resp['code'] = 410;
                error_resp['message'] = "Gone - no more tickets or type non-existent";
                error_resp['fields'] = "none";
                console.log(error_resp);
                res.status(400).json(error_resp);
            }

        }
        else {
            console.log('employee nextTicket - bad request (no ticket type parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request";
            error_resp['fields'] = "ticket_type";
            console.log(error_resp);
            res.status(400).json(error_resp);

        }
    });

});

app.get('/employee/everyNextTicket', function (req, res) {
    console.log('employee everyNextTicket - entered');
    var filesPath = [ticket_queue_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        //var queues = data;

        var dump_queues = JSON.parse("[]");
        var next_ticket = ticket_brief_template;

        for (var i = 0; i < queues.length; i++) {
            next_ticket = ticket_brief_template;

            if (queues[i]['queue'].length > 0) {
                dump_queues[i] = JSON.parse("{}");
                dump_queues[i]['ticket_number'] = queues[i]['queue'][0]['ticket_number'];
                dump_queues[i]['type'] = queues[i]['type'];

            }
        }

        if (dump_queues.length != 0) {
            res.status(200).json(dump_queues);
        }
        else {
            console.log('employee everyNextTicket - no next tickets');
            var error_resp = error_template;
            error_resp['code'] = 410;
            error_resp['message'] = "Gone - no next ticket in any queue";
            error_resp['fields'] = "none";
            console.log(error_resp);
            res.status(400).json(error_resp);
        }

    });

});


app.get('/everyQueue', function (req, res) {
    console.log('everyQueue - entered');
    //var ticket_type = req.query.ticket_type;
    var filesPath = [ticket_queue_path, average_time_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        var avg_times = JSON.parse(results[1]);
        //var queues = data;

        var dump_queues = JSON.parse("[]");

        for (var i = 0; i < queues.length; i++) {
            console.log('everyQueue - queue ' + i + 'type ' + queues[i]["type"]);
            dump_queues[i] = JSON.parse("{}");
            dump_queues[i]['queue'] = queues[i]['queue'];
            dump_queues[i]['type'] = queues[i]['type'];
            dump_queues[i]['queue_average_time'] = avg_times[i]['current_average_time'];


        }
        res.status(200).json(dump_queues);

    });

});

app.get('/didUUIDPass', function (req, res) {
    console.log('didUUIDPass - entered');
    var uuid = req.query.uuid;
    var filesPath = [unresolved_uuids_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var unresolved_uuids = JSON.parse(results[0]);
        //var queues = data;

        if (uuid != null) {

            console.log('didUUIDPass - searching (%s) in unresolved queue', uuid);

            var unUUID = isUUIDUnresolved(unresolved_uuids, uuid);

            if(unUUID!=-1)
            {
                res.status(200).json({exists: true, code:unresolved_uuids[unUUID].code});
            }
            else
            {
                res.status(200).json({exists: false});
            }
        }
        else {
            console.log('didUUIDPass - bad uuid');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - null uuid";
            error_resp['fields'] = "uuid";
            console.log(error_resp);
            res.status(400).json(error_resp);
        }
    });

});

app.get('/employee/fullQueue', function (req, res) {
    console.log('employee fullQueue - entered');
    var ticket_type = req.query.ticket_type;
    var filesPath = [ticket_queue_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        //var queues = data;

        if (ticket_type != null) {

            console.log('employee fullQueue - searching ticket type (%s) queue', ticket_type);

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_type) {
                    console.log('employee fullQueue - found ticket type queue');
                    var ticket_queue = queues[i]['queue'];
                    break;
                }
            }
            res.status(200).json(ticket_queue);

        }
        else {
            console.log('employee fullQueue - bad request (no ticket type parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request";
            error_resp['fields'] = "ticket_type";
            console.log(error_resp);
            res.status(400).json(error_resp);

        }
    });

});


app.get('/lastTickets', function (req, res) {
    console.log('lastTickets - entered');
    //var ticket_type = req.query.ticket_type;
    var filesPath = [ticket_queue_path];


    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        //var queues = data;


        var ticketQueue = last_tickets_queue_template;
        console.log('lastTickets - searching queues');

        for (var i = 0; i < queues.length; i++) {
            console.log('lastTickets - queue ' + queues[i]['type'] + ' i: ' + i + ' number: ' + queues[i]['queue'][0]['ticket_number']);
            ticketQueue[i] = JSON.parse('{"ticket_type": "a","ticket_number": 0}');//last_tickets_queue_ticket_template;
            ticketQueue[i]['ticket_number'] = queues[i]['queue'][0]['ticket_number'] - 1;
            ticketQueue[i]['ticket_type'] = queues[i]['type'];
            console.log('last ticket template: ' + JSON.stringify(last_tickets_queue_ticket_template));
            console.log(JSON.stringify(ticketQueue));


        }
        res.status(200).json(ticketQueue);


    });

});

/**** for clients ****/

app.get('/client/remainingTime', function (req, res) {
    console.log('client remainingTime - entered');
    var ticket_number = req.query.ticket_number;
    var ticket_type = req.query.ticket_type;
    var filesPath = [ticket_queue_path, average_time_path];

    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        var average_times = JSON.parse(results[1]);

        if (ticket_type != null && ticket_number != null) {

            console.log('client remainingTime - searching ticket type (%s) queue', ticket_type);

            queue_pos = -1;

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_type) {
                    console.log('client remainingTime - found ticket type queue');
                    var queue_pos = i;
                    break;
                }
            }

            if (queue_pos != -1 && average_times[queue_pos]['current_average_time'] > 0) {

                console.log('client remainingTime - counting tickets before');

                var ticket_pos = findTicketInQueue(queues[queue_pos]['queue'], ticket_number);

                if (ticket_pos != -1) {
                    var average_time_for_queue = average_times[queue_pos]['current_average_time'];
                    var time_remaining = average_time_for_queue * (ticket_pos + 1);
                    console.log('number of tickets in between: %d', ticket_pos + 1);

                    var date = new Date(time_remaining);
                    //console.log('date: ' + date);
                    //console.log('tr: ' + time_remaining);


                    var result = remaining_time_res_template;

                    result['remaining_time'] = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    //result['remaining_time'] = time_remaining.getHours();
                    //console.log(JSON.stringify(result));
                    res.status(200).json(result);
                }
                else {
                    console.log('client remainingTime - bogus ticket number');
                    var error_resp = error_template;
                    error_resp['code'] = 400;
                    error_resp['message'] = "bad request - wrong ticket number or type";
                    error_resp['fields'] = "ticket_type or ticket_number";
                    //console.log(error_resp);
                    res.status(400).json(error_resp);
                }

            }
            else {
                console.log('client remainingTime - bad request (queue not found or service not ready)');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - queue not found or service not ready";
                error_resp['fields'] = "ticket_type";
                //console.log(error_resp);
                res.status(400).json(error_resp);
            }

        }
        else {
            console.log('client remainingTime - bad request (no ticket type parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - missing ticket type";
            error_resp['fields'] = "ticket_type";
            //console.log(error_resp);
            res.status(400).json(error_resp);

        }

    });
});

/*
 app.get('/client/remainingTime_withUUID', function (req, res) {
 console.log('client remainingTime_withUUID - entered');
 var ticket_number = req.query.ticket_number;
 var ticket_type = req.query.ticket_type;
 var filesPath = [ticket_queue_path, average_time_path];

 async.map(filesPath, function (filePath, cb) { //reading files or dir
 fs.readFile(filePath, 'utf8', cb);
 }, function (err, results) {
 //console.log(data[0]['type'])
 var queues = JSON.parse(results[0]);
 var average_times = JSON.parse(results[1]);

 if (ticket_type != null && ticket_number != null) {

 console.log('client remainingTime_withUUID - searching ticket type (%s) queue', ticket_type);

 queue_pos = -1;

 for (var i = 0; i < queues.length; i++) {
 if (queues[i]['type'] == ticket_type) {
 console.log('client remainingTime_withUUID - found ticket type queue');
 var queue_pos = i;
 break;
 }
 }

 if (queue_pos != -1 && average_times[queue_pos]['current_average_time'] > 0) {

 console.log('client remainingTime_withUUID - counting tickets before');

 var ticket_pos = findTicketInQueue(queues[queue_pos]['queue'], ticket_number);

 if (ticket_pos != -1) {
 var average_time_for_queue = average_times[queue_pos]['current_average_time'];
 var time_remaining = average_time_for_queue * (ticket_pos + 1);
 console.log('number of tickets in between: %d', ticket_pos + 1);

 var date = new Date(time_remaining);

 var result = remaining_time_res_template;

 result['remaining_time'] = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
 //result['remaining_time'] = time_remaining.getHours();
 //console.log(JSON.stringify(result));
 res.status(200).json(result);
 }
 else {
 console.log('client remainingTime_withUUID - bogus ticket number');
 var error_resp = error_template;
 error_resp['code'] = 400;
 error_resp['message'] = "bad request - wrong ticket number or type";
 error_resp['fields'] = "ticket_type or ticket_number";
 //console.log(error_resp);
 res.status(400).json(error_resp);
 }

 }
 else {
 console.log('client remainingTime_withUUID - bad request (queue not found or service not ready)');
 var error_resp = error_template;
 error_resp['code'] = 400;
 error_resp['message'] = "bad request - queue not found or service not ready";
 error_resp['fields'] = "ticket_type";
 //console.log(error_resp);
 res.status(400).json(error_resp);
 }

 }
 else {
 console.log('client remainingTime_withUUID - bad request (no ticket type parameter)');
 var error_resp = error_template;
 error_resp['code'] = 400;
 error_resp['message'] = "bad request - missing ticket type";
 error_resp['fields'] = "ticket_type";
 //console.log(error_resp);
 res.status(400).json(error_resp);

 }

 });
 });
 */

/**** POST methods ****/

/**** for employees ****/

app.post('/employee/ticketAttended', function (req, res) {
    console.log('employee ticketAttended - entered');
    var ticket_req = req.body.ticket;
    var filesPath = [ticket_queue_path, average_time_path];

    //console.log(JSON.stringify(ticket_req));

    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        var average_times = JSON.parse(results[1]);

        if (ticket_req != null && ticket_req.ticket_type != null && ticket_req.ticket_number != null && ticket_req.ticket_number > 0) {

            console.log('employee ticketAttended - searching ticket type (%s) queue', ticket_req.ticket_type);

            ticket_pos = -1;
            queue_pos = -1;

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_req.ticket_type) {
                    console.log('employee ticketAttended - found ticket type queue');
                    var ticket_pos = findTicketInQueue(queues[i]['queue'], ticket_req.ticket_number);
                    var queue_pos = i;
                    break;
                }
            }

            if (queue_pos != -1 && ticket_pos != -1) {
                //update average time (TO DO)
                //console.log(JSON.stringify(average_times[queue_pos]));
                average_times[queue_pos] = updateAverageTime(queues[queue_pos]['queue'][ticket_pos]['request_timestamp'], ticket_pos + 1, average_times[queue_pos]);

                //console.log(JSON.stringify(average_times[queue_pos]));

                //console.log(queues[queue_pos]);
                queues[queue_pos]['queue'] = removeTicketFromQueue(queues[queue_pos]['queue'], ticket_pos);
                //console.log(queues[queue_pos]);
                console.log('employee ticketAttended - writing new queue');

                fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                    console.error(err)
                });

                fs.writeFile(average_time_path, JSON.stringify(average_times), function (err) {
                    console.error(err)
                });

                //var result = JSON.parse('{"result":"success"}');
                //res.status(200).json(result);


                var dump_queues = JSON.parse("[]");
                var next_ticket = ticket_brief_template;

                for (var i = 0; i < queues.length; i++) {
                    next_ticket = ticket_brief_template;

                    if (queues[i]['queue'].length > 0) {
                        dump_queues[i] = JSON.parse("{}");
                        dump_queues[i]['ticket_number'] = queues[i]['queue'][0]['ticket_number'];
                        dump_queues[i]['type'] = queues[i]['type'];

                    }
                }

                if (dump_queues.length != 0) {
                    res.status(200).json(dump_queues);
                }
                else {
                    console.log('employee ticketAttended - no next tickets');
                    var error_resp = error_template;
                    error_resp['code'] = 410;
                    error_resp['message'] = "Gone - no next ticket in any queue";
                    error_resp['fields'] = "none";
                    console.log(error_resp);
                    res.status(400).json(error_resp);
                }


            }
            else {
                console.log('employee ticketAttended - bogus ticket number');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - wrong ticket number or type";
                error_resp['fields'] = "ticket_type or ticket_number";
                //console.log(error_resp);
                res.status(400).json(error_resp);
            }


        }
        else {
            console.log('employee ticketAttended - bad request (no ticket type or ticket number parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - missing ticket number or type";
            error_resp['fields'] = "ticket_type or ticket_number";
            //console.log(error_resp);
            res.status(400).json(error_resp);

        }

    });
    //res.status(200).json("employee/ticketAttended...");

});


app.post('/employee/closeForTheDay', function (req, res) {
    console.log('employee closeForTheDay - entered');

    var result = JSON.parse('{"result":"success"}');
    closed_for_requests = true;

    res.status(200).json(result);

});

app.post('/employee/newDay', function (req, res) {
    console.log('employee newDay - entered');

    var result = JSON.parse('{"result":"success"}');

    fs.writeFile(ticket_queue_path, JSON.stringify(everyThing_template), function (err) {
        console.error(err)
    });

    fs.writeFile(average_time_path, JSON.stringify(average_time_template), function (err) {
        console.error(err)
    });


    closed_for_requests = false;


    res.status(200).json(result);

});

app.post('/employee/makeNewType', function (req, res) {
    console.log('employee makeNewType - entered');
    var ticket_req = req.body.ticket_type;
    var filesPath = [ticket_queue_path, average_time_path];

    //console.log(JSON.stringify(ticket_req));

    if (closed_for_requests == false) {
        async.map(filesPath, function (filePath, cb) { //reading files or dir
            fs.readFile(filePath, 'utf8', cb);
        }, function (err, results) {
            //console.log(data[0]['type'])
            var queues = JSON.parse(results[0]);
            var average_times = JSON.parse(results[1]);

            if (ticket_req != null && ticket_req.ticket_type != null) {

                console.log('employee makeNewType - searching ticket type (%s) queue', ticket_req.ticket_type);

                queue_pos = -1;

                for (var i = 0; i < queues.length; i++) {
                    if (queues[i]['type'] == ticket_req.ticket_type) {
                        console.log('employee makeNewType - found ticket type queue');
                        var queue_pos = i;
                        break;
                    }
                }

                if (queue_pos == -1) {

                    console.log('employee makeNewType - writing new queue');

                    var new_queue = queue_template;
                    new_queue['type'] = ticket_req.ticket_type;
                    queues[queues.length] = new_queue;

                    var new_avg_time_element = average_time_element_template;
                    new_avg_time_element['type'] = ticket_req.ticket_type;
                    average_times[average_times.length] = new_avg_time_element;

                    fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                        console.error(err)
                    });

                    fs.writeFile(average_time_path, JSON.stringify(average_times), function (err) {
                        console.error(err)
                    });

                    var result = JSON.parse('{"result":"success"}');
                    res.status(200).json(result);

                }
                else {
                    console.log('employee makeNewType - type already exists');
                    var error_resp = error_template;
                    error_resp['code'] = 400;
                    error_resp['message'] = "bad request - type already exists";
                    error_resp['fields'] = "ticket_type";
                    //console.log(error_resp);
                    res.status(400).json(error_resp);
                }


            }
            else {
                console.log('employee makeNewType - bad request (no ticket type parameter)');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - missing ticket type";
                error_resp['fields'] = "ticket_type";
                //console.log(error_resp);
                res.status(400).json(error_resp);

            }

        });
    }
    else {
        console.log('employee makeNewType - too late t request ticket');
        var error_resp = error_template;
        error_resp['code'] = 400;
        error_resp['message'] = "Gone - service terminated for the day";
        error_resp['fields'] = "none";
        //console.log(error_resp);
        res.status(410).json(error_resp);
    }
    //res.status(200).json("employee/ticketAttended...");

});


/**** for clients *****/

app.post('/client/jumpInQueue', function (req, res) {
    console.log('client jumpInQueue - entered');

    var ticket_type = req.body.ticket_type;
    var ticket_uuid = req.body.ticket_uuid;
    var number_of_jumps = req.body.number_of_jumps;
    var filesPath = [ticket_queue_path];


    if (ticket_type != null && ticket_uuid != null && number_of_jumps != null && number_of_jumps > 0) {

        async.map(filesPath, function (filePath, cb) { //reading files or dir
            fs.readFile(filePath, 'utf8', cb);
        }, function (err, results) {
            //console.log(data[0]['type'])
            var queues = JSON.parse(results[0]);

            console.log('employee jumpInQueue - searching ticket type (%s) queue', ticket_type);

            queue_pos = -1;

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_type) {
                    console.log('client jumpInQueue - found ticket type queue');
                    var queue_pos = i;
                    break;
                }
            }

            if (queue_pos != -1) {

                var jumpRes = jumpInQueue(queues[queue_pos].queue, ticket_uuid, number_of_jumps);
                queues[queue_pos].queue = jumpRes.queue//jumpInQueue(queues[queue_pos].queue, ticket_uuid, number_of_jumps);

                fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                    console.error(err)
                });

                var result = JSON.parse('{"result":"success"}');
                result.passedQueue = jumpRes.passed;
                res.status(200).json(result);
            }
            else {
                console.log('client jumpInQueue - bogus ticket type');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - wrong ticket type";
                error_resp['fields'] = "ticket_type";
                //console.log(error_resp);
                res.status(400).json(error_resp);
            }


        });

    }
    else {
        console.log('client jumpInQueue - bad request');
        var error_resp = error_template;
        error_resp['code'] = 400;
        error_resp['message'] = "bad request - fields missing or number of jumps <= 0";
        error_resp['fields'] = "some";
        //console.log(error_resp);
        res.status(400).json(error_resp);
    }

});


app.post('/client/requestTicket', function (req, res) {
    console.log('client requestTicket - entered');

    if (closed_for_requests == false) {
        var ticket_req = req.body.ticket_request;
        var filesPath = [ticket_queue_path, unresolved_uuids_path];

        async.map(filesPath, function (filePath, cb) { //reading files or dir
            fs.readFile(filePath, 'utf8', cb);
        }, function (err, results) {
            //console.log(data[0]['type'])
            var queues = JSON.parse(results[0]);
            var unresolved_uuids = JSON.parse(results[1]);

            if (ticket_req != null && ticket_req.ticket_type != null && ticket_req.endpoint_id != null) {

                console.log('client requestTicket - searching ticket type (%s) queue', ticket_req.ticket_type);

                var queue_pos = -1;

                for (var i = 0; i < queues.length; i++) {
                    if (queues[i]['type'] == ticket_req.ticket_type) {
                        console.log('client requestTicket - found ticket type queue');
                        queue_pos = i;
                        break;
                    }
                }
                if (queue_pos != -1) {

                    if (UUID_alreadyInQueue(queues[queue_pos]['queue'], ticket_req.endpoint_id) == false) {
                        //console.log(queues[queue_pos]);
                        var new_ticket = ticket_template;

                        console.log(JSON.stringify(new_ticket));

                        new_ticket['ticket_number'] = queues[queue_pos]['last_ticket'] + 1;
                        new_ticket['ticket_UUID'] = ticket_req.endpoint_id;
                        new_ticket['request_timestamp'] = new Date().getTime();

                        console.log(JSON.stringify(new_ticket));

                        queues[queue_pos]['queue'][queues[queue_pos]['queue'].length] = new_ticket;
                        queues[queue_pos]['last_ticket'] = new_ticket['ticket_number'];

                        //console.log(queues[queue_pos]);
                        fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                            console.error(err)
                        });


                        var codeToSend = 'no_ack';
                        codeToSend = sendToServer(new_ticket, ticket_req.ticket_type, function (code) {
                            console.log('code to send: ' + code);
                            codeToSend = code;

                            if (codeToSend != 'ack') {
                                var unUUID_pos = isUUIDUnresolved(unresolved_uuids, ticket_req.endpoint_id);

                                console.log('client requestTicket - unUUID_pos: ' + unUUID_pos);
                                if (unUUID_pos == -1) {
                                    unresolved_uuids[unresolved_uuids.length] = {
                                        uuid: ticket_req.endpoint_id,
                                        code: codeToSend
                                    };

                                    fs.writeFile(unresolved_uuids_path, JSON.stringify(unresolved_uuids), function (err) {
                                        console.error(err)
                                    });

                                }
                            }

                            //var result = JSON.parse('{"result":"success","ticket_number":' + new_ticket['ticket_number'] + ',"code":"ack"}');
                            var result = {result: "success", ticket_number: new_ticket.ticket_number, code: codeToSend};
                            //var result = JSON.parse('{"result":"success","ticket_number":' + new_ticket['ticket_number'] + ',"code":' + codeToSend.toString() + '}');
                            res.status(200).json(result);

                        });


                    }
                    else {
                        console.log('client requestTicket - bad request (UUID already in queue)');
                        var error_resp = error_template;
                        error_resp['code'] = 400;
                        error_resp['message'] = "bad request - UUID already in queue";
                        error_resp['fields'] = "ticket_type";
                        //console.log(error_resp);
                        res.status(400).json(error_resp);
                    }


                }
                else {
                    console.log('client requestTicket - bad request (ticket type non-existent)');
                    var error_resp = error_template;
                    error_resp['code'] = 400;
                    error_resp['message'] = "bad request - ticket type non-existent";
                    error_resp['fields'] = "ticket_type";
                    //console.log(error_resp);
                    res.status(400).json(error_resp);
                }

            }
            else {
                console.log('client requestTicket - bad request (no ticket type parameter)');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - missing ticket type";
                error_resp['fields'] = "ticket_type";
                //console.log(error_resp);
                res.status(400).json(error_resp);

            }

        });
    }
    else {
        console.log('client requestTicket - too late t request ticket');
        var error_resp = error_template;
        error_resp['code'] = 400;
        error_resp['message'] = "Gone - service terminated for the day";
        error_resp['fields'] = "none";
        //console.log(error_resp);
        res.status(410).json(error_resp);
    }

});

app.post('/resolveUUID', function (req, res) {
    console.log('resolveUUID - entered');
    var uuid = req.body.uuid;
    var filesPath = [unresolved_uuids_path];

    //console.log(JSON.stringify(ticket_req));

    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var unresolved_uuids = JSON.parse(results[0]);

        if (uuid != null) {

            console.log('resolveUUID - searching ticket type (%s) queue', uuid);

            var unUUID_pos= isUUIDUnresolved(unresolved_uuids, uuid);

            if (unUUID_pos != -1) {

                //console.log(queues[queue_pos]);
                unresolved_uuids = cancelTicketInQueue(unresolved_uuids, unUUID_pos);
                //console.log(queues[queue_pos]);
                console.log('client cancelTicket - writing new queue');

                fs.writeFile(unresolved_uuids_path, JSON.stringify(unresolved_uuids), function (err) {
                    console.error(err)
                });


                res.status(200).json({result: 'success'});

                //res.status(200).json(result);

            }
            else {
                console.log('resolveUUID - bogus uuid');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - wrong uuid";
                error_resp['fields'] = "uuid";
                //console.log(error_resp);
                res.status(400).json(error_resp);
            }


        }
        else {
            console.log('resolveUUID- bad request (no uuid parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - missing uuid";
            error_resp['fields'] = "uuid";
            //console.log(error_resp);
            res.status(400).json(error_resp);

        }

    });
    //res.status(200).json("client/cancelTicket...");

});


app.post('/client/cancelTicket', function (req, res) {
    console.log('client cancelTicket - entered');
    var ticket_req = req.body.ticket;
    var filesPath = [ticket_queue_path, average_time_path];

    //console.log(JSON.stringify(ticket_req));

    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);
        var average_times = JSON.parse(results[1]);

        if (ticket_req != null && ticket_req.ticket_type != null && ticket_req.ticket_number != null && ticket_req.ticket_number > 0) {

            console.log('client cancelTicket - searching ticket type (%s) queue', ticket_req.ticket_type);

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_req.ticket_type) {
                    console.log('client cancelTicket - found ticket type queue');
                    var ticket_pos = findTicketInQueue(queues[i]['queue'], ticket_req.ticket_number);
                    var queue_pos = i;
                    break;
                }
            }

            if (ticket_pos != -1) {

                //console.log(queues[queue_pos]);
                queues[queue_pos]['queue'] = cancelTicketInQueue(queues[queue_pos]['queue'], ticket_pos);
                //console.log(queues[queue_pos]);
                console.log('client cancelTicket - writing new queue');

                fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                    console.error(err)
                });

                fs.writeFile(average_time_path, JSON.stringify(average_times), function (err) {
                    console.error(err)
                });

                var result = '{"result":"success"}';


                //var queues = JSON.parse(results[0]);
                //var queues = data;

                var dump_queues = JSON.parse("[]");

                for (var i = 0; i < queues.length; i++) {
                    console.log('everyQueue - queue ' + i + 'type ' + queues[i]["type"]);
                    dump_queues[i] = JSON.parse("{}");
                    dump_queues[i]['queue'] = queues[i]['queue'];
                    dump_queues[i]['type'] = queues[i]['type'];
                    dump_queues[i]['queue_average_time'] = average_times[i]['current_average_time'];


                }
                res.status(200).json(dump_queues);

                //res.status(200).json(result);

            }
            else {
                console.log('client cancelTicket - bogus ticket number');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - wrong ticket number or type";
                error_resp['fields'] = "ticket_type or ticket_number";
                //console.log(error_resp);
                res.status(400).json(error_resp);
            }


        }
        else {
            console.log('client cancelTicket - bad request (no ticket type or ticket number parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - missing ticket number or type";
            error_resp['fields'] = "ticket_type or ticket_number";
            //console.log(error_resp);
            res.status(400).json(error_resp);

        }

    });
    //res.status(200).json("client/cancelTicket...");

});


/**** Put server running ****/

var server = app.listen(process.env.PORT || 80, function () {

    var host = server.address().address;
    var port = server.address().port;


    console.log("REST app listening at http://%s:%s", host, port);

});

/********************* Break! this section is for routine check on server ******************/

var minutes = 5, the_interval = minutes * 60 * 1000;
setInterval(function () {
    console.log("I am doing my %d minute(s) check", minutes);
    // do your stuff here
}, the_interval);