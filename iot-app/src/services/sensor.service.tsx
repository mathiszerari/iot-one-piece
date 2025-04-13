import { subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeSensorLevel = (
    setBrutValue: (value: string) => void,
    entry: string
) => {
    console.log(`Subscribing to topic: box/captor/${entry}`);
    subscribeToTopic("box/captor/" + entry, (message: string) => {
        console.log(`Received message for ${entry}:`, message);
        setBrutValue(message);
    });
};
