import type { Scroll } from "../Scroll";
export declare class ScrollState {
    name: string;
    constructor(name: string);
    on_enter(scroll: typeof Scroll): void;
    update(scroll: typeof Scroll): void;
    on_exit(scroll: typeof Scroll): void;
    scroll_forward(scroll: typeof Scroll): void;
    scroll_backward(scroll: typeof Scroll): void;
    scroll_to(scroll: typeof Scroll, target: number): void;
    get_progress(scroll: typeof Scroll): number;
    set_steps(steps: number[]): void;
    set_from_to(from: number, to: number): void;
    get_current_step(): number;
    get_current_step_index(): number;
    set_to(to: number): void;
}
