import type { OMath } from "../../lib/OMath";
import type { OS } from "../../lib/OS";
import type { Scroll } from "../Scroll";
import { ScrollState } from "./ScrollState";
declare class FreeScrollState extends ScrollState {
    force: number;
    from: number;
    omath: OMath;
    os: OS;
    sensitivity: number;
    to: number;
    constructor(omath: OMath, os: OS);
    set_from_to(from?: number, to?: number): void;
    set_sensitivity(sensitivity: number): void;
    on_enter(scroll: typeof Scroll): void;
    update(scroll: typeof Scroll): void;
    on_exit(scroll: typeof Scroll): void;
    scroll_forward(scroll: typeof Scroll): void;
    scroll_backward(scroll: typeof Scroll): void;
    scroll_to(scroll: typeof Scroll, target: number): void;
    get_progress(scroll: typeof Scroll): number;
}
export { FreeScrollState };
