import { SensorType } from "./sensors.enum";

export interface StepData {
  image: string;
  step: number;
  indice: string;
  sensor: SensorType;
}