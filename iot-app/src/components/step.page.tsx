import React from "react";

interface StepProps {
    imageSrc: string;
    text: string;
    indice: string;
}

const Step: React.FC<StepProps> = ({ imageSrc, text, indice }) => {
    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-400 text-sm">Indice : {indice}</p>
            <img src={imageSrc} alt="Step" className="w-16 h-16 mb-4" />
            <p className="text-white text-center">{text}</p>
        </div>
    );
};

export default Step;
