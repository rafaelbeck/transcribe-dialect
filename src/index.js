import 'bootstrap';
import WaveSurfer from 'wavesurfer.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

class App {
    constructor() {
      this.tracks = ['D01.mp4', 'KS02.m4a', 'A03.m4a', 'W05.m4a', 'W01.m4a', 'W00.m4a'],
      this.current;
      this.output = [],
      this.wavesurfer;

      this.createWaveform();
      this.next();
    }

    createWaveform() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        progressColor: '#007bff'
      });
    }

    toogle() {
      this.wavesurfer.playPause()
    }

    next() {

      this.current = this.tracks.shift();
      this.wavesurfer.load(`./tracks/${this.current}`);

      this.output.push($('#userInput').val());
      $('#userInput').val('');

      console.log(this.output);
    }

    getAudioElement() {
      return $('#audio_player')[0];
    }

    setPlaybackRate(value) {
      $('#audio_player')[0].playbackRate = value;
    }
}

window.app = new App();
