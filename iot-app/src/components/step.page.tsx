import React from "react";

interface StepProps {
    imageSrc: string;
    text: string;
}

const Step: React.FC<StepProps> = ({ imageSrc, text }) => {
    return (
        <div className="flex flex-col items-center mb-8">
            <img src={imageSrc} alt="Step" className="w-16 h-16 mb-4" />
            <p className="text-white text-center">{text}</p>
        </div>
    );
};

export default Step;
