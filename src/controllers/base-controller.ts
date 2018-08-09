import { Response } from 'express';
import { Log, ControllerConfig } from '../types';
import { APIError } from '../utils/error';
import * as _ from 'lodash';
import { network } from 'lcoin';
import { NodeClient } from 'lclient';

export default class BaseController {
    // protected options: any;
    protected log: Log;
    protected translateAddresses: boolean;
    protected rpcURL: string;
    protected network: network;
    protected nodeClient: NodeClient;

    constructor(options: ControllerConfig) {
        // this.options = options;
        this.log = options.log;
        this.translateAddresses = options.translateAddresses || true;
        this.rpcURL = options.rpcURL;
        this.network = options.network;
        this.nodeClient = options.nodeClient;
    }

    protected notReady(err: APIError | null, res: Response, percentage: number) {
        res.status(503).send('Server not yet ready. Sync Percentage:' + percentage);
    };

    protected handleError(err: APIError | null, res: Response) {
        if (err) {
            if (err.code)  {
              res.status(400).send(err.message + '. Code:' + err.code);
            } else {
              this.log.error(this, err.stack);
              res.status(503).send(err.message);
            }
          } else {
            res.status(404).send('Not found');
          }
    }

    protected translateInputAddresses(addresses: string | string[]) {

    }

    // protected call(res: Response, func: () => Promise<any>) {
    //     func()
    //     .then(r => res.json(r))
    //     .catch(err => this.handleErrors(err as APIError, res));
    // }
}