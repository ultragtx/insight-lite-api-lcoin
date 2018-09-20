import * as express from 'express';
import router from './router';
import { network_type } from './types';

const { API_PREFIX_DEFAULT, PORT_DEFAULT } = require('./constants');

const NETWORK_TYPE = network_type.main;
const rpcURL = 'http://localhost:9332'

const routerConfig = {
    networkType: NETWORK_TYPE,
    rpcURL,
    cacheEnabled: false,
};

const app = express()

app.use(API_PREFIX_DEFAULT, router(routerConfig));

app.get('/', (req, res) => res.send('insight-lite-api-lcoin'));

app.listen(PORT_DEFAULT, () => console.log('Listen on port', PORT_DEFAULT));