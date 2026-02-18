declare class TextScrambler {
    chars: string;
    el: HTMLElement;
    frame: number;
    is_enabled: boolean;
    queue: {
        from: string;
        to: string;
        start: number;
        end: number;
        char?: string;
    }[];
    time: number;
    constructor();
    init(): void;
    set_text(element: HTMLElement, new_text: string): void;
    update(): void;
    __random_char(): string;
}
export { TextScrambler };
