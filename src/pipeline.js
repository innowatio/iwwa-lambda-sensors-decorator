import log from "./services/logger";

import {decorateSensor} from "./steps/decorate-sensor";

export default function pipeline(event) {

    log.info(event, "event");

    const rawReading = event.data.element;
    if (!rawReading ||
        !rawReading.sensorId ||
        !rawReading.date,
        !rawReading.measurements) {
        return null;
    }

    decorateSensor(rawReading.sensorId, rawReading.measurements);
}
