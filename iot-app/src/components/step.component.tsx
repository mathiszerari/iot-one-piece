import React, { useEffect, useState } from "react";
import { SensorType } from "../models/sensors.enum";
import { subscribeSensorLevel } from "../services/sensor.service";
import { StepData } from "../models/step";
import { calculateDistance } from "../utils/calculDistance";
import { selectStep } from "../utils/selectStep";

const Step: React.FC<StepData> = ({ image, step, indice, sensor }) => {
  
    const [message, setMessage] = useState<string>("");
    const [brutValue, setBrutValue] = useState<string>("");

    useEffect(() => {
        if (sensor === SensorType.LIGHT) {
            subscribeSensorLevel(setBrutValue, step, sensor, "lightlevel");
            if (brutValue) {
                const value = parseInt(brutValue);
                if (!isNaN(value)) {
                    const result = calculateDistance(value, sensor, step);
                    setMessage(result.message);
                    if (result.nextstep) {
                        selectStep(result.nextstep);
                    }
                }
            }
        }

    }, [sensor, brutValue]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="my-6 text-2xl font-bold">Étape {step}</h2>
            <p className="my-4 text-lg text-gray-300">Indice : {indice}</p>
            <img
                src={image}
                alt="Step"
                className="my-4 w-1/3 h-1/3 object-cover rounded-lg shadow-lg"
            />
            {sensor === SensorType.LIGHT && (
                <div className="mt-8 text-center">
                    <p className="text-xl">{message || "Erreur "}</p>
                </div>
            )}
        </div>
    );
};

export default Step;
