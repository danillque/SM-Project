import { Controls } from './mobile_app.js';
main();
function main() {
    const widget_buttons = document.querySelectorAll('div.widgets>button');
    const back = document.getElementById('back');
    if (!(back instanceof HTMLElement)) {
        return;
    }
    new Controls(widget_buttons, back);
}
//# sourceMappingURL=indexApp.js.map