import { Controls } from './mobile_app.js';

main();

function main(){

    const widget_buttons = document.querySelectorAll<HTMLElement>('div.widgets>button');
    const back = document.getElementById('back');
    if (!(back instanceof HTMLElement)) {
        return ;
    }
    new Controls(widget_buttons, back);
}

