"use client";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "react-daisyui";
import StatsCard from "../Stats/StatsCard";

const Challenge = ({ challenge }) => {
    return (
        <div className="container mx-auto px-24">
            <div className="flex justify-between items-center mb-10 bg-primary text-white px-6 py-4 rounded-lg shadow-custom">
                <Button color="primary">
                    <FaArrowAltCircleLeft size={25} />
                </Button>
                <h1 className="text-2xl font-bold">
                    {challenge.name} du {challenge.startDate} au{" "}
                    {challenge.endDate}
                </h1>
                <Button color="primary">
                    <FaArrowAltCircleRight size={25} />
                </Button>
            </div>

            <section className="flex gap-10">
                <div className="basis-1/2 flex flex-col gap-5">
                    <button></button>
                </div>
                <div className="basis-1/2 flex flex-row flex-wrap gap-5">
                    <StatsCard className="w-2/4" />
                    <StatsCard className="w-2/4" />
                    <StatsCard className="w-2/4" />
                    <StatsCard className="w-2/4" />
                </div>
            </section>
        </div>
    );
};

export default Challenge;
