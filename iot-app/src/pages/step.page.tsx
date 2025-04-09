import React from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/progressbar.component";
import "../App.css";
import Step from "../components/step.page";
import { StepData } from "../models/step";

const StepPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as StepData;

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
        </div>
    );
};

export default StepPage;
