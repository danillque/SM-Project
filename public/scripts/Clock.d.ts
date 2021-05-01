export declare class Clock {
    timeOutput: HTMLElement;
    UTCplus: number;
    socket: WebSocket;
    constructor(element: HTMLElement);
    _handleSocket(event: MessageEvent): void;
    run(): void;
}
