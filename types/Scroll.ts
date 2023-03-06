import { Input } from "ohzi-core";
import { OS } from "ohzi-core";
import { OMath } from "ohzi-core";
import { Time } from "ohzi-core";
import { EasingFunctions } from "ohzi-core";

export class Scroll {
    static init(input: Input, os: OS, omath: OMath, time: Time, easing_functions: EasingFunctions): void;
    static get is_scrolling(): boolean;
    static enable(): void;
    static disable(): void;
    static get_progress(): Number;
    static get_current_step(): Number;
    static get_current_step_index(): Number;
    static scroll_forward(): void;
    static scroll_backward(): void;
    static scroll_to(target: Number): void;
    static reset(target?: Number): void;
    static set_free_scrolling_by_steps(steps: Array): void;
    static set_free_scrolling(from: Number, to: Number): void;
    static set_step_scrolling(steps: Array): void;
    static update(delta_x: Number, delta_y: Number): void;
}
