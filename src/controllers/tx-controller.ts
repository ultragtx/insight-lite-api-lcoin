import BaseController from './base-controller';
import { Request, Response, NextFunction } from 'express';
import { Log, ControllerConfig, RPCResponse } from '../types';
import { APIError } from '../utils/error';
import * as _ from 'lodash';
import {

} from '../reformers/tx';
import fetch from '../utils/fetch';

export default class TxController extends BaseController {
    constructor(options: ControllerConfig) {
        super(options);
    }

    async _template(req: Request, res: Response, next: NextFunction) {
        try {
            const txHash: string = req.params.txid;
            const result = await this.nodeClient.getTX(txHash);
            res.json(result);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async _template2(req: Request, res: Response, next: NextFunction) {
        try {
            const txHash: string = req.params.txid;
            const result: any = await this.nodeClient.execute('getTX', [txHash]);
            // TODO: reform
            res.json(result);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async getTxByHash(req: Request, res: Response, next: NextFunction) {
        try {
            const txHash: string = req.params.txid;
            // const result = await this.nodeClient.getTX(txHash); // can also use getTX
            const verbose = 1;
            const result: any = await this.nodeClient.execute('getrawtransaction', [txHash, verbose]);
            // TODO: reform
            res.json(result);
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async getRawTxByHash(req: Request, res: Response, next: NextFunction) {
        try {
            const txHash: string = req.params.txid;
            const verbose = 0;
            const result: any = await this.nodeClient.execute('getrawtransaction', [txHash, verbose]);
            // TODO: reform
            res.json({
                rawTransaction: result,
            });
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async getTxs(req: Request, res: Response, next: NextFunction) {
        try {
            const blockHash = req.query.block;
            const address = req.query.address;
            const page = parseInt(req.query.pageNum) || 0;
            const pageLength = 10;
            let pagesTotal = 1;

            if (blockHash) {
                const verbose = 1;
                const details = 0;
                const block: any = await this.nodeClient.execute('getblock', [blockHash, verbose, details]);
                let txHashs: string[] = block.tx;

                // paging
                const start = page * pageLength;
                txHashs = txHashs.slice(start, start + pageLength);
                
                const results: any[] = [];
                
                for (const txHash of txHashs) {
                    const verbose = 1;
                    const tx: any = await this.nodeClient.execute('getrawtransaction', [txHash, verbose]);
                    // TODO: reform
                    results.push(tx);
                }

                res.json(results);
                return;
            }
            else if (address) {
                const txs: any[] = await this.nodeClient.getTXByAddress(address);
                // TODO: add paging
                // TODO: reform
                res.json(txs);
                return;
            }
            else {
                this.handleError(new Error('Block hash or address expected'), res);
            }
        }
        catch (error) {
            this.handleError(error, res);
        }
    }

    async sendRawTx(req: Request, res: Response, next: NextFunction) {
        try {
            const rawTx: string = req.body.rawtx;
            const result = await this.nodeClient.execute('sendrawtransaction', [ rawTx ]);
            res.json({
                txid: result,
            });
        }
        catch (error) {
            this.handleError(error, res);
        }
    }
}
