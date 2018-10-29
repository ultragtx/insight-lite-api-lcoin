import BaseController from './base-controller';
import { Request, Response, NextFunction } from 'express';
import { Log, ControllerConfig, RPCResponse } from '../types';
import { APIError } from '../utils/error';
import * as _ from 'lodash';
import {

} from '../reformers/tx';
import fetch from '../utils/fetch';

export default class StatusController extends BaseController {
    constructor(options: ControllerConfig) {
        super(options);
    }
}