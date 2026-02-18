import type { OS } from "../lib/OS";
declare class AudioUnlocker {
    AudioContext: any;
    is_unlocked: boolean;
    os: OS;
    unlock_bind: () => void;
    constructor(os: OS, audio_context: any);
    unlock(): void;
    remove_listeners(context: any): void;
}
export { AudioUnlocker };
