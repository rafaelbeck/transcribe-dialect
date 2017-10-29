import 'bootstrap';
import WaveSurfer from 'wavesurfer.js';
import HumanInput from 'humaninput/dist/humaninput-full.min';
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
      this.createHumanInput();
      this.createTextfield();
      this.next();
    }

    createHumanInput() {
      let HI = new HumanInput(window);
      HI.filter = (e) => { return true }
      HI.on('shift-space', (event) => { this.toggle();event.preventDefault(); });
      HI.on('shift-tab', (event) => { this.setPlaybackRate(0.75);});
      HI.on('shift-left', (event) => { this.wavesurfer.skipBackward(0.5); });
      HI.on('shift-right', (event) => { this.wavesurfer.skipForward(0.5); });
      HI.once('enter', (event) => { this.finish() });
    }

    createTextfield() {
      setInterval(() => {
       $('#user-input').focus();
       $('#user-input')[0].style.cssText = 'height: auto;';
       $('#user-input')[0].style.cssText = 'height:' + ($('#user-input')[0].scrollHeight + 12) + 'px';

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
      this.wavesurfer.on('audioprocess', () => {
        this.updateTime();
      });
      this.wavesurfer.on('seek', () => {
        this.updateTime();
      });
      this.wavesurfer.on('finish', () => {
        if (this.wavesurfer.getDuration() < 10) { return; }
        this.wavesurfer.playPause();
      });
      this.updateTime();
    }

    updateTime() {
      let totalTime = this.wavesurfer.getDuration(),
          currentTime = this.wavesurfer.getCurrentTime(),
          remainingTime = totalTime - currentTime;
      $('#current').html(`${ moment.duration(currentTime, "milliseconds").format("s:SS")} Sekunden`);
      $('#remaining').html(`- ${ moment.duration(remainingTime, "milliseconds").format("s:SS")} Sekunden`);
    }

    toggle() {
      let currentTime = this.wavesurfer.getCurrentTime(),
          newTime = currentTime;
      if (!this.wavesurfer.isPlaying()) {
        if (currentTime >= 1) {
          newTime = currentTime - 1;
        } else {
          newTime = 0;
        }
        this.wavesurfer.play(newTime);
      } else {
        this.wavesurfer.playPause();
      }
    }

    mute(value) {
      this.wavesurfer.setMute(value);
    }

    finish() {
      $('#btn-continue').css('display', 'block');
    }

    next() {
      this.output.push($('#user-input').val());
      console.log(this.output);
      this.reset();
      this.loadAudio();
    }

    reset() {
      $('#user-input').val('');
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
