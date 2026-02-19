import type { Vector2 } from "./Vector2";

export interface LimitedStack {
    array: Vector2[];
    max_size: number;
    get_first(): Vector2;
    length(): number;
    set_from_stack(stack: LimitedStack): void;
    push(elem: Vector2): void;
}
