export class ByStepsScrollingScrollState {
    constructor(omath: any, time: any, easing_functions: any);
    omath: any;
    time: any;
    easing_functions: any;
    name: string;
    from: number;
    to: number;
    set_to(to: any): void;
    on_enter(scroll: any): void;
    t: any;
    update(scroll: any): void;
    on_exit(scroll: any): void;
    scroll_forward(scroll: any): void;
    scroll_backward(scroll: any): void;
}
