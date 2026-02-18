// This interface declare the OScreen component found in ohzi-core

import type { Vector2 } from "three";

export interface OScreen {
    init(): void;
    width: number;
    height: number;
    position: Vector2;
    render_width: number;
    render_height: number;
    width_height: Vector2;
}