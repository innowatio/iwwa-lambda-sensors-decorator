import bunyan from "bunyan";

import {LOG_LEVEL} from "../config";

const logger = bunyan.createLogger({name: "iwwa-lambda-sensors-decorator"});

logger.level(process.env.NODE_ENV === "test" ? "fatal" : LOG_LEVEL);

export default logger;
