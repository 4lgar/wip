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




app.get('/noteOn', function (req, res) {

  output.sendMessage(midiHelp.noteOn(60, 127));
  res.send('ok');

})

app.get('/noteOff', function (req, res) {

  output.sendMessage(midiHelp.noteOff(60, 127));
  res.send('ok');

})

app.get('/', function(req, res){

  console.log("sendFile");

  res.sendFile('vanillaMpc.html');

})

app.listen(3030, () => {

  console.log("Listening on port 3030");

});





 
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