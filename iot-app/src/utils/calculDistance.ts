import { sendToTopic } from "./mqttFunctions";

interface CalculationResult {
  message: string;
  passed: boolean;
  nextstep?: number;
}

let lastValue = 0;

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
    let max = 400;
    let low = 250;

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
    let limit = 150

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
    // Démarrer le compteur de 5 secondes
    let timer = 0;
    const interval = setInterval(() => {
        timer += 1;
        
        // Afficher un message pendant le comptage
        if (timer < 5) {
            return { message: `Ah non tu n'y es pas`, passed: false };
        } else {
            // Les 5 secondes sont écoulées
            clearInterval(interval); // Arrêter le compteur
            
            // Navigation vers l'étape suivante
            sendToTopic("box/step", `step-4`);
            lastValue = value;
            return { message: "Félicitation, c'est réussi !", passed: true, nextstep: 4 };
        }
    }, 1000); // Intervalle de 1 seconde
    
    return { message: "Ah non tu n'y es pas", passed: false };
}


    return { message: "Erreur", passed: false };
}
