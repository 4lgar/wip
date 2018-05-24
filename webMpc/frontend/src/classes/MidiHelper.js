const scales = [
  {
    name: 'chromatic',
    baseNotes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'minor',
    baseNotes: [0, 2, 3, 5, 7, 8, 10]
  },
  {
    name: 'major',
    baseNotes: [0, 2, 4, 5, 7, 9, 11]
  }
];

class MidiHelper {

  static GetScale(name, limit){

    let found = scales.find((scale) => {
      return name == scale.name
    })

    if(typeof(found) == 'undefined')
      return null;

    if(typeof(limit) != 'undefined')
      return found.baseNotes.slice(0, limit);

    return found.baseNotes;

  }

  static GetAvailableScale(){

    return scales;

  }

  static GetOctaveCoef(octave){

    return octave * 12;

  }

}

export default MidiHelper;