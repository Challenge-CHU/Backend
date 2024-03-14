"use client";
import React, { useEffect } from "react";
import LineChart from "../Chart/LineChart";
import BarChart from "../Chart/BarChart";

const GraphCard = ({
    title,
    type,
    labels = [],
    datas = [],
    max,
    stepSize = null,
    id = null,
}) => {
    useEffect(() => {}, [labels, datas, max, stepSize, id]);
    return (
        <div className=" shadow-custom col-span-2  rounded-lg py-4 px-6">
            <h3 className="font-bold text-md mb-3">{title}</h3>

            {type === "line" && (
                <LineChart
                    labels={labels}
                    datas={datas}
                    max={max}
                    stepSize={stepSize}
                    id={id}
                />
            )}
            {type === "bar" && (
                <BarChart
                    labels={labels}
                    datas={datas}
                    max={max}
                    id={id}
                    stepSize={stepSize}
                />
            )}
        </div>
    );
};

export default GraphCard;
