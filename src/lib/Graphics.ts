// This interface declare the Graphics component found in ohzi-core

export interface Graphics {
    on_resize(entries: ResizeObserverEntry[], dpr: number): void;
}