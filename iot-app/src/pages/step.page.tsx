import React from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/progressbar.component";
import "../App.css";
import Step from "../components/step.page";

interface LocationState {
    image: string;
    number: number;
    indice: string;
}

const StepPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    return (
      <div className="bg-gray-950 text-white min-h-screen justify-start">
            <ProgressBar currentStep={state.number} totalSteps={10} />
            <h1>Étape {state.number}</h1>
            <div className="mt-8 w-full max-w-md">
                <Step
                    imageSrc={state.image}
                    text={`Étape ${state.number}`}
                    indice={state.indice}
                />
            </div>
        </div>
    );
};

export default StepPage;
