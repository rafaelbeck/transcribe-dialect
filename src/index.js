import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

class App {
    constructor() {
      this.tracks = ['D01.mp4', 'KS02.m4a', 'A03.m4a', 'W05.m4a', 'W01.m4a', 'W00.m4a'],
      this.current;
      this.output = [];

      this.next();
    }

    next() {
      this.current = this.tracks.shift();
      $('#audio_player')[0].src = `./tracks/${this.current}`;

      this.output.push($('#userInput').val());
      $('#userInput').val('');

      console.log(this.output);
    }

    setPlaybackRate(value) {
      $('#audio_player')[0].playbackRate = value;
    }
}

window.app = new App();
