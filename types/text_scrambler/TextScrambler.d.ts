export class TextScrambler {
    init(): void;
    el: any;
    chars: string;
    is_enabled: boolean;
    time: number;
    set_text(element: any, new_text: any): void;
    queue: any[];
    frame: number;
    update(): void;
    __random_char(): string;
}
