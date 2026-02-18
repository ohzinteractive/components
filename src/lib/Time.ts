// This interface declare the Time component found in ohzi-core

export interface Time {
    fixed_delta_time: any;

    init(): void;

    get elapsed_time(): number;
    get delta_time(): number;
    get smooth_delta_time(): number;
    get frame_interpolation(): number;
    get fdt(): number;
    get dt(): number;
    get sdt(): number;
}