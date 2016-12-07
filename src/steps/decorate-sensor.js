import log from "services/logger";
import {upsertSensor} from "services/mongo-db";

export async function decorateSensor(sensorId, measurements) {

    const measurementTypes = measurements.map(measurement => {
        return measurement.type;
    });

    log.info({
        sensorId,
        measurementTypes
    });

    await upsertSensor(sensorId, {
        measurementTypes
    });
}
