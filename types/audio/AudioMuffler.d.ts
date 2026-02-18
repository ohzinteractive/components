import type { AudioClip } from "../lib/AudioClip";
import type { Time } from "../lib/Time";
declare class AudioMuffler {
    changing: boolean;
    dir: number;
    sound: AudioClip;
    sound_name: string;
    speed: number;
    t: number;
    time: Time;
    constructor(sound_name: string, sound: AudioClip, time: Time);
    stop(): void;
    play(): void;
    update(): void;
    clamp(value: number, min: number, max: number): number;
    ease_in_out_cubic(x: number): number;
    linear_map(value: number, from_range_start_value: number, from_range_end_value: number, to_range_start_value: number, to_range_end_value: number): number;
}
export { AudioMuffler };
