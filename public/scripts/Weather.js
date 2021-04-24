export class Weather {
    constructor(element, position, city) {
        this.appid = 'appid=1b9048bd6770a994133ae2c73cc8e5a2';
        this.widPosition = position;
        this.city = city;
        this.weathOutput = element;
        this.run(this.appid, this.city);
        setInterval(() => this.changePosition(), 1000);
        setInterval(() => this.run(this.appid, this.city), 300000);
    }
    async run(appid, city) {
        const apistr = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const russianMetrics = '&lang=ru&units=metric&';
        const res = await fetch(apistr + city + russianMetrics + appid);
        const resData = await res.json();
        let finalTemp = Math.round(resData.main.temp);
        this.weathOutput.textContent = finalTemp.toString() + '°C';
    }
    changePosition() {
        if (this.widPosition != this.weathOutput.dataset.value) {
            this.weathOutput.classList.remove('clock');
            this.weathOutput.textContent = '';
            this.weathOutput.removeAttribute('id');
            const posList = document.querySelectorAll('li');
            for (const pos of posList) {
                if (pos.dataset.value == this.widPosition) {
                    pos.setAttribute('id', 'tsClock');
                    pos.classList.add('clock');
                    this.weathOutput = pos;
                    this.run(this.appid, this.city);
                }
            }
        }
    }
}
//# sourceMappingURL=Weather.js.map