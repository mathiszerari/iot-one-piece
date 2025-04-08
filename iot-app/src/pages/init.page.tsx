import React from "react";
import "../App.css";

const OnePiecePage: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="text-center mt-8">
                <img
                    src="https://logo-marque.com/wp-content/uploads/2021/09/One-Piece-Logo.png"
                    alt="One Piece Logo"
                    className="w-1/2 mx-auto"
                />
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Bienvenue sur IoT One Piece
                </h1>
                <p className="text-lg md:text-2xl mb-8">
                    Plongez dans l'aventure avec Luffy et son équipage !
                </p>
            </div>
            <div className="text-center mb-8">
                <button className="bg-red-500 text-white font-bold py-4 px-8 rounded-full border-4 hover:bg-red-600 transition duration-300">
                    GO
                </button>
            </div>
        </div>
    );
};

export default OnePiecePage;
