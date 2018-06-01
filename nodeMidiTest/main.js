var midi = require('midi');
var midiHelp = require('midi-help');

var WebSocketServer = require('websocket').server;
var http = require('http');
 
var express = require('express');

const app = new express();


// Set up a new output. 
var output = new midi.output();

// Open the first available output port. 
output.openPort(0);

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful
  // information interpreting the messages.
  console.log('m:' + message + ' d:' + deltaTime);
});

// Open the first available input port.
input.openPort(0);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);




 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
 


wsServer.on('request', function(request) {

    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {

  		var msg = JSON.parse(message.utf8Data);

      console.log(msg.key);

  		switch(msg.action){
  			case "noteOn":
      		output.sendMessage(midiHelp.noteOn(msg.key, 90));
  			break;
  			case "noteOff":
  			  output.sendMessage(midiHelp.noteOff(msg.key, 90));
  			break;
  		}



    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});