import React from 'react';
import '../App.css'

const OnePiecePage: React.FC = () => {
    return (
        <div className="bg-blue-500 text-white flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue sur IoT One Piece</h1>
                <p className="text-lg md:text-2xl mb-8">Plongez dans l'aventure avec Luffy et son équipage !</p>
                <img src="https://via.placeholder.com/150" alt="One Piece Logo" className="mb-8 rounded-full" />
                <button className="bg-red-500 text-white font-bold py-4 px-8 rounded-full border-4 animated-border hover:bg-red-600 transition duration-300">
                    GO
                </button>
            </div>
            <style>{`
                @keyframes borderAnimation {
                    0% {
                        border-color: #ff6f61;
                    }
                    50% {
                        border-color: #ffcc5c;
                    }
                    100% {
                        border-color: #ff6f61;
                    }
                }

                .animated-border {
                    animation: borderAnimation 2s infinite;
                }
            `}</style>
        </div>
    );
};

export default OnePiecePage;
