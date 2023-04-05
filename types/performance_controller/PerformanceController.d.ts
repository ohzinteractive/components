export class PerformanceController {
    init(omath: typeof OMath, configuration: typeof Configuration, graphics: typeof Graphics, time: typeof Time, oscreen: typeof OScreen, fps_counter: FPSCounter): void;
    omath: typeof OMath;
    configuration: typeof Configuration;
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

import { OMath } from "ohzi-core";
import { Configuration } from "ohzi-core";
import { Graphics } from "ohzi-core";
import { Time } from "ohzi-core";
import { OScreen } from "ohzi-core";
import { FPSCounter } from '../performance_controller/FPSCounter'
