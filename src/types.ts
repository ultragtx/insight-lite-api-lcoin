import * as Log4js from 'log4js';
import { network } from 'lcoin';
import { NodeClient } from 'lclient';

export interface RouterConfig {
    networkType: network_type;
    rpcURL: string;
    apiKey?: string;
    cacheEnabled?: boolean;
};

export interface Log {
    trace(component: any, message: any, ...args: any[]): void;
	debug(component: any, message: any, ...args: any[]): void;
	info(component: any, message: any, ...args: any[]): void;
	warn(component: any, message: any, ...args: any[]): void;
	error(component: any, message: any, ...args: any[]): void;
	fatal(component: any, message: any, ...args: any[]): void;
};

export interface ControllerConfig {
    network: network;
    log: Log;
    translateAddresses?: boolean;
    rpcURL: string;
    nodeClient: NodeClient;
};

export interface RPCResponse {
    result: any;
    error: string;
    id: any;
};

export enum network_type {
    main = 'main',
    testnet = 'testnet',
}