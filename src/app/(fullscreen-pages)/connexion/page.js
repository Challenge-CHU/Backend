"use client";
import Image from "next/image";
import { Button, Input } from "react-daisyui";
import { useRef, useCallback } from "react";

export default function SignIn() {
    const handleForm = () => {
        console.log("formulaire validé");
    };

    return (
        <main className="lg:min-w-[600px] bg-white py-16 px-24 flex flex-col gap-3 items-center rounded-lg">
            <Image
                src="/logo-chu.png"
                width={223}
                height={110}
                alt="Logo CHU Rouen"
            />
            <h1 className="font-bold text-secondary text-2xl">
                Challenge 10000 pas
            </h1>
            <form className="w-full flex flex-col gap-3 ">
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="inputEmail"
                        className="label self-start font-semibold "
                    >
                        <span className="label-text text-base">Email</span>
                    </label>
                    <Input
                        id="inputEmail"
                        type="text"
                        placeholder="Entrez votre email"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="inputPassword"
                        className="label self-start font-semibold "
                    >
                        <span className="label-text text-base">
                            Mot de passe
                        </span>
                    </label>
                    <Input
                        id="inputPassword"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                    />
                </div>

                <Button
                    onClick={handleForm}
                    type="button"
                    className="text-white mt-3 self-end"
                    size="sm"
                    color="secondary"
                >
                    Connexion
                </Button>
            </form>
        </main>
    );
}
