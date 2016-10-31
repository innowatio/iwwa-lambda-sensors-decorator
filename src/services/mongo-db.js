import {MongoClient} from "mongodb";

import {
    MONGODB_URL,
    SENSORS_COLLECTION
} from "../config";

let dbInstance;

export async function getMongoClient () {
    if (!dbInstance) {
        dbInstance = await MongoClient.connect(MONGODB_URL);
    }
    return dbInstance;
}

export async function upsertSensor(id, sensor) {
    const db = await getMongoClient();
    await db.collection(SENSORS_COLLECTION).updateOne(
        {_id: id},
        {$set: sensor},
        {upsert: true}
    );
}
