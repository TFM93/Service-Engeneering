/*** Requirements ****/
var http = require('http');
var express = require('express');
var app = express();
var fs = require("fs");
var async = require("async");


/****Final Variables & Templates****/



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
    res.end("good evening...");

});



/**** POST methods ****/




/**** Put server running ****/

var server = app.listen(5000, function () {

    var host = server.address().address;
    var port = server.address().port;


    console.log("REST app listening at http://%s:%s", host, port);

});

/********************* Break! this section is for routine check on server ******************/

var minutes = 30, the_interval = minutes * 60 * 1000;
setInterval(function () {
    console.log("I am doing my 6 seconds check");
    // do your stuff here
}, the_interval);