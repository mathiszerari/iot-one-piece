import { NavigateFunction } from "react-router-dom";
import { SensorType } from "../models/sensors.enum";
import { EmojiType } from "../models/emojis.enum";
import { sendToTopic } from "./mqttFunctions";

export const selectStep = (navigate: NavigateFunction, step: number) => {
  // Envoyer immédiatement le message MQTT pour informer du changement d'étape
  if (step === 1) {
    sendToTopic('box/step', 'step-1');
  } else if (step === 2) {
    sendToTopic('box/step', 'step-2');
  } else if (step === 3) {
    sendToTopic('box/step', 'step-3');
  } else if (step === 4) {
    sendToTopic('box/step', 'step-4');
  }
  
  // Attendre 2 secondes avant de naviguer vers l'étape suivante
  setTimeout(() => {
    if (step === 1) {
      navigateToStep(navigate, EmojiType.sunny, 1, "Revenez chercher le trésor la nuit 🌙", SensorType.LIGHT);
    } else if (step === 2) {
      navigateToStep(navigate, EmojiType.fist, 2, "Il faut de la force pour déterrer le trésor 💪🏼", SensorType.PRESSURE);
    } else if (step === 3) {
      navigateToStep(navigate, EmojiType.sound, 3, "Il ne faut pas un bruit pour récupérer le trésor 🎵", SensorType.SOUND);
    } else if (step === 4) {
      navigate("/victory");
    }
  }, 2000); // 2000 millisecondes = 2 secondes
};

const navigateToStep = (
    navigate: NavigateFunction,
    image: EmojiType,
    step: number,
    indice: string,
    sensor: SensorType
) => {
    // Cette fonction est maintenant appelée uniquement après un délai de 2 secondes
    navigate("/step", {
        state: {
            image: image,
            step: step,
            indice: indice,
            sensor: sensor
        }
    });
};