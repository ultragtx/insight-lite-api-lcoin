export as namespace bcurl;



export interface ClientOptions {
    ssl?: boolean;
    host?: string;
    port?: number;
    path?: string;
    headers?: string;
    username?: string;
    password?: string;
    id?: string;
    token?: string;
    timeout?: number;
    limit?: number;
    url?: string;
    apiKey?: string;
    key?: string; // key == apikey == password
}

export declare class PRCError extends Error {
    code: number;
    type: string;
    constructor(msg: string, code: number);
}

export declare class Client extends NodeJS.EventEmitter {
    constructor(options: ClientOptions);

    clone(): Client; // TODO: subclass

    open(): Promise<any>;
    close(): Promise<any>;
    auth(): Promise<any>;
    hook(...args: any[]): void;
    call(...args: any[]): Promise<any>;
    bind(...args: any[]): void;
    fire(...args: any[]): void;
    request(method: string, endpoint: string, params: any): Promise<any>;
    get(endpoint: string, params: any): Promise<any>;
    post(endpoint: string, params: any): Promise<any>;
    puts(endpoint: string, params: any): Promise<any>;
    del(endpoint: string, params: any): Promise<any>;get(endpoint: string, params: any): Promise<any>;
    execute(method: string, endpoint: string, params: any): Promise<any>;
}

export declare function client(options: ClientOptions): Client;