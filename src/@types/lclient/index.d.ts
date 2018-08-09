import { ClientOptions, Client } from 'bcurl';

export as namespace lclient;

export declare class NodeClient extends Client {
    auth(): Promise<any>;
    execute(name: string, params: any): Promise<any>;
    getMempool(): Promise<any>;
    getInfo(): Promise<any>;
    getCoinsByAddress(address: string): Promise<any>;
    getCoinsByAddresses(addresses: string[]): Promise<any>;
    getCoin(hash: string, index: number): Promise<any>;
    getTXByAddress(address: string): Promise<any>;
    getTXByAddresses(addresses: string[]): Promise<any>;
    getTX(hash: string): Promise<any>;
    getBlock(blockHashOrHeight: string | number): Promise<any>;
    broadcast(tx: any): Promise<any>;
    reset(height: number): Promise<any>;
    watchChain(): Promise<any>;
    watchMempool(): Promise<any>;
    getTip(): Promise<any>;
    getEntry(blockHash: string): Promise<any>;
    getHashes(start: number, end: number): Promise<any>;
    send(tx: any): Promise<any>;
    setFilter(filter: any): Promise<any>;
    addFilter(chunks: any): Promise<any>;
    resetFilter(): Promise<any>;
    estimateFee(blocks: number): Promise<any>;
    rescan(start: number | string): Promise<any>;
}

export declare class WalletClient extends Client {
    // TODO: 
}