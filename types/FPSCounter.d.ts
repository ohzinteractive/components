import { Time } from "ohzi-core";

export class FPSCounter {
    static init(time: Time): void;
    static update(): void;
    static get avg(): number;
}
