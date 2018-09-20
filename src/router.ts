import { Router } from 'express';
import RPC from './utils/fetch';
import { RouterConfig } from './types';
import BlockController from './controllers/block-controller';
import { logger } from './utils/log';
import { ControllerConfig } from './types';
import { networks } from 'lcoin';
import { NodeClient } from 'lclient';
import { ClientOptions } from 'bcurl';
import CacheControl from './middlewares/cache-control';

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

    const cacheControl = new CacheControl({ cacheEnabled: config.cacheEnabled });

    const blockController = new BlockController(controllerConfig);

    router.get(
        '/blocks',
        cacheControl.short(),
        blockController.getBlocks.bind(blockController),
    );

    router.get(
        '/block/:blockHash',
        cacheControl.short(),
        blockController.checkBlockHash.bind(blockController),
        blockController.getBlockByHash.bind(blockController),
    );

    router.get( // TODO
        '/rawblock/:blockHash',
        cacheControl.short(),
        blockController.checkBlockHash.bind(blockController),
        blockController.getBlockByHash.bind(blockController),
    );

    router.get(
        '/block-index/:height',
        cacheControl.short(),
        blockController.getBlockHash.bind(blockController),
    );

    return router;
};

export default router

