import { SensorType } from "../models/sensors.enum";
import { calculateDistance } from "../utils/calculDistance";
import { subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeSensorLevel = (
    setBrutValue: (value: string) => void,
    step: number,
    sensor: SensorType,
    entry: string
) => {
    subscribeToTopic("box/captor/" + entry, setBrutValue);

    const value = parseInt(setBrutValue.toString());
    return calculateDistance(value, sensor, step).message;
};
