/*** Requirements ****/
var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var async = require("async");


/**** Final Variables & Templates ****/
var ticket_queue_path = __dirname + "/data/ticket_queue.json";

var ticket_template = JSON.parse('{"ticket_number":-1,"request_timestamp":0}');
var ticket_brief_template = JSON.parse('{"ticket_number":-1}');
var error_template = JSON.parse('{"code":-1,"message":"A","fields":"xpto"}');
var everyThing_template = JSON.parse('[{"type": "A","queue": [],"last_ticket": 0}]');
var queue_template = JSON.parse('{"type": "xpto","queue": [],"last_ticket": 0}');


var average_time = JSON.parse('[{"type":"A", "number_of_tickets":0, "average_time":0}]');
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

function findTicketInQueue(queue, ticket_number) {

    console.log('findTicketInQueue - checking if ticket number is at the top of the queue');
    if (ticket_number == queue[0]['ticket_number']) {
        console.log('findTicketInQueue - ticket is at the top of the queue - everything goes as planned');
        return 0;
        //res.status(200).end("gold");
    }
    else {
        console.log('findTicketInQueue - ticket is not at the top of the queue - check if bogus');
        if (ticket_number < queue[0]['ticket_number']) {
            console.log('findTicketInQueue - ticket is not in the queue');
            return -1;
        }
        else {
            for (var i = 1; i < queue.length; i++) {
                if (ticket_number == queue[i]['ticket_number']) {
                    console.log('findTicketInQueue - ticket found in pos %d', i);
                    return i;
                }
            }
        }
        //res.status(200).end("shit");
    }
}

function removeTicketFromQueue(queue, ticket_pos) {

    var newQueue = queue;
    newQueue.splice(0, ticket_pos + 1);

    return newQueue;
}


/**** GET METHODS ****/

/**** for everyone ****/
app.get('/', function (req, res) {
    //console.log( data );
    res.status(200).end("good evening...");

});

app.get('/clientByTicket', function (req, res) {
    console.log('clients by ticket - entered');
    res.status(200).end("clientByTicket...");

});

app.get('/ticketByClient', function (req, res) {
    console.log('ticket by client - entered');
    res.status(200).end(ticket_template);

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
                res.status(200).end(JSON.stringify(next_ticket));
            }
            else {
                console.log('employee nextTicket - bad request (no more tickets or wrong type)');
                var error_resp = error_template;
                error_resp['code'] = 410;
                error_resp['message'] = "Gone - no more tickets or type non-existent";
                error_resp['fields'] = "none";
                console.log(error_resp);
                res.status(400).end(JSON.stringify(error_resp));
            }

        }
        else {
            console.log('employee nextTicket - bad request (no ticket type parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request";
            error_resp['fields'] = "ticket_type";
            console.log(error_resp);
            res.status(400).end(JSON.stringify(error_resp));

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
            res.status(200).end(JSON.stringify(ticket_queue));

        }
        else {
            console.log('employee fullQueue - bad request (no ticket type parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request";
            error_resp['fields'] = "ticket_type";
            console.log(error_resp);
            res.status(400).end(JSON.stringify(error_resp));

        }
    });

});


/**** for clients ****/

app.get('/client/remainingTime', function (req, res) {
    console.log('client remainingTime - entered');
    res.status(200).end("client/remainingTime...");
});


/**** POST methods ****/

/**** for employees ****/

app.post('/employee/ticketAttended', function (req, res) {
    console.log('employee ticketAttended - entered');
    var ticket_req = req.body.ticket;
    var filesPath = [ticket_queue_path];

    //console.log(JSON.stringify(ticket_req));

    async.map(filesPath, function (filePath, cb) { //reading files or dir
        fs.readFile(filePath, 'utf8', cb);
    }, function (err, results) {
        //console.log(data[0]['type'])
        var queues = JSON.parse(results[0]);

        if (ticket_req.ticket_type != null && ticket_req.ticket_number != null && ticket_req.ticket_number > 0) {

            console.log('employee ticketAttended - searching ticket type (%s) queue', ticket_req.ticket_type);

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_req.ticket_type) {
                    console.log('employee ticketAttended - found ticket type queue');
                    var ticket_pos = findTicketInQueue(queues[i]['queue'], ticket_req.ticket_number);
                    var queue_pos = i;
                    break;
                }
            }

            if (ticket_pos != -1) {
                //update average time (TO DO)
                //updateAverageTime(queues[queue_pos]['type'], ticket_pos+1, new Date());


                //console.log(queues[queue_pos]);
                queues[queue_pos]['queue'] = removeTicketFromQueue(queues[queue_pos]['queue'], ticket_pos);
                //console.log(queues[queue_pos]);
                console.log('employee ticketAttended - writing new queue');

                fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                    console.error(err)
                });

                var result = '{"result":"success"}';
                res.status(200).end(result);

            }
            else {
                console.log('employee ticketAttended - bogus ticket number');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - wrong ticket number or type";
                error_resp['fields'] = "ticket_type or ticket_number";
                console.log(error_resp);
                res.status(400).end(JSON.stringify(error_resp));
            }


        }
        else {
            console.log('employee ticketAttended - bad request (no ticket type or ticket number parameter)');
            var error_resp = error_template;
            error_resp['code'] = 400;
            error_resp['message'] = "bad request - missing ticket number or type";
            error_resp['fields'] = "ticket_type or ticket_number";
            console.log(error_resp);
            res.status(400).end(JSON.stringify(error_resp));

        }

    });
    //res.status(200).end("employee/ticketAttended...");

});

