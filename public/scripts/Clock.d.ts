export declare class Clock {
    timeOutput: HTMLElement;
    UTCplus: number;
    widPosition: string;
    constructor(element: HTMLElement, position: string, UTC: number);
    run(): void;
    changePosition(): void;
}
