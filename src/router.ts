import { Router } from 'express';
import RPC from './utils/fetch';
import { RouterConfig } from './types';
import BlockController from './controllers/block-controller';
import TxController from './controllers/tx-controller';
import AddressController from './controllers/address-controller';
import MessageController from './controllers/message-controller';
import StatusController from './controllers/status-controller';
import UtilController from './controllers/util-controller';
import CurrenctController from './controllers/currency-controller';
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
    const txController = new TxController(controllerConfig);
    const addressController = new AddressController(controllerConfig);
    const messageController = new MessageController(controllerConfig);
    const statusController = new StatusController(controllerConfig);
    const utilController = new UtilController(controllerConfig);
    const currenctController = new CurrenctController(controllerConfig);

    // Block routes
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

    // TX routes
    router.get(
        '/tx/:txid',
        cacheControl.short(),
        txController.getTxByHash.bind(txController),
    );
    router.get(
        '/txs',
    );
    router.post(
        '/tx/send',
    );
    router.get(
        '/rawtx/:txid',
        cacheControl.short(),
        txController.getRawTxByHash.bind(txController),
    );

    // Address routes
    router.get(
        '/addr/:addr',
    );
    router.get(
        '/addr/:addr/utxo',
    );
    router.get(
        '/addrs/:addrs/utxo',
    );
    router.post(
        '/addrs/utxo',
    );
    router.get(
        '/addrs/:addrs/txs',
    );
    router.post(
        '/addrs/txs',
    );
    router.get(
        '/addr/:addr/balance',
    );
    router.get(
        '/addr/:addr/totalReceived',
    );
    router.get(
        '/addr/:addr/totalSent',
    );
    router.get(
        '/addr/:addr/unconfirmedBalance',
    );

    // Status routes
    router.get(
        '/status',
    );
    router.get(
        '/sync',
    );
    router.get(
        '/peer',
    );
    router.get(
        '/version',
    );

    // Message routes
    router.get(
        '/messages/verify',
    );
    router.get(
        '/tx/:txid',
    );
    router.post(
        '/messages/verify',
    );

    // Util routes
    router.get(
        '/utils/estimatefee',
    );

    // Currency routes
    router.get(
        '/currency',
    );

    return router;
};

export default router

