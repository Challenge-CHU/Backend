"use client";
import Image from "next/image";
import { Button, Input, Alert } from "react-daisyui";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const verifyData = async () => {
        const newErrors = [];

        if (username === "" || password === "") {
            newErrors.push("Veuillez remplir tous les champs");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        let valid = await verifyData();
        if (valid) {
            try {
                const response = await signIn("credentials", {
                    redirect: true,
                    username,
                    password,
                    callbackUrl: "/",
                });
                // console.log(response);
                if (response && response.status === 401) {
                    // Handle invalid credentials error
                    setErrors(["L'username ou le mot de passe est incorrect"]);
                } else {
                    // Handle other login errors
                    // console.log("An error occurred during login");
                    return;
                }
            } catch (error) {
                setErrors(["Un erreur est survenue"]);
                return;
            }
        } else {
            // console.log("Invalid data");
            return;
        }
    };

    useEffect(() => {}, [errors]);

    return (
        <main className="lg:min-w-[600px] w-full md:w-auto bg-white py-8 md:py-16 px-4 md:px-24 flex flex-col gap-3 items-center rounded-lg">
            <div className="flex justify-around gap-2 md:gap-10 items-center">
                <Image
                    src="/logo-chu.png"
                    width={80}
                    height={80}
                    alt="Logo CHU Rouen"
                    className="md:w-[150px]"
                />
                <Image
                    src="/logo-cesi.png"
                    width={80}
                    height={80}
                    alt="Logo CESI"
                    className="md:w-[150px]"
                />
            </div>
            <h1 className="font-bold text-secondary text-xl md:text-2xl">
                Challenge 10000 pas
            </h1>
            <form
                className="w-full flex flex-col gap-3 "
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="inputUsername"
                        className="label self-start font-semibold "
                    >
                        <span className="label-text text-base">Username</span>
                    </label>
                    <Input
                        className={`input w-full ${
                            errors.includes("Veuillez remplir tous les champs")
                                ? "input-error"
                                : ""
                        }`}
                        name="username"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Entrez votre username"
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
                        className={`input w-full mb-3 ${
                            errors.includes(
                                "Le mot de passe doit contenir au moins 6 caractères, contenir une minuscule et une majuscule"
                            )
                                ? "input-error"
                                : ""
                        }`}
                        name="password"
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                    />
                </div>
                {errors.length > 0 && (
                    <>
                        {errors.map((error, index) => (
                            <Alert
                                key={index}
                                className="rounded"
                                status="error"
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                }
                            >
                                <span>{error}</span>
                            </Alert>
                        ))}
                    </>
                )}

                <Button
                    type="submit"
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
