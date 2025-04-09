import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/progressbar.component";
import "../App.css";
import Step from "../components/step.page";
import { StepData } from "../models/step";
import { SensorType } from "../models/sensors.enum";
import { subscribeLightLevel } from "../services/light.service";
import { lightAverage } from "../utils/lightAverage";

const StepPage: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [brutValue, setBrutValue] = useState<string>("");
    const location = useLocation();
    const state = location.state as StepData;

    useEffect(() => {
        switch (state.sensor) {
            case SensorType.LIGHT:
                subscribeLightLevel(setBrutValue);
                if (brutValue) {
                    const value = parseInt(brutValue);
                    if (!isNaN(value)) {
                        setMessage(lightAverage(value).message);
                    }
                }
                break;
            default:
                break;
        }
    }, [state.sensor, brutValue]);

    return (
        <div className="bg-gray-950 text-white min-h-screen justify-start">
            <ProgressBar currentStep={state.number} totalSteps={10} />
            <div className="mt-8 w-full max-w-md">
                <Step
                    imageSrc={state.image}
                    text={`Étape ${state.number}`}
                    indice={state.indice}
                />
            </div>
            <div className="mt-4 text-center">
                <p className="text-gray-400">Capteur requis : {state.sensor}</p>
            </div>
            <div className="mt-8 text-center">
                <h2 className="text-3xl">Lumière :</h2>
                <p className="text-xl">{message || "Erreur "}</p>
            </div>
        </div>
    );
};

export default StepPage;
