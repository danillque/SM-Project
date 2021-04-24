
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
    widPosition : string;
    city : string;
    appid : string = 'appid=1b9048bd6770a994133ae2c73cc8e5a2';
    constructor(element : HTMLElement, position : string, city : string){
        this.widPosition = position;
        this.city = city; 
        this.weathOutput = element;
        this.run(this.appid,  this.city);
        setInterval(() => this.changePosition(), 1000);
        setInterval(() => this.run(this.appid, this.city), 300000);
    }

  async run(appid : string, city : string){
    const apistr : string = 'http://api.openweathermap.org/data/2.5/weather?q=';   
    const russianMetrics : string = '&lang=ru&units=metric&';
    const res = await fetch(apistr + city + russianMetrics + appid);
      const resData : WeatherData = await res.json();
      let finalTemp : number = Math.round(resData.main.temp);
      this.weathOutput.textContent = finalTemp.toString() + '°C';
   } 

   changePosition()
    {
      if(this.widPosition != this.weathOutput.dataset.value)
      {
        this.weathOutput.classList.remove('clock');
        this.weathOutput.textContent = '';
        this.weathOutput.removeAttribute('id');

        const posList = document.querySelectorAll<HTMLElement>( 'li' );
        for (const pos of posList)
        {
            if(pos.dataset.value == this.widPosition)
            {
              pos.setAttribute('id', 'tsClock'); 
              pos.classList.add('clock');
              this.weathOutput = pos;
              this.run(this.appid,  this.city);
            }
        }
      }
    }

}



  