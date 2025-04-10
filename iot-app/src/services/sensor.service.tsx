import { SensorType } from "../models/sensors.enum";
import { calculateDistance } from "../utils/calculDistance";
import { sendToTopic, subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeSensorLevel = (
    setBrutValue: (value: string) => void,
    step: number,
    sensor: SensorType,
    entry: string
) => {
    subscribeToTopic("box/" + entry, setBrutValue);

    const value = parseInt(setBrutValue.toString()); // added toString() to avoid TypeScript error
    sendToTopic("box/step", `step-${step}`);
    return calculateDistance(value, sensor, step).message;
};
