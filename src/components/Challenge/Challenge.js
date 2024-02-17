"use client";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Button } from "react-daisyui";
import StatsCard from "../Stats/StatsCard";

const Challenge = ({ challenge }) => {
    return (
        <div className="container mx-auto px-2 lg:px-24">
            <div className="flex justify-between items-center mb-10 bg-primary text-white px-0 lg:px-6 py-4 rounded-lg shadow-custom">
                <Button aria-label="Challenge précédent" color="primary">
                    <FaArrowAltCircleLeft size={25} />
                </Button>
                <h1 className="lg:text-2xl font-bold text-center">
                    {challenge.name} du {challenge.startDate} au{" "}
                    {challenge.endDate}
                </h1>
                <Button aria-label="Challenge suivant" color="primary">
                    <FaArrowAltCircleRight size={25} />
                </Button>
            </div>

            <section className="flex lg:gap-10">
                <div className="lg:basis-1/2 flex flex-col gap-5">
                    <button></button>
                </div>
                <div className="lg:basis-1/2 flex flex-row flex-wrap gap-5">
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
