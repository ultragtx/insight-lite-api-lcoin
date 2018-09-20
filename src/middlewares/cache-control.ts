import { Request, Response, NextFunction } from 'express';

export default class CacheControl {
    public cacheEnabled: boolean = true;
    public cacheShortSeconds: number;
    public cacheLongSeconds: number;
    
    constructor(options: {
        cacheEnabled?: boolean;
        cacheShortSeconds?: number;
        cacheLongSeconds?: number;
    }) {
        if (options.cacheEnabled === false)  {
            this.cacheEnabled = false;
        }
        
        this.cacheShortSeconds = options.cacheShortSeconds || 30; // 30s
        this.cacheLongSeconds = options.cacheLongSeconds || 86400; // 1D
    }
    
    cache(maxAge: number) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (this.cacheEnabled) {
                res.header('Cache-Control', 'public, max-age=' + maxAge);
            }
            next();
        };
    }

    short() {
        return this.cache(this.cacheShortSeconds);
    }

    long() {
        return this.cache(this.cacheLongSeconds);
    }
}
