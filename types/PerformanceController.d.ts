import { OMath } from "ohzi-core";
import { Configuration } from "ohzi-core";
import { Graphics } from "ohzi-core";
import { Time } from "ohzi-core";
import { OScreen } from "ohzi-core";

export default class PerformanceController {
    constructor(omath: OMath, configuration: Configuration, graphics: Graphics, time: Time, oscreen: OScreen);
    omath: OMath;
    configuration: Configuration;
    graphics: Graphics;
    time: Time;
    oscreen: OScreen;
    add_optional_features(features: any): void;
    update(): void;
}
