import { SensorType } from "../models/sensors.enum";

export const calculateDistance = (value: number, sensor: SensorType) => {
  let max : number = 0;
  let mid : number = 0;
  let low: number = 0;
  
  if (sensor !== SensorType.LIGHT) {
    max = 100;
    mid = 50;
    low = 0;
  }
  
  if (value >= max) {
    return { message: "Ah non tu n'y es pas", passed: false };
  } else if (value < max && value >= mid) {
    return { message: "Ça chauffe, continue comme ça !", passed: false };
  } else if (value < low) {
    return { message: "Félicitation, c'est réussi !", passed: true };
  }
  return { message: "Analyse en cours", passed: false };
}
