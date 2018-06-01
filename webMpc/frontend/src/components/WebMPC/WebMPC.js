import React, { Component } from 'react';

import './WebMPC.css';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import NoteButton from '../../components/NoteButton/NoteButton.js';
import MidiHelper from '../../classes/MidiHelper.js';

const nbrOfNote = 9;
const nbrOfOctave = 7;
const baseOctave = 4;

const marksBaseNote = {
  0: "C",
  1: "C#",
  2: "D",
  3: "E♭",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "A♭",
  9: "A",
  10: "B♭",
  11: "B",
}

const marksOctave = {
  0 : "0",
  1 : "1",
  2 : "2",
  3 : "3",
  4 : "4",
  5 : "5",
  6 : "6",
  7 : "7",
}


class WebMPC extends Component {

  constructor(props) {

    super(props);

    this.availableScale = MidiHelper.GetAvailableScale();
    this.availableOctave = [];
    this.availableBaseNote = [];

    for(let i = 0; i < nbrOfOctave; i++)
      this.availableOctave.push(i);

    for(let i = 0; i < 12 ; i++)
      this.availableBaseNote.push(i);

    this.state = {

      isFilterVisible: false,
      scale: this.availableScale[0].name,
      octave: baseOctave,
      baseNote: 0,
      notesToPlay: this.generateNoteToPlay(0, baseOctave, this.availableScale[0].name)

    };

  }

  generateNoteToPlay(baseNote, octave, scale){

    let notesToPlay = [];
    let notesFromScale = MidiHelper.GetScale(scale);
    let currentOctave = octave;
    let octaveCoef = MidiHelper.GetOctaveCoef(currentOctave);

    let tmp;

    for(let i = 0; i < nbrOfNote; i++){

      if(i != 0 && i % notesFromScale.length == 0)
        octaveCoef = MidiHelper.GetOctaveCoef(++currentOctave);

      tmp = baseNote + octaveCoef + notesFromScale[i % notesFromScale.length];

      notesToPlay.push(tmp);

    }

    return notesToPlay;

  }

  onScaleChange(e){

    this.setState({

      scale: e.target.value,
      notesToPlay: this.generateNoteToPlay(this.state.baseNote, this.state.octave, e.target.value)

    });

  }

  onOctaveChange(e){

    this.setState({

      octave: e,
      notesToPlay: this.generateNoteToPlay(this.state.baseNote, e, this.state.scale)

    });

  }

  onBaseNoteChage(e){

    this.setState({

      baseNote: e,
      notesToPlay: this.generateNoteToPlay(e, this.state.octave, this.state.scale)

    });    

  }

  onToggleFilter(){



  }

  render() {

    return (

      <div className="webMPC">

        <div className="webMPC-filter">
          
          <label>Base Note</label>
          <Slider className="webMPC-filter-slider" min={0} max={11} marks={marksBaseNote} dots={true} included={false} onChange={this.onBaseNoteChage.bind(this)} />

          <label>Octave</label>
          <Slider className="webMPC-filter-slider" min={0} max={nbrOfOctave} marks={marksOctave} dots={true} included={false} defaultValue={baseOctave} onChange={this.onOctaveChange.bind(this)}   />       

          <label>Mode</label>
          <select className="form-control" onChange={this.onScaleChange.bind(this)}>
            {this.availableScale.map((elem, key) => {
              return <option key={key} value={elem.name}>{elem.name}</option>
            })}
          </select>

        </div>

        <div className="webMPC-pads">

          {this.state.notesToPlay.map((note, key) => {
            return <NoteButton noteToPlay={note} socket={this.props.socket} />
          })}

        </div>

      </div>

    );

  }
}

export default WebMPC;
