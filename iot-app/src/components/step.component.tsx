import React, { useEffect, useState } from 'react';
import { SensorType } from '../models/sensors.enum';
import { subscribeLightLevel } from '../services/light.service';
import { lightAverage } from '../utils/lightAverage';

interface StepProps {
    imageSrc: string;
    text: string;
    indice: string;
    sensor: SensorType;
}

const Step: React.FC<StepProps> = ({ imageSrc, text, indice, sensor }) => {
    const [message, setMessage] = useState<string>("");
    const [brutValue, setBrutValue] = useState<string>("");

    useEffect(() => {
        if (sensor === SensorType.LIGHT) {
            subscribeLightLevel(setBrutValue);
            if (brutValue) {
                const value = parseInt(brutValue);
                if (!isNaN(value)) {
                    setMessage(lightAverage(value).message);
                }
            }
        }
    }, [sensor, brutValue]);

    return (
        <div className="flex flex-col items-center">
            <img src={imageSrc} alt="Step" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
            <h2 className="mt-4 text-2xl font-bold">{text}</h2>
            <p className="mt-2 text-gray-400">{indice}</p>
            {sensor === SensorType.LIGHT && (
                <div className="mt-8 text-center">
                    <h2 className="text-3xl">Lumière :</h2>
                    <p className="text-xl">{message || "Erreur "}</p>
                </div>
            )}
        </div>
    );
};

export default Step;
