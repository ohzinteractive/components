export { scroll as Scroll };
declare const scroll: Scroll;
declare class Scroll {
    init(input: typeof Input, os: typeof OS, omath: typeof OMath, time: typeof Time, easing_functions: typeof EasingFunctions): void;
    input: typeof Input;
    os: typeof OS;
    omath: typeof OMath;
    time: typeof Time;
    easing_functions: typeof EasingFunctions;
    delta: number;
    current: number;
    target: number;
    duration: number;
    default_cooldown: number;
    current_state: any;
    enabled: any;
    states: {
        by_steps: ByStepsScrollState;
        by_steps_scrolling: ByStepsScrollingScrollState;
        free: FreeScrollState;
        free_by_steps: FreeByStepsScrollState;
    };
    get is_scrolling(): boolean;
    enable(): void;
    disable(): void;
    set_free_scrolling_by_steps(steps: any): void;
    set_free_scrolling(from: any, to: any): void;
    set_step_scrolling(steps: any): void;
    set_state(new_state: any): void;
    scroll_forward(): void;
    scroll_backward(): void;
    scroll_to(target: any): void;
    reset(target?: number): void;
    get_progress(): any;
    get_current_step(): any;
    get_current_step_index(): any;
    update(): void;
}
import { ByStepsScrollState } from "./states/ByStepsScrollState";
import { ByStepsScrollingScrollState } from "./states/ByStepsScrollingScrollState";
import { FreeScrollState } from "./states/FreeScrollState";
import { FreeByStepsScrollState } from "./states/FreeByStepsScrollState";

import { Input } from "ohzi-core";
import { OS } from "ohzi-core";
import { OMath } from "ohzi-core";
import { Time } from "ohzi-core";
import { EasingFunctions } from "ohzi-core";
