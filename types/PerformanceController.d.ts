import { Initializer, OMath } from "ohzi-core";
import { Configuration } from "ohzi-core";
import { Graphics } from "ohzi-core";
import { Time } from "ohzi-core";
import { OScreen } from "ohzi-core";

export default class PerformanceController {
    omath: OMath;
    configuration: Configuration;
    graphics: Graphics;
    time: Time;
    oscreen: OScreen;
    static init(omath: OMath, configuration: Configuration, graphics: Graphics, time: Time, oscreen: OScreen): void;
    static add_optional_features(features: any): void;
    static update(): void;
}
