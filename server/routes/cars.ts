import { Router } from 'express';
import { Filter, Document, ObjectId } from 'mongodb';

import requireTokenAuth from '../middleware/requireTokenAuth';
import { db } from '../lib/mongo';
import { internalError } from '../lib/error';


const router = Router();

router.use(requireTokenAuth)
.get('/', async (req, res) => {
    // GET /cars?brand=<BrandName>
    try {
        const filter: Filter<Document> = {};
        if (req.query.brand) {
            filter.brand = req.query.brand;
        }

        res.send(await db.collection('cars').find(filter).sort({ title: 1 }).toArray());
    }
    catch (ex) {
        return internalError(res, ex);
    }
})
.get('/:id', async (req, res) => { 
    try {
        const found = await db.collection('cars').findOne({ _id: new ObjectId(req.params.id) });
        return found ? res.send(found) :
            res.status(404).send({ error: 'Not found' });
    }
    catch (ex) {
        return internalError(res, ex);
    }
})
.put('/', async (req, res) => {
    try {
        const { insertedId } = await db.collection('cars').insertOne(req.body);
        res.send({ ok: 'Created', _id: insertedId });
    }
    catch (ex) {
        return internalError(res, ex);
    }
})
.post('/:id', async (req, res) => {
    try {
        const { matchedCount } = await db.collection('cars').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        return matchedCount ? res.send({ ok: 'Updated' }) :
            res.status(404).send({ error: 'Not found' });
    }
    catch (ex) {
        return internalError(res, ex);
    }
})
.delete('/:id', async (req, res) => {
    try {
        const { deletedCount } = await db.collection('cars').deleteOne(
            { _id: new ObjectId(req.params.id) }
        );

        return deletedCount ? res.send({ ok: 'Deleted' }) :
            res.status(404).send({ error: 'Not found' });
    }
    catch (ex) {
        return internalError(res, ex);
    }
});

export default router;
