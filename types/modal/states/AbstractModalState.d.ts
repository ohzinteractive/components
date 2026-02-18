import type { AbstractModalComponent } from "../AbstractModalComponent";
declare class AbstractModalState {
    name: string;
    constructor(name: string);
    on_enter(modal_component: AbstractModalComponent): void;
    on_exit(modal_component: AbstractModalComponent): void;
    update(modal_component: AbstractModalComponent): void;
}
export { AbstractModalState };
