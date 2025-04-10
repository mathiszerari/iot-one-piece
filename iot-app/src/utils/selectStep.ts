import { NavigateFunction } from "react-router-dom";
import { SensorType } from "../models/sensors.enum";
import { EmojiType } from "../models/emojis.enum";

export const selectStep = (navigate: NavigateFunction, step: number) => {
  setTimeout(() => {
    if (step === 1) {
      navigateToStep(navigate, EmojiType.sunny, 1, "Revenez chercher le trésor la nuit 🌙", SensorType.LIGHT);
    }
    if (step === 2) {
      navigateToStep(navigate, EmojiType.fist, 2, "Il faut de la force pour déterrer le trésor 💪🏼", SensorType.PRESSURE);
    }
    if (step === 3) {
      navigateToStep(navigate, EmojiType.sound, 3, "Il ne faut pas un bruit pour récupérer le trésor 🎵", SensorType.SOUND);
    }
    if (step === 4) {
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
    navigate("/step", {
        state: {
            image: image,
            step: step,
            indice: indice,
            sensor: sensor
        }
    });
};
