import { AbstractModalState } from './AbstractModalState';
declare class ModalState extends AbstractModalState {
    container: HTMLElement;
    constructor(name: string);
    on_enter(): void;
    on_exit(): void;
    update(): void;
}
export { ModalState };
