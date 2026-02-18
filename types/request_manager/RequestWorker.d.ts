declare class RequestWorker {
    is_safari: boolean;
    response: any;
    run(): void;
    __bind_messages(): void;
    request(url: string, external_headers: {}, method: string, data: any, with_data?: boolean): void;
    on_response(url: any, response: any): Promise<void>;
    on_quick_response(url: string, response: any): Promise<void>;
    on_error(url: string, response: any): Promise<void>;
    check_response(response: any): any;
    text_to_json(text: any): any;
    __response_to_blob(response: any): any;
    __log(data?: string): void;
    __is_json(str: any): boolean;
}
