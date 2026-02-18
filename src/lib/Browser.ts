// This interface declare the Browser component found in ohzi-core

export interface Browser {
    init(): Promise<void>;
    browser_name: string;
    agent: string;
    has_web_xr_support: boolean;
    is_vr: boolean;
    version: number;
    get name(): string;
    get is_safari(): boolean;
    get is_chrome(): boolean;
    get is_firefox(): boolean;
    get is_edge(): boolean;
    get is_edge_chromium(): boolean;
    get has_webm(): boolean;
    get has_hvec(): boolean;
    get preferred_video_extension(): "webm" | "hvec.mp4" | "mp4";
    get_version(): number;
}