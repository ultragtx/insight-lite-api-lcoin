
export as namespace lcoin;

import { network_type } from '../../types'

export interface network {
    types: network_type[];
    type: network_type;
    port: number;
    halvingInterval: number;
    rpcPort: number;
}

export const networks: {
    main: lcoin.network;
    testnet: lcoin.network;
};

export const consensus: {
    COIN: number;
    MAX_MONEY: number;
    BASE_REWARD: number;
    
    getReward: (height: number, interval: number) => number;
};

export declare class TX {
    constructor(options: any);
}

