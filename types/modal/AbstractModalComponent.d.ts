import type { Time } from '../lib/Time';
import type { UICollisionLayer } from '../ui_collision_layer/UICollisionLayer';
import type { UIElement } from '../ui_collision_layer/UIElement';
import { AbstractModalState } from './states/AbstractModalState';
declare class AbstractModalComponent {
    animation: HTMLElement;
    container: UIElement;
    current_state: AbstractModalState;
    hidden: boolean;
    last_state: AbstractModalState | undefined;
    name: string;
    next_state_collision: boolean;
    next_state_name: string | undefined;
    next_state_t: number;
    states: Record<string, AbstractModalState>;
    time: {
        delta_time: number;
    };
    ui_collision_layer: typeof UICollisionLayer;
    constructor();
    init(ui_collision_layer: typeof UICollisionLayer, time: Time): void;
    start(): void;
    on_enter(): void;
    on_exit(): void;
    update(current_state_data: any): void;
    show_state(state_name: string, collision?: boolean): void;
    hide(next_state_name: string | undefined, next_state_collision?: boolean): void;
    restore_last_state(): void;
    set_state(state: AbstractModalState): void;
}
export { AbstractModalComponent };
