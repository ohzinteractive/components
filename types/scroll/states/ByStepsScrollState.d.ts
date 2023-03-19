export class ByStepsScrollState {
    constructor(omath: any, os: any, time: any);
    omath: any;
    os: any;
    time: any;
    name: string;
    set_steps(steps: any): void;
    steps: any;
    current_step_index: number;
    current_cooldown: any;
    on_enter(scroll: any): void;
    update(scroll: any): void;
    scroll_forward(scroll: any): void;
    scroll_backward(scroll: any): void;
    on_exit(scroll: any): void;
    get_progress(scroll: any): number;
    get_current_step(): any;
    can_scroll_forward(): boolean;
    can_scroll_backward(): boolean;
    get_current_step_index(): number;
}
