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
            <h2 className="my-6 text-2xl font-bold">{text}</h2>
            <p className="my-4 text-lg text-gray-300">Indice : {indice}</p>
            <img src={imageSrc} alt="Step" className="my-4 w-1/3 h-1/3 object-cover rounded-lg shadow-lg" />
            {sensor === SensorType.LIGHT && (
                <div className="mt-8 text-center">
                    <p className="text-xl">{message || "Erreur "}</p>
                </div>
            )}
        </div>
    );
};

export default Step;
