import { useNavigate } from "react-router-dom";
import { SensorType } from "../models/sensors.enum";
import { EmojiType } from "../models/emojis.enum";

const navigate = useNavigate();

export const selectStep = (step: number) => {
  setTimeout(() => {
    if (step === 1) {
      navigateToStep(EmojiType.sunny, 1, "Revenez chercher le trésor la nuit 🌙", SensorType.LIGHT);
    }
    if (step === 2) {
      navigateToStep(EmojiType.fist, 2, "Il faut de la force pour déterrer le trésor 💪🏼", SensorType.PRESSURE);
    }
    if (step === 3) {
      navigateToStep(EmojiType.sound, 3, "Il ne faut pas un bruit pour récupérer le trésor 🎵", SensorType.SOUND);
    }
  }, 2000); // 2000 millisecondes = 2 secondes
};

const navigateToStep = (
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
            sensor: sensor,
        },
    });
};
