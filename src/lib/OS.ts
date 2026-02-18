// This interface declare the OS component found in ohzi-core

export interface OS {
    is_android: boolean;
    is_ios: boolean;
    is_ipad: boolean;
    is_linux: boolean;
    is_mac: boolean;
    is_mobile: boolean;
    is_windows: boolean;

    init(): void;
    get_os(): string;

    get is_playing(): boolean;
}