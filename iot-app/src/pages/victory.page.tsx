import React from "react";
import ProgressBar from "../components/progressbar.component";
import Victory from "../components/victory.component";

const VictoryPage: React.FC = () => {
    return (
        <div className="bg-gray-950 text-white min-h-screen justify-start">
          <ProgressBar currentStep={3} />
          <Victory />
        </div>
    );
};

export default VictoryPage;