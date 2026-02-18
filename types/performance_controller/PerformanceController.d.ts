import type { FPSCounter } from "../index";
import type { Graphics } from "../lib/Graphics";
import type { OMath } from "../lib/OMath";
import type { OScreen } from "../lib/OScreen";
import type { Time } from "../lib/Time";
export declare class PerformanceController {
    current_optional_feature_i: number;
    fps_counter: typeof FPSCounter;
    graphics: Graphics;
    omath: OMath;
    optional_features: any;
    oscreen: OScreen;
    performance_t: number;
    settings: any;
    should_check_performance: boolean;
    threshold: boolean;
    time: Time;
    constructor();
    init(omath: OMath, settings: any, graphics: Graphics, time: Time, oscreen: OScreen, fps_counter: typeof FPSCounter): void;
    on_focus_in(): void;
    on_focus_out(): void;
    add_optional_features(features: any[]): void;
    update(): void;
    __check_performance(): void;
    __reduce_dpr(force_dpr?: boolean): void;
    __increase_dpr(): void;
}
