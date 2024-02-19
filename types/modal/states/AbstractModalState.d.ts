export class AbstractModalState {
    constructor(name: any);
    name: any;
    on_enter(): void;
    on_exit(): void;
    update(): void;
}
