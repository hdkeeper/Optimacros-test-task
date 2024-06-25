import { Response } from 'express';

export const internalError = (res: Response, exception: any) => {
    console.error(exception);
    res.status(500).send({ error: 'Internal error' });
};
