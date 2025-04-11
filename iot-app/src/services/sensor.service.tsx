import { SensorType } from "../models/sensors.enum";
import { calculateDistance } from "../utils/calculDistance";
import { subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeSensorLevel = (
    setBrutValue: (value: string) => void,
    step: number,
    sensor: SensorType,
    entry: string
) => {
    console.log(`Subscribing to topic: box/captor/${entry}`);
    subscribeToTopic("box/captor/" + entry, (message) => {
        console.log(`Received message for ${entry}:`, message);
        setBrutValue(message);
    });
};
