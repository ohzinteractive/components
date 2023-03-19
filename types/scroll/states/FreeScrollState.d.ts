export class FreeScrollState {
    constructor(omath: any, os: any);
    omath: any;
    os: any;
    sensitivity: number;
    set_from_to(from?: number, to?: number): void;
    from: number;
    to: number;
    set_sensitivity(sensitivity: any): void;
    on_enter(scroll: any): void;
    update(scroll: any): void;
    on_exit(scroll: any): void;
    scroll_forward(scroll: any): void;
    scroll_backward(scroll: any): void;
    scroll_to(scroll: any, target: any): void;
    get_progress(scroll: any): any;
}
