import type { Input } from "../lib/Input";
import type { Time } from "../lib/Time";
import type { UIElement } from "./UIElement";
declare class UICollisionLayer {
    elements: Set<UIElement>;
    input: Input;
    mouse_out_cooldown: number;
    mutation_observer: MutationObserver;
    mutation_observer_config: MutationObserverInit;
    resize_observer: ResizeObserver;
    time: Time;
    constructor();
    init(input: Input, time: Time): void;
    add_element(elem: UIElement): void;
    remove_element(elem: UIElement): void;
    update(): void;
    on_element_mutated(mutationList: MutationRecord[], observer: MutationObserver): void;
    on_element_resized(entries: ResizeObserverEntry[]): void;
    is_mouse_over(): boolean;
    pointer_is_over_element(elem: UIElement): boolean;
}
declare const ui_collision_layer: UICollisionLayer;
export { ui_collision_layer as UICollisionLayer };
