import { MongoClient, Db } from 'mongodb';

import { connectionUrl } from '../config';

export let db: Db;

(async () => {
    try {
        const mongo = new MongoClient(connectionUrl);
        await mongo.connect();
        db = mongo.db();
        console.info(`Connected to MongoDB ${db.databaseName}`);
    }
    catch (ex) {
        console.error(ex);
        process.exit(1);
    }
})();
