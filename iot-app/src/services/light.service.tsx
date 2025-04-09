import { subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeLightLevel = (callback: (message: string) => void) => {
    subscribeToTopic("box/lightlevel", callback);
};