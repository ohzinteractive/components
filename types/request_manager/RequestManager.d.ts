export { request_manager as RequestManager };
declare const request_manager: RequestManager;
declare class RequestManager {
    callbacks: {};
    error_callbacks: {};
    browser: any;
    worker: Worker;
    init(browser: any): void;
    on_message(e: any): void;
    get(url: any, callback: any, error_callback: any): void;
    post(url: any, data: any, callback: any, error_callback: any): void;
    put(url: any, data: any, callback: any, error_callback: any): void;
    __request({ url, headers, method, data, with_data, callback, error_callback }: {
        url: any;
        headers: any;
        method: any;
        data: any;
        with_data: any;
        callback?: any;
        error_callback?: any;
    }): void;
    on_callback(e: any): void;
    on_error(e: any): void;
    __create_worker(): Worker;
    __setup_worker(): void;
}
