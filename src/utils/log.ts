import * as log4js from 'log4js';
import { Logger } from 'log4js';
import * as _ from 'lodash';

log4js.configure({
    appenders: {
        stdout: {
            type: 'stdout',
            layout: {
                // type: 'pattern',
                type: 'coloured',
                // pattern: '[%d] [%p] [%X{componentName}] - %m%n' // with category: '[%d] [%p] [%c] [%X{componentName}] - %m%n'
            }
        },
        multi: { 
            type: 'multiFile', 
            base: 'logs/', 
            property: 'categoryName', 
            extension: '.log',
            maxLogSize: 10485760, 
            backups: 3, 
        }
    },
    categories: {
        default: { appenders: [ 'stdout' ], level: 'debug' }
    }
});

const loggers: { [componentName: string]: Logger } = {};

enum LogLevel {
    trace = 'trace',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
    fatal = 'fatal',
}

function log(logLevel: LogLevel, classInstanceOrString: Object | string, message: any, ...logParameters: any[]) {
    let componentName: string;
    if (_.isString(classInstanceOrString)) {
        componentName = classInstanceOrString as string;
    }
    else {
        componentName = classInstanceOrString.constructor.name;
    }
    
    let logger = loggers[componentName];
    
    if (!logger) {
        logger = log4js.getLogger();
        logger.addContext('componentName', componentName);
        loggers[componentName] = logger;
    }

    const logPrefix = `[${componentName}] `;
    
    switch(logLevel) {
        case LogLevel.trace: {
            logger.trace(logPrefix, message, ...logParameters);;
            break;
        }
        case LogLevel.debug: {
            logger.debug(logPrefix, message, ...logParameters);;
            break;
        }
        case LogLevel.info: {
            logger.info(logPrefix, message, ...logParameters);;
            break;
        }
        case LogLevel.warn: {
            logger.warn(logPrefix, message, ...logParameters);;
            break;
        }
        case LogLevel.error: {
            logger.error(logPrefix, message, ...logParameters);;
            break;
        }
        case LogLevel.fatal: {
            logger.fatal(logPrefix, message, ...logParameters);;
            break;
        }
    }
}

export const logger = {
    trace: log.bind(undefined, LogLevel.trace),
    debug: log.bind(undefined, LogLevel.debug),
    info: log.bind(undefined, LogLevel.info),
    warn: log.bind(undefined, LogLevel.warn),
    error: log.bind(undefined, LogLevel.error),
    fatal: log.bind(undefined, LogLevel.fatal),
};

