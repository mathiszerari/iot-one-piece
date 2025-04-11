import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SensorType } from "../models/sensors.enum";
import { subscribeSensorLevel } from "../services/sensor.service";
import { StepData } from "../models/step";
import { calculateDistance } from "../utils/calculDistance";
import { selectStep } from "../utils/selectStep";

const Step: React.FC<StepData> = ({ image, step, indice, sensor }) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("");
    const [brutValue, setBrutValue] = useState<string>("");

    useEffect(() => {
        let sensorField = "";
        
        if (sensor === SensorType.LIGHT) {
            sensorField = "lightlevel";
        } else if (sensor === SensorType.PRESSURE) {
            sensorField = "pressionlevel";
        } else if (sensor === SensorType.SOUND) {
            sensorField = "soundlevel";
        }
        
        if (sensorField) {
            subscribeSensorLevel(setBrutValue, step, sensor, sensorField);
        }
    }, [sensor, step]);

    useEffect(() => {
        console.log('brutValue a changé:', brutValue);
        
        if (brutValue) {
            const value = parseInt(brutValue);
            if (!isNaN(value)) {
                const result = calculateDistance(value, step);
                console.log('Résultat du calcul:', result);
                setMessage(result.message);
                if (result.nextstep) {
                    selectStep(navigate, result.nextstep);
                }
            }
        }
    }, [brutValue, step, navigate]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="my-6 text-2xl font-bold">Étape {step}</h2>
            <p className="my-4 text-lg text-gray-300">Indice : {indice}</p>
            <img
                src={image}
                alt="Step"
                className="my-4 w-1/3 h-1/3 object-cover rounded-lg shadow-lg"
            />
            <div className="mt-8 text-center">
                <p className="text-xl">
                    {message || "En attente de données..."}
                </p>
            </div>
        </div>
    );
};

export default Step;