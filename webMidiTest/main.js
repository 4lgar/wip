var output;

function init(){

  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
    } else {
      console.log("WebMidi enabled!");
    }
    
  });
  
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

}

function useOutput(id){

  output = WebMidi.outputs[id];

}

function sendMidiNote(){

  output.playNote("C3");
  console.log("ding!");
  
}

init();