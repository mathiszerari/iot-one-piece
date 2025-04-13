export const lightAverage = (lightLevels: number) => {
  if (lightLevels >= 100) {
    return { message: "Ah non tu n'y es pas", passed: false };
  } else if (lightLevels < 100 && lightLevels >= 60) {
    return { message: "Ça chauffe, continue comme ça !", passed: false };
  } else if (lightLevels < 60) {
    return { message: "Félicitation, c'est réussi !", passed: true };
  }
  return { message: "Analyse en cours", passed: false };
}