app.post('/employee/closeForTheDay', function (req, res) {
    console.log('employee closeForTheDay - entered');

    var result = '{"result":"success"}';
    closed_for_requests = true;

    res.status(200).end(result);

});

app.post('/employee/newDay', function (req, res) {
    console.log('employee newDay - entered');

    var result = '{"result":"success"}';

    fs.writeFile(ticket_queue_path, JSON.stringify(everyThing_template), function (err) {
        console.error(err)
    });

    closed_for_requests = false;


    res.status(200).end(result);

});

app.post('/employee/makeNewType', function (req, res) {
    console.log('employee makeNewType - entered');
    var ticket_req = req.body.ticket_type;
    var filesPath = [ticket_queue_path];

    //console.log(JSON.stringify(ticket_req));

    if (closed_for_requests == false) {
        async.map(filesPath, function (filePath, cb) { //reading files or dir
            fs.readFile(filePath, 'utf8', cb);
        }, function (err, results) {
            //console.log(data[0]['type'])
            var queues = JSON.parse(results[0]);

            if (ticket_req.ticket_type != null) {

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

                    fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                        console.error(err)
                    });

                    var result = '{"result":"success"}';
                    res.status(200).end(result);

                }
                else {
                    console.log('employee makeNewType - type already exists');
                    var error_resp = error_template;
                    error_resp['code'] = 400;
                    error_resp['message'] = "bad request - type already exists";
                    error_resp['fields'] = "ticket_type";
                    console.log(error_resp);
                    res.status(400).end(JSON.stringify(error_resp));
                }


            }
            else {
                console.log('employee makeNewType - bad request (no ticket type parameter)');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - missing ticket type";
                error_resp['fields'] = "ticket_type";
                console.log(error_resp);
                res.status(400).end(JSON.stringify(error_resp));

            }

        });
    }
    else {
        console.log('employee makeNewType - too late t request ticket');
        var error_resp = error_template;
        error_resp['code'] = 400;
        error_resp['message'] = "Gone - service terminated for the day";
        error_resp['fields'] = "none";
        console.log(error_resp);
        res.status(410).end(JSON.stringify(error_resp));
    }
    //res.status(200).end("employee/ticketAttended...");

});


/**** for clients *****/

app.post('/client/requestTicket', function (req, res) {
    console.log('client requestTicket - entered');

    if (closed_for_requests == false) {
        var ticket_req = req.body.ticket_request;
        var filesPath = [ticket_queue_path];

        //console.log(JSON.stringify(ticket_req));

        async.map(filesPath, function (filePath, cb) { //reading files or dir
            fs.readFile(filePath, 'utf8', cb);
        }, function (err, results) {
            //console.log(data[0]['type'])
            var queues = JSON.parse(results[0]);

            if (ticket_req.ticket_type != null) {

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
                    console.log(queues[queue_pos]);
                    var new_ticket = ticket_template;
                    new_ticket['ticket_number'] = queues[queue_pos]['last_ticket'] + 1;
                    new_ticket['request_timestamp'] = new Date().getTime();
                    queues[queue_pos]['queue'][queues[queue_pos]['queue'].length] = new_ticket;
                    queues[queue_pos]['last_ticket'] = new_ticket['ticket_number'];

                    console.log(queues[queue_pos]);
                    fs.writeFile(ticket_queue_path, JSON.stringify(queues), function (err) {
                        console.error(err)
                    });

                    var result = '{"result":"success"}';
                    res.status(200).end(result);
                }
                else {
                    console.log('client requestTicket - bad request (ticket type non-existent)');
                    var error_resp = error_template;
                    error_resp['code'] = 400;
                    error_resp['message'] = "bad request - ticket type non-existent";
                    error_resp['fields'] = "ticket_type";
                    console.log(error_resp);
                    res.status(400).end(JSON.stringify(error_resp));
                }

            }
            else {
                console.log('client requestTicket - bad request (no ticket type parameter)');
                var error_resp = error_template;
                error_resp['code'] = 400;
                error_resp['message'] = "bad request - missing ticket type";
                error_resp['fields'] = "ticket_type";
                console.log(error_resp);
                res.status(400).end(JSON.stringify(error_resp));

            }

        });
    }
    else {
        console.log('client requestTicket - too late t request ticket');
        var error_resp = error_template;
        error_resp['code'] = 400;
        error_resp['message'] = "Gone - service terminated for the day";
        error_resp['fields'] = "none";
        console.log(error_resp);
        res.status(410).end(JSON.stringify(error_resp));
    }

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