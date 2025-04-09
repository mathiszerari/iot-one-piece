import { lightAverage } from "../utils/lightAverage";
import { sendToTopic, subscribeToTopic } from "../utils/mqttFunctions";

export const subscribeLightLevel = (setBrutValue: (value: string) => void) => {
    subscribeToTopic("box/lightlevel", setBrutValue);
    
    const value = parseInt(setBrutValue.toString()); // added toString() to avoid TypeScript error
    if (!isNaN(value) && value < 3) {
        sendToTopic("game/player1", "c bon");
    }
    return lightAverage(value).message;
};