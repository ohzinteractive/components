export class PerformanceController {
    init(omath: typeof OMath, settings: typeof Settings, graphics: typeof Graphics, time: typeof Time, oscreen: typeof OScreen, fps_counter: FPSCounter): void;
    omath: typeof OMath;
    settings: typeof settings;
    graphics:typeof Graphics;
    time: typeof Time;
    oscreen: typeof OScreen;
    should_check_performance: boolean;
    performance_t: number;
    threshold: boolean;
    optional_features: any[];
    current_optional_feature_i: number;
    on_focus_in(): void;
    on_focus_out(): void;
    add_optional_features(features: any): void;
    update(): void;
    __check_performance(): void;
    __reduce_dpr(force_dpr?: boolean): void;
    __increase_dpr(): void;
}

import { Graphics, OMath, OScreen, Settings, Time } from "ohzi-core";

