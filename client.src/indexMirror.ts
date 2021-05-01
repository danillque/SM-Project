import { Clock } from './Clock.js';
import { Greeting } from './Greeting.js';
import { Weather } from './Weather.js';

main();

function main() {
    
    const outClock = document.getElementById('tsClock');
    if (!outClock) {
        return;
    }

    const outGreet = document.getElementById('tsGreet');
    if (!outGreet) {
        return;
    }

    const outWeather = document.getElementById('tsWeather');
    if (!outWeather) {
        return;
    }

    new Clock(outClock);
    new Greeting(outGreet);
    new Weather(outWeather);
}
