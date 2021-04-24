;
export class Greeting {
    constructor(element, position) {
        this.greetOutput = element;
        this.widPosition = position;
        this.run();
        this.changePosition();
        setInterval(() => this.run(), 3600000);
    }
    run() {
        let time = new Date();
        let hours = time.getHours();
        let outstr = " ";
        switch (hours) {
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                outstr = 'Доброе утро!';
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                outstr = 'Добрый день!';
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                outstr = 'Добрый вечер!';
                break;
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                outstr = 'Доброй ночи!';
                break;
        }
        this.greetOutput.textContent = outstr;
    }
    changePosition() {
        const socket = new WebSocket('ws://localhost:8000');
        socket.addEventListener('message', function (event) {
            const temp = JSON.parse(event.data);
            console.log(temp);
        });
        if (this.widPosition != this.greetOutput.dataset.value) {
            this.greetOutput.classList.remove('clock');
            this.greetOutput.textContent = '';
            this.greetOutput.removeAttribute('id');
            const posList = document.querySelectorAll('li');
            for (const pos of posList) {
                if (pos.dataset.value === this.widPosition) {
                    pos.setAttribute('id', 'tsClock');
                    pos.classList.add('clock');
                    this.greetOutput = pos;
                    this.run();
                }
            }
        }
    }
}
//# sourceMappingURL=Greeting.js.map