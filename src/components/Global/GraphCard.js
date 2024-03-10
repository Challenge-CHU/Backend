import React from "react";
import LineChart from "../Chart/LineChart";

const GraphCard = ({ title, type, labels = [], datas = [], max }) => {
    return (
        <div className=" shadow-custom col-span-2  rounded-lg py-4 px-6">
            <h3 className="font-bold text-md mb-3">{title}</h3>

            {type === "line" && (
                <LineChart labels={labels} datas={datas} max={max} />
            )}
        </div>
    );
};

export default GraphCard;
