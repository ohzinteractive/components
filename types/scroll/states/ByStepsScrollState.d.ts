import type { OMath } from "../../lib/OMath";
import type { OS } from "../../lib/OS";
import type { Time } from "../../lib/Time";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";
declare class ByStepsScrollState extends ScrollState {
    current_cooldown: number;
    current_step_index: number;
    omath: OMath;
    os: OS;
    steps: number[];
    time: Time;
    constructor(omath: OMath, os: OS, time: Time);
    set_steps(steps: number[]): void;
    on_enter(scroll: typeof Scroll): void;
    update(scroll: typeof Scroll): void;
    scroll_forward(scroll: typeof Scroll): void;
    scroll_backward(scroll: typeof Scroll): void;
    on_exit(scroll: typeof Scroll): void;
    get_progress(scroll: typeof Scroll): number;
    get_current_step(): number;
    can_scroll_forward(): boolean;
    can_scroll_backward(): boolean;
    get_current_step_index(): number;
}
export { ByStepsScrollState };
