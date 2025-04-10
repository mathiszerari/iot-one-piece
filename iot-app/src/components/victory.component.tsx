import React from "react";
import { EmojiType } from "../models/emojis.enum";

const Victory: React.FC = () => {
    
    return (
        <div className="flex flex-col items-center">
            <h2 className="my-6 text-2xl font-bold">VICTOIRE !</h2>
            <img
                src={EmojiType.victory}
                alt="Victoire"
                className="my-4 w-1/3 h-1/3 object-cover rounded-lg shadow-lg"
            />
        </div>
    );
};

export default Victory;
