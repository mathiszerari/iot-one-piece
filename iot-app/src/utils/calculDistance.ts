import { sendToTopic } from "./mqttFunctions";

interface CalculationResult {
  message: string;
  passed: boolean;
  nextstep?: number;
}

let lastValue = 0;
let firstSoundValue = null;

export const calculateDistance = (value: number, step: number): CalculationResult => {
  console.log('====================================');
  console.log('value', value);
  console.log('====================================');
  if (step === 1) {
    return lightCalcul();
  } else if (step === 2) {
    return pressureCalcul();
  } else if (step === 3) {

    return soundCalcul();
  }

  function lightCalcul(): CalculationResult {
    let max = 500;
    let low = 350;

    console.log(value)

    if (value >= max) {
      return { message: "Ah non tu n'y es pas", passed: false };
    } else if (value < max && value >= low) {
      return { message: "Ça chauffe, continue comme ça !", passed: false };
    } else if (value < low) {
      // maybe add delay
      sendToTopic("box/step", `step-2`);
      lastValue = value;
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 2 };

    }
    return { message: "", passed: false };
  }

  function pressureCalcul(): CalculationResult {
    if (lastValue === value) {
        value = 0;
    }
    let limit = 80

    console.log('pressure' + value)

    if (value <= limit) {
      return { message: "Ah non tu n'y es pas", passed: false };

    } else if (value > limit) {
      // maybe add delay
      sendToTopic("box/step", `step-3`);
      lastValue = value;
      return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 3 };

    }
    return { message: "Analyse en cours", passed: false };
  }

    function soundCalcul(): CalculationResult {
        console.log('sound ' + value);

        if (firstSoundValue === null) {
            firstSoundValue = value;
            return {
                message: "Fais un peu de bruit maintenant...",
                passed: false
            };
        } else {
            console.log('1ere valeur', firstSoundValue);
            if (value < firstSoundValue) {
                sendToTopic("box/step", "step-4");
                firstSoundValue = null;
                return {
                    message: "Félicitation, c'est réussi !",
                    passed: true,
                    nextstep: 4
                };
            } else {
                return {
                    message: "Encore trop fort, essaie encore !",
                    passed: false
                };
            }
        }
    }


    return { message: "Erreur", passed: false };
}
