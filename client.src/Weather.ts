
export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
  }
  
  export interface WeatherData {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: {
      lon: number;
      lat: number;
    };
    dt: number;
    id: number;
    main: {
      feels_like: number;
      humidity: number;
      pressure: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    name: string;
    sys: {
      country: string;
      id: number;
      sunrise: number;
      sunset: number;
      type: number;
    };
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: {
      speed: number;
      deg: number;
    };
  }

export class Weather{
    weathOutput : HTMLElement;
    city : string;
    appId : string = 'appid=1b9048bd6770a994133ae2c73cc8e5a2';
    socket : WebSocket;
    constructor(element : HTMLElement){
        this.city = "Petersburg"; 
        this.weathOutput = element;
        this.socket = new WebSocket('ws://localhost:8000');
        this._handleSocket = this._handleSocket.bind(this);
        this.socket.addEventListener('message', this._handleSocket);
        this.run(this.appId, this.city);
        setInterval(() => this.run(this.appId, this.city), 300000);
    }

    _handleSocket(event: MessageEvent){
      const jsonData = JSON.parse(event.data);

      if(jsonData.weather.state == 1)
        this.weathOutput.classList.remove('invisible');
      else this.weathOutput.classList.add('invisible');

      if(jsonData.weather.position != this.weathOutput.dataset.value)
      {
        this.weathOutput.classList.remove('weather');
        this.weathOutput.textContent = '';
        this.weathOutput.removeAttribute('id');

        const posList = document.querySelectorAll<HTMLElement>( 'li' );
        for (const pos of posList)
        {
            if(pos.dataset.value == jsonData.weather.position)
            {
              pos.setAttribute('id', 'tsWeather'); 
              pos.classList.add('weather');
              this.weathOutput = pos;
              this.run(this.appId,  this.city);
            }
        }
      }
    }

  async run(appId : string, city : string){
    const apiStr : string = 'http://api.openweathermap.org/data/2.5/weather?q=';   
    const russianMetrics : string = '&lang=ru&units=metric&';
    const res = await fetch(apiStr + city + russianMetrics + appId);
      const resData : WeatherData = await res.json();
      const finalTemp : number = Math.round(resData.main.temp);
      this.weathOutput.textContent = finalTemp.toString() + '°C';
   } 
}



  