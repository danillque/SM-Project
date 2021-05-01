import { Controls } from './mobile_app.js';
main();
function main() {
    const widgetButtons = document.querySelectorAll('div.widgets>button');
    const toggles = document.querySelectorAll('label>input');
    const back = document.getElementById('back');
    if (!(back instanceof HTMLElement)) {
        return;
    }
    new Controls(widgetButtons, back, toggles);
}
//# sourceMappingURL=indexApp.js.map