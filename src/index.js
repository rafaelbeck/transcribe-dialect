import 'bootstrap';
import WaveSurfer from 'wavesurfer.js';
import moment from 'moment';
import 'moment-duration-format';
import 'bootstrap/dist/css/bootstrap.min.css';
import './public/global.css';
import './public/icons.css';

class App {
    constructor() {
      this.tracks = ['D01.mp4', 'KS02.m4a', 'A03.m4a', 'W05.m4a', 'W01.m4a', 'W00.m4a'],
      this.tracksVisited = [];
      this.current;
      this.output = [],
      this.wavesurfer;
      this.total = this.tracks.length;

      moment.locale('de-ch');

      this.createWaveform();
      this.createTextfield();
      this.next();
    }

    createTextfield() {
      setInterval(() => {
       $('#userInput').focus();
       $('#userInput')[0].style.cssText = 'height: auto;';
       $('#userInput')[0].style.cssText = 'height:' + ($('#userInput')[0].scrollHeight + 12) + 'px';

       if (this.wavesurfer.isPlaying()) {
         $('#buttonPause').removeClass('hidden');
         $('#buttonPlay').addClass('hidden');
       } else {
         $('#buttonPlay').removeClass('hidden');
         $('#buttonPause').addClass('hidden');
       }

       if (this.wavesurfer.getMute()) {
         $('#buttonMute').removeClass('hidden');
         $('#buttonUnmute').addClass('hidden');
       } else {
         $('#buttonUnmute').removeClass('hidden');
         $('#buttonMute').addClass('hidden');
       }
     });
    }

    createWaveform() {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#868e96',
        progressColor: '#007bff',
        barWidth: 0,
        barHeight: 1
      });
      this.wavesurfer.on('ready', () => {
        $('#duration').html(`Dauer: ${ moment.duration(this.wavesurfer.getDuration(), "milliseconds").format("s:SS")} Sekunden`);
      });
      this.wavesurfer.on('finish', () => {
        if (this.wavesurfer.getDuration() < 10) { return; }
        this.wavesurfer.playPause();
      });
    }

    toogle() {
      this.wavesurfer.playPause();
    }

    mute(value) {
      this.wavesurfer.setMute(value);
    }

    next() {
      this.output.push($('#userInput').val());
      console.log(this.output);
      this.reset();
      this.loadAudio();
    }

    reset() {
      $('#userInput').val('');
    }

    loadAudio() {
      if (this.tracks.length === 0) {
        this.tracks = this.tracksVisited;
        this.tracksVisited = [];
      }
      this.current = this.tracks.shift();
      this.tracksVisited.push(this.current);
      this.wavesurfer.load(`./tracks/${this.current}`);
    }

    setPlaybackRate(value) {
      this.wavesurfer.setPlaybackRate(this.wavesurfer.getPlaybackRate()+value);
      if (this.wavesurfer.getPlaybackRate() > 1) {
        $('#buttonFaster').addClass('active');
        $('#buttonSlower').removeClass('active');
      } else if (this.wavesurfer.getPlaybackRate() < 1) {
        $('#buttonSlower').addClass('active');
        $('#buttonFaster').removeClass('active');
      } else {
        $('#buttonSlower').removeClass('active');
        $('#buttonFaster').removeClass('active');
      }
    }
}

window.app = new App();
