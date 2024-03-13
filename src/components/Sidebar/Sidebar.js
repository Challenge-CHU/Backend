"use client";
import Image from "next/image";
import { Divider } from "react-daisyui";
import Link from "next/link";
import NavSidebar from "./NavSidebar";
import { FaBars } from "react-icons/fa6";
import { Button } from "react-daisyui";
import { useState } from "react";
import NavMobile from "./NavMobile";
import { signOut } from "next-auth/react";

const Sidebar = () => {
    const [showMenuMobile, setShowMenuMobile] = useState(false);

    return (
        <nav className=" bg-neutral w-full lg:w-[200px] flex flex-col items-center  gap-2">
            <div className="flex flex-row justify-between w-full p-4">
                <div className=" flex flex-col lg:items-center justify-center gap-1 lg:gap-4">
                    <Image
                        className="logo-sidebar"
                        src="/logo-chu.png"
                        width={149}
                        height={72}
                        alt="Logo CHU Rouen"
                    />
                    <h1 className="text-sm lg:text-base text-center font-bold">
                        Challenge 10000 pas
                    </h1>
                </div>
                <div className="flex lg:hidden items-center ">
                    <Button
                        aria-label="Ouvrir le menu"
                        color="ghost"
                        onClick={() => setShowMenuMobile(true)}
                    >
                        <FaBars className="text-secondary" size={36} />
                    </Button>
                </div>
            </div>

            <NavSidebar />

            <NavMobile
                showMenuMobile={showMenuMobile}
                setShowMenuMobile={setShowMenuMobile}
            />

            <button
                className="hidden lg:block link link-error mb-4"
                onClick={() => signOut()}
            >
                Déconnexion
            </button>
        </nav>
    );
};

export default Sidebar;
