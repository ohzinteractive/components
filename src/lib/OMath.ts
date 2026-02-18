// This interface declare the OMath component found in ohzi-core

import type { Matrix4, Plane, Vector3 } from "three";

export interface OMath {

    linear_map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
    between(value: number, min: number, max: number): boolean;
    mod(number: number, divisor: number): number;
    rgb_to_hex(rgb: { r: string; g: string; b: string }): string;
    project_points_on_plane(points: Vector3[], plane: Plane): Vector3[];
    matrix4_lerp(from: Matrix4, to: Matrix4, target: Matrix4, t: number): void;
    equals(x1:number, x2:number): boolean;
    lerp(x: number, y: number, t: number): number;
    clamp(value: number, min: number, max: number): number;
    euclideanModulo(n: number, m: number): number;
    pingpong(x: number, length?: number): number;
    degToRad(degrees: number): number;
    radToDeg(radians: number): number;
    deg_to_rad(degrees: number): number;
    rad_to_deg(radians: number): number;
    perspective_divide(v: { x: number; y: number; z: number; w: number }): { x: number; y: number; z: number };
    points_average(points: Vector3[]): Vector3
    get_random_color(): string;
    saturate(x: number): number;
    generate_uuid(): string;
}