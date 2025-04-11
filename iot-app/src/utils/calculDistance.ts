import { SensorType } from "../models/sensors.enum";
import { sendToTopic } from "./mqttFunctions";

interface CalculationResult {
  message: string;
  passed: boolean;
  nextstep?: number;
}

let lastValue = 0

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
    let low = 70;

    console.log(value)

    if (value >= max) {
      return { message: "Ah non tu n'y es pas", passed: false };
    } else if (value < max && value >= low) {
      return { message: "Ça chauffe, continue comme ça !", passed: false };
    } else if (value < low) {
      // maybe add delay
      sendToTopic("box/step", `step-2`);
      value = 0;
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 2 };

    }
    return { message: "", passed: false };
  }

  function pressureCalcul(): CalculationResult {
    let limit = 150

      console.log(value)

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
        console.log(value)

        const result: CalculationResult =
            value < lastValue
                ? { message: "Félicitation, c'est réussi !", passed: true, nextstep: 4 }
                : { message: "Ah non tu n'y es pas", passed: false };

        if (result.passed) {
            sendToTopic("box/step", "step-4");
        }

        if (Number.isInteger(value)) {
            lastValue = value;
        }

        return result;
    }


    return { message: "Erreur", passed: false };
}
