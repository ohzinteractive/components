export { fps_counter as FPSCounter };
declare const fps_counter: FPSCounter;
declare class FPSCounter {
    init(time: any): void;
    time: typeof Time;
    last_loop: any;
    count: number;
    total: number;
    fps: number;
    fps_samples: number[];
    update(): void;
    count_fps(): void;
    get avg(): number;
}

import { Time } from "ohzi-core";
