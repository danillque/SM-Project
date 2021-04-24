export class Controls {
    constructor(widget_buttons, back) {
        this._handleButtonClick = this._handleButtonClick.bind(this);
        this._handleBackButton = this._handleBackButton.bind(this);
        for (const button of widget_buttons) {
            button.addEventListener('click', this._handleButtonClick);
        }
        back.addEventListener('click', this._handleBackButton);
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
                this.manage_form("clock_icon");
                break;
            case "weather":
                heading.textContent = 'Погода';
                this.manage_form("weather_icon");
                break;
            case "reminder":
                heading.textContent = 'Напоминания';
                this.manage_form("reminder_icon");
                break;
            case "greeting":
                heading.textContent = 'Приветствие';
                this.manage_form("greeting_icon");
                break;
        }
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
            ;
            outWidget.hidden = false;
        }
        else {
            outWidget.hidden = true;
            outHome.hidden = false;
        }
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
    }
    manage_form(needed_class) {
        const socket = new WebSocket('ws://localhost:8000');
        socket.addEventListener('message', function (event) {
            console.log(JSON.parse(event.data));
        });
        const radios = document.querySelectorAll('input');
        for (const radio of radios) {
            radio.removeAttribute('class');
            if (radio.checked == true)
                radio.classList.add(needed_class);
        }
        for (const radio of radios) {
            radio.addEventListener('change', function _handleRadioClick(event) {
                const target = event.target;
                if (!(target instanceof HTMLInputElement)) {
                    return;
                }
                for (const radio of radios)
                    radio.removeAttribute('class');
                target.classList.add(needed_class);
            });
        }
    }
}
//# sourceMappingURL=mobile_app.js.map