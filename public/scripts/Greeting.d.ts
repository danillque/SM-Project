export declare class Greeting {
    greetOutput: HTMLElement;
    socket: WebSocket;
    constructor(element: HTMLElement);
    _handleSocket(event: MessageEvent): void;
    run(): void;
}
