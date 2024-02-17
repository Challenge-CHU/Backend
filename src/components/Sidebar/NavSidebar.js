"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaUser, FaChartColumn, FaTrophy } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const NavSidebar = () => {
    const [activeLink, setActiveLink] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        // Récupérer l'URL de la page
        const currentUrl = window.location.pathname;
        console.log(currentUrl);
        // Définir la valeur de activeLink en fonction de l'URL de la page
        setActiveLink(currentUrl);
    }, [pathname]);

    return (
        <ul className="menu px-0 hidden lg:block w-full">
            <li>
                <Link
                    className={activeLink === "/challenges" ? "active" : ""}
                    href="/challenges"
                >
                    <FaTrophy />
                    Challenges
                </Link>
            </li>
            <li>
                <Link
                    className={activeLink === "/utilisateurs" ? "active" : ""}
                    href="/utilisateurs"
                >
                    <FaUser />
                    Utilisateurs
                </Link>
            </li>
            <li>
                <Link
                    className={activeLink === "/statistiques" ? "active" : ""}
                    href="/statistiques"
                >
                    <FaChartColumn />
                    Statistiques
                </Link>
            </li>
        </ul>
    );
};

export default NavSidebar;
