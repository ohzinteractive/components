export { ui_collision_layer as UICollisionLayer };
declare const ui_collision_layer: UICollisionLayer;
declare class UICollisionLayer {
    init(input: typeof Input, time: typeof Time): void;
    input: typeof Input;
    time: typeof Time;
    elements: Set<any>;
    mouse_out_cooldown: number;
    add_element(elem: any): void;
    remove_element(elem: any): void;
    update(): void;
    is_mouse_over(): boolean;
}

import { Input } from "ohzi-core";
import { Time } from "ohzi-core";
