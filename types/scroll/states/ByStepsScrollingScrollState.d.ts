import type { EasingFunctions } from "../../lib/EasingFunctions";
import type { OMath } from "../../lib/OMath";
import type { Time } from "../../lib/Time";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";
declare class ByStepsScrollingScrollState extends ScrollState {
    easing_functions: EasingFunctions;
    from: number;
    name: string;
    omath: OMath;
    t: number;
    time: Time;
    to: number;
    constructor(omath: OMath, time: Time, easing_functions: EasingFunctions);
    set_to(to: number): void;
    on_enter(scroll: typeof Scroll): void;
    update(scroll: typeof Scroll): void;
    on_exit(scroll: any): void;
    scroll_forward(scroll: any): void;
    scroll_backward(scroll: any): void;
}
export { ByStepsScrollingScrollState };
