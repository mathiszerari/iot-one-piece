import React from "react";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/progressbar.component";
import Step from "../components/step.component";
import { StepData } from "../models/step";

const StepPage: React.FC = () => {
    const location = useLocation();
    const state = location.state as StepData;

    return (
        <div className="bg-gray-950 text-white min-h-screen justify-start">
            <ProgressBar currentStep={state.step} />
            <div className="mt-8 w-full max-w-md">
                <Step
                    image={state.image}
                    step={state.step}
                    indice={state.indice}
                    sensor={state.sensor}
                />
            </div>
        </div>
    );
};

export default StepPage;
