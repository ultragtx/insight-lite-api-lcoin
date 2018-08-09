import BaseController from './base-controller';
import { Request, Response, NextFunction } from 'express';
import { Log, ControllerConfig, RPCResponse } from '../types';
import { APIError } from '../utils/error';
import * as _ from 'lodash';
import { transformClientBlockToBlock } from '../reformers/block';
import fetch from '../utils/fetch';

export default class BlockController extends BaseController {
    constructor(options: ControllerConfig) {
        super(options);
    }
    
    _isHexadecimal(hash: string) {
        if (!_.isString(hash)) {
            return false;
        }
        return /^[0-9a-fA-F]+$/.test(hash);
    }
    
    checkBlockHash(req: Request, res: Response, next: NextFunction) {
        const blockHash: string = req.params.blockHash;
        if (blockHash.length < 64 || !this._isHexadecimal(blockHash)) {
            return this.handleError(null, res);
        }
        next();
    }

    async getBlockByHash(req: Request, res: Response, next: NextFunction) {
        const blockHash: string = req.params.blockHash;

        // TOOD: cache, and change confirmation time

        try {
            const verbose = 1;
            const details = 0;
            const clientBlock: any = await this.nodeClient.execute('getblock', [blockHash, verbose, details]);
            const coinbaseTxHash: string = clientBlock.tx[0];
            const clientTx: any = await this.nodeClient.getTX(coinbaseTxHash);
            const block = transformClientBlockToBlock(this.network, clientBlock, clientTx);
            res.json(block);
        } 
        catch (error) {
            this.handleError(error, res);
        }
    }
}