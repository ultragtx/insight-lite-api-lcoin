import { network, consensus, TX } from 'lcoin';
import { network_type } from '../types';

export function transformClientBlockToBlock(network: network, b: any, tx: any) {
    const reward = _getBlockRewardOfHeight(network, b.height);
    const isMainChain = network.type == network_type.main;
    const result: any = {
        ...b,
        reward,
        isMainChain,
        tx,
    };

    console.log(new TX(tx));

    return result;
}

function _getBlockRewardOfHeight(network: network, height: number) {
    return consensus.getReward(height, network.halvingInterval);
}