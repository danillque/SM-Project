export declare class Controls {
    tempWid: string;
    socket: WebSocket;
    jsonData: any;
    constructor(widgetButtons: NodeListOf<HTMLElement>, back: HTMLElement, toggles: NodeListOf<HTMLInputElement>);
    doAction(action: string): void;
    _switchPage(i: number | boolean): void;
    _handleToggleSwitch(event: Event): void;
    _handleButtonClick(event: Event): void;
    _handleBackButton(event: Event): void;
    _handleSocket(event: MessageEvent): void;
    manageForm(widName: string): void;
    wsSend(data: string): void;
    _handleRadioClick(event: Event): void;
}
