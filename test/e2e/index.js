import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {v4} from "node-uuid";

chai.use(sinonChai);

import {handler} from "index";
import {getMongoClient} from "services/mongo-db";
import {getEventFromObject} from "../mocks";
import {SENSORS_COLLECTION} from "config";

const reading = {
    "sensorId": "IT001E00030554",
    "date": "2015-10-14T15:08:16.652Z",
    "source": "reading",
    "measurements": [{
        "type": "activeEnergy",
        "value": 59.5,
        "unitOfMeasurement": "kWh"
    }, {
        "type": "reactiveEnergy",
        "value": 45.5,
        "unitOfMeasurement": "kVARh"
    }]
};

describe("Handle kinesis reading event", async () => {

    var db;
    const context = {
        succeed: sinon.spy(),
        fail: sinon.spy()
    };

    before(async () => {
        db = await getMongoClient();
        await db.createCollection(SENSORS_COLLECTION);
    });

    after(async () => {
        await db.dropCollection(SENSORS_COLLECTION);
        await db.close();
    });

    afterEach(async () => {
        context.succeed.reset();
        context.fail.reset();
    });

    it("Ignore event", async () => {

        const event = getEventFromObject({
            id: "eventId",
            data: {
                element: {},
                id: v4()
            },
            type: "element inserted in collection readings"
        });

        await handler(event, context);
        expect(context.succeed).to.have.been.calledOnce;

        const sensors = await db.collection(SENSORS_COLLECTION).find({}).toArray();
        expect(sensors).to.be.empty;
    });

    it("Decorate sensor", async () => {

        const event = getEventFromObject({
            id: "eventId",
            data: {
                element: reading,
                id: v4()
            },
            type: "element inserted in collection readings"
        });

        await handler(event, context);
        expect(context.succeed).to.have.been.calledOnce;

        const sensors = await db.collection(SENSORS_COLLECTION).find({}).toArray();
        expect(sensors).to.not.be.empty;

        const sensor = await db.collection(SENSORS_COLLECTION).findOne(
            {_id: reading.sensorId}
        );
        expect(sensor.measurementTypes).to.be.deep.equal(["activeEnergy", "reactiveEnergy"]);
    });
});
