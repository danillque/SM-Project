export class Weather {
    constructor(element) {
        this.appid = 'appid=1b9048bd6770a994133ae2c73cc8e5a2';
        this.city = "Petersburg";
        this.weathOutput = element;
        this.socket = new WebSocket('ws://localhost:8000');
        this._handleSocket = this._handleSocket.bind(this);
        this.socket.addEventListener('message', this._handleSocket);
        this.run(this.appid, this.city);
        setInterval(() => this.run(this.appid, this.city), 300000);
    }
    _handleSocket(event) {
        const jsonData = JSON.parse(event.data);
        if (jsonData.weather.state == 1)
            this.weathOutput.classList.remove('invisible');
        else
            this.weathOutput.classList.add('invisible');
        if (jsonData.weather.position != this.weathOutput.dataset.value) {
            this.weathOutput.classList.remove('weather');
            this.weathOutput.textContent = '';
            this.weathOutput.removeAttribute('id');
            const posList = document.querySelectorAll('li');
            for (const pos of posList) {
                if (pos.dataset.value == jsonData.weather.position) {
                    pos.setAttribute('id', 'tsWeather');
                    pos.classList.add('weather');
                    this.weathOutput = pos;
                    this.run(this.appid, this.city);
                }
            }
        }
    }
    async run(appid, city) {
        const apistr = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const russianMetrics = '&lang=ru&units=metric&';
        const res = await fetch(apistr + city + russianMetrics + appid);
        const resData = await res.json();
        let finalTemp = Math.round(resData.main.temp);
        this.weathOutput.textContent = finalTemp.toString() + '°C';
    }
}
//# sourceMappingURL=Weather.js.map