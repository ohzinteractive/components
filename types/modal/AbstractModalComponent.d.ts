export class AbstractModalComponent {
    init(ui_collision_layer: any, time: any): void;
    name: string;
    container: Element;
    animation: Element;
    hidden: boolean;
    ui_collision_layer: any;
    time: any;
    states: {};
    last_state: any;
    current_state: any;
    next_state_name: any;
    next_state_collision: boolean;
    next_state_t: number;
    start(): void;
    on_enter(): void;
    on_exit(): void;
    update(current_state_data: any): void;
    show_state(state_name: any, collision?: boolean): void;
    hide(next_state_name: any, next_state_collision?: boolean): void;
    restore_last_state(): void;
    set_state(state: any): void;
}
