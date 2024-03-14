"use client";
import React from "react";
import { Stats, Button } from "react-daisyui";
import { FaDownload } from "react-icons/fa6";

const ButtonCard = ({ icon, title, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="btn btn-secondary btn-lg text-white p-4 lg:px-6 lg:py-6 xxl:px-9 xxl:py-9 shadow-custom h-auto flex-nowrap text-start justify-between col-span-2 lg:col-span-1"
        >
            {title}
            {icon}
        </button>
    );
};

export default ButtonCard;
