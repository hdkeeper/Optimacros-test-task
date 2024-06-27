import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { listenPort } from './config';
import authHandler from './routes/auth';
import carsHandler from './routes/cars';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authHandler);
app.use('/cars', carsHandler);

// 404 fallback handler
app.use((req, res, next) => {
    res.status(404).send({ error: 'Not found' });
});

app.listen(listenPort, async () => {
    console.info(`Listening on port ${listenPort}`);
});
