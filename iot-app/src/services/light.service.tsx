import { lightAverage } from "../utils/lightAverage";
import { sendToTopic, subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeLightLevel = (setBrutValue: (value: string) => void, step: number) => {
    subscribeToTopic("box/lightlevel", setBrutValue);
    
    const value = parseInt(setBrutValue.toString()); // added toString() to avoid TypeScript error
    sendToTopic("box/step", `step-${step}`);
    return lightAverage(value).message;
};