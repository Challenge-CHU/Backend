import { useEffect } from "react";
import { Chart } from "chart.js";

function Example({ labels, datas, max, stepSize }) {
    useEffect(() => {
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: datas,
                        label: "Données",
                        borderColor: "#00B4EC",
                        backgroundColor: "#7bb6dd",
                        fill: true,
                        tension: 0,
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                                max: max,
                                stepSize: stepSize,
                            },
                        },
                    ],
                },
            },
        });
    }, [labels, datas, max]);
    return (
        <>
            {/* line chart */}
            <div className=" flex mx-auto my-auto">
                <canvas id="myChart"></canvas>
            </div>
        </>
    );
}

export default Example;
