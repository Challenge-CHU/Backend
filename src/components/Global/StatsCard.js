import React from "react";
import { Stats, Button } from "react-daisyui";

const StatsCard = ({ label = "Label", value = "20000" }) => {
    return (
        <div className="stats shadow-custom col-span-2 lg:col-span-1 rounded-lg h-fit">
            <div className="stat p-4 xl:px-8">
                <div className="stat-value text-secondary mb-2 xl:mb-4 text-2xl xl:text-3xl">
                    {value}
                </div>
                <div className="stat-title font-regular text-black ">
                    {label}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
