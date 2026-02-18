// This interface declare the ResourceContainer component found in ohzi-core

export interface ResourceContainer {
    init(): void;
    set_resource(name: string, url: string, resource: unknown): void;
    get_resource(name: string): unknown;
    get(name: string): unknown;
}