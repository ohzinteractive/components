import type { OMath } from "../../lib/OMath";
import type { OS } from "../../lib/OS";
import type { Time } from "../../lib/Time";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";
declare class FreeByStepsScrollState extends ScrollState {
    current_step: number;
    omath: OMath;
    os: OS;
    snap_speed: number;
    speed: number;
    steps: number[];
    threshold: number;
    time: Time;
    velocity: number;
    constructor(os: OS, omath: OMath, time: Time);
    set_steps(steps: number[]): void;
    on_enter(scroll: typeof Scroll): void;
    find_nearest_step(x: number, dir: number): number;
    update(scroll: typeof Scroll): void;
    on_exit(scroll: typeof Scroll): void;
    scroll_forward(scroll: typeof Scroll): void;
    scroll_backward(scroll: typeof Scroll): void;
    scroll_to(scroll: typeof Scroll, target: number): void;
    get_progress(scroll: typeof Scroll): number;
}
export { FreeByStepsScrollState };
