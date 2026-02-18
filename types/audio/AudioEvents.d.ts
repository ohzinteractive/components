import type { AudioManager } from './AudioManager.js';
export declare class AudioEvents {
    audio_manager: typeof AudioManager;
    constructor(audio_manager: typeof AudioManager);
    init(): void;
    bind_focus_events(): void;
}
