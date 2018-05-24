import React, { Component } from 'react';
import './App.css';
import WebMPC from '../../components/WebMPC/WebMPC.js';

const socket = new WebSocket('ws://192.168.1.144:8080', 'echo-protocol');

var noteOn = function(note){

  console.log("noteOn");

  socket.send(JSON.stringify({
    action: "noteOn",
    key: note
  }));

};

var noteOff = function(note){

  console.log("noteOff");

  socket.send(JSON.stringify({
    action: "noteOff",
    key: note
  }));

};

class App extends Component {

  render() {

    return (

      <div>

        <WebMPC socket={socket} />

      </div>

    );

  }
}

export default App;
