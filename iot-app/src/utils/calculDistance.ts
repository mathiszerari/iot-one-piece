import { SensorType } from "../models/sensors.enum";
import { sendToTopic } from "./mqttFunctions";

interface CalculationResult {
  message: string;
  passed: boolean;
  nextstep?: number;
}

export const calculateDistance = (value: number, sensor: SensorType, step: number): CalculationResult => {
  if (sensor === SensorType.LIGHT) {
    return lightCalcul();
  }

  if (sensor === SensorType.PRESSURE) {
    return pressureCalcul();
  }

  function lightCalcul(): CalculationResult {
    let max = 100;
    let mid = 50;
    let low = 0;

    if (value >= max) {
      return { message: "Ah non tu n'y es pas", passed: false };
    } else if (value < max && value >= mid) {
      return { message: "Ça chauffe, continue comme ça !", passed: false };
    } else if (value < low) {
      // maybe add delay
      sendToTopic("box/step", `step-2`);
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 2 };
  
    }
    return { message: "Analyse en cours", passed: false, nextstep: 2 };
  }

  function pressureCalcul(): CalculationResult {
    let limit = 30

    if (value <= limit) {
      return { message: "Ah non tu n'y es pas", passed: false };
    } else if (value > limit) {
      // maybe add delay
      sendToTopic("box/step", `step-3`);
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 3 };
  
    }
    return { message: "Analyse en cours", passed: false, nextstep: 3 };
  }

  return { message: "Erreur", passed: false };
}
