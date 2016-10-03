/*** Requirements ****/
var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var async = require("async");


/**** Final Variables & Templates ****/
var ticket_queue_path = __dirname + "/data/ticket_queue.json"

var ticket_template = '{"ticket_number":-1,"ticket_type":"A"}';
var ticket_brief_template = '{"ticket_number":-1}';
var error_template = '{"code":-1,"message":"A","fields":"xpto"}';

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

            var next_ticket = JSON.parse(ticket_brief_template);
            console.log('employee nextTicket - searching ticket type (%s) queue', ticket_type);

            for (var i = 0; i < queues.length; i++) {
                if (queues[i]['type'] == ticket_type) {
                    console.log('employee nextTicket - found ticket type queue');
                    next_ticket['ticket_number'] = queues[i]['queue'][0]['ticket_number'];
                    break;
                }
            }
            res.status(200).end(JSON.stringify(next_ticket));

        }
        else {
            console.log('employee nextTicket - bad request (no ticket type parameter)');
            var error_resp = JSON.parse(error_template);
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
                    var ticket_queue= queues[i]['queue'];
                    break;
                }
            }
            res.status(200).end(JSON.stringify(ticket_queue));

        }
        else {
            console.log('employee fullQueue - bad request (no ticket type parameter)');
            var error_resp = JSON.parse(error_template);
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
    res.status(200).end("employee/ticketAttended...");

});

app.post('/employee/closeForTheDay', function (req, res) {
    console.log('employee closeForTheDay - entered');
    res.status(200).end("employee/closeForTheDay...");

});

app.post('/employee/newDay', function (req, res) {
    console.log('employee newDay - entered');
    res.status(200).end("employee/newDay...");

});


/**** for clients *****/

app.post('/client/requestTicket', function (req, res) {
    console.log('client requestTicket - entered');
    res.status(200).end("client/requestTicket...");

});


/**** Put server running ****/

var server = app.listen(80, function () {

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