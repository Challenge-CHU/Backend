import { useEffect } from "react";
import { Chart } from "chart.js";

function Example({ labels, datas, max, id, stepSize }) {
    useEffect(() => {
        console.log(max, stepSize);
        var ctx = document.getElementById(id).getContext("2d");
        var myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: datas,
                        label: "Données",
                        borderColor: "#00B4EC",
                        backgroundColor: "#7bb6dd",
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
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                responsive: true,
            },
        });
    }, [labels, datas, max, id, stepSize]);
    return (
        <>
            {/* line chart */}
            <div className=" flex mx-auto my-auto">
                <canvas id={id}></canvas>
            </div>
        </>
    );
}

export default Example;
