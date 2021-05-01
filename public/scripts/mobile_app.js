export class Controls {
    constructor(widgetButtons, back, toggles) {
        this.socket = new WebSocket('ws://localhost:8000');
        this._handleSocket = this._handleSocket.bind(this);
        this.socket.addEventListener('message', this._handleSocket);
        this.wsSend("request");
        this._handleButtonClick = this._handleButtonClick.bind(this);
        for (const button of widgetButtons) {
            button.addEventListener('click', this._handleButtonClick);
        }
        this._handleToggleSwitch = this._handleToggleSwitch.bind(this);
        for (const toggle of toggles) {
            toggle.addEventListener('change', this._handleToggleSwitch);
        }
        this._handleBackButton = this._handleBackButton.bind(this);
        back.addEventListener('click', this._handleBackButton);
        this.tempWid = "";
    }
    doAction(action) {
        this._switchPage(1);
        const heading = document.querySelector('h1.heading');
        if (!(heading instanceof HTMLElement)) {
            return;
        }
        switch (action) {
            case "clock":
                heading.textContent = 'Время';
                break;
            case "weather":
                heading.textContent = 'Погода';
                break;
            case "reminder":
                heading.textContent = 'Напоминания';
                break;
            case "greeting":
                heading.textContent = 'Приветствие';
                break;
        }
        this.manageForm(action);
    }
    _switchPage(i) {
        const outHome = document.getElementById("home_page");
        if (!outHome) {
            return;
        }
        const outWidget = document.getElementById("widget_page");
        if (!outWidget) {
            return;
        }
        if (i) {
            outHome.hidden = true;
            outWidget.hidden = false;
        }
        else {
            outWidget.hidden = true;
            outHome.hidden = false;
        }
    }
    _handleToggleSwitch(event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        if (target.checked == true)
            this.jsonData[target.value].state = 1;
        else
            this.jsonData[target.value].state = 0;
        this.socket.send(JSON.stringify(this.jsonData));
    }
    _handleButtonClick(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }
        const action = target.dataset.action || '';
        this.doAction(action);
    }
    _handleBackButton(event) {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }
        this._switchPage(0);
        const radios = document.querySelectorAll('li>input');
        for (const radio of radios)
            radio.removeEventListener('change', this._handleRadioClick);
    }
    _handleSocket(event) {
        this.jsonData = JSON.parse(event.data);
    }
    manageForm(widName) {
        this.wsSend("request");
        const radios = document.querySelectorAll('li>input');
        for (const radio of radios) {
            if (this.jsonData[widName].position == Number(radio.value))
                radio.checked = true;
            else
                radio.checked = false;
            radio.removeAttribute('class');
            if (radio.checked == true)
                radio.classList.add(widName + "_icon");
            this.tempWid = widName;
            this._handleRadioClick = this._handleRadioClick.bind(this);
            radio.addEventListener('change', this._handleRadioClick);
        }
    }
    wsSend(data) {
        if (!this.socket.readyState) {
            const self = this;
            setTimeout(function () {
                self.wsSend(data);
            }, 100);
        }
        else {
            this.socket.send(data);
        }
    }
    ;
    _handleRadioClick(event) {
        const radios = document.querySelectorAll('li>input');
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }
        for (const radio of radios) {
            radio.removeAttribute('class');
            if (radio.checked == true)
                this.jsonData[this.tempWid].position = Number(radio.value);
        }
        this.socket.send(JSON.stringify(this.jsonData));
        target.classList.add(this.tempWid + "_icon");
    }
}
//# sourceMappingURL=mobile_app.js.map