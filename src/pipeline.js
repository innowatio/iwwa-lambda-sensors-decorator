import log from "./services/logger";

import {decorateSensor} from "./steps/decorate-sensor";

export default async function pipeline(event) {

    log.info(event, "event");

    const rawReading = event.data.element;
    if (!rawReading ||
        !rawReading.sensorId ||
        !rawReading.date,
        !rawReading.measurements) {
        return null;
    }

    await decorateSensor(rawReading.sensorId, rawReading.measurements);
}
