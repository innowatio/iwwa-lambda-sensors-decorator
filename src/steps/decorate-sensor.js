import log from "services/logger";
import R from "ramda";
import {findSensor, upsertSensor} from "services/mongo-db";

export async function decorateSensor(sensorId, measurements) {
    var measurementTypes =[];
    const measurementType = measurements.map(measurement => {
        return measurement.type;
    });
    
    const sensor = await findSensor(sensorId);

    if (sensor) {
        measurementTypes = sensor.measurementTypes || [];
    }

    log.info({
        sensorId,
        measurementTypes
    });

    await upsertSensor(sensorId, {
        measurementTypes: R.uniq(R.concat(measurementTypes, measurementType))
    });
}
