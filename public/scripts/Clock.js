export class Clock {
    constructor(element, position, UTC) {
        this.timeOutput = element;
        this.widPosition = position;
        this.UTCplus = UTC;
        this.run();
        setInterval(() => this.changePosition(), 1000);
        setInterval(() => this.run(), 60000);
    }
    run() {
        let time = new Date();
        let hours = ((time.getUTCHours() + this.UTCplus) % 24).toString();
        let minutes = time.getUTCMinutes().toString();
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        let clockStr = hours + ' : ' + minutes;
        this.timeOutput.textContent = clockStr;
    }
    changePosition() {
        if (this.widPosition != this.timeOutput.dataset.value) {
            this.timeOutput.classList.remove('clock');
            this.timeOutput.textContent = '';
            this.timeOutput.removeAttribute('id');
            const posList = document.querySelectorAll('li');
            for (const pos of posList) {
                if (pos.dataset.value == this.widPosition) {
                    pos.setAttribute('id', 'tsClock');
                    pos.classList.add('clock');
                    this.timeOutput = pos;
                    this.run();
                }
            }
        }
    }
}
//# sourceMappingURL=Clock.js.map