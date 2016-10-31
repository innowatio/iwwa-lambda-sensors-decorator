import {upsertSensor} from "services/mongo-db";

export async function decorateSensor(sensorId, measurements) {

    const measurementTypes = measurements.map(measurement => {
        return measurement.type;
    });

    await upsertSensor(sensorId, {
        measurementTypes
    });
}
