import React, { Component } from 'react';
import './App.css';
import NoteButton from '../../components/NoteButton/NoteButton.js';

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
        <h1>Hey :)</h1>

        <NoteButton noteToPlay="60" socket={socket} />
        <NoteButton noteToPlay="62" socket={socket} />
        <NoteButton noteToPlay="63" socket={socket} />
        <NoteButton noteToPlay="65" socket={socket} />                        
        <NoteButton noteToPlay="67" socket={socket} />  
        <NoteButton noteToPlay="68" socket={socket} />

      </div>

    );

  }
}

export default App;
