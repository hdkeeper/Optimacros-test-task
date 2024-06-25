import Router from 'express';

import { createToken } from '../lib/token';

const router = Router();

const user = {
    name: 'test',
    password: 'test',
};

router.post('/', (req, res) => {
    const { name, password } = req.body;
    if (!(name === user.name && password === user.password)) {
        return res.status(401).send({ error: 'Invalid name or password' });
    }

    res.send({ token: createToken() });
});

export default router;
