export declare class Controls {
    constructor(widget_buttons: NodeListOf<HTMLElement>, back: HTMLElement);
    doAction(action: string): void;
    _switchPage(i: number | boolean): void;
    _handleButtonClick(event: Event): void;
    _handleBackButton(event: Event): void;
    manage_form(needed_class: string): void;
}
