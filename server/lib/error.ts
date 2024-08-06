import { Response } from 'express';

export function notFound(res: Response) {
    res.status(404).send({ error: 'Not found' });
}

export function internalError(res: Response, error: unknown) {
    console.error(error);
    res.status(500).send({ error: 'Internal error' });
};
