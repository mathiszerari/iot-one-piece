import React, { useEffect, useState } from "react";
import "../App.css";
import { subscribeToTopic, sendToTopic } from "../utils/mqttFunctions";
import { useNavigate } from "react-router-dom";
import { SensorType } from "../models/sensors.enum";
import { EmojiType } from "../models/emojis.enum";

const OnePiecePage: React.FC = () => {
    const navigate = useNavigate();
    
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        subscribeToTopic("box/lightlevel", setMessage);
    }, []);

    useEffect(() => {
        const value = parseInt(message);
        if (!isNaN(value) && value < 3) {
            sendToTopic("game/player1", "c bon");
        }
    }, [message]);

    const handleGoClick = () => {
        navigate('/step', { 
            state: { 
                image: EmojiType.sunny, 
                number: 1,
                indice: "Revenez chercher le trésor la nuit 🌙",
                sensor: SensorType.LIGHT
            } 
        });
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <div className="text-center">
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
            <div className="text-center pt-8">
                <button 
                    onClick={handleGoClick}
                    className="bg-gray-800 text-white text-2xl font-bold p-8 rounded-full border-4 hover:bg-red-600 transition duration-300"
                >
                    GO
                </button>
            </div>

            <div className="mt-8 text-center">
                <h2 className="text-3xl">Lumière :</h2>
                <p className="text-xl">{message || "Erreur "}</p>
            </div>
        </div>
    );
};

export default OnePiecePage;
