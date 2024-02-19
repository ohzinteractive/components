export { ui_collision_layer as UICollisionLayer };
declare const ui_collision_layer: UICollisionLayer;
declare class UICollisionLayer {
    init(main_input: any, time: any): void;
    main_input: any;
    time: any;
    elements: any;
    mouse_out_cooldown: any;
    mutation_observer: MutationObserver;
    mutation_observer_config: {
        attributes: boolean;
        childList: boolean;
        subtree: boolean;
    };
    add_element(elem: any): void;
    remove_element(elem: any): void;
    update(): void;
    on_element_mutated(mutationList: any, observer: any): void;
    is_mouse_over(): boolean;
    pointer_is_over_element(elem: any): boolean;
}
