import React from "react";
import { Stats, Button } from "react-daisyui";

const StatsCard = () => {
    return (
        <div className="stats shadow-custom col-span-2 lg:col-span-1 rounded-lg">
            <div className="stat">
                <div className="stat-value text-secondary mb-4">89 400</div>
                <div className="stat-title font-regular text-black">
                    Total Page Views
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
