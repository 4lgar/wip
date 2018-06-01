import React, { Component } from 'react';
import './NoteButton.css';

class NoteButton extends Component {

  noteOn(e){

    e.preventDefault();

    //fetch("http://192.168.1.112:3030/noteOn");

     this.props.socket.send(JSON.stringify({
      action: "noteOn",
      key: this.props.noteToPlay
    }));


  }

  noteOff(e){

    e.preventDefault();

    //fetch("http://192.168.1.112:3030/noteOff");

    this.props.socket.send(JSON.stringify({
      action: "noteOff",
      key: this.props.noteToPlay
    }));

  }

  render() {

    return (


      <div className="noSelect noteButton" onTouchEnd={this.noteOff.bind(this)} onTouchStart={this.noteOn.bind(this)}>{this.props.noteToPlay}</div>

      //<button className="noSelect" onClick={this.noteOn.bind(this)}>{this.props.noteToPlay}</button>

    );

  }
}

export default NoteButton;
