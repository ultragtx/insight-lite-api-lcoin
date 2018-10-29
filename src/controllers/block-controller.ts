import BaseController from './base-controller';
import { Request, Response, NextFunction } from 'express';
import { Log, ControllerConfig, RPCResponse } from '../types';
import { APIError } from '../utils/error';
import * as _ from 'lodash';
import {
    transformClientBlockToBlock,
    transformClientBlockHashToResponse,
} from '../reformers/block';
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
        try {
            const blockHash: string = req.params.blockHash;
            // TOOD: cache, and change confirmation time

            const verbose = 1;
            const details = 0;
            const clientBlock: any = await this.nodeClient.execute('getblock', [blockHash, verbose, details]);
            const coinbaseTxHash: string = clientBlock.tx[0];
            const coinbaseTx: any = await this.nodeClient.getTX(coinbaseTxHash);
            const block = transformClientBlockToBlock(this.network, clientBlock, coinbaseTx);
            res.json(block);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async getBlocks(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.nodeClient.execute('getblocks', []);
            res.json(result);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async getBlockHash(req: Request, res: Response, next: NextFunction) {
        try {
            const blockHeight: number = Number(req.params.height);
            const result: any = await this.nodeClient.execute('getblockhash', [blockHeight]);
            res.json(transformClientBlockHashToResponse(result));
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
}
