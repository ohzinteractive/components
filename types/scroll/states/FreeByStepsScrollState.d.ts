export class FreeByStepsScrollState {
    constructor(os: any, omath: any, time: any);
    os: any;
    omath: any;
    time: any;
    speed: number;
    snap_speed: number;
    velocity: number;
    threshold: number;
    set_steps(steps: any): void;
    steps: any;
    on_enter(scroll: any): void;
    current_step: number;
    find_nearest_step(x: any, dir: any): any;
    update(scroll: any): void;
    on_exit(scroll: any): void;
    scroll_forward(scroll: any): void;
    scroll_backward(scroll: any): void;
    scroll_to(scroll: any, target: any): void;
    get_progress(scroll: any): number;
}
