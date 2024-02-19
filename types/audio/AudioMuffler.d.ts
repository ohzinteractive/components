export class AudioMuffler {
    constructor(sound_name: any, sound: any, time: any);
    time: any;
    sound_name: any;
    sound: any;
    t: number;
    dir: number;
    speed: number;
    changing: boolean;
    stop(): void;
    play(): void;
    update(): void;
    clamp(value: any, min: any, max: any): number;
    ease_in_out_cubic(x: any): number;
    linear_map(value: any, from_range_start_value: any, from_range_end_value: any, to_range_start_value: any, to_range_end_value: any): any;
}
