import type { LimitedVector2Stack } from "./LimitedVector2Stack";
import type { Region } from "./Region";
import type { Vector2 } from "./Vector2";

export interface Pointer {
    down: boolean;
    id: number;
    position_array: LimitedVector2Stack;
    pressed: boolean;
    previous_position_array: LimitedVector2Stack;
    region: Region;
    released: boolean;
    get position(): Vector2;
    get position_delta(): Vector2;
    get previous_position(): Vector2;
    get NDC(): Vector2;
    get NDC_delta(): Vector2;
    distance_to(pointer: Pointer): number;
    previous_distance_to(pointer: Pointer): number;
    set_position(x: number, y: number): void;
    reset_previous_position(): void;
}