export class AudioMuffler {
    constructor(sound_name: any, sound: any, time: any, omath: any, easing_functions: any);
    time: any;
    omath: any;
    easing_functions: any;
    sound_name: any;
    sound: any;
    t: number;
    dir: number;
    speed: number;
    changing: boolean;
    stop(): void;
    play(): void;
    update(): void;
}
