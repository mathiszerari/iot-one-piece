import React from "react";
import "../App.css";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="flex my-6 mx-auto bg-gray-950 text-white w-4/5">
            <div className="w-full max-w-lg">
                <div className="bg-gray-900 h-4 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                    <span>Étape {currentStep}</span>
                    <span>sur {totalSteps}</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;