import React from "react";
import { Stats, Button } from "react-daisyui";

const StatsCard = ({ label = "Label", value = "20000" }) => {
    return (
        <div className="stats shadow-custom col-span-2 lg:col-span-1 rounded-lg h-fit">
            <div className="stat">
                <div className="stat-value text-secondary mb-4">{value}</div>
                <div className="stat-title font-regular text-black">
                    {label}
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
