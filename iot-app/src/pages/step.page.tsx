import React from "react";
import ProgressBar from "../components/progressbar.component";
import "../App.css";
import Step from "../components/step.page";

const StepPage: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-start p-6">
            <ProgressBar currentStep={3} totalSteps={10} />
            <div className="mt-8 w-full max-w-md">
                <Step
                    imageSrc="https://via.placeholder.com/150"
                    text="Étape 3"
                />
            </div>
        </div>
    );
};

export default StepPage;
