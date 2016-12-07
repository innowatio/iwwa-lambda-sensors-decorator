import dotenv from "dotenv";

dotenv.load();

export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/test";
export const SENSORS_COLLECTION = process.env.SENSORS_COLLECTION || "sensors";
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
