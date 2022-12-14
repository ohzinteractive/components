export class TextScrambler {
    is_enabled: boolean;
    time: Number;
    init(): void;
    set_text(element: HTMLElement, new_text: string): void;
    update(): void;
}
