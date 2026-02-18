import type { Time } from "../lib/Time";
declare class FPSCounter {
    count: number;
    fps: number;
    fps_samples: number[];
    last_loop: number | undefined;
    time: Time;
    total: number;
    constructor();
    init(time: Time): void;
    update(): void;
    count_fps(): void;
    get avg(): number;
    reset(): void;
}
declare const fps_counter: FPSCounter;
export { fps_counter as FPSCounter };
