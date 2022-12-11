import { Browser } from "ohzi-core";

export class RequestManager {
    static init(browser: Browser): void;
    static get(url: string, callback: Function, error_callback: Function): void;
    static post(url: string, data: Object, callback: Function, error_callback: Function): void;
}
