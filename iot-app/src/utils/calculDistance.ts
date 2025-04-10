import { sendToTopic } from "./mqttFunctions";

interface CalculationResult {
  message: string;
  passed: boolean;
  nextstep?: number;
}

export const calculateDistance = (value: number, step: number): CalculationResult => {
  if (step === 1) {
    return lightCalcul();
  } else if (step === 2) {
    return pressureCalcul();
  } else if (step === 3) {
    return soundCalcul();
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
    return { message: "Analyse en cours", passed: false };
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
    return { message: "Analyse en cours", passed: false };
  }

  function soundCalcul(): CalculationResult {
    let limit = 200

    if (value <= limit) {
      return { message: "Ah non tu n'y es pas", passed: false };
    } else if (value > limit) {
      // maybe add delay
      sendToTopic("box/step", `step-4`);
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 4 };

    }
    return { message: "Analyse en cours", passed: false };
  }

  return { message: "Erreur", passed: false };
}
