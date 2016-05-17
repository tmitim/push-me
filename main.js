#!/usr/bin/env node
/**
 * pushbullet-node-server
 *
 * @author tmitim 
 *
 */

"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var PushBullet = require('pushbullet');

var app = express();
app.set('json spaces', 4);
app.use(bodyParser.json());

var pushbullet_api_key = function(){
	if (process.env.PUSHBULLET_API) {
		return process.env.PUSHBULLET_API;
	} else {
		console.log("API key not set");
		return;
	}
};

var pushbullet_device = function(){
    if (process.env.PUSHBULLET_DEFAULT_DEVICE) {
        return process.env.PUSHBULLET_DEFAULT_DEVICE;
    } else {
        console.log("Device not set");
        return;
    }
};

var pusher = new PushBullet(pushbullet_api_key());

var port = 8080;

app.get('/pushbullet', function(req, res) {
    pusher.me(function(err, response) {
        res.json(response);
    }); 
});

app.get('/pushbullet/devices', function(req, res) {

    var options = {
        active: true
    };
    pusher.devices(options, function(error, response) {
        res.json(response);
    }); 
});

app.get('/pushbullet/test', function(req, res) {
    pusher.note(pushbullet_device(), "test", "hello world", function(error, response) {
        res.json( response );
    }); 
});

app.post('/pushbullet', function(req, res) {

    console.log(req.body);

    var title = req.body.title || "no title";
    var message = req.body.message || "no message";
    var device = req.body.device || pushbullet_device;

    pusher.note(device, title, message, function(error, response) {
        res.json( response );
    });
});

app.get('/', function(req, res) {
    res.send("<html>" +
        "<h2>pushbullet-node-server</h2>" +
        "<p>" +
        "<h3>Supported URIs:</h3>" +
        "<ul><code>GET</code>" +
        "<li><code> /pushbullet</code> " +
        " -- status info</li>" +
        "<li><code> /pushbullet/devices</code> " +
        " -- list of active devices</li>" +
        "<li><code> /pushbullet/test</code> " +
        " -- send test message to self</li>" +
        "<br>" +
        "<code>POST</code>" +
        "<li><code>/pushbullet</code>" +
        " -- Sends message. Consumes json (title, message, device). If no device is provided, calls default</li>" +
        "</ul></p>" +
        "</html>");
});

// if we have args
if( process.argv.length > 2 ) {
    var p = Number(process.argv[2]);
    port = (p) ? p : port;
}

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    host = (host === '::' ) ? "localhost" : host;

    console.log('server listening at http://%s:%s/', host, port);
});
