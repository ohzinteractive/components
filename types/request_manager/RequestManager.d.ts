import type { Browser } from "../lib/Browser";
declare class RequestManager {
    browser: Browser;
    callbacks: Record<string, Function>;
    error_callbacks: Record<string, Function>;
    worker: Worker;
    constructor();
    init(browser: Browser): void;
    on_message(e: MessageEvent): void;
    get(url: string, callback: Function, error_callback: Function): void;
    post(url: string, data: any, callback: Function, error_callback: Function): void;
    put(url: string, data: any, callback: Function, error_callback: Function): void;
    delete(url: string, data: any, callback: Function, error_callback: Function): void;
    __request({ url, headers, method, data, with_data, callback, error_callback }: any): void;
    on_callback(e: any): void;
    on_error(e: any): void;
    __create_worker(): Worker;
    __setup_worker(): void;
}
declare const request_manager: RequestManager;
export { request_manager as RequestManager };
