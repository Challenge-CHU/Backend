"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { FaUser, FaChartColumn, FaTrophy } from "react-icons/fa6";
import { Button } from "react-daisyui";
import { FaXmark } from "react-icons/fa6";

const NavMobile = ({ showMenuMobile, setShowMenuMobile }) => {
    return (
        <>
            {showMenuMobile && (
                <div className="flex flex-col lg:hidden fixed top-0 right-0 z-10 bg-neutral h-screen w-[250px] shadow-custom px-4">
                    <div className="flex justify-between items-center pt-4 ps-4">
                        <h3 className="font-bold text-xl">Menu</h3>
                        <Button
                            aria-label="Fermer le menu"
                            color="ghost"
                            onClick={() => setShowMenuMobile(false)}
                        >
                            <FaXmark className="text-secondary" size={36} />
                        </Button>
                    </div>
                    <ul className="menu px-0 flex-1">
                        <li className="">
                            <Link href="/challenges">
                                <FaTrophy />
                                Challenges
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/utilisateurs">
                                <FaUser />
                                Utilisateurs
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/statistiques">
                                <FaChartColumn />
                                Statistiques
                            </Link>
                        </li>
                    </ul>

                    <button
                        className=" link link-error mb-4"
                        onClick={() => signOut()}
                    >
                        Déconnexion
                    </button>
                </div>
            )}
        </>
    );
};

export default NavMobile;
