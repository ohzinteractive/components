import { Input } from "ohzi-core";
import { Time } from "ohzi-core";

export class UICollisionLayer {
    input: Input;
    time: Time;
    elements: Set<any>;
    mouse_out_cooldown: number;
    static init(input: Input, time: Time): void;
    static add_element(elem: any): void;
    static remove_element(elem: any): void;
    static update(): void;
    static is_mouse_over(): boolean;
}
