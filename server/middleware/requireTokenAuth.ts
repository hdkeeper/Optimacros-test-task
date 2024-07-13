import { Request, Response, NextFunction } from 'express';

import { isValidToken } from '../lib/token';

export default function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const [type, token] = authHeader.split(/\s+/);
        if (type == 'Bearer' && token && isValidToken(token)) {
            return next();
        }
    }
    
    res.status(403).send({ error: 'Access denied' });
}
