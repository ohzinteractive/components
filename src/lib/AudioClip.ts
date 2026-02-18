// This interface declare the AudioClip component found in ohzi-core

import type { Audio, AudioListener, PositionalAudio } from "three";

export interface AudioClip {
    audio: PositionalAudio | Audio<GainNode | PannerNode> | undefined;
    buffer: AudioBuffer;
    loop: boolean;
    positional: boolean;
    volume: number;

    init(audio_listener: AudioListener): void;
    play(): void;
    pause(): void;
    stop(): void;

    get is_playing(): boolean;
}