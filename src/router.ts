import { Router } from 'express';
import RPC from './utils/fetch';
import { RouterConfig } from './types';
import BlockController from './controllers/block-controller';
import { logger } from './utils/log';
import { ControllerConfig } from './types';
import { networks } from 'lcoin';
import { NodeClient } from 'lclient';
import { ClientOptions } from 'bcurl';

const router = (config: RouterConfig) => {
    const router = Router();

    const rpcURL = config.rpcURL;

    const clientOptions: ClientOptions = {
        url: rpcURL,
        apiKey: config.apiKey,
    };

    const controllerConfig: ControllerConfig = {
        network: networks[config.networkType],
        log: logger,
        rpcURL,
        nodeClient: new NodeClient(clientOptions),
    };

    const blockController = new BlockController(controllerConfig);

    router.get(
        '/block/:blockHash',
        blockController.checkBlockHash.bind(blockController),
        blockController.getBlockByHash.bind(blockController),
    );

    return router;
};

export default router

