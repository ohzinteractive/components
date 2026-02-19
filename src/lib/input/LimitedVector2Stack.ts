import type { LimitedStack } from './LimitedStack';
import type { Vector2 } from './Vector2';

export interface LimitedVector2Stack extends LimitedStack {
    average: Vector2;
    set_from_stack(vector2_stack: LimitedVector2Stack): void;
    push(elem: Vector2): void;
    update_average(): void;
}
