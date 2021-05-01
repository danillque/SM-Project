import { Controls } from './mobile_app.js';

main();

function main(){

    const widgetButtons = document.querySelectorAll<HTMLElement>('div.widgets>button');
    const toggles = document.querySelectorAll<HTMLInputElement>('label>input');
    const back = document.getElementById('back');
    if (!(back instanceof HTMLElement)) {
        return ;
    }
    new Controls(widgetButtons, back, toggles);
}

