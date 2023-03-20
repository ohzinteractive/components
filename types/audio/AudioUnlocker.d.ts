export class AudioUnlocker {
    constructor(os: any, audio_context: any);
    os: any;
    AudioContext: any;
    is_unlocked: boolean;
    unlock_bind: any;
    unlock(): void;
    remove_listeners(source: any): void;
}
