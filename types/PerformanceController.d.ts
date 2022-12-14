import { Initializer, OMath } from "ohzi-core";
import { Configuration } from "ohzi-core";
import { Graphics } from "ohzi-core";
import { Time } from "ohzi-core";
import { OScreen } from "ohzi-core";

export class PerformanceController {
    omath: OMath;
    configuration: Configuration;
    graphics: Graphics;
    time: Time;
    oscreen: OScreen;
    init(omath: OMath, configuration: Configuration, graphics: Graphics, time: Time, oscreen: OScreen): void;
    add_optional_features(features: any): void;
    update(): void;
}
