import { SensorType } from "../models/sensors.enum";
import { calculateDistance } from "../utils/calculDistance";
import { sendToTopic, subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeLightLevel = (
    setBrutValue: (value: string) => void,
    step: number,
    sensor: SensorType
) => {
    switch (sensor) {
        case SensorType.LIGHT:
            subscribeToTopic("box/lightlevel", setBrutValue);
            break;
        default:
            break;
    }

    const value = parseInt(setBrutValue.toString()); // added toString() to avoid TypeScript error
    sendToTopic("box/step", `step-${step}`);
    return calculateDistance(value, sensor).message;
};
