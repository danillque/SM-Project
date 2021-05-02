export class Clock {
  timeOutput: HTMLElement;
  UTCplus: number;
  socket: WebSocket;


  constructor(element: HTMLElement) {
    this.timeOutput = element;
    this.UTCplus = 3;
    this.socket = new WebSocket('ws://localhost:8000');
    this._handleSocket = this._handleSocket.bind(this);
    this.socket.addEventListener('message', this._handleSocket);
    this.run();
    setInterval(() => this.run(), 60000);
  }

  _handleSocket(event: MessageEvent) {
    const jsonData = JSON.parse(event.data);

    if(jsonData.clock.state === 1)
        this.timeOutput.classList.remove('invisible');
    else this.timeOutput.classList.add('invisible');

    if (jsonData.clock.position.toString() !== this.timeOutput.dataset.value) {
      this.timeOutput.classList.remove('clock');
      this.timeOutput.textContent = '';
      this.timeOutput.removeAttribute('id'); 

      const posList = document.querySelectorAll<HTMLElement>('li');
      for (const pos of posList) {
        if (pos.dataset.value === jsonData.clock.position.toString()) {
          pos.setAttribute('id', 'tsClock');
          pos.removeAttribute('class');
          pos.classList.add('clock');
          this.timeOutput = pos;
          this.run();
        }
      }
    }
  }


  run() {
    const time: Date = new Date();
    let hours: string = ((time.getUTCHours() + this.UTCplus) % 24).toString();
    let minutes: string = time.getUTCMinutes().toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    let clockStr = hours + ' : ' + minutes;

    this.timeOutput.textContent = clockStr;
  }
}

